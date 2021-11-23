var board = new Array();
var score = 0;
var isMotified = new Array();
$(document).ready(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //随机生成两个数字
    generateOneNumber();
    generateOneNumber();

}
function init() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++){
            var cell = $("#cell-" + i + "-" + j);
            cell.css('top', getPosTop(i, j));
            cell.css('left', getPosLeft(i, j));
        }      
    
    for (var i = 0; i < 4; i++){
        board[i] = new Array();
        isMotified[i] = new Array();
        for (var j = 0; j < 4; j++){
            board[i][j] = 0;
            isMotified[i][j] = false;
        }
            
    }
    score = 0;
    updateScore(score);
    updateNumber();      
}
function updateNumber() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++){

            $("#grid").append('<div class="number-cell" id="number-' + i + '-' + j + '"></div>');
            var num=$("#number-" + i + "-" + j)
            
            if (board[i][j] == 0) {
                num.css("width", "0px");
                num.css("height", "0px");
                num.css("top", getPosTop(i, j)+50);
                num.css("left", getPosLeft(i, j)+50);
                
            }
            else {
                num.css("width", "100px");
                num.css("height", "100px");
                num.css("top", getPosTop(i, j));
                num.css("left", getPosLeft(i, j));
                
                num.css("background-color", getNumberBgcolor(board[i][j]));
                num.css("color", getNumberColor(board[i][j]));
                
                num.text(board[i][j]);
                num.css("font-size", "60px");
            }
            isMotified[i][j] = false;
        }
    
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    
    //随机生成一个数
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    
    //随机生成一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    
    while (true) {
        if (board[randx][randy] == 0) {
            board[randx][randy] = randNumber;
            break;
        }
        else {
            randx = parseInt(Math.floor(Math.random() * 4));
            randy = parseInt(Math.floor(Math.random() * 4));
        }
    }
    
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) {
                isGameOver();
                setTimeout("generateOneNumber()",203);
            }                  
            break;
        
        case 38: //up
            if (moveUp()) {            
                isGameOver();
                setTimeout("generateOneNumber()",203);
            }
            break;
        
        case 39: //right
            if (moveRight()) {            
                isGameOver();
                setTimeout("generateOneNumber()",203);
            }
            break;
        
        case 40: //down
            if (moveDown()) {            
                isGameOver();
                setTimeout("generateOneNumber()",210);
            }
            break;
    }
});
function isGameOver() {
    if (nospace(board) && noMove(board)) {
        gameOver();
    }
    
}
function gameOver() {
    alert("Game Over!")
}
function moveLeft() {
    if (!canMoveLeft(board))
        return false;
    
    for (var i = 0; i < 4; i++){
        for (var j = 1; j < 4; j++){
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++){
                    if (board[i][k]==0 && noObstacal(board, i, k, i, j)) {
                        board[i][k] = board[i][j];
                        moveAnimation(i, j, i, k);
                        board[i][j] = 0;
                        continue;
                        
                    }
                    else if (board[i][j] == board[i][k] && noObstacal(board, i, k, i, j) && !isMotified[i][k]) {
                        board[i][k] += board[i][j];
                        isMotified[i][k] = true;
                        moveAnimation(i, j, i, k);
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }                
            }
        }
    }
    setTimeout("updateNumber()",200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board))
        return false;
    for (var i = 1; i < 4; i++){
        for (var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++){
                    if (board[k][j] == 0 && noObstacal(board, k, j, i, j)) {
                        moveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noObstacal(board, k, j, i, j) && !isMotified[k][j]) {
                        moveAnimation(i, j, k, j);
                        isMotified[k][j] = true;
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateNumber()",200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board))
        return false;
    
    for (var i = 2; i >= 0; i--){
        for (var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--){
                    if (board[k][j] == 0 && noObstacal(board, i, j, k, j)) {
                        moveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;//important!!
                    }
                    else if (board[k][j] == board[i][j] && noObstacal(board, i, j, k, j) && !isMotified[k][j]){
                        moveAnimation(i, j, k, j);
                        isMotified[k][j] = true;
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateNumber()",200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board))
        return false;
 
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--){
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--){
                    if (board[i][k] == 0 && noObstacal(board,i, j, i, k)) {
                        moveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noObstacal(board,i, j, i, k) && !isMotified[i][k]) {
                        moveAnimation(i, j, i, k);
                        isMotified[i][k] = true;
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    setTimeout("updateNumber()", 200);
    return true;
}