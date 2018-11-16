class Authrize{

    constructor(){
        // 根据token判断当前用户有没登录
        this.isAuth = !!this.getToken();
    }

    // 获取token
    getToken(){
        return wx.getStorageSync("token");
    }

    // 存储token
    setToken(token){
        this.isAuth = true;
        wx.setStorageSync("token", token);
    }

}

const authrize = new Authrize();

// 暴露一个属性采用export default
export default authrize;

// 如果是多个属性，使用使用export
//export authrize