$(function() {
  var pageName = $("body").attr("name");
  switch (pageName) {
    case "index":
      index();
      break;
    case "about":
      about();
      break;
    case "project":
      project();
      break;
    case "culture":
      culture();
      break;
    case "news":
      news();
      break;
    case "contact":
      contact();
      break;
    case "search":
      search();
      break;

    default:
      funDefault();
      break;
  }
  funDefault();
});

var scrolling = false; //是否正在滚动
var preTimestamp = 0;
function index() {
  console.log("in index");
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  var useAutoScrollPage = windowWidth > 639;
  var page = 1;
  var progressTimer;
  var isFirstLoad = true; // 设为false可停止自动翻页
  var isTimerRunning = false; // 是否正在及时
  var readingTime = 0; // 页面停留时间
  var autoChangePageTime = 10000; // 自动翻页时间（毫秒）
  var timeStep = autoChangePageTime / 100; // 进度条时间间隔

  function setCurrentPage(currentPage) {
    $(".index-fixed-pagination .i-p-num.current").text("0" + currentPage);
    if (currentPage < 6) {
      $(".index-fixed-pagination").show();
      $("body").css({ overflow: "hidden" });
    } else {
      $(".index-fixed-pagination").hide();
      $("body").css({ overflow: "auto" });
      isFirstLoad = false;
      $(".next-page").addClass("normal-page-button");
      $(".progress-bg").hide();
      $(".circle-bar-left").hide();
      $(".circle-bar-right").hide();
    }
  }

  function stopAutoChangePage() {
    if (progressTimer) {
      readingTime = 0;
      clearInterval(progressTimer);
      isTimerRunning = false;
    }
    $(".circle-bar-right").css({
      transform: "rotate(0deg)",
      "border-color": "#fff"
    });
    $(".circle-bar-left").css({
      transform: "rotate(0deg)",
      "border-color": "#fff"
    });
    if (!isFirstLoad) {
      $(".next-page").addClass("normal-page-button");
      $(".progress-bg").hide();
      $(".circle-bar-left").hide();
      $(".circle-bar-right").hide();
    }
  }

  function scrollToPageByIndex(pageIndex) {
    scrolling = true;
    stopAutoChangePage();
    setCurrentPage(pageIndex + 1);
    // console.log("scrollToPageByIndex", pageIndex);
    $("html,body")
      .stop(true)
      .animate(
        { scrollTop: pageIndex * windowHeight },
        600,
        "swing",
        function() {
          setTimeout(() => {
            scrolling = false;
            // console.log("finish---", pageIndex);
            if (!isTimerRunning) {
              startPageTimer();
            }
          }, 100);
        }
      );
  }

  function renderProgress(percent) {
    var baseColor = $(".progress-bg").css("border-color");
    if (percent <= 50) {
      $(".circle-bar-right").css(
        "transform",
        "rotate(" + percent * 3.6 + "deg)"
      );
    } else {
      $(".circle-bar-right").css({
        transform: "rotate(0deg)",
        "border-color": baseColor
      });
      $(".circle-bar-left").css(
        "transform",
        "rotate(" + (percent - 50) * 3.6 + "deg)"
      );
    }
  }

  // 翻页计时器
  function myTimer() {
    readingTime += timeStep;
    renderProgress(Math.round((readingTime / autoChangePageTime) * 100));
    if (readingTime >= autoChangePageTime) {
      page = $(".index-fixed-pagination .i-p-num.current").text() * 1;
      if ([1, 2, 3, 4, 5].indexOf(page) !== -1 && !scrolling) {
        scrollToPageByIndex(page);
      }
    }
  }

  // 启动倒计时
  startPageTimer();
  function startPageTimer() {
    if (isFirstLoad && useAutoScrollPage) {
      isTimerRunning = true;
      // console.log("启动倒计时", readingTime);
      progressTimer = setInterval(function() {
        myTimer();
      }, timeStep);
    } else {
      stopAutoChangePage();
    }
  }

  if (useAutoScrollPage) {
    // 全屏翻页
    $(".i-p-btn-group").on("click", ".last-page", function(event) {
      event.preventDefault();
      page = $(".index-fixed-pagination .i-p-num.current").text() * 1;
      if ([2, 3, 4, 5].indexOf(page) !== -1 && !scrolling) {
        scrollToPageByIndex(page - 2);
      }
    });
    $(".i-p-btn-group").on("click", ".next-page", function(event) {
      event.preventDefault();
      page = $(".index-fixed-pagination .i-p-num.current").text() * 1;
      if ([1, 2, 3, 4, 5].indexOf(page) !== -1 && !scrolling) {
        scrollToPageByIndex(page);
      }
    });

    $("body").css({ overflow: "hidden" });
    $(document).on("mousewheel DOMMouseScroll", function(e) {
      var delta =
        (e.originalEvent.wheelDelta &&
          (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
      if (delta > 0) {
        // 向上滚
        if (!scrolling) {
          var nextIndex =
            $(".index-fixed-pagination .i-p-num.current").text() * 1 - 2;
          // console.log("page scroll up", nextIndex);
          if (nextIndex < 5) {
            scrollToPageByIndex(nextIndex);
          }
        }
      } else if (delta < 0) {
        // 向下滚
        if (!scrolling) {
          var nextIndex =
            $(".index-fixed-pagination .i-p-num.current").text() * 1;
          // console.log("向下滚动", nextIndex);
          if (nextIndex < 6) {
            scrollToPageByIndex(nextIndex);
          }
        }
      }
    });
    // $("body").on("mousewheel", function(event) {
    //   // console.log(event, event.originalEvent.deltaY);
    //   if (event.originalEvent.deltaY > 0) {
    //     if (!scrolling) {
    //       var nextIndex =
    //         $(".index-fixed-pagination .i-p-num.current").text() * 1;
    //       // console.log("向下滚动", nextIndex);
    //       if (nextIndex < 6) {
    //         scrollToPageByIndex(nextIndex);
    //       }
    //     }
    //   } else if (event.originalEvent.deltaY < 0) {
    //     if (!scrolling) {
    //       var nextIndex =
    //         $(".index-fixed-pagination .i-p-num.current").text() * 1 - 2;
    //       // console.log("page scroll up", nextIndex);
    //       if (nextIndex < 5) {
    //         scrollToPageByIndex(nextIndex);
    //       }
    //     }
    //   }
    // });

    // 滚动监听
    // var scrollBefore = 0;
    // var scrollAfter = 0;
    // $(window).scroll(function() {
    //   scrollAfter = $(window).scrollTop();
    //   setTimeout(() => {
    //     if (scrollBefore < scrollAfter) {
    //       if (!scrolling) {
    //         var nextIndex = Math.ceil(scrollAfter / windowHeight);
    //         console.log("向下滚动", scrollAfter, scrollBefore);
    //         if (nextIndex < 6) {
    //           scrollToPageByIndex(nextIndex);
    //         }
    //       }
    //     } else if (scrollBefore > scrollAfter) {
    //       if (!scrolling) {
    //         var nextIndex = Math.floor(scrollAfter / windowHeight);
    //         console.log("page scroll up", scrollAfter, scrollBefore);
    //         if (nextIndex < 5) {
    //           scrollToPageByIndex(nextIndex);
    //         }
    //       }
    //     }

    //     scrollBefore = scrollAfter;
    //   }, 100);
    // });
  } else {
    $(".index-fixed-pagination").hide();
  }
}

function about() {
  console.log("in about");
}

function project() {
  console.log("in project");
  // 行业选择
  $(".project-tab").on("click", ".proj-tab-item", function(event) {
    event.preventDefault();
    var projectIndex = $(this).index();
    $(this).addClass("active");
    $(this)
      .siblings(".proj-tab-item")
      .removeClass("active");
    $(".project-top-banner .banner-item").hide();
    $(".project-top-banner .banner-item")
      .eq(projectIndex)
      .show();
    $(".project-content .proj-content-item").hide();
    $(".project-content .proj-content-item")
      .eq(projectIndex)
      .fadeIn();
  });

  // 公司选择
  $(".content-tab").on("click", ".content-tab-item", function(event) {
    event.preventDefault();
    var companyIndex = $(this).index();
    $(this).addClass("active");
    $(this)
      .siblings(".content-tab-item")
      .removeClass("active");
    $(this)
      .parent()
      .siblings(".content-detail")
      .find(".content-detail-item")
      .hide();
    $(this)
      .parent()
      .siblings(".content-detail")
      .find(".content-detail-item")
      .eq(companyIndex)
      .fadeIn();
  });

  // 分类选择
  $(".rc-proj-select-wrap").on("click", ".btn-cir-green", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var defaultValue = $(this)
      .find(".select-value-text")
      .text();

    $(this)
      .siblings(".rc-proj-select-container")
      .find(".rc-proj-option")
      .each(function() {
        if (
          $(this)
            .text()
            .trim() === defaultValue
        ) {
          $(this).addClass("selected");
          $(this)
            .siblings()
            .removeClass("selected");
        }
      });
    $(this)
      .siblings(".rc-proj-select-container")
      .slideToggle();
  });
  // 选中选项
  $(".rc-proj-select").on("click", ".rc-proj-option", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var selectedValue = $(this).attr("data-value");
    $(this)
      .parent()
      .parent()
      .siblings(".btn-cir-green")
      .find(".select-value-text")
      .text(selectedValue);
    $(this)
      .parent()
      .parent()
      .hide();
  });
  // 关闭分类选择
  $(document).click(function() {
    $(".rc-proj-select-container").hide();
  });
  $(".rc-proj-select-container").click(function(event) {
    event.stopPropagation();
  });

  // 产品选择
  $(".fx-project-wrap").on("click", ".sq-item", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var productIndex = $(this).index();
    $(this).addClass("active");
    $(this)
      .siblings(".sq-item")
      .removeClass("active");
    $(this)
      .parent()
      .siblings(".fx-project-detail-pos")
      .find(".fx-project-detail-window")
      .addClass("active")
      .fadeIn();
    $(this)
      .parent()
      .siblings(".fx-project-detail-pos")
      .find(".proj-win-detail-item")
      .hide();
    $(this)
      .parent()
      .siblings(".fx-project-detail-pos")
      .find(".proj-win-detail-item")
      .eq(productIndex)
      .fadeIn();
  });

  // 关闭产品弹窗
  $(document).click(function() {
    $(".fx-project-detail-window").fadeOut();
    $(".fx-project-wrap .sq-item").removeClass("active");
    $(".fx-project-detail-window").removeClass("active");
  });
  $(".fx-project-detail-window").click(function(event) {
    event.stopPropagation();
  });
}

