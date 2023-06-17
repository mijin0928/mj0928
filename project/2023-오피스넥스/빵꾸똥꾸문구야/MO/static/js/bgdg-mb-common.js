$(function(){ 
	// allmenu
	if ($('.ui-allmenu').length) {
		$(document).on('click', '.btn-allmenu', function() {
			$('.ui-allmenu').addClass('active');
			$('body').css('overflow','hidden');
		}); // 전체메뉴 열기
		$(document).on('click', '.ui-allmenu .btn-close', function() {
			$('.ui-allmenu').removeClass('active');
			$('body').css('overflow','auto');
		}); // 전체메뉴 닫기

		$(document).on('click', '.ui-allmenu .gnb-wrap .depth1>a', function(e) {
			e.preventDefault();
			$(this).parent('.depth1').addClass('active').siblings().removeClass('active');
		}) // gnb 클릭이벤트

		$(document).on('mouseleave', '.ui-allmenu .gnb-list', function(e) {
			$(this).children('.depth1').removeClass('active')
		})
	}

	
	// tab (default)
	if ($('.container .tab-area').length) {
		$('.tab-area').each(function() {
			var tabSwipe = $(this),
					tabNav = tabSwipe.children('.tab-nav'),
					tabList = tabSwipe.find('li'),
					_scrollTarget = tabSwipe.find('li.active'),
					tabBtn = tabList.children('[role="tab"]'),
					tabCont = [];

			// 활성화 탭 공통(버튼형+링크형) 좌우 스크롤 고정(처음 보이는 화면)
			function tabSwipingHandle(_active) {
				if (tabSwipe.outerWidth(true) < tabNav.prop('clientWidth')) {
					tabSwipe.scrollLeft(0)
					tabSwipe.hasClass('container-util') ? tabSwipe.scrollLeft(_active.offset().left - parseInt(tabSwipe.css('padding-left'))) : tabSwipe.scrollLeft(_active.offset().left - parseInt(tabSwipe.parents('.contents').css('padding-left')) - parseInt(_active.css('padding-left')));
				}
			}
			tabSwipingHandle(_scrollTarget)

			// 디바이스 사이즈 변경시 좌우 스크롤 위치 고정
			$(window).resize(function() {
				let _scrollTarget = tabSwipe.find('li.active');
				tabSwipingHandle(_scrollTarget)
			})
					
			// 버튼형 탭 기능 
			// @@ 링크형 탭은 기능이 들어가지 않습니다.(해당 탭에 class active 만 추가되는 형태입니다) @@
			tabBtn.each(function() {
				let _this = $(this),
						_scrollTarget = _this.parent('li');

				if (tabSwipe.hasClass('container-util')) { // 상단 고정 탭인 경우
					tabCont = tabSwipe.siblings('.contents').children('.tab-contents');
					tabClickHandle(tabCont);
				}  else { // 콘텐츠 내부 탭
					if (tabSwipe.parent('.box').siblings('.tab-contents').length) { // 박스밖에 탭 콘텐츠가 있는 경우
						tabCont = tabSwipe.parent('.box').siblings('.tab-contents');
						tabClickHandle(tabCont)
					} else { // 한곳에 탭네비게이션, 콘텐츠가 있는 경우
						tabCont = tabSwipe.siblings('.tab-contents');
						tabClickHandle(tabCont)
					}
				}

				function tabClickHandle(cont) {
					let activeTarget = tabList.find('[aria-selected="true"]')
					cont.filter('#'+activeTarget.attr('aria-controls')).fadeIn().siblings('.tab-contents').css('display','none');

					_this.on('click', function() {
						// 헤더 탭 이동시 콘텐츠 내부 탭버튼, 콘텐츠 위치 reset
						if (tabSwipe.hasClass('container-util')) {
							// 화면 상단으로 이동
							$(window).scrollTop(0);

							$('.tab-contents .tab-area').each(function() {
								// 탭버튼 위치이동, 활성화, 속성 변경
								$(this).scrollLeft(0).find('[role="tab"]').eq(0).attr('aria-selected', 'true').parent().addClass('active').siblings().removeClass('active').children().attr('aria-selected','false');

								// 탭콘텐츠 활성화변경
								$(this).parent('.box').siblings('.tab-contents').css('display','none').eq(0).fadeIn();
							})
						}

						let targetId = $(this).attr('aria-controls');
						$(this).attr('aria-selected','true').parent().addClass('active').siblings().removeClass('active').children().attr('aria-selected','false');
						cont.filter('#'+targetId).fadeIn().siblings('.tab-contents').css('display','none');

						tabSwipingHandle(_scrollTarget)
					});
				};
			});
		})
	}

	// tab 회사소개 프랜차이즈vs개인문구점
	if ($('.introduction .intro-tab-wrap').length) {
		$('.intro-tab-wrap').eq(0).prev('.intro-tit').addClass('active')
		tabContSlideDown()
		$('.intro-tab-wrap [role="tab"]').each(function() {
			$(this).on('click', function() {
				let targetId = $(this).attr('aria-controls'),
						targetCont = $(this).parents('.tab-area').siblings('.tab-contents#' + targetId).find('.tab-cont'),
						targetContBox = $(this).parents('.tab-area').siblings('.tab-contents');

				targetContBox.find('.tab-cont').css({
					'transform': 'translateY(-30px)',
					'opacity': '0',
					'transition-delay': ''
				})

				targetCont.each(function(_targetIndex) {
					$(this).css({
						'transform': 'translateY(0px)',
						'opacity': '1',
						'transition-delay': '0.' + (_targetIndex + 3) + 's'
					})
				});
			})
		})
	}



	//퀵배너 스크롤
	var $btn = $('.ui-btn.btn-top');
	$btn.on("click",function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop:'0'}, 500);
	})
	
	// 스크롤이벤트 (김승연)
	$(window).scroll(function() {
		// 회사소개 브랜드결정TIP
		if ($('.tip-area').length) {
			tipAreaEvent();
		}

		// 회사소개 프랜차이즈 vs 개인문구점
		if ($('.section.introduction .intro-tit').length) {
			introAreaEvent()
		}

		// top 버튼 활성화
		$(window).scrollTop() > 100 ? $btn.parent().css({'height':'90px'},50): $btn.parent().css({'height':'40px'},50);
	});

	// 회사소개 브랜드결정TIP
	function tipAreaEvent() {
		$('.tip-area').each(function() {
			let activeTop = $(this).offset().top - 129,
					scrollTop = $(window).scrollTop();

			scrollTop <= 100 ? $('.tip-area').eq(0).removeClass('active') : $('.tip-area').eq(0).addClass('active');
			scrollTop+129 <= activeTop -100 ? $(this).removeClass('active') : $(this).addClass('active');
			scrollTop >= $('.tip-area').eq(5).offset().top - 129 ? $('.tip-area').eq(6).addClass('active') : $('.tip-area').eq(6).removeClass('active');

			if ($(window).width() >= 650) {
				$('.tip-area').eq(5).hasClass('active') ? $('.tip-area').eq(6).addClass('active') : $('.tip-area').eq(6).removeClass('active'); 
			}
		})
	}

	// 회사소개 프랜차이즈 vs 개인문구점
	function introAreaEvent() {
		$('.section.introduction .intro-tit').each(function() {
			let activeTop = $(this).offset().top - 129,
					scrollTop = $(window).scrollTop();

			scrollTop+129 <= activeTop -100 ? $(this).removeClass('active').next('.intro-tab-wrap').find('[role="tab"]').css('visibility','hidden') : $(this).addClass('active').next('.intro-tab-wrap').find('[role="tab"]').css('visibility','visible');

			tabContSlideDown()
		})
	}
	function tabContSlideDown() {
		$('.intro-tab-wrap [aria-selected="true"]').each(function() {
			let tabId = $(this).attr('aria-controls'),
					cont = $(this).parents('.tab-area').siblings('.tab-contents#' + tabId).find('.tab-cont'),
					targetContBox = $(this).parents('.tab-area').siblings('.tab-contents')

			if ($(this).parents('.intro-tab-wrap').prev('.intro-tit').hasClass('active')) {
				cont.each(function(_index) {
					$(this).css({
						'transform': 'translateY(0px)',
						'opacity': '1',
						'transition-delay':'1.' + (_index + 3) + 's'
					})
				})
			} else {
				targetContBox.find('.tab-cont').css({
					'transform': 'translateY(-30px)',
					'opacity': '0',
					'transition-delay': ''
				})
			}
		})
	}

	// 숫자 카운팅
	$(window).load(function(){ 
		counting();
	})

	$('.tab-nav').on('click',function(){ 
		$(this).children().eq(0).hasClass('active') ? counting() : "";
	})

	function counting(){ 
		$('div:not(.winner) .counting').each(function() {
			$(this).text('0');
			var $this = $(this),
					countTo = $(this).attr('data-count');
	
			$({countNum: $this.text()}).animate({
				countNum: countTo
			},
			{
				duration: 3000,
				easing: 'linear',
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
					$this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
				}
			});
		});
	}
	
	// 메인 홈 스크롤 이벤트
	if($('.fade-effect').length){ 
		var current = $('.review.box.full').offset().top;

		$(window).scroll(function(){ 
			if($(window).scrollTop() > current - 450){ 
				$('.review .bg').addClass('active-bg');
				$('.review.box.full').children('.title-area').addClass('active-up');
				$('.review.box.full').children('.main-swiper-wrap').addClass('active-down');
			}else{
				$('.review .bg').removeClass('active-bg');
				$('.review.box.full').children('.title-area').removeClass('active-up');
				$('.review.box.full').children('.main-swiper-wrap').removeClass("active-down");
			}
	
			if($(window).scrollTop() > current){
				$('.press .bg').addClass('active-bg');
				$('.press.box.full').children('.title-area').addClass('active-up');
				$('.press.box.full').children('.main-swiper-wrap').addClass('active-down');
			}else{
				$('.press .bg').removeClass('active-bg');
				$('.press.box.full').children('.title-area').removeClass('active-up');
				$('.press.box.full').children('.main-swiper-wrap').removeClass('active-down');
			}
	
			if($(window).scrollTop() > current + 450){
				$('.friends').children('.title-area').addClass('active-up');
				$('.friends').children('.main-swiper-friends').addClass('active-down');
			}else{
				$('.friends').children('.title-area').removeClass('active-up');
				$('.friends').children('.main-swiper-friends').removeClass('active-down');
			}
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

	// 메인 창업솔루션 - 기대수익_popup
	var box = $('.box.black');
	var table = $('.accordion li .table-area');
	var btn_toggle = $('.btn-toggle');
	
	if(table.siblings('.box.black').length){ 
		$(window).resize(function(){ 
			popUp();		
		})
	}

	function popUp(){ 
		if($(window).innerWidth() < 320){
			$(box).removeClass('off');
			$(box).on('click', function(){ 
				$(this).addClass('off');
			})

			$(table).on('scroll click', function(){ 
				$(window).width() < 320 ? $(box).addClass('off') : $(box).removeClass('off');
			})

			btn_toggle.on('click',function(){ 
				$(box).removeClass('off')
			})
		}else{
			$(box).removeClass('off');
		}	
	}
	popUp();	

	// modal 
	if ($('.layer-modal.pop-up').length) {
		$('.profit-modal .btn-open-modal').each(function() {
			var targetId = $(this).attr('aria-controls');
			// 모달창 오픈
			$(this).on('click', function() {
				$('#' + targetId).css('visibility','visible').addClass('active');

				if($('.layer-modal.pop-up').find('.box.black.off').length){
					$('.box.black.off').removeClass('off');
				}

				$('body').addClass('overflow');
			});

			// 모달창 닫기
			$('#' + targetId).find('.btn-close-modal').on('click', function() {
				$(this).parents('.layer-modal').removeClass('active').css('visibility','hidden')
				$('body').removeClass('overflow');
			});
		});
	}
	
	// 메인 홈 - swiper
	var swiper_main = new Swiper('.main-swiper .swiper-container', {
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		observer:true,
		observeParents: true,

		pagination: {
			el: ".main-pagination",
		},
		spaceBetween : 50,
		
	})

	var swiper_main_review = new Swiper('.main-swiper-wrap.review .swiper-container', {
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		observer:true,
		observeParents: true,

		slidesPerView: "auto",
		spaceBetween : 12,
	})

	var swiper_main_press = new Swiper('.main-swiper-wrap.press .swiper-container', {
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		observer:true,
		observeParents: true,

		slidesPerView: "auto",
		spaceBetween : 12,
	})

	var swiper_main_friends = new Swiper('.main-swiper-friends .swiper-container', {
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		observer:true,
		observeParents: true,

		slidesPerView: "2",
		centeredSlides: "true",
		breakpoints : {
			430: {
				spaceBetween: 20,
			},
			360 : {
				slidesPerView: "auto",
				spaceBetween: 20,
			},
		}
	})

	// 메인 - 오픈매출 swiper 
	
	var swiper_main_sales = new Swiper('.open-sales .swiper-container', {
		
		slidesPerView: 1,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		observer:true,
		observeParents: true,

		pagination: {
			el: ".open-sales .swiper-pagination.type03",
		},
		navigation: {
				nextEl: ".swiper-button-next.sales-next",
				prevEl: ".swiper-button-prev.sales-pre",
				},
		
		spaceBetween : 50,
	})

	// 회사소개 swiper
	var swiper_intro01 = new Swiper ('.swiper-intro.type01 .swiper-container', {
		pagination: {
			el: ".intro-pagination.type01",
		},
	})

	var swiper_intro02 = new Swiper ('.swiper-intro.type02 .swiper-container', {
		pagination: {
			el: ".intro-pagination.type02",
		},
	})

	// 창업솔루션 - 인테리어 tab swiper
	var swiper_interior = new Swiper ('.solution-interior .swiper-container', {
		slidesPerView: "auto",
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		observer:true,
		observeParents: true,
		centeredSlides: true,
		spaceBetween: 15,
		pagination: {
			el: ".solution-interior .swiper-pagination.type03",
		},
	} )

	// TOP200상품안내 swiper
	var swiper_product = new Swiper ('.swiper-container.best-product', {
		slidesPerView: "auto",
		spaceBetween: -150,
		breakpoints: {
			500: {
				spaceBetween: -100,
			},
			435: {
				spaceBetween: -50,
			},
			385: {
				spaceBetween: 0,
			},
		},
	});

	// 영상센터 swiper
	var swiper_video = new Swiper ('.swiper-video .swiper-container', {
		spaceBetween: 12,
		loop: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		pagination: {
			el: ".swiper-video .swiper-pagination",
			clickable:true
		}
	})

	// layer-popup swiper

	var thumbs = new Swiper ('.gallery-thumbs', {
		slidesPerView: 'auto',
		spaceBetween: 5,
		slideToClickedSlide: true,
		observer: true,
		observeParents: true,
		
	});

	var slider = new Swiper ('.gallery-slider', {
		slidesPerView: 1,
		centeredSlides: true,
		observer: true,
		observeParents: true,
		thumbs: {
			swiper:thumbs
		},
		on: {
			slideChangeTransitionEnd: function() {
				$('.gallery-thumbs .swiper-slide').removeClass('on');
				$('.gallery-thumbs .swiper-slide').eq(this.activeIndex).addClass('on');
				console.log(this.activeIndex)
			}
		}

		
	});
			
	// layer popup open & close
	$('.layer-modal-wrap > .bg-dim, .layer-modal:not(.pop-up)').hide();

	$('.modal-bt').click(function(){
		$('.bg-dim, .layer-modal').stop().fadeIn();
		$('body').addClass('overflow');
	})
	

	$('.close-bt, .ico-close').click(function(){
		$('.bg-dim, .layer-modal').fadeOut();
		$('body').removeClass('overflow');
	})
	

	// select popup open & close
	// $('.select-box > .bg-dim, .select-wrap').hide();

	// $('.select-open').click(function(){
	// 	$('.bg-dim, .select-wrap').stop().fadeIn();
	// })

	// $('.ico-close').click(function(){
	// 	$('.bg-dim, .select-wrap').fadeOut();
	// })

	// 숫자 카운팅
	$('.store-num .nums').each(function () {
		const $this = $(this),
			countTo = $this.attr('data-count');

		$({countNum: $this.text()}).animate({
			countNum: countTo
		}, 
		{
			duration: 3000,
			easing: 'linear',
			step: function () {
				$this.text(Math.floor(this.countNum));
			},
			complete: function () {
				$this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
			}
		});
	});

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
})


// modal - confirm
let modal = document.querySelector("#confirm01");

let btn = document.querySelectorAll(".modal-open");

let closeModal = document.getElementsByClassName("modal-close")[0];

for (let i = 0; i < btn.length; i++) {
	btn[i].addEventListener("click", function () {
		modal.style.display = "block";
	});

	btn.onclick = function () {
		modal.style.display = "block";
	};

	closeModal.onclick = function () {
		modal.style.display = "none";
	};
};

