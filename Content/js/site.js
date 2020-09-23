(function ($) {

	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *     the user visible viewport of a web browser.
	 *     only accounts for vertical position, not horizontal.
	 */

	$.fn.visible = function (partial) {

		var $t = $(this),
			$w = $(window),
			viewTop = $w.scrollTop(),
			viewBottom = viewTop + $w.height(),
			_top = $t.offset().top,
			_bottom = _top + $t.height(),
			compareTop = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;

		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};

})(jQuery);

$(document).ready(function () {

	$('[data-toggle="enquire"]').on('click', function (event) {
		$('.modal')
			.prop('class', 'modal fade') // revert to default
			.addClass($(this).data('direction'));
		$('.modal').modal('show');
	});

	// jQuery formatted selector to search for focusable items
	var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

	// store the item that has focus before opening the modal window
	var focusedElementBeforeModal;


	//	$("#form-enquire :input").prop("disabled", true);
	//	//$('#warning-label')[0].style.color = "Red";
	//	$('#warning-label').css("color", "Red");

	//});
	//$('[data-toggle="doctor"]').on('click', function (event) {
	//	$('#name').focus();
	//	//$('#warning-label')[0].style.color = "#888383";
	//	$('#warning-label').css("color", "#888383");
	//	$("#form-enquire :input").prop("disabled", false);

	$('.sticky,.sticky-small-only').each(function (index, element) {
		var sticky = new Waypoint.Sticky({
			element: this
		});
	});

	function doNavScroll() {
		$('.navbar').addClass('navbar-scroll');

		var isTop = $(document).scrollTop() == 0;

		if (isTop) {
			$('.navbar').addClass('navbar-dark');
			$('.navbar').addClass('bg-transparent');
			$('.navbar').removeClass('navbar-light');
			$('.navbar').removeClass('bg-white');
		}
		else {
			$('.navbar').addClass('navbar-light');
			$('.navbar').addClass('bg-white');
			$('.navbar').removeClass('navbar-dark');
			$('.navbar').removeClass('bg-transparent');
		}

		clearTimeout($.data(this, 'scrollTimer'));
		$.data(this, 'scrollTimer', setTimeout(function () {
			$('.navbar').removeClass('navbar-scroll');
		}, 250));

	}

	function doAnimations() {
		$(".fade").each(function (i, el) {
			var el = $(el);
			if (el.visible(true)) {
				el.addClass("fade-in");
			} else {
				el.removeClass("fade-in");
			}
		});

		$(".come").each(function (i, el) {
			var el = $(el);
			if (el.visible(true)) {
				el.addClass("come-in");
			} else {
				el.removeClass("come-in");
			}
		});
	}

	function jumpToSection(event) {

		var anchor = $(this);
		var href = $(anchor).attr('href');

		if (href.substring(0, 1) === '#') {


			$('html, body').stop().animate({
				scrollTop: $(href).offset().top
			}, 1500, 'easeInOutExpo', function () {

			});

			event.preventDefault();
		}

	}

	$('.page-scroll').click(jumpToSection);

	$(window).scroll(function (event) {

		doNavScroll();
		doAnimations();
	});

	doAnimations();



	function positionSubmenu() {

		var submenu = $('.nav-submenu');

		if (submenu.length == 0)
			return;

		submenu.css({
			'position': 'relative',
			'left': '',
			'top': '',
			'width': ''
		});

		var submenuPosition = submenu.offset();
		var submenuWidth = submenu.width();

		submenu.css({
			'position': 'fixed',
			//'left': submenuPosition.left,
			'top': submenuPosition.top,
			'width': submenuWidth
		});

	}

	positionSubmenu();

	$(window).resize(function () {
		positionSubmenu();
	});

	$('.dropdown-item[data-toggle="collapse"]').on('click', function (e) {
		var target = $(this).attr("data-target");
		$(target).collapse('toggle');
		e.stopPropagation();
	})
