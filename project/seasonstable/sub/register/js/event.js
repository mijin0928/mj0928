$(function(){
    $(".joinNaver a:first-of-type>img:first-of-type").on("click", function(){ 
        $(this).next().animate({
            width: "55%",
            height: "55%"
        },1000);
        $(this).next().stop(true,true);

        $(".joinNaver a:first-of-type>img:last-of-type, .joinNaver a:first-of-type p>q, .joinNaver a:first-of-type p>q::before").show();
        return false;
    });

    $(".joinNaver a:first-of-type>img:last-of-type").on("click", function(){ 
        $(this).fadeOut(1000);
        $(".joinNaver a:first-of-type p>q, .joinNaver a:first-of-type p>q::before").hide();
        $(this).prev().show();
        return false;
    });

    $(".joinNaver a:last-of-type>img:first-of-type").on("click", function(){ 
        $(this).next().animate({ 
            width: "55%",
            height: "55%"
        },1000);
        $(this).next().stop(true,true);

        $(".joinNaver a:last-of-type>img:last-of-type, .joinNaver a:last-of-type p>q, .joinNaver a:last-of-type p>q::before").show();
        return false;
    });

    $(".joinNaver a:last-of-type>img:last-of-type").on("click", function(){ 
        $(this).fadeOut(1000);
        $(".joinNaver a:last-of-type p>q, .joinNaver a:last-of-type p>q::before").hide();
        $(this).prev().show();
        return false;
    });

    $(".aloneHangawi a:first-of-type>img:first-of-type").on("click", function(){ 
        $(this).next().animate({ 
            width: "55%",
            height: "55%"
        },1000);
        $(this).next().stop(true,true);

        $(".aloneHangawi a:first-of-type>img:last-of-type, .aloneHangawi a:first-of-type p>q, .aloneHangawi a:first-of-type p>q::before").show();
        return false;
    });

    $(".aloneHangawi a:first-of-type>img:last-of-type").on("click", function(){ 
        $(this).fadeOut(1000);
        $(".aloneHangawi a:first-of-type p>q, .aloneHangawi a:first-of-type p>q::before").hide();
        $(this).prev().show();
        return false;
    });

    $(".aloneHangawi a:last-of-type>img:first-of-type").on("click", function(){ 
        $(this).next().animate({ 
            width: "55%",
            height: "55%"
        },1000);
        $(this).next().stop(true,true);

        $(".aloneHangawi a:last-of-type>img:last-of-type, .aloneHangawi a:last-of-type p>q, .aloneHangawi a:last-of-type p>q::before").show();
        return false;
    });

    $(".aloneHangawi a:last-of-type>img:last-of-type").on("click", function(){ 
        $(this).fadeOut(1000);
        $(".aloneHangawi a:last-of-type p>q, .aloneHangawi a:last-of-type p>q::before").hide();
        $(this).prev().show();
        return false;
    });
});







   