$(function(){ 
    $(".termsAgree a").on("click", function(){ 
        $(".termsAgree>.txt, .termsAgree a:first>img, .termsAgree a:last>img").toggle();
        return false;
    });

    $(".personalInfor a").on("click", function(){ 
        $(".personalInfor>.txt, .personalInfor a:first>img, .personalInfor a:last>img").toggle();
        return false;
    });
});

    function allA() {
        if ($("#allAgree").is(':checked')) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    } 

    function check(){ 
    var join = document.join;
    if(!join.termsOfUse.checked) { 
        alert("이용약관에 동의해주세요");
        join.termsOfUse.focus();
        return;
    }

    if(!join.personalInfor.checked) { 
        alert("개인정보 수집 및 이용에 동의해주세요");
        join.personalInfor.focus();
        return;
    }
    location.href="join_infor.html"; 
}