构建基于vue.js开发，用webpack4打包生成的多页面应用程序。

开发目录结构：(务必遵循)
-src 开发目录
    -views 
        - platform 微平台
            - common 通用
                - component 各个页面可能用到的公用组件
                - yz 扫码验真 
                    - yz.html
                    - yz.js
                    - yz.vue
                - person 个人中心
                    - person.html
                    - person.js
                    - person.vue
                - activity 活动中心
                    - activity.html
                    - activity.js
                    - activity.vue
            - 特殊（暂未开发，目录结构同common）
                - 扫码验真
                - 个人中心
                - 活动中心
        - activity 活动
            - 翻牌子
            - 点元宝
            - and so on
        - general 通用页面
            - 订单预览页 
            - 订单详情
            - and so on
