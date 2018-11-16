// 单例模式
// var cart = {
//     name: ""
//     eat: function(){}
// }


// 工厂模式
class ManageCart{

    constructor(){
        // 默认的初始化数据，根据创建订单api所需要的参数来声明的
        const iniData = {
            list: {},
            price: 0,
            count: 0,
            address: {}
        }

        this.data = this.getStorage() || iniData;

        // 本地的购物车数据为空的时候
        // this.data = {
        //     list: {},
        //     price: 0,
        //     count: 0,
        // }
    }
    
    add(ware){
        this.data.list[ware.goods_id] = ware;
        this.updatePrice();
    }

    remove(ware){
        const {list} = this.data;
        if(list[ware.goods_id]){
            delete list[ware.goods_id];
        }
        this.updatePrice();
    }

    // 修改数量
    update(ware){
        const {list} = this.data;
        if(list[ware.goods_id]){
            list[ware.goods_id] = ware;
        }
        this.updatePrice();
        this.setStorage();
    }

    // 修改价格
    updatePrice(){
        let allPrice = 0;
        for(let key in this.data.list){
            const value = this.data.list[key];

            // 计算所有商品的价格
            allPrice += +(value.goods_price) * value.num;
        }

        this.data.price = allPrice;
        this.setStorage();
    }
  
    // 修改收货地址
    updataAddress(addr){
        this.data.address = addr;
        this.setStorage();
    }

    getStorage(){
        // 还有异步的方法wx.getStorage
        // localStorage.getItem("key名称")
        return wx.getStorageSync("cart_data");
    }

    setStorage(){
        // window.localStorage.setItem("key名称", "数据")
        wx.setStorageSync("cart_data", this.data);
    }

    // createOrder(){
    //     // create order by this.dasta
    // }
    
}

// 实例对象
const manageCart = new ManageCart();

export default manageCart;