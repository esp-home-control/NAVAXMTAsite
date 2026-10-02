(function ($) {
	"use strict";

	/*------------------------------------------------------
  /  Data js
  /------------------------------------------------------*/
	$("[data-bg-image]").each(function () {
		$(this).css(
			"background-image",
			"url(" + $(this).attr("data-bg-image") + ")"
		);
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	$(document).ready(function ($) {
		/*------------------------------------------------------
  	/  Sticky Header
  	/------------------------------------------------------*/
		var lastScrollTop = 0;
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll > 300) {
				$(".tj-header-area.header-sticky").addClass("sticky");
				$(".tj-header-area.header-sticky").removeClass("sticky-out");
			} else if (scroll < lastScrollTop) {
				if (scroll < 500) {
					$(".tj-header-area.header-sticky").addClass("sticky-out");
					$(".tj-header-area.header-sticky").removeClass("sticky");
				}
			} else {
				$(".tj-header-area.header-sticky").removeClass("sticky");
			}

			lastScrollTop = scroll;
		});

		/*------------------------------------------------------
  	/  Hamburger Menu
  	/------------------------------------------------------*/
		$(".menu-bar").on("click", function () {
			$(".menu-bar").toggleClass("menu-bar-toggeled");
			$(".header-menu").toggleClass("opened");
			$("body").toggleClass("overflow-hidden");
		});

		$(".header-menu ul li a").on("click", function () {
			$(".menu-bar").removeClass("menu-bar-toggeled");
			$(".header-menu").removeClass("opened");
			$("body").removeClass("overflow-hidden");
		});

		/*------------------------------------------------------
  	/  OnePage Active Class
  	/------------------------------------------------------*/
		$(".header-menu nav ul").onePageNav({
			currentClass: "current-menu-ancestor",
			changeHash: false,
			easing: "swing",
		});

		/*------------------------------------------------------
  	/  Portfolio Filter
  	/------------------------------------------------------*/
		$(".portfolio-box").imagesLoaded(function () {
			var $grid = $(".portfolio-box").isotope({
				// options
				masonry: {
					columnWidth: ".portfolio-box .portfolio-sizer",
					gutter: ".portfolio-box .gutter-sizer",
				},
				itemSelector: ".portfolio-box .portfolio-item",
				percentPosition: true,
			});

			// filter items on button click
			$(".filter-button-group").on("click", "button", function () {
				$(".filter-button-group button").removeClass("active");
				$(this).addClass("active");

				var filterValue = $(this).attr("data-filter");
				$grid.isotope({ filter: filterValue });
			});
		});

		/*------------------------------------------------------
  	/  Portfolio Gallery Carousel
  	/------------------------------------------------------*/
		$(".portfolio_gallery.owl-carousel").owlCarousel({
			items: 2,
			loop: true,
			lazyLoad: true,
			center: true,
			// autoWidth: true,
			autoplayHoverPause: true,
			autoplay: false,
			autoplayTimeout: 5000,
			smartSpeed: 800,
			margin: 30,
			nav: false,
			dots: true,
			responsive: {
				// breakpoint from 0 up
				0: {
					items: 1,
					margin: 0,
				},
				// breakpoint from 768 up
				768: {
					items: 2,
					margin: 20,
				},
				992: {
					items: 2,
					margin: 30,
				},
			},
		});

		/*------------------------------------------------------
  	/ Testimonial Carousel
  	/------------------------------------------------------*/
		$(".testimonial-carousel.owl-carousel").owlCarousel({
			loop: true,
			margin: 30,
			nav: false,
			dots: true,
			autoplay: false,
			active: true,
			smartSpeed: 1000,
			autoplayTimeout: 7000,
			responsive: {
				0: {
					items: 1,
				},
				600: {
					items: 2,
				},
				1000: {
					items: 2,
				},
			},
		});

		/*------------------------------------------------------
  	/ Post Gallery Carousel
  	/------------------------------------------------------*/
		$(".tj-post__gallery.owl-carousel").owlCarousel({
			items: 1,
			loop: true,
			margin: 30,
			dots: false,
			nav: true,
			navText: [
				'<i class="fal fa-arrow-left"></i>',
				'<i class="fal fa-arrow-right"></i>',
			],
			autoplay: false,
			smartSpeed: 1000,
			autoplayTimeout: 3000,
		});
		/*------------------------------------------------------
  	/ Brand Slider
  	/------------------------------------------------------*/
		if ($(".brand-slider").length > 0) {
			var brand = new Swiper(".brand-slider", {
				slidesPerView: 6,
				spaceBetween: 30,
				loop: false,
				breakpoints: {
					320: {
						slidesPerView: 2,
					},
					576: {
						slidesPerView: 3,
					},
					640: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 4,
					},
					992: {
						slidesPerView: 5,
					},
					1024: {
						slidesPerView: 6,
					},
				},
			});
		}

		/*------------------------------------------------------
  	/  Nice Select
  	/------------------------------------------------------*/
		$("select").niceSelect();

		/*------------------------------------------------------
  	/  ALL Popup
  	/------------------------------------------------------*/
		if ($(".popup_video").length > 0) {
			$(`.popup_video`).lightcase({
				transition: "elastic",
				showSequenceInfo: false,
				slideshow: false,
				swipe: true,
				showTitle: false,
				showCaption: false,
				controls: true,
			});
		}

		$(".modal-popup").magnificPopup({
			type: "inline",
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: "auto",
			closeBtnInside: true,
			preloader: false,
			midClick: true,
			removalDelay: 300,
			mainClass: "popup-mfp",
		});
	});

	$(window).on("load", function () {
		/*------------------------------------------------------
  	/  WoW Js
  	/------------------------------------------------------*/
		var wow = new WOW({
			boxClass: "wow", // default
			animateClass: "animated", // default
			offset: 100, // default
			mobile: true, // default
			live: true, // default
		});
		wow.init();

		/*------------------------------------------------------
  	/  Preloader
  	/------------------------------------------------------*/
		const svg = document.getElementById("preloaderSvg");
		const svgText = document.querySelector(
			".hero-section .intro_text svg text"
		);
		const tl = gsap.timeline({
			onComplete: startStrokeAnimation,
		});
		const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
		const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

		tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
			delay: 1.5,
			y: -100,
			opacity: 0,
		});
		tl.to(svg, {
			duration: 0.5,
			attr: { d: curve },
			ease: "power2.easeIn",
		}).to(svg, {
			duration: 0.5,
			attr: { d: flat },
			ease: "power2.easeOut",
		});
		tl.to(".preloader", {
			y: -1500,
		});
		tl.to(".preloader", {
			zIndex: -1,
			display: "none",
		});

		function startStrokeAnimation() {
			// Add a class or directly apply styles to trigger the stroke animation
			svgText.classList.add("animate-stroke");
		}

		/*------------------------------------------------------
  	/  Services Hover BG
  	/------------------------------------------------------*/
		function service_animation() {
			var active_bg = $(".services-widget .active-bg");
			var element = $(".services-widget .current");
			$(".services-widget .service-item").on("mouseenter", function () {
				var e = $(this);
				activeService(active_bg, e);
			});
			$(".services-widget").on("mouseleave", function () {
				element = $(".services-widget .current");
				activeService(active_bg, element);
				element.closest(".service-item").siblings().removeClass("mleave");
			});
			activeService(active_bg, element);
		}
		service_animation();

		function activeService(active_bg, e) {
			if (!e.length) {
				return false;
			}
			var topOff = e.offset().top;
			var height = e.outerHeight();
			var menuTop = $(".services-widget").offset().top;
			e.closest(".service-item").removeClass("mleave");
			e.closest(".service-item").siblings().addClass("mleave");
			active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
		}

		$(".services-widget .service-item").on("click", function () {
			$(".services-widget .service-item").removeClass("current");
			$(this).addClass("current");
		});

		/*------------------------------------------------------
  	/  Portfolio Filter BG Color
  	/------------------------------------------------------*/
		function filter_animation() {
			var active_bg = $(".portfolio-filter .button-group .active-bg");
			var element = $(".portfolio-filter .button-group .active");
			$(".portfolio-filter .button-group button").on("click", function () {
				var e = $(this);
				activeFilterBtn(active_bg, e);
			});
			activeFilterBtn(active_bg, element);
		}
		filter_animation();

		function activeFilterBtn(active_bg, e) {
			if (!e.length) {
				return false;
			}
			var leftOff = e.offset().left;
			var width = e.outerWidth();
			var menuLeft = $(".portfolio-filter .button-group").offset().left;
			e.siblings().removeClass("active");
			e.closest("button")
				.siblings()
				.addClass(".portfolio-filter .button-group");
			active_bg.css({ left: leftOff - menuLeft + "px", width: width + "px" });
		}

		/*------------------------------------------------------
  	/  Funfact
  	/------------------------------------------------------*/
		if ($(".odometer").length > 0) {
			$(".odometer").appear(function () {
				var odo = $(".odometer");
				odo.each(function () {
					var countNumber = $(this).attr("data-count");
					$(this).html(countNumber);
				});
			});
		}

		// Form Validation
		/* contact form */
		if ($("#contact-form").length > 0) {
			$("#contact-form").validate({
				rules: {
					conName: "required",
					conEmail: {
						required: true,
						email: true,
					},
				},

				messages: {
					conName: "نام خود را وارد کنید",
					conEmail: "ایمیل معتبر وارد نمایید",
				},
				submitHandler: function (form) {
					// start ajax request
					$.ajax({
						type: "POST",
						url: "assets/mail/contact-form.php",
						data: $("#contact-form").serialize(),
						cache: false,
						success: function (data) {
							if (data == "Y") {
								$("#message_sent").modal("show");
								$("#contact-form").trigger("reset");
							} else {
								$("#message_fail").modal("show");
							}
						},
					});
				},
			});
		}
		/* !contact form */
	});
})(jQuery);

