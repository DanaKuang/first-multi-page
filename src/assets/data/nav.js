var a_nav = [
    {
        type: "scan",
        name: "扫码验真",
        src: require("assets/image/scan.png"),
        active_src: require("assets/image/scan.png"),
        path: location.origin + "/yx-page/views/template001/yz.html"
    },
    {
        type: "activity",
        name: "活动中心",
        src: require("assets/image/activity.png"),
        active_src: require("assets/image/activity.png"),
        path: location.origin + "/yx-page/views/template001/activity.html"
    },
    {
        type: "shop",
        name: "积分商城",
        src: require("assets/image/shop.png"),
        active_src: require("assets/image/shop.png"),
        path: "http://cs-jfc.saotianxia.vip/exchange/index"    
    },
    {
        type: "my",
        name: "个人中心",
        src: require("assets/image/my.png"),
        active_src: require("assets/image/my.png"),
        path: ""  
    }
]

export default a_nav