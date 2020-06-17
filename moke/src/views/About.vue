<template>
  <div id="orderFullScreen">
    <div
      :class="{'nav':this.status==0,'nav1':this.status==1,'nav2':this.status==2,'nav3':this.status==3,'nav4':this.status==4}"
    >关于</div>
    <div id='swiper'>
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img style="width:100%;height:100%" :src="require(`@/assets/${image}`)" />
      </van-swipe-item>
    </van-swipe>
    </div>
    <div class="pageList">
      <div class="last" @click="lastNum">上</div>
      <div  v-for="e in total" :key="e" v-show="e<=page&&e>=page-4" :class="e==pageNum?'seceted':'item'">{{e}}</div>
      <div class="next" @click="nextNum">下</div>
    </div>
    
    <div class="box_1"></div>
    <div class="box_2"></div>
    <div class="box"> 
      <div class="box1"></div>
      <div class="box2"></div>
      <div style="clear:both">1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>
    </div>
    <!-- <ul>
      <li v-for="e in 70" :key="e">{{e}}</li>
    </ul> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { menuList } from "@/api/goodlist/goodlist.js";
export default {
  data() {
    return {
      activeKey: 0,
      menulist: [],
      images: ["banner1.png", "banner2.png", "banner3.png"],
      status: 0,
      page:5,
      total:8,
      pageNum:1,
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll); // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
  },
  methods: {
    lastNum(){
    if(this.pageNum<this.total-1&&this.pageNum>3){
       this.page--
       this.pageNum--
     }else{
       if(this.pageNum==1){

       }else{
         this.pageNum--
       }
     }
    },
    nextNum(){
      if(this.pageNum<3||this.pageNum>this.total-3){
        if(this.pageNum==this.total){
          this.pageNum=this.total
        }else{
          this.pageNum++
        }
      }else{
        this.page++
        this.pageNum++
      }
      
    },
    toUrl() {
      this.$router.push("/drugAdmin");
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      // 　　let offsetTop = document.querySelector('#boxFixed').offsetTop; // 要滚动到顶部吸附的元素的偏移量
      // 　　this.isFixed = scrollTop > offsetTop ? true : false; // 如果滚动到顶部了，this.isFixed就为true
      let height = window.getComputedStyle(document.getElementById('swiper')).height; //获取dom元素的高度
      let reg = new RegExp("px", "g"); //g代表全部
      let newMsg = height.replace(reg, "");
      if (scrollTop < Number(newMsg) / 2) {
        this.status = 0;
      } else if (scrollTop < Number(newMsg)) {
        this.status = 1;
      } else if (scrollTop < Number(newMsg) * 1.5) {
        this.status = 2;
      } else if (scrollTop < Number(newMsg) * 2) {
        this.status = 3;
      } else {
        this.status = 4;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#orderFullScreen{
  padding-bottom: 100px;
}
.nav,
.nav1,
.nav2,
.nav3,
.nav4 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.1);
  line-height: 100px;
  height: 100px;
  text-align: center;
  color: black;
  z-index: 99;
}
.nav1 {
  background-color: rgba(0, 0, 0, 0.6);
}
.nav2 {
  background-color: rgba(0, 0, 0, 0.7);
  color: azure;
}
.nav3 {
  background-color: rgba(0, 0, 0, 0.9);
  color: azure;
}
.nav4 {
  background-color: rgba(0, 0, 0, 1);
  color: azure;
}
.pageList{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .last,.next,.item{
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 50px;
    background-color: #000;
    color: azure;
  }
  .seceted{
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 50px;
    background-color: #f00;
    color: azure;
  }
}
.box{
  width: 100vw;
  word-wrap: break-word;
  overflow: hidden;
  .box1,.box2{
    float: left;
    width: 50vw;
    height: 50vw;  
    background-color: #FFB5BF;
    border: 1px solid #94E8FF;
    padding: 10px 20px 30px;
  }
}
.box_1 {
    width: 100vw;
    height: 100vw;  
    background-color: #FFB5BF;
    border: 1px solid #94E8FF;
    padding: 10px 20px 30px;
 }
.box_2 {
    width: 50vw;
    height: 100vw;  
    background-color: #FFB5BF;
    border: 1px solid #94E8FF;
    padding: 10px 20px 30px;
    box-sizing: content-box;   /* 较 box_1 新增加的属性 */
}
</style>