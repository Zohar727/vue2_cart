/**
 * Created by silence.w on 2017-05-20.
 */
new Vue({
    el:".container",
    data:{
        addressList:[],
        limitNum:3,
        curIndex:0,
        shipping:1,
        delFlag:false,
        curAddress:''
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddress();
        })
    },
    methods:{
        getAddress:function () {
            this.$http.get("data/address.json").then(res=>{
                var res = res.data;
                if (res.status==0){
                    this.addressList = res.result;
                }
            })
        },
        loadMore:function () {
            this.limitNum == this.addressList.length ? this.limitNum=3 : this.limitNum = this.addressList.length;
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (item,index) {
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else {
                    item.isDefault = false;
                }
            })
        },
        delConfirm:function (curAddress) {
            this.curAddress = curAddress;
            this.delFlag = true;
        },
        delSure:function () {
            var index = this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
            this.delFlag = false;
        }
    }
})