/*首页banner轮播图js*/
$(function () {
    //初始化
    var main = $(".carousel"),
        imgLi = $(".carousel .img li"),
        num = $(".carousel .num"),
        btnL = $(".carousel .left"),
        btnR = $(".carousel .right");
    var size = imgLi.size(),
        speed = 3000,
        i = 0;
    for (var n = 1; n <= size; n++) {
        var li = "<li>" + n + "</li>";
        num.append(li);
    }
    var numLi = $(".carousel .num li");
    imgLi.eq(0).show();
    numLi.eq(0).addClass('active');

    //数字
    numLi.mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        i = index;
        imgLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
    });

    //定时器
    var time = setInterval(moveR, speed);

    //清除定时器
    main.hover(function () {
        clearInterval(time);
    }, function () {
        time = setInterval(moveR, speed);
    });

    //按钮
    btnL.click(function () {
        moveL();
    });
    btnR.click(function () {
        moveR();
    });

    //左
    function moveL() {
        i--;
        if (i == -1) {
            i = size - 1;
        }
        numLi.eq(i).addClass('active').siblings().removeClass('active');
        imgLi.eq(i).fadeIn().siblings().fadeOut();
    }

    //右
    function moveR() {
        i++;
        if (i == size) {
            i = 0;
        }
        numLi.eq(i).addClass('active').siblings().removeClass('active');
        imgLi.eq(i).fadeIn().siblings().fadeOut();
    }
});

$(function () {
    //初始化
    var main = $(".carousel1"),
        imgLi = $(".carousel1 .img1 li"),
        num = $(".carousel1 .num"),
        btnL = $(".carousel1 .left"),
        btnR = $(".carousel1 .right");
    var size = imgLi.size(),
        speed = 5000,
        i = 0;
    for (var n = 1; n <= size; n++) {
        var li = "<li>" + n + "</li>";
        num.append(li);
    }
    var numLi = $(".carousel1 .num li");
    imgLi.eq(0).show();
    numLi.eq(0).addClass('active');

    //数字
    numLi.mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        i = index;
        imgLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
    });

    //定时器
    var time = setInterval(moveR, speed);

    //清除定时器
    main.hover(function () {
        clearInterval(time);
    }, function () {
        time = setInterval(moveR, speed);
    });

    //按钮
    btnL.click(function () {
        moveL();
    });
    btnR.click(function () {
        moveR();
    });

    //左
    function moveL() {
        i--;
        if (i == -1) {
            i = size - 1;
        }
        numLi.eq(i).addClass('active').siblings().removeClass('active');
        imgLi.eq(i).fadeIn().siblings().fadeOut();
    }

    //右
    function moveR() {
        i++;
        if (i == size) {
            i = 0;
        }
        numLi.eq(i).addClass('active').siblings().removeClass('active');
        imgLi.eq(i).fadeIn().siblings().fadeOut();
    }
});

/*成功案例切换*/
$(function() {
	$(".tab .case_tab").first().addClass("active");
	$(".tabs .bot").first().show();
	$(".tab .case_tab").mouseover(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".tabs .bot").eq(index).show().siblings().hide();
	});
});

/*首页移民百科切换*/
$(function() {
	$(".country .country_tab").first().addClass("active");
	$(".ency_bot .ency_tab").first().show();
	$(".country .country_tab").mouseover(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".ency_bot .ency_tab").eq(index).show().siblings().hide();
	});
});

/*移民百科二级页面*/
$(function() {
    $(".notice-tit .notice_tab").first().addClass("select");
    $(".notice-con .mod").first().show();
    $(".notice-tit .notice_tab").mouseover(function(){
        $(this).addClass("select").siblings().removeClass("select");
        var index = $(this).index();
        $(".notice-con .mod").eq(index).show().siblings().hide();
    });
});

