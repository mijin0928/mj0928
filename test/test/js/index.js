$(document).ready(function(){
    $('.main-slide-box .wrap').slick({
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
    });

    $('.main-slide-box .stop').click(function(){
        $('.main-slide-box .wrap').slick('slickPause');
    });

    $('.news-box.type01 .wrap').slick({
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
    });

    $('.news-box.type01 .stop').click(function(){
        $('.news-box.type01 .wrap').slick('slickPause');
    });

    $('.btn-top').click(function(e){
		$('html, body').animate({scrollTop:0},1000);
		e.preventDefault();
	});
})
