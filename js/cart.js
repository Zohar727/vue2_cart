/**
 * Created by silence.w on 2017-05-17.
 */
var vm = new Vue({
    el:"#app",
    data:{
        delFlag:false,
        productList:[],
        checkAllFlag:false,
        curProduct:''
    },
    filters:{
        fomatMoney:function (value) {
            return "￥"+value.toFixed(2);
        }
    },
    mounted:function () {
        this.$nextTick(function () {
            this.cartview();
        })
       //this.cartview();

    },
    computed:{
        totalPrice:function () {
            var total=0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    total += item.productPrice * item.productQuantity;
                }
            });
            return total;
        }
    },
    methods:{
        cartview:function () {
            this.$http.get("data/cartData.json",{"id":1}).then(res=>{
                this.productList = res.data.result.list;
            })

        },
        changMoney:function (product,type) {
            if(type){
                //增加数据
                product.productQuantity++;
            }else if(product.productQuantity>1){
                product.productQuantity--;
            }
        },
        seletcedPro:function (product) {
            if (typeof product.checked == "undefined"){
                Vue.set(product,"checked",true);
            }else {
                product.checked=!product.checked;
            }
        },
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            //var self = this;
            this.productList.forEach(function (item,index) {
                if(typeof item.checked == "undefined"){
                    Vue.set(item,"checked",flag);
                }else {
                    item.checked = flag;
                }
            })
        },
        delConfirm:function (item) {
            this.curProduct=item;
            this.delFlag = true;
        },
        delSure:function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
        }
    }
})