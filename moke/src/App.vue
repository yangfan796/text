<template>
  <div id="app">
    <div id="nav">
      <router-view />
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="home-o">home</van-tabbar-item>
        <van-tabbar-item replace to="/about" icon="home-o">about</van-tabbar-item>
      </van-tabbar>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>
<script>
import storage from "@/util/storage";
import loading from "@/components/loading/loading";
import { mapState } from "vuex";
import { login } from "@/api/login/login.js";
export default {
  components: {
    loading
  },
  data() {
    return {
      active: 0
    };
  },
  computed: {
    ...mapState(["loading"])
  },
  created() {
    login({}).then(res => {
      storage.set("token", res.data.token);
    });
    console.log(storage.get("token"));
  }
};
</script>
<style lang="scss">
@import './styles/font.css';
#nav {
 height: 100vh;
 font-family: wxz;
}
</style>
