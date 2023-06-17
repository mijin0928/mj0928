
 $(function() {
	// 헤더 네비게이션
	$('.gnb>li').each(function() {
		let _depth2 = $(this).children('.depth-2');
		
		$(this).on('mouseover', function() {
			_depth2.stop().fadeIn().css('display','flex')
		}).on('mouseout', function() {
			_depth2.stop().fadeOut();  /*  2023-03-03 퍼블리싱 수정  to 개발 : .css('display','none) 를 제거하였습니다.  */
		});

		_depth2.on('mouseout', function() {
			_depth2.stop().fadeOut(); 
		}); /*  2023-03-03 퍼블리싱 수정  to 개발 : _depth2 에서 mouseout 시 fadeOut 처리 추가하였습니다. */
	})

	// 상단으로 이동
	$(document).on('click', '.quick-area .common-list li .btn-top', function(e) {
		e.preventDefault();
		if ($(this).hasClass('btn-top')) $('html, body').animate({scrollTop : 0}, 500);
	});

	// 스크롤 이벤트
	$(window).scroll(function() {
		if ($('aside').length) {
			slideQuick(quickTop);
		} // 퀵배너

		if ($('.main-scroll').length) {
			allSectionScroll();
		} // 메인 김승연
	
		if($('.tip-area').length) {
			tipAreaEvent()
		} // 회사소개_03브랜드결정TIP

		if ($('.commu01-2').length) {
			allSectionScroll();
		} // 커뮤니티_01영상센터

		if ($('.week-item').length) {
			allSectionScroll();
		} // 상품안내_03신상품안내
	});

	// 퀵배너
	var quickTop = parseInt($('.quick-menu').css('top'))
	function slideQuick(quickTop) {
		var scrollTop = $(window).scrollTop(),
				 scrollHandle = $(window).scrollTop() + $(window).innerHeight() - $('.quick-menu').height(),
				 quickHandle = $('body').outerHeight(true);
		if (scrollHandle < quickHandle) $('body').find('.quick-menu').stop().animate({'top': scrollTop + quickTop + 'px'}, 500)
	}

	// 스크롤이벤트 필요한 화면
	function allSectionScroll() {
		$('.section').each(function() {
			let activeTop = $(this).offset().top,
					scrollTop = $(window).scrollTop();
			scrollTop+500 <= activeTop ? $(this).removeClass('active') : $(this).addClass('active');
		})
	}

	// 회사소개_03브랜드결정TIP
	function tipAreaEvent() {
		$('.tip-area').each(function() {
			let activeTop = $(this).offset().top,
					scrollTop = $(window).scrollTop();

			scrollTop+500 <= activeTop ? $(this).removeClass('active') : $(this).addClass('active');
			$('.tip-area').eq(5).hasClass('active') ? $('.tip-area').eq(6).addClass('active') : $('.tip-area').eq(6).removeClass('active');
		});
	}

	// tab
	if ($('.tab-area').length) {
		$('.tab-area').each(function() {
			var tabSwipe = $(this),
					tabNav = tabSwipe.children('.tab-nav'),
					tabBtn = tabSwipe.find('[role="tab"]'),
					activeTarget = tabNav.find('[aria-selected="true"]'),
					tabCont = [];

			if (tabSwipe.children().hasClass('tab-contents')) tabCont = tabSwipe.children('.tab-contents');

			tabCont.filter('#'+activeTarget.attr('aria-controls')).addClass('active').stop().fadeIn().siblings('.tab-contents').removeClass('active').css('display','none');

			tabBtn.each(function() {
				let _this = $(this)

				_this.on('click', function() {
					activeTarget = $(this).attr('aria-controls');

					$(this).addClass('active').attr('aria-selected','true').parent('li').siblings().children('button').removeClass('active').attr('aria-selected', 'false');
					tabCont.filter('#'+activeTarget).addClass('active').stop().fadeIn().siblings('.tab-contents').removeClass('active').css('display','none');
				})
			})
		})
	}

	// accordion
	if ($('.accordion').length) {
		$('.accordion').find('.btn-toggle').each(function() {
			let _this = $(this),
					id = $(this).attr('aria-controls')

			_this.on('click', function() {
				$(this).hasClass('active') ? $(this).removeClass('active').attr('aria-expanded','false').next('#'+id).removeClass('active') : $(this).addClass('active').attr('aria-expanded','true').next('#'+id).addClass('active').parent('li').siblings().children().removeClass('active').siblings('.btn-toggle').attr('aria-expanded','false');
			})
		})
	}

	// swiper default setting (한 구역 내부에 여러개 있을 경우)
	if ($('.swiper-default').length) {
		$('.swiper-default').each(function() {
			var setOption = $(this).attr('class').split(' ')[1],
			_index = $(this).index();
			$(this).addClass('swiperDefault' + _index);

			var swiperOptions = {
				'swipe-intro' : {
					spaceBetween: 0,
					slidesPerView: 1,
					centerMode:false,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					observer: true,
					observeParents: true,
					pagination: {
						el: '.swiperDefault' + _index + ' .swiper-pagination',
						clickable: true,
					},
					navigation: {
						nextEl: '.swiperDefault' + _index + ' .btn-next',
						prevEl: '.swiperDefault' + _index + ' .btn-prev',
					},
				}, // 회사소개
			}
			var swiper = new Swiper('.swiperDefault'+_index +' .swiper-container', swiperOptions[setOption])
		})
	}

	// swiper full
	if ($('.section .swiper-full').length) {
		$('.main-swiper').each(function(_index) {
			$(this).children('.swiper-full').each(function(inIndex) {
				$(this).addClass('swiperFull-in' + inIndex);
				var setOption = $(this).attr('class').split(' ')[0],
						_this = $(this)
				swipeFullHandle(setOption,_this)
			});
			function swipeFullHandle(setOption, _this) {
				var swiperOptions = {
					'swiper-full': {
						spaceBetween: 24,
						slidesPerView: 'auto',
						centeredSlides: false,
						loop:false,
						watchSlidesVisibility: true,
						watchSlidesProgress: true,
						observer: true,
						observeParents: true,
						scrollbar: {
							el: _this.children('.swiper-scrollbar'),
							hide: false,
							draggable: true,
							dragSize: "300px",
							snapOnRelease: true
						},
						slidesPerGroupSkip: 1,
						grabCursor: false,
						keyboard: {
							enabled: true,
						},
					}, // 스크롤바
				}
				
				var swiper = new Swiper(_this.children('.swiper-container'), swiperOptions[setOption])
			}
		})
	} // 풀사이즈 스와이퍼

	if ($('.swiper-tab-scroll').length) {
		let _tab = [];
		var swiper = new Swiper(".swiper-tab-scroll .swiper-container", {
      slidesPerView: 1,
      centeredSlides: false,
      slidesPerGroupSkip: 1,
      grabCursor: false,
      keyboard: {
        enabled: true,
      },
			direction: 'vertical',
			debugger: true,
			mousewheel: true,
			speed: 500,
			// 자동 스크를링
			autoplay: {
					//시간 1000 이 1초
					delay: 30000,
					disableOnInteraction: false,
			},
      pagination: {
        el: ".swiper-tab-scroll .swiper-pagination",
        clickable: true,
				renderBullet: function (index) {
					_tab = $('.swiper-tab-scroll .swiper-pagination li').eq(index).text();
					className = $('.swiper-tab-scroll .swiper-pagination li').eq(index).attr('class');
          return '<li class="' + className + '">' + _tab + '</li>';
				},
      },
    });
	} // 탭 스크롤 스와이퍼

	if ($('.solution .swiper-interior').length) {
		var swiper = new Swiper('.swiper-interior>.swiper-container', {
			slidesPerView: 'auto',
			slidesOffsetBefore: -40,
			loop:true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			observer: true,
			observeParents: true,
      pagination: {
        el: ".swiper-interior .swiper-pagination",
				type:'custom',
				renderCustom: function (swiper, current, total) {
					function paginationCustom(_index) {
						return (_index < 10) ? '0' + _index.toString() : _index.toString(); 
					}
					return '<span>' + paginationCustom(current) + '</span>' + ' <span>/</span> ' + '<span>' + paginationCustom(total) + '</span>'; 
					}
      },
      navigation: {
        nextEl: ".swiper-interior .swiper-button.btn-next",
        prevEl: ".swiper-interior .swiper-button.btn-prev",
      },
    });
	} // 창업솔루션 매장인테리어

	// swiper 팝업 내부에 위치
	if ($('.cont-list').find('.swiper-thumb').length) {
		$('.cont-list>li').each(function(_index, ele) {
			var layerSwipe = $(this).find('.swiper-thumb');
			layerSwipe.addClass('swiper-thumbnail' + _index).siblings('.swiper-nav').addClass('swiper-navigation' + _index);

			$('.swiper-thumb').each(function() {
				var setOption = $(this).attr('class').split(' ')[0],
				setNavOption = $(this).siblings('.swiper-nav').attr('class').split(' ')[0];

				// 기본 스와이퍼의 네비게이션
				var swiperNavOptions = {
					'swiper-nav' : {
						spaceBetween: 10,
						slidesPerView: 5,
						centerMode:true,
						watchSlidesVisibility: true,
						watchSlidesProgress: true,
						observer: true,
						observeParents: true,
						loop:false
					}, 
				};
				var swiperNav = new Swiper('.swiper-navigation'+_index +' .swiper-container', swiperNavOptions[setNavOption])

				// 팝업 내부 기본 스와이퍼
				var swiperOptions1 = {
					'swiper-thumb' : {
						// touchEventsTarget: 'swiper-wrapper',
							thumbs: {
								swiper: swiperNav
							},
						observer: true,
						observeParents: true,
						on: { // swiper-nav 활성화시 class 추가기능
							slideChangeTransitionEnd: function() {
								$('.swiper-navigation'+_index+' .swiper-slide').eq(this.activeIndex).addClass('nav-active').siblings().removeClass('nav-active');
							}
						}
					},
				};
				var layerModalSwiper = new Swiper('.swiper-thumbnail'+_index +' .swiper-container', swiperOptions1[setOption])
			});
		});
	}

	// slick
	if ($('.slick').length) {
		$('.slick .slick-slider').slick('setPosition'); 
		// width 100%
		$('.main-slide .wrap').slick({
			arrows : true, // default == true
			dots: true, // default == false
			infinite: true, // default == true
			speed: 300,
			slidesToShow: 1, // 한번에 보여지는 갯수
			slidesToScroll: 1, // default == 1, : 한번에 움직이는 slide 갯수
			autoplay: true, // default == false
			autoplaySpeed : 3000, // default == 3000
			pauseOnHover : true, // default == true : 마우스 오버시 멈춤
			pauseOnFocus : true, // default == true : 포커스 됐을 때 멈춤
			pauseOnDotsHover : false, // default == false : 도트 페이징 됐을 때 멈춤
			focusOnChange : true, // default == false : 변경 후 슬라이드에 focus // 접근성
			touchThreshold : 50, // default == 5 : 슬라이드를 진행하려면 사용자가 (1/touchThreshold) 길이 * 슬라이더 너비를 스와이프해야 합니다.
			setPosition: 0, //깨짐 방지
			centerMode: true,
			variableWidth: true,
		});
	}

	// modal 
	if ($('.layer-modal').length) {
		$('.btn-open-modal').each(function() {
			var targetId = $(this).attr('aria-controls');
			// 모달창 오픈
			$(this).on('click', function() {
				$('#' + targetId).css('visibility','visible').addClass('active');
	
				$('body').addClass('overflow');
			});
	
			// 모달창 닫기
			$('#' + targetId).find('.btn-close-modal').on('click', function() {
				$(this).parents('.layer-modal').removeClass('active').css('visibility','hidden');

				$('body').removeClass('overflow');
			});
		});
	}

	// 숫자 카운팅
	$('div:not(.winner) .counting').each(function() {
		var $this = $(this),
				 countTo = $(this).attr('data-count');

		$({countNum: $this.text()}).animate({
			countNum: countTo
		},
		{
			duration: 2000,
			easing: 'linear',
			step: function() {
				$this.text(Math.floor(this.countNum));
			},
			complete: function() {
				$this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
			}
		});
	});

	// scroll with counter (메인)
	if ($('.winner').length) {

		var a = 0;
		$(window).scroll(function(){
			var mainCounting = $('.section.winner .num').offset().top - window.innerHeight;
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
	 


	//상품안내_02TOP200상품안내
	var swiper_product = new Swiper(".best-product", {
		pagination: {
			el: ".product-pagination",
			type: "fraction",
		},
		navigation: {
			nextEl: ".product-btn-next",
			prevEl: ".product-btn-prev",
		},
		slidesPerView: "auto",
		spaceBetween: -1000,
		
		breakpoints: {
			2340: {
				spaceBetween: -900,
			},
			2160: {
				spaceBetween: -700,
			},
			1760 : {
				spaceBetween: -500,
			},
			1545: {
				spaceBetween: -400,
			},
			1435: {
				spaceBetween: -300,
			},
			1290: {
				spaceBetween: -200,
			}
		},
		on: {
			slideChange: function(){
				var current_txt = '<span class="swiper-pagination-current">' + '0' + (this.activeIndex + 1) + '</span>';
				$('.swiper-pagination-current').html(current_txt);
				var total_txt = '<span class="swiper-pagination-total">' + '0' + $('.swiper-slide').length + '</span>';
				$('.swiper-pagination-total').html(total_txt);
			},
		},
	});

	$('.swiper-pagination-current').text('0' + 1);
	$('.swiper-pagination-total').text('0' + $('.swiper-slide').length);
	$('.swiper-pagination-current').css('margin-right','10px');
	$('.swiper-pagination-total').css('margin-left','10px');

	// input file 디자인
	function fn_file_upload(){
	$('.file-area').each(function(){
		$(this).find('.input-file').on('change', function(){
			if( $(this).val() == undefined || $(this).val() == '' ) {
				$(this).closest('.file-area').find('.text').attr("title", '첨부된 파일명 출력').text('파일을 선택하세요').css('color','#999');
			}
			
			else {
				if(window.FileReader){
					if ($(this).val() != "") {
						var fileName = $(this)[0].files[0].name;
					}
				} else {
					var fileName = $(this).val().split('/').pop().split('\\').pop();
				}
				$(this).closest('.file-area').find('.text').attr("title", fileName + " 파일 입니다").text(fileName).css('color', '#999');
			}
			
		});
	});
};

$(document).on('click', '.file-area .text', function(){
	$(this).closest('.file-area').find('.label').trigger('click');
});

$(function(){
	// 함수 실행
	fn_file_upload();
});

	// AOS plugin
	if ($('*[data-aos]').length) {
		AOS.init();
	}
});