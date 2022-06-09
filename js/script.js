$(document).ready(function () {
  // let oldValue = 0;
  let siteHeader = $(".site-header");
  // let siteHeaderHeight = siteHeader.height();
  // console.log(siteHeaderHeight);
  $(window).scroll(function (e) {
    //navbar shrink
    if ($(document).scrollTop() > 50) {
      $(".site-header").addClass("box-shadow");
    } else {
      $(".site-header").removeClass("box-shadow");
    }

    // Scroll Top fade in out
    if ($(document).scrollTop() > 200) {
      $(".scroll-to-top-button").addClass("scroll-to-top-button--show");
    } else {
      $(".scroll-to-top-button").removeClass("scroll-to-top-button--show");
    }

    // if ($(document).scrollTop() > 200) {
    //   // Get the new Value
    //   newValue = window.pageYOffset;

    //   //Subtract the two and conclude
    //   if (oldValue - newValue < 0) {
    //     siteHeader.addClass("site-header--shrinked");
    //   } else if (oldValue - newValue > 0) {
    //     siteHeader.removeClass("site-header--shrinked");
    //   }

    //   // Update the old value
    //   oldValue = newValue;
    // }
  });

  // Header Mobile Nav Dropdown Menu
  var navLinks = $(".site-header__mobile-nav > ul li a");
  navLinks.each(function () {
    $(this).next().first().slideUp(0);
  });
  navLinks.each(function () {
    $(this).on("click", function () {
      if ($(this).hasClass("has-dropdown")) {
        $(this).parent().siblings().find("ul").slideUp(300);
        $(this).parent().siblings().find("i").removeClass("fa-minus").addClass("fa-plus");
        $(this).next().first().slideToggle(300);
        if ($(this).find("i").hasClass("fa-plus")) {
          $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
        } else {
          $(this).find("i").removeClass("fa-minus").addClass("fa-plus");
        }
      }
    });
  });

  // datepicker initialization
  $("#sfDatepicker").datepicker();
  $("#sfgDatepicker").datepicker();

  /*  Header Dropdown menu
  $("select").niceSelect();
  */

  // All select inputs initialization
  //Global Search Form select inputs
  $("#ateSelectCourse").select2({
    theme: "bootstrap-5",
  });

  $("#ateSelectCollege").select2({
    theme: "bootstrap-5",
  });

  // College Lisiting page select inputs
  $("#collegeLisitngSelectCourse").select2({
    theme: "bootstrap-5",
  });
  $("#collegeLisitngSelectCity").select2({
    theme: "bootstrap-5",
  });

  // College Single select input
  $("#collegeSingleSelectCourse").select2({
    theme: "bootstrap-5",
  });

  //Click event to scroll to top
  $(".scroll-to-top-button").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  // adding active class to nav links as per page
  var url = window.location.pathname,
    urlRegExp = new RegExp(url == "/" ? window.location.origin + "/?$" : url.replace(/\/$/, ""));
  // now grab every link from the navigation
  $(".site-header nav ul li a").each(function () {
    // and test its normalized href against the url pathname regexp
    if (urlRegExp.test(this.href.replace(/\/$/, ""))) {
      $(this).addClass("active");
    }
  });

  // show password button function
  var showPasswordButtons = $(".form .button--show-password");
  var showPassFlag = false;
  showPasswordButtons.each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      if (!showPassFlag) {
        $(this).siblings("input").attr("type", "text");
        $(this).find("i").removeClass("bi-eye").addClass("bi-eye-slash");
        showPassFlag = true;
      } else {
        $(this).siblings("input").attr("type", "password");
        $(this).find("i").removeClass("bi-eye-slash").addClass("bi-eye");
        showPassFlag = false;
      }
    });
  });

  //Form material label control
  var formInputs = $(".form__input");
  formInputs.each(function () {
    $(this).on("focus", function () {
      $(this).prev().addClass("anim-label--shrinked");
    });
    $(this).on("blur", function () {
      if ($(this).val().length === 0) $(this).prev().removeClass("anim-label--shrinked");
    });
  });
  // quanity increment and decrement funciton
  $(".qtyplus").each(function () {
    // Get the field name
    $(this).on("click", function () {
      fieldName = $(this).attr("field");
      // Get its current value
      var currentVal = parseInt($("input[name=" + fieldName + "]").val());
      // If is not undefined
      if (!isNaN(currentVal)) {
        // Increment
        $("input[name=" + fieldName + "]").val(currentVal + 1);
      } else {
        // Otherwise put a 0 there
        $("input[name=" + fieldName + "]").val(0);
      }
    });
  });
  $(".qtyminus").each(function (index, el) {
    $(this).on("click", function () {
      // Get the field name
      fieldName = $(this).attr("field");
      // Get its current value
      var currentVal = parseInt($("input[name=" + fieldName + "]").val());
      // If it isn't undefined or its greater than 0
      if (!isNaN(currentVal) && currentVal > 0) {
        // Decrement one
        $("input[name=" + fieldName + "]").val(currentVal - 1);
      } else {
        // Otherwise put a 0 there
        $("input[name=" + fieldName + "]").val(0);
      }
    });
  });
  //notification toast function for global
  function notificationToastUpdate(msgtype, msg) {
    var toastEl = $("#liveToast");
    var toastStatusHighlighter = toastEl.find(".status-highlighter");
    toastEl.find(".toast-body__text").html(msg);
    if (msgtype === "success") {
      toastEl.find(".toast-body").addClass("text-success");
      toastEl.find(".toast-body__icon").html(`<i class="bi bi-check-circle-fill"></i>`);
      toastStatusHighlighter.addClass("bg-success");
    }
    if (msgtype === "error") {
      toastEl.find(".toast-body").addClass("text-danger");
      toastEl.find(".toast-body__icon").html(`<i class="bi bi-x-circle-fill"></i>`);
      toastStatusHighlighter.addClass("bg-danger");
    }
    if (msgtype === "info") {
      toastEl.find(".toast-body").addClass("text-info");
      toastEl.find(".toast-body__icon").html(`<i class="bi bi-x-circle-fill"></i>`);
      toastStatusHighlighter.addClass("bg-info");
    }
    toastEl.toast("show");
    toastStatusHighlighter.animate(
      {
        width: "100%",
      },
      4900
    );
    setTimeout(function () {
      toastStatusHighlighter.animate(
        {
          width: "0%",
        },
        0
      );

      if (msgtype === "error") {
        toastStatusHighlighter.removeClass("bg-danger");
      } else {
        toastStatusHighlighter.removeClass(`bg-${msgtype}`);
      }
    }, 4900);
  }
  // counter homepage
  $(".counter").counterUp({
    delay: 10,
    time: 1000,
  });

  // Add address on cart page
  $(".address-container__button--add-adress").on("click", function () {
    console.log("clicked");
    $("body").addClass("bg-overlay");
  });
  var addAddressOffCanvas = $("#addAddressOffCanvas");
  addAddressOffCanvas.on("hidden.bs.offcanvas", function () {
    $("body").removeClass("bg-overlay");
  });
  // hero section swiper
  var swiperHeroSlider = new Swiper(".hero-slider", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderCustom: function (swiper, current, total) {
        var names = [];
        $(".swiper-wrapper .swiper-slide").each(function (i) {
          names.push($(this).data("name"));
        });
        var text = "<ul>";
        for (let i = 1; i <= total; i++) {
          if (current == i) {
            text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
          } else {
            text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
          }
        }
        text += "</ul>";
        return text;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // All packages sliders content
  var breakpointsDetails = {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    // when window width is >= 480px
    576: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
  };
  var paginationStructure = {
    el: ".swiper-pagination",
    clickable: true,
    renderCustom: function (swiper, current, total) {
      var names = [];
      $(".swiper-wrapper .swiper-slide").each(function (i) {
        names.push($(this).data("name"));
      });
      var text = "<ul>";
      for (let i = 1; i <= total; i++) {
        if (current == i) {
          text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
        } else {
          text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
        }
      }
      text += "</ul>";
      return text;
    },
  };
  var navigationArrowsHtml = {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  };
  var slider1 = new Swiper(".slider-1", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    breakpoints: breakpointsDetails,
    // If we need pagination
    pagination: paginationStructure,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-1",
      prevEl: ".swiper-button-prev-1",
    },
  });

  var slider2 = new Swiper(".slider-2", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    breakpoints: breakpointsDetails,
    // If we need pagination
    pagination: paginationStructure,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-2",
      prevEl: ".swiper-button-prev-2",
    },
  });

  var slider3 = new Swiper(".slider-3", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    breakpoints: breakpointsDetails,
    // If we need pagination
    pagination: paginationStructure,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-3",
      prevEl: ".swiper-button-prev-3",
    },
  });

  var slider4 = new Swiper(".slider-4", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    breakpoints: breakpointsDetails,
    // If we need pagination
    pagination: paginationStructure,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-4",
      prevEl: ".swiper-button-prev-4",
    },
  });

  var slider5 = new Swiper(".slider-5", {
    // Optional parameters
    direction: "horizontal",
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    breakpoints: breakpointsDetails,
    // If we need pagination
    pagination: paginationStructure,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-5",
      prevEl: ".swiper-button-prev-5",
    },
  });

  // Testimonial Swiper
  var swiperTestimonial = new Swiper(".swiper-testimonial", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderCustom: function (swiper, current, total) {
        var names = [];
        $(".swiper-wrapper .swiper-slide").each(function (i) {
          names.push($(this).data("name"));
        });
        var text = "<ul>";
        for (let i = 1; i <= total; i++) {
          if (current == i) {
            text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
          } else {
            text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
          }
        }
        text += "</ul>";
        return text;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next--testimonial",
      prevEl: ".swiper-button-prev--testimonial",
    },
  });
  //Trending swiper
  var swiperTrending = new Swiper(".swiper-announement", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderCustom: function (swiper, current, total) {
        var names = [];
        $(".swiper-wrapper .swiper-slide").each(function (i) {
          names.push($(this).data("name"));
        });
        var text = "<ul>";
        for (let i = 1; i <= total; i++) {
          if (current == i) {
            text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
          } else {
            text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
          }
        }
        text += "</ul>";
        return text;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next--announcement",
      prevEl: ".swiper-button-prev--announcement",
    },
  });

  // Products Page sub category dropdown menu
  var catItemExpandBtns = $(".category-filter-list .category-filter__item .item__button--expand");

  catItemExpandBtns.each(function () {
    $(this).parent().next().slideUp(0);
    $(this).on("click", function () {
      if (!$(this).hasClass("expanded")) {
        $(".category-filter-list .category-filter__item .item__dropdown-menu").slideUp();
        $(".category-filter-list .category-filter__item .item__button--expand").removeClass("expanded");
        $(this).addClass("expanded");
        $(this).parent().next().slideDown();
      } else {
        $(this).removeClass("expanded");
        $(this).parent().next().slideUp();
      }
    });
  });
  var checkboxes = $(".category-filter__item input.subOption"),
    checkall = $(".category-filter__item .mainOption");

  checkall.each(function () {
    var checkedFlag = false;
    $(this).on("click", function () {
      if (!checkedFlag) {
        $(this).prop("checked", true);
        $(this).parent().parent().find(".subOption").prop("checked", true);
        checkedFlag = true;
      } else {
        $(this).prop("checked", false);
        $(this).parent().parent().find(".subOption").prop("checked", false);
        checkedFlag = false;
      }
    });
  });

  $("#slider-range").slider({
    range: true,
    orientation: "horizontal",
    min: 0,
    max: 10000,
    values: [0, 10000],
    step: 100,

    slide: function (event, ui) {
      if (ui.values[0] == ui.values[1]) {
        return false;
      }

      $("#min_price").val(ui.values[0]);
      $("#max_price").val(ui.values[1]);
    },
  });
  $("#slider-range-2").slider({
    range: true,
    orientation: "horizontal",
    min: 0,
    max: 10000,
    values: [0, 10000],
    step: 100,

    slide: function (event, ui) {
      if (ui.values[0] == ui.values[1]) {
        return false;
      }

      $("#min_price_2").val(ui.values[0]);
      $("#max_price_2").val(ui.values[1]);
    },
  });

  // Product single page accordion & Faqs page accordion
  $(".set > a").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).siblings(".content").slideUp(200);
      $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
    } else {
      $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
      $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $(".content").slideUp(200);
      $(this).siblings(".content").slideDown(200);
    }
  });

  // announcement section slider filter tab
  var newsTabLinks = $(".announcement-section .tab-nav .tab-nav__item .tab-nav__item--link");
  var newsSlides = $(".announcement-section .swiper .swiper-slide");

  newsTabLinks.each(function () {
    $(this).on("click", function () {
      $(".announcement-section .tab-nav .tab-nav__item .tab-nav__item--link").removeClass("active");
      $(this).addClass("active");

      var getDataTargetVal = $(this).attr("data-target");

      if (getDataTargetVal == "all") {
        $("[data-category]").removeClass("non-swiper-slide").addClass("swiper-slide").show();
        swiper.destroy();
        swiper = new Swiper(".swiper-announement", {
          direction: "horizontal",
          loop: true,
          autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          },
          // If we need pagination
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderCustom: function (swiper, current, total) {
              var names = [];
              $(".swiper-wrapper .swiper-slide").each(function (i) {
                names.push($(this).data("name"));
              });
              var text = "<ul>";
              for (let i = 1; i <= total; i++) {
                if (current == i) {
                  text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
                } else {
                  text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
                }
              }
              text += "</ul>";
              return text;
            },
          },

          // Navigation arrows
          navigation: {
            nextEl: ".swiper-button-next--announcement",
            prevEl: ".swiper-button-prev--announcement",
          },
        });
      } else {
        $(".swiper-announement .swiper-slide")
          .not("[data-category='" + getDataTargetVal + "']")
          .addClass("non-swiper-slide")
          .removeClass("swiper-slide")
          .hide();
        $("[data-category='" + getDataTargetVal + "']")
          .removeClass("non-swiper-slide")
          .addClass("swiper-slide")
          .attr("style", null)
          .show();

        swiper.destroy();
        swiper = new Swiper(".swiper-announement", {
          direction: "horizontal",
          loop: true,
          autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          },
          // If we need pagination
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderCustom: function (swiper, current, total) {
              var names = [];
              $(".swiper-wrapper .swiper-slide").each(function (i) {
                names.push($(this).data("name"));
              });
              var text = "<ul>";
              for (let i = 1; i <= total; i++) {
                if (current == i) {
                  text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
                } else {
                  text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
                }
              }
              text += "</ul>";
              return text;
            },
          },

          // Navigation arrows
          navigation: {
            nextEl: ".swiper-button-next--announcement",
            prevEl: ".swiper-button-prev--announcement",
          },
        });
      }
    });
  });

  // Colleges Lisiting view per column
  var collegesListingViewBtns = $(".colleges-listing__button--grid-view");
  var collegesListingItemContainer = $(".colleges-listing-section .college-item-container");
  collegesListingViewBtns.each(function () {
    $(this).on("click", function () {
      $(".colleges-listing__button--grid-view").removeClass('active');
      $(this).addClass('active');
      var getGridVal = $(this).attr("data-grid");
      if (getGridVal == 3) {
        console.log("3 items per row");
        collegesListingItemContainer.each(function () {
          $(this).removeClass("col-xl-3").addClass("col-xl-4 items-grid-view-3");
        });
      } else {
        collegesListingItemContainer.each(function () {
          $(this).removeClass("col-xl-4 items-grid-view-3").addClass("col-xl-3");
        });
      }
    });
  });
});
