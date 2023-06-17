$(function(){
    $(".seasonTxt .off1").click(function(){
        $(".off1").hide();
        $(".off2").show();
        $(".off3").show();
        $(".off4").show();

        $(".select1").show();
        $(".select2").hide();
        $(".select3").hide();
        $(".select4").hide();

        $(".selectImg1").fadeIn();
        $(".selectImg2").fadeOut();
        $(".selectImg3").fadeOut();
        $(".selectImg4").fadeOut();
    });

    $(".seasonTxt .off2").click(function(){
        $(".off2").hide();
        $(".off1").show();
        $(".off3").show();
        $(".off4").show();

        $(".select2").show();
        $(".select1").hide();
        $(".select3").hide();
        $(".select4").hide();

        $(".selectImg2").fadeIn();
        $(".selectImg1").fadeOut();
        $(".selectImg3").fadeOut();
        $(".selectImg4").fadeOut();
    });

    $(".seasonTxt .off3").click(function(){
        $(".off3").hide();
        $(".off1").show();
        $(".off2").show();
        $(".off4").show();

        $(".select3").show();
        $(".select1").hide();
        $(".select2").hide();
        $(".select4").hide();

        $(".selectImg3").fadeIn();
        $(".selectImg1").fadeOut();
        $(".selectImg2").fadeOut();
        $(".selectImg4").fadeOut();
    });

    $(".seasonTxt .off4").click(function(){
        $(".off4").hide();
        $(".off1").show();
        $(".off2").show();
        $(".off3").show();

        $(".select4").show();
        $(".select1").hide();
        $(".select2").hide();
        $(".select3").hide();
        
        $(".selectImg4").fadeIn();
        $(".selectImg1").fadeOut();
        $(".selectImg2").fadeOut();
        $(".selectImg3").fadeOut();
    });
});