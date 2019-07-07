/*关于联合切换js*/
//页面加载
window.onload = function(){
	$("#show1").show();
	$("#show2").hide();
	$("#show3").hide();
}
function show1() {
	$("#show1").show();
	$("#show2").hide();
	$("#show3").hide();
}
function show2() {
	$("#show1").hide();
	$("#show2").show();
	$("#show3").hide();
}
function show3() {
	$("#show1").hide();
	$("#show2").hide();
	$("#show3").show();
}