!function(e, t) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
    }("undefined" != typeof window ? window : this, function() {
        function e() {}
        var t = e.prototype;
        return t.on = function(e, t) {
                if (e && t) {
                        var i = this._events = this._events || {}
                          , n = i[e] = i[e] || [];
                        return n.indexOf(t) == -1 && n.push(t),
                        this
                }
        }
        ,
        t.once = function(e, t) {
                if (e && t) {
                        this.on(e, t);
                        var i = this._onceEvents = this._onceEvents || {}
                          , n = i[e] = i[e] || {};
                        return n[t] = !0,
                        this
                }
        }
        ,
        t.off = function(e, t) {
                var i = this._events && this._events[e];
                if (i && i.length) {
                        var n = i.indexOf(t);
                        return n != -1 && i.splice(n, 1),
                        this
                }
        }
        ,
        t.emitEvent = function(e, t) {
                var i = this._events && this._events[e];
                if (i && i.length) {
                        i = i.slice(0),
                        t = t || [];
                        for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                                var r = i[o]
                                  , s = n && n[r];
                                s && (this.off(e, r),
                                delete n[r]),
                                r.apply(this, t)
                        }
                        return this
                }
        }
        ,
        t.allOff = function() {
                delete this._events,
                delete this._onceEvents
        }
        ,
        e
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
                return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
    }("undefined" != typeof window ? window : this, function(e, t) {
        function i(e, t) {
                for (var i in t)
                        e[i] = t[i];
                return e
        }
        function n(e) {
                if (Array.isArray(e))
                        return e;
                var t = "object" == typeof e && "number" == typeof e.length;
                return t ? d.call(e) : [e]
        }
        function o(e, t, r) {
                if (!(this instanceof o))
                        return new o(e,t,r);
                var s = e;
                return "string" == typeof e && (s = document.querySelectorAll(e)),
                s ? (this.elements = n(s),
                this.options = i({}, this.options),
                "function" == typeof t ? r = t : i(this.options, t),
                r && this.on("always", r),
                this.getImages(),
                h && (this.jqDeferred = new h.Deferred),
                void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
        }
        function r(e) {
                this.img = e
        }
        function s(e, t) {
                this.url = e,
                this.element = t,
                this.img = new Image
        }
        var h = e.jQuery
          , a = e.console
          , d = Array.prototype.slice;
        o.prototype = Object.create(t.prototype),
        o.prototype.options = {},
        o.prototype.getImages = function() {
                this.images = [],
                this.elements.forEach(this.addElementImages, this)
        }
        ,
        o.prototype.addElementImages = function(e) {
                "IMG" == e.nodeName && this.addImage(e),
                this.options.background === !0 && this.addElementBackgroundImages(e);
                var t = e.nodeType;
                if (t && u[t]) {
                        for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                                var o = i[n];
                                this.addImage(o)
                        }
                        if ("string" == typeof this.options.background) {
                                var r = e.querySelectorAll(this.options.background);
                                for (n = 0; n < r.length; n++) {
                                        var s = r[n];
                                        this.addElementBackgroundImages(s)
                                }
                        }
                }
        }
        ;
        var u = {
                1: !0,
                9: !0,
                11: !0
        };
        return o.prototype.addElementBackgroundImages = function(e) {
                var t = getComputedStyle(e);
                if (t)
                        for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n; ) {
                                var o = n && n[2];
                                o && this.addBackground(o, e),
                                n = i.exec(t.backgroundImage)
                        }
        }
        ,
        o.prototype.addImage = function(e) {
                var t = new r(e);
                this.images.push(t)
        }
        ,
        o.prototype.addBackground = function(e, t) {
                var i = new s(e,t);
                this.images.push(i)
        }
        ,
        o.prototype.check = function() {
                function e(e, i, n) {
                        setTimeout(function() {
                                t.progress(e, i, n)
                        })
                }
                var t = this;
                return this.progressedCount = 0,
                this.hasAnyBroken = !1,
                this.images.length ? void this.images.forEach(function(t) {
                        t.once("progress", e),
                        t.check()
                }) : void this.complete()
        }
        ,
        o.prototype.progress = function(e, t, i) {
                this.progressedCount++,
                this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded,
                this.emitEvent("progress", [this, e, t]),
                this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
                this.progressedCount == this.images.length && this.complete(),
                this.options.debug && a && a.log("progress: " + i, e, t)
        }
        ,
        o.prototype.complete = function() {
                var e = this.hasAnyBroken ? "fail" : "done";
                if (this.isComplete = !0,
                this.emitEvent(e, [this]),
                this.emitEvent("always", [this]),
                this.jqDeferred) {
                        var t = this.hasAnyBroken ? "reject" : "resolve";
                        this.jqDeferred[t](this)
                }
        }
        ,
        r.prototype = Object.create(t.prototype),
        r.prototype.check = function() {
                var e = this.getIsImageComplete();
                return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
                this.proxyImage.addEventListener("load", this),
                this.proxyImage.addEventListener("error", this),
                this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                void (this.proxyImage.src = this.img.src))
        }
        ,
        r.prototype.getIsImageComplete = function() {
                return this.img.complete && this.img.naturalWidth
        }
        ,
        r.prototype.confirm = function(e, t) {
                this.isLoaded = e,
                this.emitEvent("progress", [this, this.img, t])
        }
        ,
        r.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
        }
        ,
        r.prototype.onload = function() {
                this.confirm(!0, "onload"),
                this.unbindEvents()
        }
        ,
        r.prototype.onerror = function() {
                this.confirm(!1, "onerror"),
                this.unbindEvents()
        }
        ,
        r.prototype.unbindEvents = function() {
                this.proxyImage.removeEventListener("load", this),
                this.proxyImage.removeEventListener("error", this),
                this.img.removeEventListener("load", this),
                this.img.removeEventListener("error", this)
        }
        ,
        s.prototype = Object.create(r.prototype),
        s.prototype.check = function() {
                this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                this.img.src = this.url;
                var e = this.getIsImageComplete();
                e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                this.unbindEvents())
        }
        ,
        s.prototype.unbindEvents = function() {
                this.img.removeEventListener("load", this),
                this.img.removeEventListener("error", this)
        }
        ,
        s.prototype.confirm = function(e, t) {
                this.isLoaded = e,
                this.emitEvent("progress", [this, this.element, t])
        }
        ,
        o.makeJQueryPlugin = function(t) {
                t = t || e.jQuery,
                t && (h = t,
                h.fn.imagesLoaded = function(e, t) {
                        var i = new o(this,e,t);
                        return i.jqDeferred.promise(h(this))
                }
                )
        }
        ,
        o.makeJQueryPlugin(),
        o
    });
    

