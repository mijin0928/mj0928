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
}
if( $('.source').length > 0 ) fn_guide_copy(); // 가이드 문서에만 적용