function culture() {
  console.log("in culture");
  // 模块选择
  $(".culture-tab").on("click", ".culture-tab-item", function(event) {
    event.preventDefault();
    var projectIndex = $(this).index();
    $(this).addClass("active");
    $(this)
      .siblings(".culture-tab-item")
      .removeClass("active");
    $(".culture-content .culture-content-item").hide();
    $(".culture-content .culture-content-item")
      .eq(projectIndex)
      .fadeIn();
  });
}

function news() {
  console.log("in news");
}

function contact() {
  console.log("in contact");
}

function search() {
  console.log("in search");

  // 分类选择
  $(".rc-proj-select-wrap").on("click", ".btn-cir-green", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var defaultValue = $(this)
      .find(".select-value-text")
      .text();

    $(this)
      .siblings(".rc-proj-select-container")
      .find(".rc-proj-option")
      .each(function() {
        if (
          $(this)
            .text()
            .trim() === defaultValue
        ) {
          $(this).addClass("selected");
          $(this)
            .siblings()
            .removeClass("selected");
        }
      });
    $(this)
      .siblings(".rc-proj-select-container")
      .slideToggle();
  });
  // 选中选项
  $(".rc-proj-select").on("click", ".rc-proj-option", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var selectedValue = $(this).attr("data-value");
    $(this)
      .parent()
      .parent()
      .siblings(".btn-cir-green")
      .find(".select-value-text")
      .text(selectedValue);
    $(this)
      .parent()
      .parent()
      .hide();
  });
  // 关闭分类选择
  $(document).click(function() {
    $(".rc-proj-select-container").hide();
  });
  $(".rc-proj-select-container").click(function(event) {
    event.stopPropagation();
  });

  // 产品选择
  $(".fx-project-wrap").on("click", ".sq-item", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var productIndex = $(this).index();
    $(this).addClass("active");
    $(this)
      .siblings(".sq-item")
      .removeClass("active");
    $(this)
      .parent()
      .siblings(".fx-project-detail-pos")
      .find(".fx-project-detail-window")
      .addClass("active")
      .fadeIn();
    $(this)
      .parent()
      .siblings(".fx-project-detail-pos")
      .find(".proj-win-detail-item")
      .hide();
    $(this)
      .parent()
      .siblings(".fx-project-detail-pos")
      .find(".proj-win-detail-item")
      .eq(productIndex)
      .fadeIn();
  });

  // 关闭产品弹窗
  $(document).click(function() {
    $(".fx-project-detail-window").fadeOut();
    $(".fx-project-wrap .sq-item").removeClass("active");
    $(".fx-project-detail-window").removeClass("active");
  });
  $(".fx-project-detail-window").click(function(event) {
    event.stopPropagation();
  });
}

