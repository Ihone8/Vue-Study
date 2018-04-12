new Vue({
    el: "#app",
    data: {
        ShopList: []
    },
    //组件加载完毕执行
    mounted() {
        this.getShopCarData();
        console.log("开始")
    },
    methods: {
        //获取商品数据
        getShopCarData() {
            // this.$http.jsonp('http://localhost:54121/Two.ashx',{jsonp:"callback"}).then(response => {
            //     console.log(response.body)

            //   }, response => {
            //     // error callback
            //     console.log(response.error)
            //   });
            // GET /someUrl
            this.$http.get('./shopCar.json').then(response => {

                // get body data
                alert(response.data);
                

            }, response => {
                // error callback
            })
        }
    }
})