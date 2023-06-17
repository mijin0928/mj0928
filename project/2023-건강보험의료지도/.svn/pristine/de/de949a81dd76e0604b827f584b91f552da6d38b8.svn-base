$(function() {
	function fn_tooltip(){
		if( $(".tool-tip").length > 0 ){
			$(document).on("click", ".tool-tip", function(e){
				e.preventDefault();
				$(this).addClass("on");
			});
			
			$(".tool-tip").tooltipster({
				trigger: "click",
				interactive: "true",
				autoClose: "false",
				theme: "tool-style",
				speed : 150,
				delay : 0,
				position : 'right',
				functionReady: function(e){
					var $tool = $("#"+e.__namespace),
						$toolTab = $tool.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])'),
						$toolTabFirst = $toolTab && $toolTab.first(),
						$toolTabLast = $toolTab && $toolTab.last();
					 
					if( $toolTab.length ){
						// 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
						$toolTabFirst.focus().on("keydown", function(e) {
							// Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동 
							if (e.shiftKey && (e.keyCode || e.which) === 9) {
								e.preventDefault();
								$toolTabLast.focus();
							}
						});
						
						// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
						$toolTabLast.on("keydown", function(e) {
							if (!e.shiftKey && (e.keyCode || e.which) === 9) {
								e.preventDefault();
								$toolTabFirst.focus();
							}
						});
						
						$(".tooltip-close").click(function(e){
							e.preventDefault();
							$(".tool-tip").tooltipster("hide");
							$(".tool-tip.on").focus();
							$(".tool-tip").removeClass("on");
						});
					}
				}
			});
		}
	}
	
	// layer modal
	$(document).on('click', '.open-modal', function(e) {
		e.preventDefault();

		var btnOpen = $(this);
		var layerId = btnOpen.attr('aria-controls');
		var layer = $('#' + layerId);
		var layerWrap = layer.find('.wrap');
		var btnClose = layerWrap.find('.close-layer');
		var layerTab = layerWrap.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])');
		var layerTabFirst = layerTab.first();
		var layerTabLast = layerTab.last();

		function openModal() {
			$('body').addClass('overflow');
			
			layer.show(0, function() {
				$(this).addClass('on');
				layerWrap.focus();
			});
	
			if (layerTab.length) {
				layerTabFirst.on("keydown", function(e) {
					if (e.shiftKey && e.key === 'Tab') {
						e.preventDefault();
						layerTabLast.focus();
					}
				});
				layerTabLast.on("keydown", function(e) {
					if (!e.shiftKey && e.key === 'Tab') {
						e.preventDefault();
						layerTabFirst.focus();
					}
				});
			}
			
			setSlick();
		}

		function closeModal() {
			btnOpen.focus();
			layer.removeClass('on').hide(0);
			$('body').removeClass('overflow');
		}
	
		openModal();
	
		btnClose.on('click', function() {
			closeModal();
		});
	});
	
	// tablist
	$(document).on('click', '[role="tab"]', function(e){
		e.preventDefault();
		
		var targetId = $(this).attr('aria-controls');
		var $this = $('#'+targetId);
		
		$(this).closest('li').addClass('on').siblings('li').removeClass('on');
		
		$(this).closest('[role="tablist"]').find('[role="tab"]').attr('aria-selected', false);
		$(this).attr('aria-selected', true);
		
		$(this).closest('.tab-area').find('.tab-cont').attr('hidden', true);
		$($this).removeAttr('hidden');
	});

	// popup
	$(document).on('click', '.btn-close-popup', function(){
		$(this).closest('.popup').hide().removeClass('on');
		
		if($('.popup.on').length == 0) {
			$('.dimed').hide();
			
		}
	});

	
	// 개발 연동시 필요없으면 삭제
	$(document).on('click', 'a.disabled', function(e){
		e.preventDefault();
	});
	
	// 스킵 네이게이션
	$('.skip a').on('focus blur', function(){
		$('.skip').toggleClass('on');
	});
	
	// 전체메뉴
	$(document).on('click', '.btn-open-all-menu', function(e){
		e.preventDefault();

		var btnOpen = $(this);
		var allMenulayer = $('.all-menu');
		var allMenuLayerWrap = allMenulayer.find('.wrap');
		var btnClose = allMenuLayerWrap.find('.btn-close-all-menu');
		var allMenuTab = allMenuLayerWrap.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])');
		var allMenuTabFirst = allMenuTab.first();
		var allMenuTabLast = allMenuTab.last();

		function openAllMenu() {
			$('body').addClass('overflow');
			allMenulayer.addClass('on');
			allMenuLayerWrap.focus();
	
			if (allMenuTab.length) {
				allMenuTabFirst.on("keydown", function(e) {
					if (e.shiftKey && e.key === 'Tab') {
						e.preventDefault();
						allMenuTabLast.focus();
					}
				});
				
				allMenuTabLast.on("keydown", function(e) {
					if (!e.shiftKey && e.key === 'Tab') {
						e.preventDefault();
						allMenuTabFirst.focus();
					}
				});
			}
		}

		function closeAllMenu() {
			btnOpen.focus();
			allMenulayer.removeClass('on');
			$('body').removeClass('overflow');
		}
	
		openAllMenu();
	
		btnClose.on('click', function() {
			closeAllMenu();
		});
	});
	
	
	// footer family site
	// 관련 사이트 선택 전에 이동 이벤트 막기.
	$('.site-move').on('click', function(e){
		e.preventDefault();
	});
	
	$('.site-move').on('focus', function(e){
		$(this).closest('.site').removeClass('on');
	});
	
	$('.family-site .site .btn-toggle-family').on('click', function(){
		$(this).closest('.site').toggleClass('on').siblings('.site').removeClass('on');
	});
	
	$('.family-site .site .list a').on('click', function(e){
		e.preventDefault();
		
		var $txt = $(this).text();
		var $url = $(this).attr('href');
		
		var $move = $(this).closest('.site').find('.site-move');
		
		$move.attr('href', $url);
		$(this).closest('.site').find('.btn-toggle-family').text($txt);
		$(this).closest('.site').removeClass('on');
		
		$(this).closest('.site').find('.site-move').attr('title', '새창 열림').css('cursor','pointer').unbind('click');
	});
	
	// 여백 클릭시
	$(document).on('click', function(e) {
		// 관련 사이트 닫기
		if(!$(e.target).closest('.family-site').hasClass('family-site')) {
			$('.family-site .site').removeClass('on');
		}
	});
	
	// 글자 수 제한 textarea
	$('.textarea-limit .input-textarea').on({
		'mouseenter mouseleave': function() {
			$(this).closest('.text-area').toggleClass('hover');
		},
		'focus blur': function() {
			$(this).closest('.text-area').toggleClass('focus');
		}
	});
	
	// box toggle
	if ($('.box-toggle').length) {
		$('.box-toggle').each(function () {
			var $this = $(this),
				$toggle = $this.find('.tit-area button.tit'),
				$contArea = $this.find('.cont-area'),
				$toggleArr = $this.find('.tit .ico-toggle-arr');
	
			$toggleArr.addClass('up').text('상세영역 닫기');
	
			if ($this.hasClass('off')) {
				$contArea.hide();
				$toggleArr.removeClass('up').addClass('down').text('상세영역 열기');
			}
	
			$toggle.on('click', function () {
				if ($this.hasClass('off')) {
					$contArea.slideDown(100);
					$toggleArr.removeClass('down').addClass('up').text('상세영역 닫기');
					$this.removeClass('off');
				} else {
					$contArea.slideUp(100);
					$toggleArr.removeClass('up').addClass('down').text('상세영역 열기');
					$this.addClass('off');
				}
			});
		});
	}

	// accordion
	if ($('.accordion').length) {
		function accSetting(){
			$('.accordion .btn-toggle').each(function(){
				var $this = $(this),
				$cont = $this.closest('li').find('.cont-area'),
				$icoToggle = $this.find('.ico-toggle-arr'),
				expanded = $this.attr('aria-expanded') === 'true',
				checkAccToggle = $('.acc-toggle').text() === '전체펼치기';
		
				$icoToggle.addClass(expanded ? 'up' : 'down').text(expanded ? '상세영역 닫기' : '상세영역 열기');
				
				if (expanded) $cont.slideDown(10);
			});
		}
		
		accSetting();
		
		// 선택한 아코디언 활성화 & 비활성화
		$(document).on('click', '.accordion .btn-toggle', function() {
			var expanded = $(this).attr('aria-expanded') === 'true',
				$cont = $(this).closest('li').find('.cont-area'),
				$icoToggle = $(this).find('.ico-toggle-arr');
			
			if(expanded){
				$cont.slideUp(100);
				$icoToggle.removeClass('up').addClass('down').text('상세영역 열기');
				$(this).attr('aria-expanded', 'false');
			}
			else {
				$cont.slideDown(100);
				$icoToggle.removeClass('down').addClass('up').text('상세영역 닫기');
				$(this).attr('aria-expanded', 'true');
			}
			
			fn_flick();
		});
		
		// 개인정보처리방침 : 전체 열기 닫기
		$(document).on('click', '.acc-toggle', function() {
			var checkAccToggle = $('.acc-toggle').text() === '전체펼치기',
				$cont = $('.accordion').find('.cont-area'),
				$icoToggle = $('.accordion').find('.btn-toggle .ico-toggle-arr'),
				$btnToggle = $('.accordion').find('.btn-toggle');
			
			if(checkAccToggle){
				$('.acc-toggle').text('전체닫기');
				
				$btnToggle.attr('aria-expanded', 'true');
				$icoToggle.removeClass('down').addClass('up').text('상세영역 닫기');
				$cont.slideDown(100);
			}
			else {
				$('.acc-toggle').text('전체펼치기');
				
				$btnToggle.attr('aria-expanded', 'false');
				$icoToggle.removeClass('up').addClass('down').text('상세영역 열기');
				$cont.slideUp(100);
			}
			
			fn_flick();
		});
		
		// 더보기 클릭시 개발에서 ajax 로 li 추가시 아코디언 닫은 상태 세팅
		$(document).on('click', 'button.round.more', accMore);
	
		function accMore(){
			/*
			
			퍼블 단계에서 테스트로 넣어본것입니다. 오픈전에 삭제해 주세요.
			아코디언 작동 잘 되면 요청해 주세요 삭제 후 다시 전달드리겠습니다.
			
			acc_li = 
			'<li>' + 
			'<div class="tit-area">' +
			'<button type="button" id="acc_100" aria-expanded="false" aria-controls="acc_panel_100" class="tit btn-toggle">' +
			'<i class="iconset ico-faq-q">질문</i>' +
			'<span>질문영역 문항 유형입니다.100</span>' +
			'<i class="iconset ico-toggle-arr"></i>' +
			'</button>' +
			'</div>' +
			'<div role="region" id="acc_panel_100" aria-labelledby="acc_100" class="cont-area">' +
			'<i class="iconset ico-faq-a">답변</i>' +
			'콘텐츠 100' +
			'</div>' +
			'</li>'+
			'<li>' + 
			'<div class="tit-area">' +
			'<button type="button" id="acc_101" aria-expanded="false" aria-controls="acc_panel_100" class="tit btn-toggle">' +
			'<i class="iconset ico-faq-q">질문</i>' +
			'<span>질문영역 문항 유형입니다.101</span>' +
			'<i class="iconset ico-toggle-arr"></i>' +
			'</button>' +
			'</div>' +
			'<div role="region" id="acc_panel_101" aria-labelledby="acc_100" class="cont-area">' +
			'<i class="iconset ico-faq-a">답변</i>' +
			'콘텐츠 100' +
			'</div>' +
			'</li>'
					
			$( ".faq-list" ).append(acc_li);*/
			
			accSetting();
		}
	}
	
	/* 지표 이용 가이드 */
	var $slickUseGuide;
	if($('.slick-use-guide .wrap').length > 0) {
		$slickUseGuide = $('.slick-use-guide .wrap').slick({
			arrows : false,
			dots: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed : 150,
			touchThreshold : 50,
			draggable : false,
		});
	}

	$('.indicator-guide-list .open-modal').on('click', function(){
		var index = $(this).closest('li').index();
		
		$slickUseGuide.slick('slickGoTo', index);
		$('.use-guide-paging > li').eq(index).addClass('on').siblings().removeClass('on');
	});
	
	$('.use-guide-paging button').on('click', function(){
		var index = $(this).closest('li').index();
		
		$slickUseGuide.slick('slickGoTo', index);
	});
	
	// slick 커스텀 좌우 버튼 공통
	$('.btn-slick-control').on('click', function(){
		var $wrap = $(this).closest('[class^="slick-"]').find('> .wrap');
	
		$(this).hasClass('prev') ? $wrap.slick('slickPrev') : $wrap.slick('slickNext');
		
		if( $(this).closest('.use-guide-paging') ){
			var $useIndex = $slickUseGuide.slick('slickCurrentSlide');
			$('.use-guide-paging > li').eq($useIndex).addClass('on').siblings().removeClass('on');
		}
	});
	
	function setSlick(){
		if($('.slick-use-guide .wrap').length > 0) {
			$slickUseGuide.slick('setPosition');
		}
	}


	// 첨부파일
	$('.file-area').each(function(){
		if( $(this).hasClass('txt') ){
			$(this).prepend($('<p class="text" title="첨부된 파일명 출력">선택된 파일 없음</p>'))
		}

		$(this).find('.input-file').on('change', function(){
			if( $(this).val() == undefined || $(this).val() == '' ) {
				$(this).closest('.file-area').find('.text').attr("title", '첨부된 파일명 출력').text('선택된 파일 없음');
			}
			else {
				if(window.FileReader){
					if ($(this).val() != "") {
						var fileName = $(this)[0].files[0].name;
					}
				} else {
					var fileName = $(this).val().split('/').pop().split('\\').pop();
				}
				$(this).closest('.file-area').find('.text').attr("title", fileName + " 파일 입니다").text(fileName);
			}
		});
	});


	$(document).on('click', '.file-area .text', function(){
		$(this).closest('.file-area').find('label').trigger('click');
	});
	
	
	var $hrScroll = $('.hr-scroll');
	
	// 탭 필터 클릭
	$(document).on('click', '[class^="tab-list"].filter button', function(){
		var $this = $(this);
		var $li = $this.closest('li');
		var position;
		
		$li.addClass('on').siblings('li').removeClass('on');
	
		if( $hrScroll.hasClass('open') ) {
			$hrScroll.removeClass('open');
			$hrScroll.find('.ico-hr-toggle').removeClass('up').addClass('down').find('span').text('펼치기');
			position = Math.floor($li.position().left);
			$hrScroll.find('.scroll').scrollLeft(0).scrollLeft(position);
		}
	
		setSlick();
	});
	
	// 스크롤 토글 클릭
	$hrScroll.find('.btn-hr-toggle').on('click', function(){
		var $ico = $(this).find('.ico-hr-toggle');
		var isOpen = $hrScroll.hasClass('open');
		var position;
		
		$hrScroll.toggleClass('open');
	
		if (isOpen) {
			position = Math.floor($hrScroll.find('li.on').position().left);
			$hrScroll.find('.scroll').scrollLeft(position);
			$ico.removeClass('up').addClass('down').find('span').text('펼치기');
		} else {
			$ico.removeClass('down').addClass('up').find('span').text('닫기');
		}
	});
	
	// table-data 스크롤
	function fn_flick() {
		if ($('.table-data.scroll').length > 0) {
			function addFlickWrap() {
				$('.table-data.scroll').each(function() {
					var $this = $(this).not('.flick-hidden');
					var $table = $this.find('> table');
					
					var $w = $this.width();
					var $tableW = $table.outerWidth();
	
					if ($w < $tableW) {
						if ($this.find('.flick-wrap').length === 0) {// resize 시 한번만 추가하기 위한 조건문
							$this.prepend(`<div class="flick-wrap"><div class="flick-area"><span>화면을 터치한 후에 좌우로 스크롤하여 확인하세요.</span></div></div>`);
						}
					} else {
						$this.find('.flick-wrap').remove();
					}
				});
			}
	
			addFlickWrap();
	
			// 윈도우 리사이즈 이벤트 발생 시에도 중첩 함수를 호출할 수 있도록 분리합니다.
			function onResize() {
				addFlickWrap();
			}
			
			$(window).on('resize', onResize);
	
			// '.flick-wrap' 요소가 클릭될 때 요소를 숨기고 해당 요소를 삭제합니다.
			$(document).on('click', '.flick-wrap', function() {
				$(this).closest('.table-data.scroll').addClass('flick-hidden');
				$(this).remove();
			});
		}
	}


	// main 슬라이드
	$('.visual-slide').slick({
		arrows : false,
		dots: true,
		infinite: true,
		speed: 300,
		autoplay: true,
		appendDots: $('.dot-area'),
	});

	/* main 슬라이드 - 정지 재생버튼 커스텀*/
	$(document).on('click', '.slick-play', function(){
		$(this).closest('.visual-area').find('.visual-slide').slick('slickPlay');
	});

	$(document).on('click', '.slick-pause', function(){
		$(this).closest('.visual-area').find('.visual-slide').slick('slickPause');
	});

	/* main 슬라이드- 정지 재생버튼 포커스 */
	$(document).on('click', '.visual-area .slick-pause', function(){
		$('.slick-play').addClass('active').focus();
		$(this).removeClass('active');
	});
	$(document).on('click', '.visual-area .slick-play', function(){
		$('.slick-pause').addClass('active').focus();
		$(this).removeClass('active');
	});

	
	fn_flick();
	fn_tooltip();
});