/*金牌项目左侧导航*/
$(document).ready(function(){
    $(".menu_tit span").addClass('xia');
    $(".menu_tit0").click(function(){
        $(this).find("span").toggleClass('shang');
        $(this).parent(".left").find(".menu_con0").slideToggle(500);
    });
    $(".menu_tit1").click(function(){
        $(this).find("span").toggleClass('shang');
        $(this).parent(".left").find(".menu_con1").slideToggle(500);
    });
    $(".menu_tit2").click(function(){
        $(this).find("span").toggleClass('shang');
        $(this).parent(".left").find(".menu_con2").slideToggle(500);
    });
    $(".menu_tit3").click(function(){
        $(this).find("span").toggleClass('shang');
        $(this).parent(".left").find(".menu_con3").slideToggle(500);
    });
    
});
/*金牌项目二级切换*/
$(function() {
    $(".left .tab-item").first().addClass("active");
    $(".right .tab-show").first().show();
    $(".left .tab-item").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index(".tab-item");
        $(".right .tab-show").eq(index).show().siblings().hide();
        $(".right .tab-show").eq(index).find(".type .type3").first().addClass('type2').siblings().removeClass('type2');
    });
    $(".tab-show").each(function(){
        $(this).find(".type .type3").first().addClass('type2');
        $(this).find(".sec_tabs .picture").first().show();
    });
    // $(".sec_tab .sec_tit").first().addClass('on');
    // $(".sec_tabs .sec_con").first().show();
    $(".type .type3").click(function(){
        $(this).addClass("type2").siblings().removeClass("type2");
        var num = $(this).index();
        // alert(num);
        //console.log(num);
        $(this).parent(".type").next(".sec_tabs").find(".picture").eq(num).show().siblings().hide();
        // $(".sec_tabs .sec_con").eq(num).show().siblings().hide();
    });
});

/*移民百科三级页面左侧导航*/
$(document).ready(function($) {
    $(".menu_head span").addClass('xia');
    $(".menu_head").click(function(){
        $(this).find("span").toggleClass('shang');
        $(this).parent(".menu_con").find(".menu_style").slideToggle(500);
    });
});

/*金牌项目二级页面*/
$(document).ready(function() {
    $(".pro_box_menu .menu").first().addClass('on');
    $(".pro_box_con .con").first().show();
    $(".pro_box_menu .menu").mouseenter(function() {
        $(this).addClass('on').siblings().removeClass('on');
        var index = $(this).index();
        $(".pro_box_con .con").eq(index).show().siblings().hide();
    });
});

/*金牌顾问*/
$(document).ready(function() {
    $(".adviser_box .service").hover(function(){
        $(this).find(".adviser_detail").fadeIn();
    },function(){
        $(this).find(".adviser_detail").fadeOut();
    });
});
/*金牌顾问*/
$(function(){

addHover();

width();

});

function addHover(){

					$('.fhm-c-list').find('.fhm-cl-li').hover(function(e) {

						clearInterval(timer);

						$(this).siblings().stop().fadeTo(100,1);

						

							$(this).find('.fhm-cl-b a').css({

								'color':'rgba(255,255,255,1)'

							});
							
							$(this).find('.fhm-cl-b p').css({

								'color':'rgba(85,85,85,1)'

							});


						

						$(this).find('.fhm-cl-b li:last-child a').animate(

								{backgroundPosition:"(8px -34px)"},

								{duration:300}

							);

						$(this).find('.fhm-cl-b li:first-child a').animate(

								{backgroundPosition:"(8px -30px)"},

								{duration:300}

							);

							//alert(0);

						var xl = $(this).offset().left;

						var xr =$(window).width()-(xl+151);

						if(xl>xr){

							$(this).children('.fhm-cl-p').css({

								

								'display':'block'

							})

						}else{

							$(this).children('.fhm-cl-p').css({

								

								'display':'block'

							})

						}

					},function(){

						$(this).siblings().stop().fadeTo(100,1);

						$(this).children('.fhm-cl-p').css({

							'display':'none'

						});

							

						$(this).find('.fhm-cl-b p').css({

								'color':'rgba(85,85,85,1)'

						});
						$(this).find('.fhm-cl-b a').css({

								'color':'rgba(255,255,255,1)'

						});

						$(this).find('.fhm-cl-b a.cur').css({

								'color':'#dbdee1'

						});

							

						

					

							

						

						$(this).find('.fhm-cl-b li:last-child a').animate(

								{backgroundPosition:"(8px 8px)"},

								{duration:300}

							);

						$(this).find('.fhm-cl-b li:first-child a').animate(

								{backgroundPosition:"(8px 8px)"},

								{duration:300}

							);

					});

					$('.fhm-a-t').mouseover(function(){

							$(this).addClass('fhm-a-cur');

							$(this).parent().siblings().children('.fhm-a-t').removeClass('fhm-a-cur');

							var index = $(this).parent().index();

							$('.fhm-c-list').eq(index).addClass('dbk');;

							$('.fhm-c-list').eq(index).siblings().removeClass('dbk');

					});

		

		

	

};



