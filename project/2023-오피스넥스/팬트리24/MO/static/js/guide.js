// 가이드 파일에만 적용
function fn_guide_copy() {
	$('.source').each(function(){
		var _html = $(this).find('.copy').html();
		$(this).append(
			'<div class="paste">' +
			'<button type="button" class="button source-view-toggle">소스 보기</button>' +
			'<div class="code">' +
			'<xmp class="prettyprint linenums">' + _html +'</xmp>' +
			'</div>' +
			'</div>'
		);
		$(this).find('code').text(_html);
	});
	
	$(document).on('click', '.source .paste button', function(){
		$(this).closest('.paste').toggleClass('on');
		$(this).closest('.paste').hasClass('on') ? $(this).text('소스 닫기') : $(this).text('소스 보기'); 
	});

	// tab
	$('.copy [class^="tab-list"]').each(function(){ 
		var swipeThis = $(this);
		var tabArea = $(this).parent('.tab-area');
		var targetActive = swipeThis.find('.active');
		var targetRole = swipeThis.find('[role="tab"]');

		function tabScroll(targetCurrent){
			swipeThis.scrollLeft(0).scrollLeft(targetCurrent.offset().left - (parseInt($('.source').css('padding-left')) + parseInt($('.cont-guide').css('padding-left')) + parseInt(tabArea.css('padding-left'))));
		}
		tabScroll(targetActive);

		targetRole.each(function(){ 
			$(this).on('click',function(){
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
}
if( $('.source').length > 0 ) fn_guide_copy(); // 가이드 문서에만 적용