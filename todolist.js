(function () {
    var list = [];
    var Todo = (function () {
        var id = 1;
        return function (title, desc) {
            this.title = title;
            this.desc = desc;
            this.id = id++;
        }
    })();

/**
 *搜索组件
 */
var SearchBar = {
    template:`
        <div class="form-inline">         
            keyword:
            <input type="text" v-model="keyword" class="form-control" />
            <input type="button" @click="search()" value="search" class="btn btn-primary"/>
        </div>
    `,
    data:function(){
        return {
            keyword:''
        }
    },
    methods:{
        search:function(){
            this.$emit('onsearch',this.keyword);
        }
    }
}
/**
 * 表单组件
 */
var TodoForm = {
    template:`
    <div class="col-md-6">
        <div class="form-inline">
            <label for="title" class="control-label col-md-4">title:</label>
            <input type="hidden" v-bind:value="todo.id"/>
            <input type="text" v-model="todo.title" class="form-control col-md-8"/>
        </div>
        <br/>
        <div class="form-inline">
            <label for="desc" class="control-label col-md-4">desc:</label>
            <input type="text" v-model="todo.desc" class="form-control col-md-8"/>
        </div>
        <br/>
        <div class="form-inline">
            <input type="botton" value="OK" v-on:click="ok()" class="btn btn-primary col-md-8 offset-md-4"/>
        </div>
    </div>   
    `
    ,
    props:['initItem'],
   computed:{
        todo:function(){
            return{id:this.initItem.id,title:this.initItem.title,desc: this.initItem.desc}
        }
   },
    methods:{
        ok:function(){
            this.$emit('onsave',this.todo);

           // this.title = this.desc = '';
        }
    }
}

/**
 * 列表项组件
 */
var TodoItem = {
    template:`
        <tr>
            <th>{{ todo.id }}</th>
            <td>{{ todo.title }}</td>
            <td>{{ todo.desc }}</td>
            <td> <input type="button" value="remove" @click="remove()" class="btn btn-danger" /></td>
            <td> <input type="button" value="edit" @click="edit()" class="btn btn-info" /></td>
        </tr>
    `,
    props:['todo'],
    methods:{
        edit:function(){
            console.log(this.todo)
            this.$emit("onedit",this.todo.id);
        },
        remove:function(){
            this.$emit("onremove",this.todo.id);
        }
    }
}
// /**
//  * 列表组件
//  */
var TodoList = {
    template:`
        <div class="col-md-6">
            <table class="table table-bordered">
            <tr>
                <th>ID</th>
                <th>title</th>
                <th>desc</th>
                <th></th>
                <th></th>
            </tr>
            <todo-item v-for="item in items" :todo="item" @onedit="edit($event)" @onremove="remove($event)"></todo-item>
            </table>
        </div>
        
        `,
    props:['items'],
    components:{
        'todo-item':TodoItem
    },
    methods:{
        edit:function($e){
            this.$emit("onedit",$e)
        },
        remove:function($e){
            this.$emit("onremove",$e)
        }
    }
}

/**
 * 容器组件
 * 说明:容器组件包括三个组件
 */
var TodoContainer = {
    template: `
    <div class="container"style="margin-top:30px">
        <search-bar @onsearch="search($event)"></search-bar>
        <div class="row">
            <todo-list :items="items" @onremove="remove($event)" @onedit="edit($event)"></todo-list>            
            <todo-form :init-item="initItem" @onsave="save($event)" ></todo-form>
        </div>
    </div>
`,
    data: function () {
        return {
            /**
             * Todolist数据列表
             * 说明：通过props传入到Todolist组件中，让组件进行渲染
             */
            items: [],
            /**
             * TodoForm初始化数据
             * 说明：由于TodoForm包括两种操作：新增和编辑；新增操作无需处理，编辑操作需要进行数据绑定，这里通过传入initItem属性进行编辑时数据的初始化
             * 如果传入的值为空，说明为新增操作，由initItem参数的Id是否为空，来确认是更新保存还是新增保存
             */
            initItem: {
                title: '',
                desc: '',
                id: ''
            }
        }
    },
    components: {
        'search-bar': SearchBar,/**SearchBar组件注册 */
        'todo-form': TodoForm,/**TodoForm组件注册 */
        'todo-list': TodoList/**TodoList组件注册 */
    },
    methods: {
        /**
         * 模拟保存数据方法
         * 辅助方法
         */
        _mock_save: function (lst) {
            list = lst;
        },
        /**
         * 根据id查询对象
         * 辅助方法
         */
        findById: function (id) {
            return this.items.filter(v => v.id === id)[0] || {};
        },
        /**
         * 查询方法
         * 由SearchBar组件触发
         */
        search: function ($e) {
            this.items = list.filter(v => v.title.indexOf($e) !== -1);
        },
        /**
         * 保存方法
         * 响应新增和更新操作，由TodoForm组件触发
         */
        save: function ($e) {
            //id存在则为编辑保存
            if (this.initItem.id) {
                var o = this.findById($e.id);
                o.title = $e.title;
                o.desc = $e.desc;
            } else {
                this.items.push(new Todo($e.title, $e.desc));
            }

            this.initItem = { id: '', title: '', desc: '' };

            this._mock_save(this.items);
        },
       /**
        * 删除方法
        * 响应删除按钮操作
        * 由TodoItem组件触发
        */
        remove: function ($e) {
            this.items = this.items.filter(v => v.id !== $e);
            this._mock_save(this.items);
        },
        /**
         * 编辑按钮点击时，进行表单数据绑定
         */
        edit: function ($e) {
            this.initItem = this.findById($e);
        }
    }
}
var app = new Vue({
    el:"#app",
    components:{
        'todo-container':TodoContainer
    }
})

})();