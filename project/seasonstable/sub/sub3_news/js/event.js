$(function(){
    $(".joinNaver a:first>img:first").on("click", function(){ 
        $(this).next().animate({
            width: "55%",
            height: "55%"
        },1000);
        $(this).next().stop(true,true).show();
        $(".joinNaver a:first p>q").show();
        return false;
    });

    $(".joinNaver a:first>img:last").on("click", function(){ 
        $(this).fadeOut(1000);
        $(".joinNaver a:first p>q").hide();
        $(this).prev().show();
        return false;
    });

    $(".joinNaver a:last>img:first").on("click", function(){ 
        $(this).next().animate({ 
            width: "55%",
            height: "55%"
        },1000);
        $(this).next().stop(true,true).show();
        $(".joinNaver a:last p>q").show();
        return false;
    });

    $(".joinNaver a:last>img:last").on("click", function(){ 
        $(this).fadeOut(1000);
        $(".joinNaver a:last p>q").hide();
        $(this).prev().show();
        return false;
    });

    $(".aloneHangawi a:first>img:first").on("click", function(){ 
        $(this).next().animate({ 
            width: "55%",
            height: "55%"
        },1000);
        $(this).next().stop(true,true).show();
        $(".aloneHangawi a:first p>q").show();
        return false;
    });

    $(".aloneHangawi a:first>img:last").on("click", function(){ 
        $(this).fadeOut(1000);
        $(".aloneHangawi a:first p>q").hide();
        $(this).prev().show();
        return false;
    });

    $(".aloneHangawi a:last>img:first").on("click", function(){ 
        $(this).next().animate({ 
            width: "55%",
            height: "55%"
        },1000);
        $(this).next().stop(true,true).show();
        $(".aloneHangawi a:last p>q").show();
        return false;
    });

    $(".aloneHangawi a:last>img:last").on("click", function(){ 
        $(this).fadeOut(1000);
        $(".aloneHangawi a:last p>q").hide();
        $(this).prev().show();
        return false;
    });
    
    $(window).resize(function(){
        var width = window.outerWidth;
        
        if (width < 767) {
            $(".joinNaver a:first p>q").show();
            $(".joinNaver a:last p>q").show();
            $(".aloneHangawi a:first p>q").show();
            $(".aloneHangawi a:last p>q").show();
        }else { 
            $(".joinNaver a:first>img:last").hide();
            $(".joinNaver a:last>img:last").hide();
            $(".aloneHangawi a:first>img:last").hide();
            $(".aloneHangawi a:last>img:last").hide();
            
            $(".joinNaver a:first p>q").hide();
            $(".joinNaver a:last p>q").hide();
            $(".aloneHangawi a:first p>q").hide();
            $(".aloneHangawi a:last p>q").hide();
        }
    });
});








   