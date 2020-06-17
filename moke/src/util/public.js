// 日期格式化
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

export function formatTimeToStr(times, pattern) {
  var d = new Date(times).Format("yyyy-MM-dd hh:mm:ss");
  if (pattern) {
    d = new Date(times).Format(pattern);
  }
  return d.toLocaleString();
}
export function formatTimeToStr2(times, pattern) {
  var d = new Date(times).Format("hh:mm");
  if (pattern) {
    d = new Date(times).Format(pattern);
  }
  return d.toLocaleString();
}

// 获取月份对应的天数
export function getAllDays(date) {
  let curDate = date ? new Date(date) : new Date();
  let curMonth = curDate.getMonth();
  curDate.setMonth(curMonth + 1);
  curDate.setDate(0);
  let countDays = curDate.getDate();
  let allDays = [];
  for (let i = 1; i <= countDays; i++) {
    allDays.push(i);
  }
  return allDays;
}

// 切换input焦点
export function focusNextInput(thisInput) {
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    if (i == inputs.length - 1) {
      break;
    } else if (thisInput == inputs[i]) {
      inputs[i + 1].focus();
      break;
    }
  }
}

// 切换横屏时改变body的类名
export function setLandscape() {
  document.body.classList.add("body-landscape");
}
export function removeLandscape() {
  document.body.classList.remove("body-landscape");
}
