<template>
  <main>
    <div class="actList" v-if="hasActivity" v-cloak>
      <ul>
        <li class="act" v-for="item in actList" :key="item.id">
          <a :href="'/views/activity/' + (item.form === 'act-100' ? 'no1.html' : '') + '?actCode=' + item.actCode">
            <div class="act-con">
              <p class="title">{{item.actName}}</p>
              <p class="desc">{{item.actDesc}}</p>
              <!-- <span class="state" v-if="item.drawed">已参加</span>
              <span class="state" v-else>未参加</span> -->
            </div>
            <div class="act-img">
              <img :src="item.banner" alt="">
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="notActivity" v-if="noActivity">
      <img src="/src/assets/image/noActivity.png" alt="">
      <p>暂时没有扫码活动哦～</p>
    </div>
    <nav>
      <ul>
        <li v-for="(item, idx) in navList" :key="idx">
          <a :href="item.path">
            <img :src="item.src" alt="">
            <span>{{item.name}}</span>
          </a>
        </li>
      </ul>
    </nav>
  </main>
</template>
<script>
import navList from 'assets/data/nav'
export default {
  data() {
    return {
      navList,
      hasActivity: false,
      noActivity: false,
      actList: []
    }
  },
  created() {
    Promise.all([this.getActList()]).then(([actList]) => {
      if (actList.code === '200') {
          console.log(actList)
        if (actList.data.length > 0) {
          this.actList = actList.data
          this.hasActivity = true
        } else {
          this.noActivity = true
        }
      }
    })
  },
  methods: {
    // 获取活动列表
    getActList() {
      return new Promise((resolve, reject) => {
        this.Fetch.get('/act/list').then(res => {
          resolve(res)
        })
      })
    }
    // 获取参与情况
    // isJoin(list) {
    //   list.forEach((item, index) => {
    //     this.Fetch.get('/act/pr/jinfo', { actCode: item.actCode }).then(res => {
    //       Object.assign(list[index], res.data)
    //     })
    //   })
    // }
  }
}
</script>

<style lang="scss">
html,
body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background: #eee;
}
nav {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  font-size: 20px;
  color: #c8c8c8;
  background: #33302d;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 90%;
    li {
      text-align: center;
      a {
        display: block;
      }
      img {
        margin: 0 auto 10px;
        display: block;
        width: 40px;
        /* height: 40px; */
      }
    }
  }
}
[v-cloak] {
  display: none !important;
}
.actList {
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  .act {
    width: 100%;
    height: 390px;
    margin-bottom: 20px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      .act-con {
        position: relative;
        width: 100%;
        height: 120px;
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
        .title {
          font-size: 32px;
          color: #333333;
          margin-bottom: 12px;
        }
        .desc {
          font-size: 24px;
          color: #666666;
        }
        .state {
          position: absolute;
          right: 22px;
          top: 35px;
          font-size: 22px;
          color: #666666;
        }
      }
      .act-img {
        width: 100%;
        height: 270px;
        // background-color: red;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.notActivity {
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  text-align: center;
  img {
    width: 388px;
    margin-top: 190px;
    margin-bottom: 123px;
  }
  p {
    font-size: 36px;
    color: #cccccc;
  }
}
</style>
