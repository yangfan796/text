<template>
  <div class="loading">
    <img
      v-for="item in 26"
      :key="item"
      v-show="item === number"
      :src="require(`@/assets/images/loading/loading${item}.png`)"
      alt
    >
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "loading",

  data() {
    return {
      number: 1,
      timer: ""
    };
  },

  computed: {
    ...mapState(["loading"])
  },

  watch: {
    loading(val) {
      if (val) {
        this.showLoading();
      } else {
        clearInterval(this.timer);
      }
    }
  },

  methods: {
    showLoading() {
      this.number = 1;
      this.timer = setInterval(() => {
        if (this.number < 26) {
          this.number++;
        } else {
          this.number = 1;
        }
      }, 50);
    }
  }
};
</script>

<style lang='scss' scoped>
.loading {
  width: 100%;
  height: 100% !important;
  padding: 0 !important;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 30%;
  }
}
</style>
