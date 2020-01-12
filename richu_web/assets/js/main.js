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

//a标签跳转获取参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
}

var scrolling = false; //是否正在滚动
var preTimestamp = 0;
function index() {
  console.log("in index");
  scrolling = true;
  $("html,body").animate(
    //执行动画，让scrollTop变为０
    { scrollTop: 0 },
    500,
    "linear",
    function() {
      setTimeout(() => {
        scrolling = false;
      }, 1000);
    }
  );
  $("body").css("background", "#151515");
  $("body").css("transition", "background-color 0.5s ease-in-out");

  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  var useAutoScrollPage = windowWidth > 639;
  var page = 1;
  var progressTimer;
  // var isFirstLoad = true; // 设为false可停止自动翻页
  var isTimerRunning = false; // 是否正在及时
  var readingTime = 0; // 页面停留时间
  var autoChangePageTime = 10000; // 自动翻页时间（毫秒）
  var timeStep = autoChangePageTime / 100; // 进度条时间间隔

  // 设置进度条宽度
  var progressBtnWidth = $(".i-p-btn").width() + 2;
  $(".circle-bar-left").css(
    "clip",
    "rect(0, " + progressBtnWidth / 2 + "px, auto, 0)"
  );
  $(".circle-bar-right").css(
    "clip",
    "rect(0, auto, auto, " + progressBtnWidth / 2 + "px)"
  );

  function setCurrentPage(currentPage) {
    $(".index-fixed-pagination .i-p-num.current").text("0" + currentPage);
    if (currentPage < 6) {
      $(".index-fixed-pagination").show();
      $("body").css({ overflow: "hidden" });
    } else {
      $(".index-fixed-pagination").hide();
      $("body").css({ overflowY: "auto" });
      // isFirstLoad = false;
      // $(".next-page").addClass("normal-page-button");
      // $(".progress-bg").hide();
      // $(".circle-bar-left").hide();
      // $(".circle-bar-right").hide();
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
  }

  function scrollToPageByIndex(pageIndex) {
    scrolling = true;
    stopAutoChangePage();
    setCurrentPage(pageIndex + 1);
    // console.log("scrollToPageByIndex", pageIndex);
    if ([0, 1, 2, 3, 4].indexOf(pageIndex) !== -1) {
      $(".index-section")
        .eq(pageIndex)
        .addClass("active")
        .siblings(".index-section")
        .removeClass("active");
    } else {
      $(".index-section")
        .eq(0)
        .addClass("active")
        .siblings(".index-section")
        .removeClass("active");
    }
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
          }, 1000);
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
    if (useAutoScrollPage) {
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
          if (nextIndex < 5 && nextIndex >= 0) {
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
  } else {
    $(".index-fixed-pagination").hide();
    $(".index-section").addClass("active");
  }

  $("#toTop").click(function() {
    scrolling = true;
    $("html,body").animate(
      //执行动画，让scrollTop变为０
      { scrollTop: 0 },
      500,
      "linear",
      function() {
        stopAutoChangePage();
        setCurrentPage(1);
        setTimeout(() => {
          scrolling = false;
          if (!isTimerRunning) {
            startPageTimer();
          }
        }, 1000);
      }
    );
  });
}

function about() {
  console.log("in about");
  var windowWidth = $(window).width();
  var stateNum = false;
  // 监听页面滚动
  $(document).scroll(function() {
    var scrollLength = $(document).scrollTop();
    if (windowWidth < 850) {
      var bannerTopHeight = $(".about-top-banner").height() - 60;
      if (scrollLength >= bannerTopHeight) {
        $(".about-tab-container").addClass("tab-fixed-top");
      } else if (scrollLength < bannerTopHeight) {
        $(".about-tab-container").removeClass("tab-fixed-top");
      }
    } else {
      var bannerTopHeight = $(".about-top-banner").height() - 60;
      if (scrollLength >= bannerTopHeight) {
        $(".header").addClass("fixed-top");
        $(".about-tab-container").addClass("tab-fixed-top-pc");
      } else if (scrollLength < bannerTopHeight) {
        $(".header").removeClass("fixed-top");
        $(".about-tab-container").removeClass("tab-fixed-top-pc");
      }
    }
    if (scrollLength > bannerTopHeight / 2 && !stateNum) {
      stateNum = true;
      loadingNumber();
    }
  });

  // 动态数字
  function loadingNumber() {
    $.fn.countTo = function(options) {
      options = options || {};

      return $(this).each(function() {
        // set options for current element
        var settings = $.extend(
          {},
          $.fn.countTo.defaults,
          {
            from: $(this).data("from"),
            to: $(this).data("to"),
            speed: $(this).data("speed"),
            refreshInterval: $(this).data("refresh-interval"),
            decimals: $(this).data("decimals")
          },
          options
        );

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;

        // references & variables that will change with each update
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data("countTo") || {};

        $self.data("countTo", data);

        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // initialize the element with the starting value
        render(value);

        function updateTimer() {
          value += increment;
          loopCount++;

          render(value);

          if (typeof settings.onUpdate == "function") {
            settings.onUpdate.call(self, value);
          }

          if (loopCount >= loops) {
            // remove the interval
            $self.removeData("countTo");
            clearInterval(data.interval);
            value = settings.to;

            if (typeof settings.onComplete == "function") {
              settings.onComplete.call(self, value);
            }
          }
        }

        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };

    $.fn.countTo.defaults = {
      from: 0, // the number the element should start at
      to: 0, // the number the element should end at
      speed: 1000, // how long it should take to count between the target numbers
      refreshInterval: 100, // how often the element should be updated
      decimals: 0, // the number of decimal places to show
      formatter: formatter, // handler for formatting the value before rendering
      onUpdate: null, // callback method for every time the element is updated
      onComplete: null // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }

    // custom formatting example
    $(".count-number").data("countToOptions", {
      formatter: function(value, options) {
        return value
          .toFixed(options.decimals)
          .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
      }
    });

    // start all the timers
    $(".timer").each(count);

    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
    }
  }

  // 标签页选择
  $(".about-tab-container").on("click", ".a-tab-item", function(event) {
    event.preventDefault();
    var sectionId = $(this).attr("data-id");
    var sectionOffsetTop = $("#" + sectionId).offset().top;
    $(this).addClass("active");
    $(this)
      .siblings(".a-tab-item")
      .removeClass("active");
    scrolling = true;
    $("html,body").animate(
      { scrollTop: sectionOffsetTop - 110 },
      500,
      "linear",
      function() {
        setTimeout(() => {
          scrolling = false;
        }, 1000);
      }
    );
  });
}

function project() {
  console.log("in project");
  var windowWidth = $(window).width();
  var bannerTopHeight = $(".project-top-banner").height() - 60;
  // 监听页面滚动
  $(document).scroll(function() {
    var scrollLength = $(document).scrollTop();
    if (windowWidth < 850) {
      if (scrollLength >= bannerTopHeight) {
        $(".project-tab").addClass("tab-fixed-top");
      } else if (scrollLength < bannerTopHeight) {
        $(".project-tab").removeClass("tab-fixed-top");
      }
    } else {
      if (scrollLength >= bannerTopHeight) {
        $(".header").addClass("fixed-top");
        $(".project-tab").addClass("tab-fixed-top-pc");
      } else if (scrollLength < bannerTopHeight) {
        $(".header").removeClass("fixed-top");
        $(".project-tab").removeClass("tab-fixed-top-pc");
      }
    }
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
    // 过滤产品
    var productList = $(this)
      .parent()
      .parent()
      .parent()
      .siblings(".fx-project-wrap")
      .find(".sq-item");
    if (selectedValue === "全部") {
      productList.show();
    } else {
      productList.each(function() {
        if ($(this).attr("data-value") === selectedValue) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
    $(".fx-project-detail-window").fadeOut();
    $(".fx-project-wrap .sq-item").removeClass("active");
    $(".fx-project-detail-window").removeClass("active");
  });
  // 关闭分类选择
  $(document).click(function() {
    $(".rc-proj-select-container").hide();
  });
  $(".rc-proj-select-container").click(function(event) {
    event.stopPropagation();
  });

  // 产品选择
  $(".fx-project-wrap").on("mouseenter", ".sq-item", function(event) {
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
  var windowWidth = $(window).width();
  // 监听页面滚动
  $(document).scroll(function() {
    var scrollLength = $(document).scrollTop();
    if (windowWidth < 850) {
      var bannerTopHeight = $(".about-top-banner").height() - 60;
      if (scrollLength >= bannerTopHeight) {
        $(".culture-tab").addClass("tab-fixed-top");
      } else if (scrollLength < bannerTopHeight) {
        $(".culture-tab").removeClass("tab-fixed-top");
      }
    } else {
      var bannerTopHeight = $(".about-top-banner").height() - 60;
      if (scrollLength >= bannerTopHeight) {
        $(".header").addClass("fixed-top");
        $(".culture-tab").addClass("tab-fixed-top-pc");
      } else if (scrollLength < bannerTopHeight) {
        $(".header").removeClass("fixed-top");
        $(".culture-tab").removeClass("tab-fixed-top-pc");
      }
    }
  });

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

  // 搜索框聚焦样式
  $("#searchInput").focus(function() {
    $("#searchInput")
      .parent()
      .addClass("active");
  });
  $("#searchInput").blur(function() {
    $("#searchInput")
      .parent()
      .removeClass("active");
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
    // 过滤产品
    var productList = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .siblings(".fx-project-wrap")
      .find(".sq-item");
    if (selectedValue === "全部") {
      productList.show();
    } else {
      productList.each(function() {
        if ($(this).attr("data-value") === selectedValue) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
    $(".fx-project-detail-window").fadeOut();
    $(".fx-project-wrap .sq-item").removeClass("active");
    $(".fx-project-detail-window").removeClass("active");
  });
  // 关闭分类选择
  $(document).click(function() {
    $(".rc-proj-select-container").hide();
  });
  $(".rc-proj-select-container").click(function(event) {
    event.stopPropagation();
  });

  // 产品选择
  $(".fx-project-wrap").on("mouseenter", ".sq-item", function(event) {
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
  var pageName = $("body").attr("name");
  // 监听页面滚动
  // $(document).scroll(function() {
  //   var scrollLength = $(document).scrollTop();
  //   if (pageName !== "copyright") {
  //     if (scrollLength >= 90) {
  //       $(".header").addClass("fixed-top");
  //     } else if (scrollLength < 90) {
  //       $(".header").removeClass("fixed-top");
  //     }
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
  if (pageName !== "index") {
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
          }, 1000);
        }
      );
    });
  }

  // 分享
  window._bd_share_config = {
    common: {
      bdSnsKey: {},
      bdText: "",
      bdMini: "2",
      bdMiniList: false,
      bdPic: "",
      bdStyle: "0",
      bdSize: "16"
    },
    share: {}
  };
  with (document)
    (0)[
      ((getElementsByTagName("head")[0] || body).appendChild(
        createElement("script")
      ).src =
        "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" +
        ~(-new Date() / 36e5))
    ];
}
