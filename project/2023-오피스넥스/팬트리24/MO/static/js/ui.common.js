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

	// tab
	$('.container [class^="tab-list"], .layer-modal [class^="tab-list"]').each(function(){ 
		var swipeThis = $(this);
		var container = $(this).parents('.container');
		var targetActive = swipeThis.find('.active');
		var targetRole = swipeThis.find('[role="tab"]');

		function tabScroll(targetCurrent){
			swipeThis.scrollLeft(0).scrollLeft(targetCurrent.offset().left - parseInt(container.css('padding-left')));
		}
		tabScroll(targetActive);

		targetRole.each(function(){ 
			$(this).on('click',function(){
				console.log('....')
				const roleThis = $(this);
				const targetClick = $(this).attr('aria-controls');

				$('#' + targetClick).removeAttr('hidden').siblings('.tab-cont').attr('hidden','');
				$('#' + targetClick).attr('tabindex','0').siblings('.tab-cont').attr('tabindex','-1');
			
				$(this).parent().siblings().children().removeClass('active');
				$(this).addClass('active');
			
				$(this).parent().siblings().children().attr('aria-selected','false');
				$(this).attr('aria-selected','true');

				tabScroll(roleThis);
			})
		})
		
		$(window).resize(function(){
			const resizeActive = swipeThis.find('.active');
			tabScroll(resizeActive);
		})
	}) 

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
	if($('[class*="slick"]').length){ 
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

		
		// 팬트리를 만나
		$('.slick-like .wrap').slick({
			dots:false,
			arrows:false,
			infinite:true,
			slideToShow:1,
			autoplay: true,
			autoplaySpeed: 12000,
			variableWidth:true,
			touchThreshold:50
		});

		// 팬트리24란?
		$('.main-slick .wrap').slick({
			arrows: false,
			dots:  true,
			infinite: true, 
			speed: 300,
			slidesToShow: 1, 
			slidesToScroll: 1, 
			autoplay: true, 
			autoplaySpeed : 12000, 
			pauseOnHover : true, 
			pauseOnFocus : true, 
			pauseOnDotsHover : false,
			focusOnChange : true, 
			touchThreshold : 50, 
			setPosition: 0,
			centerMode: true,
			variableWidth: true,
		});
	}

	// all-menu open & close
	if($('.all-menu').length) {
		$(document).on('click', '.btn-gnb', function(){
			$('.all-menu').addClass('open');
		});
		$(document).on('click', '.btn-area .btn-gnb-close', function(){
			$('.all-menu').removeClass('open');
			$('.depth-01').removeClass('on');
		});

		// gnb open & close
		$(document).on('click', '.gnb .depth-01 > a', function(e){
			e.preventDefault();
			$(this).parent('.depth-01').addClass('on').siblings().removeClass('on');
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

	// layer-modal
	if($('.layer-modal').length){
		$(document).on('click','.btn-modal-open',function(){
			$('#' + $(this).attr('aria-controls')).addClass('on').attr('aria-modal','true').focus();
			$('body').append('<div class="layer-dimed"></div>').addClass('overflow');
		})

		$(document).on('click','.btn-modal-close',function(){
			$('.layer-modal').removeClass('on').attr('aria-modal','false');
			$('.layer-dimed').remove();
			$('body').removeClass('overflow');
		})
	}

	// layer-modal-full
	$('.btn-layer-full-open').each(function() {
		var _this = $(this),
				targetId = _this.attr('aria-controls'),
				activeTarget = $('#' + targetId),
				_btnClose = $('#' + targetId).children('.btn-layer-close');

		// 모달창 열기
		$(this).on('click', function() {
			activeTarget.addClass('active').attr('aria-modal','true').focus().find('.layer-cont').scrollTop(0);
			$('body').addClass('overflow');
		})

		// 모달창 닫기
		_btnClose.on('click', function() {
			activeTarget.removeClass('active').attr('aria-modal','false');
			$('body').removeClass('overflow');
			_this.focus();
		})
	})

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

});