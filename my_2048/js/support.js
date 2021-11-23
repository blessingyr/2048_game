function getPosLeft(i, j) {
    return 100 * j + 20 * (j + 1)
}
function getPosTop(i, j) {
    return 100 * i + 20 * (i + 1)
}
function getNumberBgcolor(x) {
    switch (x) {
        case 2:            
            return "#f2b179";
        case 4:            
            return "#f59563";
        case 8:return "#f67c5f"; 
        case 16:return "#f65e3b"; 
        case 32:return "#edcf72"; 
        case 64:return "#edcc61"; 
        case 128:return "#9c0"; 
        case 256:return "#33b5e5"; 
        case 512:return "#09c"; 
        case 1024:return "#a6c"; 
        case 2048:return "#93c"; 
    }
    return "white";
}

function getNumberColor(x) {
    if (x <= 4)
        return "#776e65";
    else
        return "white";
}

function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++){
            if (board[i][j] == 0)
                return false;
        }
    return true;
}

function canMoveLeft(board){
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++){
            if (board[i][j] != 0 ) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                    return true;
            }
        }
    return false;
}
function canMoveUp(board) {
    for (var i = 1; i < 4; i++)
        for (var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
            }
        }
    return false;
}
function canMoveDown(board) {
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--){
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1])
                    return true;
            }
        }
    return false;
}
function noObstacal(board, x, y, tox, toy){
    if (x == tox) {
        for (var j = y + 1; j < toy; j++){
            if (board[x][j] != 0)
                return false;
        }
        return true;
    }
    else if (y == toy) {
        for (var i = x + 1; i < tox; i++){
            if (board[i][y] != 0)
                return false;
        }
        return true;
    }
    
}

function noMove(board) {
    if (canMoveDown(board) || canMoveLeft(board) || 
        canMoveUp(board) || canMoveRight(board)) {
        return false;
    }
    return true;
}