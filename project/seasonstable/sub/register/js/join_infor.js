$(function(){ 
    $(".basicInfor li:last a").on("click", function(){ 
        $("p").toggle();
        return false;
    });
});

    function check(){ 
    var join = document.join;

    if(!join.userName.value) { 
        alert("이름을 입력해주세요");
        join.userName.focus();
        return;
    }

    if(!join.men.checked) { 
        if(!join.women.checked){ 
            alert("성별을 선택해주세요");
            join.men.focus();
            join.women.focus();
            return;
        }
    }

    if(!join.userId.value) { 
        alert("아이디를 입력해주세요");
        join.userId.focus();
        return;
    }

    if(!join.pw.value) { 
        alert("비밀번호를 입력해주세요");
        join.pw.focus();
        return;
    }

    if(!join.pwCheck.value) { 
        alert("비밀번호를 확인해주세요");
        join.pwCheck.focus();
        return;
    }

    if(!join.email.value) { 
        alert("이메일 주소를 입력해주세요");
        join.email.focus();
        return;
    }

    if(!join.number.value) { 
        alert("전화번호를 입력해주세요");
        join.number.focus();
        return;
    }

    location.href="join_completed.html";
}

$(function(){ 
    $("#emailInfor").change(function(){
        if($("#emailInfor").is(":checked")){
            $("p").show();
        }
        else{
            $("p").hide();
        }
    });

    $("#sms").change(function(){
        if($("#sms").is(":checked")){
            $("p").show();
        }
        else{
            $("p").hide();
        }
    });

    $( "#emailAddress" ).change(function(){
        $("#emailAdBox").val( $("#emailAddress").val());
    });
});
