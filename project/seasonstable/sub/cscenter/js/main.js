$(function(){
    // 햄버거 버튼
    $(".hamburger-button").click(function(ev){
        ev.preventDefault();
        $(this).toggleClass("active");
        $(".mobileSideMenu").slideToggle();
    });

    // 모바일 메뉴 토글
    $(".mainMenuList>li").eq(0).click(function(){
        $(".sm").eq(0).slideToggle();
    });
    $(".mainMenuList>li:eq(0)>a").on("click focus", function(){
        $(this).addClass("on").on("blur", function(){
            $(this).removeClass("on")
            $(".sm").eq(0).slideUp();
        });
    });
    
    $(".mainMenuList>li:nth-child(2)>a").click(function(){
        $(".subMenu2").slideToggle();
    });
    $(".mainMenuList>li:nth-child(2)>a").on("click focus", function(){
        $(this).addClass("on").on("blur", function(){
            $(this).removeClass("on")
            $(".subMenu2").slideUp();
        });
    });

    $(".mainMenuList>li:nth-child(3)>a").click(function(){
        $(".subMenu3").slideToggle();
    });
    $(".mainMenuList>li:nth-child(3)>a").on("click focus", function(){
        $(this).addClass("on").on("blur", function(){
            $(this).removeClass("on")
            $(".subMenu3").slideUp();
        });
    });

    $(".mainMenuList>li:nth-child(4)>a").click(function(){
        $(".subMenu4").slideToggle();
    });
    $(".mainMenuList>li:nth-child(4)>a").on("click focus", function(){
        $(this).addClass("on").on("blur", function(){
            $(this).removeClass("on")
            $(".subMenu4").slideUp();
        });
    });

    $(".mainMenuList>li:nth-child(5)>a").click(function(){
        $(".subMenu5").slideToggle();
    });
    $(".mainMenuList>li:nth-child(5)>a").on("click focus", function(){
        $(this).addClass("on").on("blur", function(){
            $(this).removeClass("on")
            $(".subMenu5").slideUp();
        });
    });

    /*
    // 메인 메뉴 토글
    $(".menu1").on("click focus", function(){
        $(".menuCont01").show();
        $(".menuSet menuCont").not(".menuCont01").hide();
        $(this).addClass("menuOn");
        $(".contentMenuBar .cMenu").not(this).removeClass("menuOn");
    });
    
    $(".menu2").on("click focus", function(){
        $(".menuCont02").show();
        $(".menuSet menuCont").not(".menuCont02").hide();
        $(this).addClass("menuOn");
        $(".contentMenuBar .cMenu").not(this).removeClass("menuOn");
    });
    
    $(".menu3").on("click focus", function(){
        $(".menuCont03").show();
        $(".menuSet menuCont").not(".menuCont03").hide();
        $(this).addClass("menuOn");
        $(".contentMenuBar .cMenu").not(this).removeClass("menuOn");
    });
    
    $(".menu4").on("click focus", function(){
        $(".menuCont04").show();
        $(".menuSet menuCont").not(".menuCont04").hide();
        $(this).addClass("menuOn");
        $(".contentMenuBar .cMenu").not(this).removeClass("menuOn");
    });

    $(".menu1").click(); // 문서가 실행되면, 첫 번째 메뉴에 마우스 클릭해 놓은 이벤트 강제 실행 부분

    // TOP 버튼
    $("#top").click(function(){
        $(body).animate({scrollTop:0}, 1000);
    });
    */
});