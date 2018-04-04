var BookList = (function(){
    return function(title,author,price){
        this.title  = title;
        this.author  = author;
        this.price = price;
    }
})();

new Vue({
    el:"#bookapp",
    data:{
        booklist :[
            {title:"三国演义",author:"罗贯中",price:32},
            {title:"水浒传",author:"施耐庵",price:30},
            {title:"红楼梦",author:"曹雪芹",price:24},
            {title:"西游记",author:"吴承恩",price:20},
        ]
    },
    methods:{
        remove:function(index){
            this.booklist.splice(index,1);
        },
        addnewbooks:function(){
            this.booklist.push(new BookList(this.booklist.title,this.booklist.author,this.booklist.price));
            this.booklist.title = this.booklist.author = "";
            this.booklist.price = 0;
        }
    }
})