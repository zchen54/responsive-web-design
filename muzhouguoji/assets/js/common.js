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
$(function () {
  
    //棣栭〉
    (function(){
    		if($('#pic_con')){
    			var l=$('#pic_con li').length;
    			if(l<5){
    				$('.index .project .btn_left,.index .project .btn_right').hide();
    			}
    		}
    })();

    //缇庝箶瑙嗛
    function openVideo(){       
	     var title="瑙嗛鏂伴椈";    
	     var url="/html/player.html";    
	     var Width=$(window).width();    
	     var Height=$(window).height();    
	     var return_Value;    
	     if (document.all&&window.print)    
	     {    
	        return_Value = window.showModalDialog(url,window,"dialogWidth:" + Width + "px;dialogHeight:" + Height + "px;center:yes;status:no;scroll:yes;help:no;");   
	     }else  window.open(url,"","width=" + Width + "px,height=" + Height + "px,resizable=1,scrollbars=1,left=20px,top=20px"); 
	}
  	//寰嬪笀婊氬姩
  	(function(){
  		if($('#lawyer_list').size() > 0){
  			$('#lawyer_list').owlCarousel({
	            items: 3,
	            navigation: true,
	            pagination: false,
	            autoPlay:true,
	            navigationText:["",""],
	            slideSpeed: 1000
	        });
  		}
  	})();
  	//鎴愬姛妗堜緥灞曠ず
  	(function(){
  		if($('.list_lh').size() > 0){
  			$('.list_lh').myScroll({
				speed: 40, //鏁板€艰秺澶э紝閫熷害瓒婃參
				rowHeight: 31 //li鐨勯珮搴�
			});
  		}
  	})();
    

});
var bool = true;
function picScroll(dir){
    var olist;
	if(bool){
		bool= false;
        olist = $('#pic_con');
 		var piw = olist.find("li").width(),
            pleft = parseInt(olist.find('li:eq(1)').css('margin-left').slice(0,-2)),
		    pilength = olist.find("li").length;

		olist.css('width',piw*pilength+"px");
		if(dir =='left'){
			olist.css({"width":piw*(pilength+1)+"px"}).find("li:first").clone().appendTo(olist);
			olist.animate({ "left": -(piw+pleft)+"px"}, 500, function () {
				olist.find("li:first").remove();
				olist.css({ "left": "0px", "width": piw * pilength + "px" });
				bool = true;
			});
		}else if(dir =="right"){
			olist.css({"width":piw*(pilength+1)+"px","left":-(piw+pleft)+"px"});
            olist.find("li:last").clone().prependTo(olist);
            olist.animate({ "left": 0 + "px" }, 500, function () {
                olist.find("li:last").remove();
                olist.css({ "left": "0px", "width": piw * pilength + "px" });
                bool = true;
            });
		}
	}
}
function countryScroll(dir){
    var olist;
	if(bool){
		bool= false;
		olist = $('#country_select'),
        $left = parseInt(olist.css('left').slice(0,-2)),
        aAllWidth = 0;

		olist.find("a").each(function () {
		    aAllWidth = aAllWidth + $(this).outerWidth();
		});

		olist.css('width',aAllWidth+"px");
		if(dir =='left'){
		    var $aFirstWidth = olist.find('a:first').outerWidth();
			olist.css({"width":(aAllWidth+$aFirstWidth)+"px"}).find("a:first").clone().appendTo(olist);
			olist.animate({ "left": (-$aFirstWidth)+"px"}, 500, function () {
				olist.find("a:first").remove();
				olist.css({"left": "0px","width": aAllWidth + "px" });
				bool = true;
			});
		}else if(dir =="right"){
		var $aLastWidth = olist.find("a:last").outerWidth();
			olist.css({"width":(aAllWidth+$aLastWidth)+"px","left":-$aLastWidth+"px"});
            olist.find("a:last").clone().prependTo(olist);
            olist.animate({ "left": 0 + "px" }, 500, function () {
                olist.find("a:last").remove();
                olist.css({ "left": "0px", "width": aAllWidth + "px" });
                bool = true;
            });
		}
	}

}
//鍙充晶鎮诞闅愯棌
$(function(){
    $(".bt").click(function(){
        $(this).siblings(".scrollsidebar .slide_content").slideToggle(0)
        $(this).removeClass("cur")
        $(this).siblings().addClass("cur")
    });
});