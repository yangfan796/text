import {menuList} from '@/api/goodlist/goodlist.js'
let url
let mainRouteList =[]
console.log(mainRouteList)
menuList({}).then(res =>{
    url = res.data
    url.forEach(e =>{
      if(e.childLs){
        e.childLs.forEach(item =>{
            mainRouteList.push({name:item.name,path:item.href,component:()=>import(`../views${item.href}.vue`)})
        //   switch(item.href){
        //     case '/toDrugInfo' :
        //       mainRoutes[0].children.push({name:'toDrugInfo',path:'/toDrugInfo',component:()=>import("../views/ToDrugInfo.vue")})
        //     break;
        //     case '/drugAdmin' :
        //       mainRoutes[0].children.push({name:'drugAdmin',path:'/drugAdmin',component:()=>import("../views/DrugAdmin.vue")})
        //     break;
        //     case '/drugClassify' :
        //       mainRoutes[0].children.push({name:'drugClassify',path:'/drugClassify',component:()=>import("../views/drugClassify.vue")})
        //     break;
        //   }
        })
      }
    })
    console.log(mainRouteList)
  })
  export {mainRouteList}