function funDefault() {
  console.log("in funDefault");
  // 监听页面滚动
  // $(document).scroll(function() {
  //   var scrollLength = $(document).scrollTop();
  //   if (scrollLength >= 90) {
  //     $(".header").addClass("fixed-top");
  //   } else if (scrollLength < 90) {
  //     $(".header").removeClass("fixed-top");
  //   }
  // });

  // hamburger
  var forEach = function(t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t))
      for (var c in t)
        Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
    else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
  };
  var hamburgers = document.querySelectorAll(".hamburger");
  if (hamburgers.length > 0) {
    forEach(hamburgers, function(hamburger) {
      hamburger.addEventListener(
        "click",
        function() {
          this.classList.toggle("is-active");
        },
        false
      );
    });
  }

  // phone-icon
  $(".phone-icon").click(function(event) {
    $(".phone-nav").slideToggle(500);
  });

  //返回顶部
  $("#toTop").click(function() {
    scrolling = true;
    $("html,body").animate(
      //执行动画，让scrollTop变为０
      { scrollTop: 0 },
      500,
      "linear",
      function() {
        setTimeout(() => {
          scrolling = false;
        }, 100);
      }
    );
  });

  // 分享
  window._bd_share_config = {
    common: {
      bdText: "慕枫建站",
      bdDesc:
        "慕枫建站平台专业提供高端网站建设,网站设计,企业网站制作,为广大公司客户建立高端品牌网站。",
      bdUrl: "http://pay.mfdemo.cn/",
      bdPic: ""
    },
    share: [
      {
        bdSize: 32
      }
    ],
    selectShare: [
      {
        bdselectMiniList: ["sqq", "tsina", "weixin"]
      }
    ]
  };
  with (document)
    (0)[
      ((getElementsByTagName("head")[0] || body).appendChild(
        createElement("script")
      ).src =
        "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" +
        ~(-new Date() / 36e5))
    ];
}