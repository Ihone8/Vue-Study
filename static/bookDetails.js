var BookList = (function(){
    var id  = 1;
    return function(title,author,price){
        this.title  = title;
        this.author  = author;
        this.price = price;
        this.id = id++;
    }
})();

new Vue({
    el:"#bookapp",
    data:{
        booklist :[
        ],
        todoItem:{
            id:'',
            title:'',
            author:'',
            price:''
        }
    },
    methods:{
        //删除
        remove:function(index){
            this.booklist.splice(index,1);
            this.todoItem.title = '';
            this.todoItem.author = '';
            this.todoItem.price = '';
        },
        //添加
        addnewbooks:function(){
            //判断修改 还是 新增
            if(this.todoItem.id){
                var obj = this.booklist.filter(b => b.id === this.todoItem.id)[0];
                obj.title = this.todoItem.title ;
                obj.author = this.todoItem.author;
                obj.price = this.todoItem.price;
            }
            else{
                this.booklist.push(new BookList(this.todoItem.title,this.todoItem.author,this.todoItem.price));            
            }        
            this.todoItem= {
                title:'',
                author:'',
                price:0
            }
        },
        //编辑
        edit:function(id){
            var obj = this.booklist.filter(b => b.id === id)[0];
            // this.booklist.title = obj.title;
            // this.booklist.author = obj.author;
            // this.booklist.price = obj.price;
            this.todoItem = {
                id:obj.id,
                title:obj.title,
                author:obj.author,
                price: obj.price
            }        
           
        },
       
    }
})