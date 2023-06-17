$(function() {
	// a 버튼 .disabled 이벤트 처리
	if ($('a.disabled').length) {
		$(document).on('click', 'a.disabled', function(e) {
			e.preventDefault();
		});
	}

	// main - slick
	if ($('[class^="slick"]').length) {
		// 팬트리24란?
		$('.slick-slider .wrap').slick({
			dots: false,
			arrows: false,
			autoplay: false,
			autoplaySpeed: 12000,
			pauseOnHover: true,
			pauseOnFocus: true,
			variableWidth: true,
			asNavFor: '.slick-nav .wrap',
			touchThreshold: 50
		});
	
		$('.slick-nav .wrap').slick({
			dots: false,
			arrows: false,
			autoplay: false,
			variableWidth: true,
			pauseOnHover: true,
			pauseOnFocus: true,
			asNavFor: '.slick-slider .wrap',
			touchThreshold: 50,
			focusOnSelect: true
		});
	
		// 팬트리24의 최고의 혜택
		$('.slick-container .wrap').slick({
			dots: true,
			arrows: false,
			autoplay: false,
			autoplaySpeed: 12000,
			pauseOnHover: true,
			pauseOnFocus: true,
			touchThreshold: 50,
			customPaging: function(slider, i) {
				var slideNav = $(slider.$slides[i]).find('.slide-nav');
				return '<button type="button"><span class="num">' + (i + 1) + '</span>' + slideNav.text() + '</button>';
			}
		});
	
		// 팬트리24를 만나
		$('.like-slide .wrap').slick({
			dots: false,
			arrows: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 12000,
			pauseOnHover: true,
			pauseOnFocus: true,
			pauseOnDotsHover: false,
			focusOnChange: true,
			touchThreshold: 50,
			setPosition: 0,
			centerMode: true,
			variableWidth: true
		});
	
		$(window).on('scroll', function () {
			var $autoplay = false;
			var scrollTop = $(this).scrollTop();
			
			if($('.slick-slider').length){
				if (scrollTop >= $('.slick-slider').offset().top - $(window).height() / 2) {
					$autoplay = true;
					$('.slick-slider .wrap').slick('slickPlay');
				}
			}

			if($('.slick-nav').length){
				if (scrollTop >= $('.slick-nav').offset().top - $(window).height() / 2) {
					$autoplay = true;
					$('.slick-nav .wrap').slick('slickPlay');
				}
			}

			if($('.slick-container').length){
				if (scrollTop >= $('.slick-container').offset().top - $(window).height() / 2) {
					$autoplay = true;
					$('.slick-container .wrap').slick('slickPlay');
				}
			}
			
			

			if($('.like-slide').length){
				if (scrollTop >= $('.like-slide').offset().top - $(window).height() / 2) {
					$autoplay = true;
					$('.like-slide .wrap').slick('slickPlay');
				}
			}
			
		}).trigger('scroll');
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

	// layer-modal
	if($('.layer-modal').length){
		$(document).on('click','.btn-modal-open',function(){
			$('#' + $(this).attr('aria-controls')).addClass('on').attr('aria-modal','true').focus();
			$('body').append('<div class="layer-dimed"></div>').css('overflow','hidden');
		})

		$(document).on('click','.btn-modal-close',function(){
			$('.layer-modal').removeClass('on').attr('aria-modal','false');
			$('.layer-dimed').remove();
			$('body').css('overflow','visible');
		})
	}

	// scroll with counter (메인)
	if ($('.join-total').length) {

		var a = 0;
		$(window).scroll(function(){
			var mainCounting = $('.join-total .num').offset().top - window.innerHeight;
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

	// 상담성과 숫자 카운팅
	$('.counting').each(function() {
		var $this = $(this),
				 countTo = $(this).attr('data-count');

		$({countNum: $this.text()}).animate({
			countNum: countTo
		},
		{
			duration: 1000,
			easing: 'linear',
			step: function() {
				$this.text(Math.floor(this.countNum));
			},
			complete: function() {
				$this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
			}
		});
	});

	// AOS plugin
	if ($('*[data-aos]').length) {
		AOS.init();
	}
})