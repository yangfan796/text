import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'amfe-flexible'
import '@/styles/common.scss'
import '@/styles/vant.scss'
import { Button,NavBar,Toast,Swipe, SwipeItem,Tabbar, TabbarItem,Sidebar, SidebarItem} from 'vant';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  
Vue.use(VueQuillEditor)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.config.productionTip = false;
Vue.prototype.$Toast = Toast;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
