$(function() {
	// a 버튼 .disabled 이벤트 처리
	if ($('a.disabled').length) {
		$(document).on('click', 'a.disabled', function(e) {
			e.preventDefault();
		});
	}

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

	// layer-modal
	$('.btn-layer-open').each(function() {
		var _this = $(this),
				targetId = _this.attr('aria-controls'),
				activeTarget = $('#' + targetId),
				_btnClose = activeTarget.find('.btn-layer-close');

		// 포커싱 열기
		function focusAccessibility(e) {
			var layerTarget = e.children('.wrap');
			var focusEl = layerTarget.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])');
			var lastEl = focusEl && focusEl.last();

			layerTarget.attr('tabindex','0');
			setTimeout(function(){layerTarget.focus()},50);

			layerTarget.on('keydown', function(e){
				if(e.shiftKey && (e.keyCode || e.which) === 9) {
					e.preventDefault();
					lastEl.focus();
				}
			});
		}

		// 포커싱 닫기(모달창 열기 버튼으로 포커싱이동)
		function focusAccessibilityClose(e) {
			var layerTarget = e.children('.wrap');
			layerTarget.attr('tabindex','-1');
			$('[aria-controls="' + e.attr('id') + '"').focus();
		}

		// 모달창 열기
		$(this).on('click', function() {
			activeTarget.addClass('active').attr('aria-modal','true').find('.layer-cont').scrollTop(0);
			focusAccessibility(activeTarget);
			$('body').addClass('overflow');
		})

		// 모달창 닫기
		_btnClose.on('click', function() {
			activeTarget.removeClass('active').attr('aria-modal','false');
			$('body').removeClass('overflow');
			focusAccessibilityClose(activeTarget);
		})
	})

	// tab
	$('.container [class^="tab-list"]').each(function(){ 
		var boxPadding = $(this).parents('.container'),
				swipeThis = $(this),
				targetActive = swipeThis.find('.active'),
				targetRole = swipeThis.find('[role="tab"]');

		function tabScroll(targetCurrent){
			swipeThis.scrollLeft(0).scrollLeft(targetCurrent.offset().left - parseInt(boxPadding.css('padding-left')));
		}
		tabScroll(targetActive);

		targetRole.each(function(){ 
			$(this).on('click',function(){
				var roleThis = $(this);
				var targetClick = $(this).attr('aria-controls');

				$('#' + targetClick).removeAttr('hidden').siblings('.tab-cont').attr('hidden','');
				$('#' + targetClick).attr('tabindex','0').siblings('.tab-cont').attr('tabindex','-1');
			
				$(this).parent().siblings().children().removeClass('active');
				$(this).addClass('active');
			
				$(this).parent().siblings().children().attr('aria-selected','false');
				$(this).attr('aria-selected','true');

				tabScroll(roleThis);

				$('.slider').slick('setPosition');
				$('.slick-country').resize();
				$('.slick-country .wrap').slick('refresh')
			})
		})
		
		$(window).resize(function(){
			var resizeActive = swipeThis.find('.active');
			tabScroll(resizeActive);
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
			arrows:false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			centerMode: true,
			focusOnSelect: true
		});

		// 회사소개 회사연혁
		$('.slick-country .wrap').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: false,
			arrows:false,
			infinite: true,
			autoplay: true, 
			autoplaySpeed : 3000, 
			pauseOnHover : true, 
			pauseOnFocus : true, 
			pauseOnDotsHover : false,
			focusOnSelect: true,
			touchThreshold : 50, 
			variableWidth: true,
		});

		// 회사소개 물류센터
		$('[class^="slick-center-"]').find('.wrap').slick({
			dots:true,
			arrows:false,
			infinite: true,
			autoplay: true, 
			autoplaySpeed : 3000, 
			pauseOnHover : true, 
			pauseOnFocus : true, 
			pauseOnDotsHover : false,
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			centerMode: false,
			focusOnSelect: true,
			touchThreshold : 50, 
		});

		// 커뮤니티 운영성과
		$('.slick-ranking .wrap').slick({
			arrows:false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			centerMode: false,
			focusOnSelect: true,
			touchThreshold : 50, 
		});
	}

		// main - easy-slide
		$('.easy-slide .wrap').slick({
			arrows : false, 
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

		// main - // main - delivery-slide
		$('.delivery-slide .wrap').slick({
			arrows : false, 
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

		// main - success slide
		$('.success-slide .wrap').slick({
			arrows:false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			centerMode: false,
			focusOnSelect: true,
			touchThreshold : 50, 
		});

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


	// all-menu open & close
	if($('.all-menu').length) {
		$(document).on('click', '.btn-gnb', function(){
			$('.all-menu').addClass('open');
			$('.all-menu li.depth-01:first-child').addClass('on');
			$('body').addClass('overflow');
		});
		$(document).on('click', '.btn-area .btn-gnb-close', function(){
			$('.all-menu').removeClass('open');
			$('.all-menu li.depth-01').removeClass('on');
			$('body').removeClass('overflow');
		});

		// gnb open & close
		$(document).on('click', '.gnb .depth-01 > a', function(e){
			e.preventDefault();
			$(this).parent('.depth-01').addClass('on').siblings().removeClass('on');
		});
	}
	// footer family site 
	$('.family-site .toggle').click(function(){
		$('.family-site').toggleClass('on');
	
	});

	$(document).on('click', function(e){
		var $clicked = $(e.target);
		if (!$clicked.parents().hasClass('family-site')) {
			$('.family-site').removeClass('on');
		}
	});

	// header 스크롤 시 배경 색 변경	
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if (scroll > 1) {
			$('.main #header').addClass('active');
		}
		else {
			$('.main #header').removeClass('active');
		}
	});
	

	// AOS plugin
	if ($('*[data-aos]').length) {
		AOS.init();
	}
});