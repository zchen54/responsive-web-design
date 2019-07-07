//使用时修改下面：
//jQuery引用的src
//css引用的href
//foot_float.css文件中图片的url

//jQuery引用
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "../js/jquery-1.8.2.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

//css引用
var link = document.createElement("link");
link.type = "text/css";
link.href = "../css/foot_float.css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

//延迟100ms，完成上面的jQuery引用和css引用，再执行其他代码
setTimeout("fun_for_use_jquery()", 100);

function fun_for_use_jquery() {
  //收起的div
  if (document.getElementById("divfloat_Off") != null)
    document
      .getElementsByTagName("body")[0]
      .removeChild(document.getElementById("divfloat_Off"));

  var divfloat_Off = document.createElement("div"); //创建div
  divfloat_Off.setAttribute("id", "divfloat_Off");

  divfloat_Off.innerHTML =
    '<a id="a_open" href="javascript:void(0)" title="展开"></a>';

  document.getElementsByTagName("body")[0].appendChild(divfloat_Off);

  //展开的div
  if (document.getElementById("divfloat_On") != null)
    document.body.removeChild(document.getElementById("divfloat_On"));

  var divfloat_On = document.createElement("div"); //创建div
  divfloat_On.setAttribute("id", "divfloat_On");

  divfloat_On.innerHTML =
    '<a id="a_zhuanti" href="index.html"></a><div id="div_position"><a id="a_close" href="javascript:void(0)" title="关闭"></a></div>';

  document.getElementsByTagName("body")[0].appendChild(divfloat_On);

  //收起点击事件
  $("a[id='a_close']").click(function() {
    fun_float_On();
    setTimeout("fun_float_Off()", 1000); //Timeout 1秒再执行fun_float_Off()
  });

  //展开点击事件
  $("a[id='a_open']").click(function() {
    fun_float_Off();
    setTimeout("fun_float_On()", 500);
  });

  //初始 收起的div 先隐藏起来
  $("#divfloat_On").animate({ width: "toggle" }, 0);

  //倒计时
  var toDate = Date.parse("12/9/2016");

  var myDate = new Date();

  var days = (toDate - myDate) / 86400000;

  if (days <= 0.0) {
    days = -2;
  }

  var days_r = parseInt(days) + 2;

  var days_fmt =
    days_r.toString().length == 1 ? "0" + days_r.toString() : days_r.toString();

  var days_left = days_fmt.substring(0, 1);

  var days_right = days_fmt.substring(1, 2);

  if (document.getElementById("pCountdown") != null) {
    document.getElementById("pCountdown").innerHTML = days_left + days_right;
  }

  //alert(days_left + days_right);
}

function fun_float_On() {
  $("#divfloat_On").animate({ width: "toggle" }, "slow");
}

function fun_float_Off() {
  $("#divfloat_Off").animate({ width: "toggle" }, "slow");
}
