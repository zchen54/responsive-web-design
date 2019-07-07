/*索取资料表单提交js*/

function formSubmit() {
	var currentHref = window.location.href;
	var name = document.getElementById("name").value.trim();
	var phone = document.getElementById("phone").value.trim();
	var email = document.getElementById("email").value.trim();
	var mobilePartten = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
	var phonePartten = /(^(\d{3,4}-)?\d{6,8}$)|(^(\d{3,4}-)?\d{6,8}(-\d{1,5})?$)|(\d{11})/;
	var mailPartten = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (name == "") {
		layer.msg('姓名不能为空！');
	} else if (phone == "") {
		layer.msg('电话不能为空！');
	} else if (!mobilePartten.test(phone) || !phonePartten.test(phone)) {
		layer.msg('请正确填写手机号码或者固话(如:010-8888888)！');
	} else if (!mailPartten.test(email) && email != "") {
		layer.msg('您的电子邮件格式不正确,请重新输入！');
	} else {
		//询问框
		layer.confirm('是否提交信息索取资料？', {
			btn : [ '提交', '取消' ]
		//按钮
		}, function() {
			//提交数据
			$.ajax({
				type : "POST",
				url : "/mdiy/diyForm/4ed7a77ca2a0e7b865a1882e61d103a6.do",
				data : $("#postForm").serialize(),
				success : function(msg) {
					//提交邮件
					$.ajax({
						type : "POST",
						url : "/mail/detail.do",
						data : $("#postForm").serialize(),
						success : function(msg) {
						}
					});
					layer.alert('信息提交成功，请耐心等待工作人员的回复！', {
						closeBtn : 0
					}, function(index) {
						window.location.href = currentHref;
						layer.close(index);
					});
				}
			});
		}, function() {
			layer.closeAll();
		});
	}
}