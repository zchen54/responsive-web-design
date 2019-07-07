/*导航栏设置*/
//页面加载
window.onload = function(){
	var countryN = "";
	if (document.getElementById("countryN") != null) {
		countryN = document.getElementById("countryN").innerText;
	}
	if (countryN == "加拿大") {
		document.getElementById("passport").innerText = "全家枫叶卡";
	}
	var href = window.location.href;
	var arrFirst = new Array();
	var arrSecond = new Array();
	arrFirst = href.split("html/1/");
	arrSecond = arrFirst[1].split("/");
	var typeId = arrSecond[0];
	if (typeId == "150") {
		$("#fPage").removeClass("active");
		$("#aUnion").removeClass("active");
		$("#gProject").addClass("active");
		$("#iType").removeClass("active");
		$("#cCompare").removeClass("active");
		$("#iEncyclopedia").removeClass("active");
		$("#cUs").removeClass("active");
	} else if (typeId == "151") {
		$("#fPage").removeClass("active");
		$("#aUnion").removeClass("active");
		$("#gProject").removeClass("active");
		$("#iType").addClass("active");
		$("#cCompare").removeClass("active");
		$("#iEncyclopedia").removeClass("active");
		$("#cUs").removeClass("active");
	} else if (typeId == "152") {
		$("#fPage").removeClass("active");
		$("#aUnion").removeClass("active");
		$("#gProject").removeClass("active");
		$("#iType").removeClass("active");
		$("#cCompare").addClass("active");
		$("#iEncyclopedia").removeClass("active");
		$("#cUs").removeClass("active");
	} else if (typeId == "369") {
		$("#fPage").removeClass("active");
		$("#aUnion").removeClass("active");
		$("#gProject").removeClass("active");
		$("#iType").removeClass("active");
		$("#cCompare").removeClass("active");
		$("#iEncyclopedia").removeClass("active");
		$("#cUs").addClass("active");
	}
}