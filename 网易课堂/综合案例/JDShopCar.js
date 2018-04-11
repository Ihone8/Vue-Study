new Vue({
    el:"#app",
    data:{
        ShopList:[]
    },
    //组件加载完毕执行
    mounted(){
        this.getShopCarData();
        console.log("开始")
    },
    methods:{
        //获取商品数据
        getShopCarData(){
            this.$http.get('./shopCar.json').then(response => {
                alert("666");
                console.log(response.body)
             
              }, response => {
                // error callback
                console.log(response.error)
              });
        }
    }
})