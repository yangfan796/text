<template>
  <div class="home">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img style="width:100%;height:100%" :src="require(`@/assets/${image}`)" />
      </van-swipe-item>
    </van-swipe>
    <div class="content">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="top">
          <img :src="require(`@/assets/${item.url}`)" alt />
        </div>
        <div class="bottom">{{item.name}}</div>
      </div>
    </div>
    <div class="goodsList">
      <div class="item" v-for="(item,index) in goods" :key="index">
        <div class="left">
          <img :src="require(`@/assets/${item.url}`)" alt />
        </div>
        <div class="right">
          <div class="top">{{item.name}}</div>
          <div class="mid">{{item.des}}</div>
          <div class="foot">
            <div>
              销量：
              <span style="color:#f00">{{item.num}}</span>
            </div>
            <div>
              价格：￥
              <span style="color:#f00">{{item.price}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectXtType, goodList } from "../api/goodlist/goodlist";
export default {
  name: "Home",
  data() {
    return {
      list: [],
      goods: [],
      images: ["banner1.png", "banner2.png", "banner3.png"]
    };
  },
  created() {
    this.goodList().then(()=>{
      this.selectXtType()
    })
  },
  methods: {
    goodList() {
      return new Promise((resolve, reject) => {
        goodList({}).then(res => {
          if(res.code==200){
            this.goods = res.data;
            resolve()
          }else{
            reject()
          }
        });
      });
    },
    selectXtType() {
      return new Promise((resolve, reject) => {
       selectXtType({}).then(res => { 
         if(res.code==200){
            this.list = res.data;
            resolve()
          }else{
            reject()
          }
      });
      });
    },
    onClickLeft() {
      this.$Toast(111);
    },
    onClickRight() {}
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.my-swipe {
  flex: 1;
  margin: 15px;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 250px;
    text-align: center;
  }
}
.content {
  flex: 1;
  font-size: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  .item {
    width: 25%;
    text-align: center;
    padding: 15px;
    .top {
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
.goodsList {
  flex: 2;
  overflow: hidden;
  overflow: scroll;
  padding-bottom: 100px;
  border-top: 1px #ddd solid;
  background-color: #fff;
  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 170px;
    border-bottom: 1px solid #ddd;
    .left {
      img {
        height: 160px;
        width: 40vw;
      }
    }
    .right {
      height: 100%;
      width: 50vw;
      display: flex;
      flex-direction: column;
      align-items: left;
      .top,
      .mid {
        padding: 10px 0 0 0;
      }
      .foot {
        padding: 10px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
