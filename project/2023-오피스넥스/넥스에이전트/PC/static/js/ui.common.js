$(function() {
	// a 버튼 .disabled 이벤트 처리
	if ($('a.disabled').length) {
		$(document).on('click', 'a.disabled', function(e) {
			e.preventDefault();
		});
	}

	// Header navigation
	$('.depth-01 > a').mouseenter(function(){
		$('#header').addClass('on');
		$('.depth-02').addClass('on');
	})
	$('#header').mouseleave(function(){
		$('#header').removeClass('on')
		$('.depth-02').removeClass('on');
	});

	$('#gnb .gnb-area > li > a').on({
		focus : function() {
			$('#header').addClass('on');
			$('.depth-02').addClass('on');
		}
	})

	$(document).on('focus', '#header .logo a, .quick-menu > li > a', function(){
		$('#header').removeClass('on');
		$('.depth-02').removeClass('on');
	});

	$(document).on('mouseleave', '#header', function (){
		$('#header').removeClass('on');
	});

	// btn-top 상단으로 이동
	$(window).scroll(function(){
		if($(this).scrollTop() > 100) {
			$('.btn-top').fadeIn();
		} else {
			$('.btn-top').fadeOut();
		}
	});

	$('.btn-top').click(function(e){
		$('html, body').animate({scrollTop:0},1000);
		e.preventDefault();
	});
	

	// tab
	$('[role="tab"]').each(function(){ 
		$(this).on('click',function(){
			const target = $(this).attr('aria-controls');
			$('#' + target).removeAttr('hidden').siblings('.tab-cont').attr('hidden','');
			$('#' + target).attr('tabindex','0').siblings('.tab-cont').attr('tabindex','-1');
		
			$(this).parent().siblings().children().removeClass('active');
			$(this).addClass('active');
		
			$(this).parent().siblings().children().attr('aria-selected','false');
			$(this).attr('aria-selected','true');

			$('.slider').slick('setPosition');
			$('.slick-country').resize();
			$('.slick-country .wrap').slick('refresh')
		})
	}) 

	// accordion
	if ($('.accordion').length) {
		$('.accordion').find('.btn-toggle').each(function() {
			let _this = $(this),
					id = $(this).attr('aria-controls');

			if ($(this).hasClass('active')) $(this).next('#'+id).css('display','block');

			_this.on('click', function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active').attr('aria-expanded','false');
					$(this).next('#' + id).stop().slideUp(150).removeClass('active');
				} else {
					$(this).addClass('active').attr('aria-expanded','true').next('#' + id).stop().slideDown(150).addClass('active');
				}
			});
		});
	}

	// input(unit)
	if ($('.wrap-unit').length) {
		$('.wrap-unit').each(function() {
			var _this = $(this);
			$(this).children('input').on('focus', function() {
				_this.addClass('focus');
			}).on('blur', function() {
				_this.removeClass('focus');
			});
		});
	}

	// slick
	if($('[class^="slick"]').length){ 
		// guide (slick default)
		$('.slick-main .wrap').slick({
			dots: true,	
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			centerMode: true,
			focusOnSelect: true
		});

		// main - easy-slide
		$('.easy-slide .wrap').slick({
			arrows : true, 
			dots: true, 
			infinite: true, 
			speed: 300,
			slidesToShow: 1, 
			slidesToScroll: 1, 
			autoplay: true, 
			autoplaySpeed : 3000, 
			pauseOnHover : true, 
			pauseOnFocus : true, 
			pauseOnDotsHover : false,
			focusOnChange : true, 
			touchThreshold : 50, 
			setPosition: 0,
			centerMode: true,
			variableWidth: true,
		});

		// main - delivery-slide
		$('.delivery-slide .wrap').slick({
			arrows: false,
			dots:  false,
			infinite: true, 
			speed: 300,
			slidesToShow: 1, 
			slidesToScroll: 1, 
			autoplay: true, 
			autoplaySpeed : 3000, 
			pauseOnHover : true, 
			pauseOnFocus : true, 
			pauseOnDotsHover : false,
			focusOnChange : true, 
			touchThreshold : 50, 
			setPosition: 0,
			centerMode: true,
			variableWidth: true,
		});

		// 회사소개 - 회사연혁
		$('.slick-country .wrap').slick({
			arrows : false, 
			dots: false, 
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true, 
			speed: 300,
			autoplay: true, 
			autoplaySpeed : 2000, 
			pauseOnHover : true, 
			pauseOnFocus : true, 
			focusOnChange : true, 
			touchThreshold : 50, 
			variableWidth: true,
			centerMode: true,
			focusOnSelect: true,
		});
	}

	if($('.slide-wrap').length){ 
		$('.slide-wrap .wrap').slick({
			dots:true,
			dotsClass:'main-slick-dots',
			arrows: false,
			autoplay: true,
			autoplaySpeed: 3000,
			customPaging : function(slider,i){
				const slideNav = $(slider.$slides[i]).find('.slide-nav');
				return '<button type="button"><span class="num">' + (i + 1) + '</span>' + slideNav.text() + '</button>';
			}
		});
	}

	// scroll with counter (메인)
	if ($('.join-total').length) {

		var a = 0;
		$(window).scroll(function(){
			var mainCounting = $('.main-section.join-total .num').offset().top - window.innerHeight;
			if(a == 0 && $(window).scrollTop() > mainCounting) {
				$('.counter-value').each(function(){
					var $this = $(this),
					countTo = $this.attr('data-count');
					$({
						countNum:$this.text()
					}).animate({
						countNum:countTo
					},
					
					// counting
					{
						duration:2000,
						easing: 'linear',
						step: function() {
							$this.text(Math.floor(this.countNum));
						},
						complete: function() {
							$this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
						}
					});
				});
				a = 1;
			}
			if($(window).scrollTop() < mainCounting) {
				a = 0;
				$('.counter-value').text('0');
			}
		});
	}

	// footer family site 
	$('.family-site .toggle').click(function(){
		$('.list').toggle();

		if($('.family-site').hasClass('on')) {
			$('.family-site').removeClass('on');
		} else {
			$('.family-site').addClass('on');
		}
	});

	$(document).on('click', function(e){
		var $clicked = $(e.target);
		if (!$clicked.parents().hasClass('family-site')) {
			$('.family-site .list').hide();
			$('.family-site').removeClass('on');
		}
	});

	// AOS plugin
	if ($('*[data-aos]').length) {
		AOS.init();
	}

});