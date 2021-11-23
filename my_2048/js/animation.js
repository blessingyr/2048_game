function showNumberWithAnimation(x, y, number) {
    var cellNumber = $("#number-" + x + "-" + y);
    cellNumber.css("background-color", getNumberBgcolor(number));
    cellNumber.css("color", getNumberColor(number));
    cellNumber.text(number);
    cellNumber.animate({
        width: 100,
        height: 100,
        top: getPosTop(x, y),
        left: getPosLeft(x, y)
    }, 50);
}

function moveAnimation(x,y,tox,toy) {
    cellNumber = $("number-" + x + "-" + y);
    cellNumber.animate({
        width: 100,
        height: 100,
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}
function updateScore(score) {
    $("#score").text(score);
    
}