!function(e, t) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
    }("undefined" != typeof window ? window : this, function() {
        function e() {}
        var t = e.prototype;
        return t.on = function(e, t) {
                if (e && t) {
                        var i = this._events = this._events || {}
                          , n = i[e] = i[e] || [];
                        return n.indexOf(t) == -1 && n.push(t),
                        this
                }
        }
        ,
        t.once = function(e, t) {
                if (e && t) {
                        this.on(e, t);
                        var i = this._onceEvents = this._onceEvents || {}
                          , n = i[e] = i[e] || {};
                        return n[t] = !0,
                        this
                }
        }
        ,
        t.off = function(e, t) {
                var i = this._events && this._events[e];
                if (i && i.length) {
                        var n = i.indexOf(t);
                        return n != -1 && i.splice(n, 1),
                        this
                }
        }
        ,
        t.emitEvent = function(e, t) {
                var i = this._events && this._events[e];
                if (i && i.length) {
                        i = i.slice(0),
                        t = t || [];
                        for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                                var r = i[o]
                                  , s = n && n[r];
                                s && (this.off(e, r),
                                delete n[r]),
                                r.apply(this, t)
                        }
                        return this
                }
        }
        ,
        t.allOff = function() {
                delete this._events,
                delete this._onceEvents
        }
        ,
        e
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
                return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
    }("undefined" != typeof window ? window : this, function(e, t) {
        function i(e, t) {
                for (var i in t)
                        e[i] = t[i];
                return e
        }
        function n(e) {
                if (Array.isArray(e))
                        return e;
                var t = "object" == typeof e && "number" == typeof e.length;
                return t ? d.call(e) : [e]
        }
        function o(e, t, r) {
                if (!(this instanceof o))
                        return new o(e,t,r);
                var s = e;
                return "string" == typeof e && (s = document.querySelectorAll(e)),
                s ? (this.elements = n(s),
                this.options = i({}, this.options),
                "function" == typeof t ? r = t : i(this.options, t),
                r && this.on("always", r),
                this.getImages(),
                h && (this.jqDeferred = new h.Deferred),
                void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
        }
        function r(e) {
                this.img = e
        }
        function s(e, t) {
                this.url = e,
                this.element = t,
                this.img = new Image
        }
        var h = e.jQuery
          , a = e.console
          , d = Array.prototype.slice;
        o.prototype = Object.create(t.prototype),
        o.prototype.options = {},
        o.prototype.getImages = function() {
                this.images = [],
                this.elements.forEach(this.addElementImages, this)
        }
        ,
        o.prototype.addElementImages = function(e) {
                "IMG" == e.nodeName && this.addImage(e),
                this.options.background === !0 && this.addElementBackgroundImages(e);
                var t = e.nodeType;
                if (t && u[t]) {
                        for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                                var o = i[n];
                                this.addImage(o)
                        }
                        if ("string" == typeof this.options.background) {
                                var r = e.querySelectorAll(this.options.background);
                                for (n = 0; n < r.length; n++) {
                                        var s = r[n];
                                        this.addElementBackgroundImages(s)
                                }
                        }
                }
        }
        ;
        var u = {
                1: !0,
                9: !0,
                11: !0
        };
        return o.prototype.addElementBackgroundImages = function(e) {
                var t = getComputedStyle(e);
                if (t)
                        for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n; ) {
                                var o = n && n[2];
                                o && this.addBackground(o, e),
                                n = i.exec(t.backgroundImage)
                        }
        }
        ,
        o.prototype.addImage = function(e) {
                var t = new r(e);
                this.images.push(t)
        }
        ,
        o.prototype.addBackground = function(e, t) {
                var i = new s(e,t);
                this.images.push(i)
        }
        ,
        o.prototype.check = function() {
                function e(e, i, n) {
                        setTimeout(function() {
                                t.progress(e, i, n)
                        })
                }
                var t = this;
                return this.progressedCount = 0,
                this.hasAnyBroken = !1,
                this.images.length ? void this.images.forEach(function(t) {
                        t.once("progress", e),
                        t.check()
                }) : void this.complete()
        }
        ,
        o.prototype.progress = function(e, t, i) {
                this.progressedCount++,
                this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded,
                this.emitEvent("progress", [this, e, t]),
                this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
                this.progressedCount == this.images.length && this.complete(),
                this.options.debug && a && a.log("progress: " + i, e, t)
        }
        ,
        o.prototype.complete = function() {
                var e = this.hasAnyBroken ? "fail" : "done";
                if (this.isComplete = !0,
                this.emitEvent(e, [this]),
                this.emitEvent("always", [this]),
                this.jqDeferred) {
                        var t = this.hasAnyBroken ? "reject" : "resolve";
                        this.jqDeferred[t](this)
                }
        }
        ,
        r.prototype = Object.create(t.prototype),
        r.prototype.check = function() {
                var e = this.getIsImageComplete();
                return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
                this.proxyImage.addEventListener("load", this),
                this.proxyImage.addEventListener("error", this),
                this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                void (this.proxyImage.src = this.img.src))
        }
        ,
        r.prototype.getIsImageComplete = function() {
                return this.img.complete && this.img.naturalWidth
        }
        ,
        r.prototype.confirm = function(e, t) {
                this.isLoaded = e,
                this.emitEvent("progress", [this, this.img, t])
        }
        ,
        r.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
        }
        ,
        r.prototype.onload = function() {
                this.confirm(!0, "onload"),
                this.unbindEvents()
        }
        ,
        r.prototype.onerror = function() {
                this.confirm(!1, "onerror"),
                this.unbindEvents()
        }
        ,
        r.prototype.unbindEvents = function() {
                this.proxyImage.removeEventListener("load", this),
                this.proxyImage.removeEventListener("error", this),
                this.img.removeEventListener("load", this),
                this.img.removeEventListener("error", this)
        }
        ,
        s.prototype = Object.create(r.prototype),
        s.prototype.check = function() {
                this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                this.img.src = this.url;
                var e = this.getIsImageComplete();
                e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                this.unbindEvents())
        }
        ,
        s.prototype.unbindEvents = function() {
                this.img.removeEventListener("load", this),
                this.img.removeEventListener("error", this)
        }
        ,
        s.prototype.confirm = function(e, t) {
                this.isLoaded = e,
                this.emitEvent("progress", [this, this.element, t])
        }
        ,
        o.makeJQueryPlugin = function(t) {
                t = t || e.jQuery,
                t && (h = t,
                h.fn.imagesLoaded = function(e, t) {
                        var i = new o(this,e,t);
                        return i.jqDeferred.promise(h(this))
                }
                )
        }
        ,
        o.makeJQueryPlugin(),
        o
    });
    