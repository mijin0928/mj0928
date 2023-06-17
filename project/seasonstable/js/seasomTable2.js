$(function(){
    $(".seasonTxt .off1").click(function(){
        $(".off1 img").attr({ "src" : "images/main/springSelect.png" });
        $(".off2 img").attr({ "src" : "images/main/summer3.png" });
        $(".off3 img").attr({ "src" : "images/main/fall3.png" });
        $(".off4 img").attr({ "src" : "images/main/winter3.png" });
        $(".seasonImg img").attr({ "src" : "images/main/spring2.jpg" });
    });

    $(".seasonTxt .off2").click(function(){
        $(".off1 img").attr({ "src" : "images/main/spring3.png" });
        $(".off2 img").attr({ "src" : "images/main/summerSelect.png" });
        $(".off3 img").attr({ "src" : "images/main/fall3.png" });
        $(".off4 img").attr({ "src" : "images/main/winter3.png" });
        $(".seasonImg img").attr({ "src" : "images/main/summer2.jpg" });
    });

    $(".seasonTxt .off3").click(function(){
        $(".off1 img").attr({ "src" : "images/main/spring3.png" });
        $(".off2 img").attr({ "src" : "images/main/summer3.png" });
        $(".off3 img").attr({ "src" : "images/main/fallSelect.png" });
        $(".off4 img").attr({ "src" : "images/main/winter3.png" });
        $(".seasonImg img").attr({ "src" : "images/main/fall2.jpg" });
    });

    $(".seasonTxt .off4").click(function(){
        $(".off1 img").attr({ "src" : "images/main/spring3.png" });
        $(".off2 img").attr({ "src" : "images/main/summer3.png" });
        $(".off3 img").attr({ "src" : "images/main/fall3.png" });
        $(".off4 img").attr({ "src" : "images/main/winterSelect.png" });
        $(".seasonImg img").attr({ "src" : "images/main/winter2.jpg" });
    });
});