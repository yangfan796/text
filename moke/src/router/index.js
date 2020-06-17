import Vue from "vue";
import VueRouter from "vue-router";
import {routes} from './route'
import {menuList} from '@/api/goodlist/goodlist.js'
import Error from '../views/Error.vue'
// import {mainRouteList} from './mock'
Vue.use(VueRouter);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
let mainRouteList=[]
let url
const router = new VueRouter({
  mode: 'hash',
  routes,
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
});
let mainRoutes =[
  {
      path: "/about",
      name: "About",
      component: () =>
      import("../views/About.vue"),
      children:[]
  },
  { path: '*',  name: 'error',component:Error }
]
router.beforeEach((to, from, next) => {
  next()
  if (router.options.isAddDynamicMenuRoutes) {
    next()
  } else {
    menuList({}).then(res =>{
      mainRouteList=[]
      url = res.data
      router.options.isAddDynamicMenuRoutes=true
      url.forEach(e =>{
        if(e.childLs){
          e.childLs.forEach(item =>{
              mainRouteList.push({name:item.name,path:item.href,component:()=>import(`../views${item.href}.vue`)})
          })
        }
      })
      let rotes=[]
      mainRouteList.forEach(e =>{
        rotes.push(e)
      })
      mainRoutes[0].children=rotes
      router.addRoutes(mainRoutes)
    })
  }
})
export default router;
