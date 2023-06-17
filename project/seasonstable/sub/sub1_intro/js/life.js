$(function(){
    $(".top").click(function(){
        $(".farmList").animate({"top":"-500px"}, 500, function(){
            $(".farmList").append($(".farmList li:first-child")).css({ "top":"0" });
        });
    });

    $(".bottom").click(function(){
        $(".farmList").prepend($(".farmList li:last-child")).css({"top":"-500px"}).animate({"top":"0"})
    });
});