function width(){

			var index = $('.fhm-c-list').length;
			

			for(var i = 0 ; i < index ; i++){

				$('.fhm-c-list').eq(i).children('.fhm-cl-ul').append($('.fhm-c-list').eq(i).find('.fhm-cl-li:lt(7)').clone(true));

				var length = $('.fhm-c-list').eq(i).find('.fhm-cl-li').length;

				$('.fhm-c-list').eq(i).children('.fhm-cl-ul').width(length*180)+'px';

			timer(i)	

		};

};



function timer(h){

		var width = $('.fhm-c-list').eq(h).children('.fhm-cl-ul').width()-1331;
		

		var timer = null,

			num = 0,

			gun = -1,

			myFn = function(){

			num+=gun;

			if(num < - width){

				num = 0;

			}else if(num > width){

				num = -width;

			}

			$('.fhm-c-list').eq(h).children('.fhm-cl-ul').css('left',''+num+'px');

		};

		timer = setInterval(myFn,30);

		$('.fhm-corresponding').hover(function(){

			clearInterval(timer);

		},function(){

			timer = setInterval(myFn,30);

		})

}


(function($) {
    $.extend($.fx.step,{
        backgroundPosition: function(fx) {
            if (fx.state === 0 && typeof fx.end == 'string') {
                var start = $.curCSS(fx.elem,'backgroundPosition');
                start = toArray(start);
                fx.start = [start[0],start[2]];
                var end = toArray(fx.end);
                fx.end = [end[0],end[2]];
                fx.unit = [end[1],end[3]];
            }
            var nowPosX = [];
            nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
            nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
            fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
           function toArray(strg){
               strg = strg.replace(/left|top/g,'0px');
               strg = strg.replace(/right|bottom/g,'100%');
               strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
               var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
               return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
           }
        }
    });
})(jQuery);


/*$(document).ready(function() {
    $('.adviser_box .service').hover(function() {
        $(this).siblings().stop().fadeTo(100,0.5);
        var xl = $(this).offset().left;
        var xr =$(window).width()-($(window).width()-1200)/2;
        //debugger;
        if((xr-xl)<390){
            $(this).children('.adviser_detail').css({
                'right':'180px',
                'display':'block'
            });
        }else{
            $(this).children('.adviser_detail').css({
                'left':'180px',
                'display':'block'
            });
        }
    }, function() {
        $(this).siblings().stop().fadeTo(100,1);
        $(this).children('.adviser_detail').css({
            'display':'none'
        });
    });
});*/


/*首页最新活动截取字符串*/
/*$(function() {
    var length = 18;
    var len = 27;
    $(".artical .left h4").each(function(index, el) {
        var str = $(this).text();
        console.log(str);
        if(str.length > length){
            str = str.substring(0,length);
            $(this).text(str+"…");
        }
    });
    $(".campaign .bot_tab_con a").each(function(index, el) {
        var str = $(this).text();
        console.log(str);
        if(str.length > length){
            str = str.substring(0,length);
            $(this).text(str+"…");
        }
    });
    $(".campaign .list_news a").each(function(index, el) {
        var str = $(this).text();
        console.log(str);
        if(str.length > len){
            str = str.substring(0,len);
            $(this).text(str+"…");
        }
    });
});*/

/*list_success页面*/
/*关于联合切换*/
$(function(){
        $(".tit_about div").click(function() {
            $(".tit_about div").eq($(this).index()).siblings()
            $(".container div").hide().eq($(this).index()).show();
        });
    }); 