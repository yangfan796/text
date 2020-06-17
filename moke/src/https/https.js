import axios from "axios";
import store from "@/store";
import storage from "@/util/storage";
import { Toast } from "vant";
let path;
if (process.env.NODE_ENV == "development") {
  path = "/api";
} else if (process.env.NODE_ENV == "production") {
  path = "";
  axios.defaults.baseURL = "http://49.232.137.216:10010";
}

// 请求超时时间
axios.defaults.timeout = 300000;
// post请求头
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = storage.get("token");
    if (config.params) {
      if (!config.params.hasOwnProperty("token") && token) {
        config.headers.token = `${token}`;
      }
    } else if (config.data) {
      if (!config.data.hasOwnProperty("token") && token) {
        config.headers.token = `${token}`;
        config.headers['content-type'] = 'application/json;charset=UTF-8';
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    // 断网或者请求超时状态
    if (!error.response) {
      if (error.message.includes("timeout")) {
        Toast({
          message: "请求超时，请检查网络是否连接正常",
          duration: 2000
        });
      } else {
        Toast({
          message: "请求失败，请检查网络是否已连接",
          duration: 2000
        });
      }
      return;
    }
    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status;
    switch (responseCode) {
      // 未登录
      case 401:
        // 跳转到登录页
        // router.replace({
        //   path: "/login",
        //   query: {
        //     redirect: router.currentRoute.fullPath
        //   }
        // });
        break;
      case 500:
        Toast({
          message: "系统错误，请联系管理员",
          duration: 3000
        });
        break;
      // 其他错误，直接抛出错误提示
      default:
        Toast({
          message: error.response.data.message || error.response.data,
          duration: 3000
        });
    }
    return Promise.reject(error);
  }
);

export function get(url, params = {}, showLoading = true) {
  showLoading && store.dispatch("setLoading", true);
  url = path + url;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        showLoading && store.dispatch("setLoading", false);
        resolve(res.data);
      })
      .catch(err => {
        showLoading && store.dispatch("setLoading", false);
        reject(err);
      });
  });
}

export function post(url, params = {}, headers, showLoading = true) {
  showLoading && store.dispatch("setLoading", true);
  url = path + url;
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      headers,
      url,
      data: params
    })
      .then(res => {
        showLoading && store.dispatch("setLoading", false);
        resolve(res.data);
      })
      .catch(err => {
        showLoading && store.dispatch("setLoading", false);
        reject(err);
      });
  });
}
