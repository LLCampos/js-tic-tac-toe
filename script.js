// updates view
var render = function() {
    for (var square in board) {
        if (board[square] == "O") {
            $(square).addClass('square-not-empty').find('p').text("O");
        } else if (board[square] == "X") {
            $(square).addClass('square-not-empty').find('p').text("X");
        } else {
            $(square).removeClass('square-not-empty').find('p').text("");
        }
    }
};

var newGame = function() {
    $('.square').off();
    newBoard();
    turn('O');
};

var newBoard = function() {
    board = {
        "#square-1" : "",
        "#square-2" : "",
        "#square-3" : "",
        "#square-4" : "",
        "#square-5" : "",
        "#square-6" : "",
        "#square-7" : "",
        "#square-8" : "",
        "#square-9" : "",
    };
    render();
};

// check if the player with the symbol given in the argument won the game
var checkWinner = function(symbol) {
    if (board["#square-1"] == symbol && board["#square-2"] == symbol && board["#square-3"] == symbol ||
        board["#square-4"] == symbol && board["#square-5"] == symbol && board["#square-6"] == symbol ||
        board["#square-7"] == symbol && board["#square-8"] == symbol && board["#square-9"] == symbol ||
        board["#square-1"] == symbol && board["#square-4"] == symbol && board["#square-7"] == symbol ||
        board["#square-2"] == symbol && board["#square-5"] == symbol && board["#square-8"] == symbol ||
        board["#square-3"] == symbol && board["#square-6"] == symbol && board["#square-9"] == symbol ||
        board["#square-1"] == symbol && board["#square-5"] == symbol && board["#square-9"] == symbol ||
        board["#square-3"] == symbol && board["#square-5"] == symbol && board["#square-7"] == symbol ) {
            return true;
    }
};

// check if there's a draw
var checkDraw = function() {
    var result = true;
    for (var square in board) {
        if (board[square] === "") {
            result = false;
            break;
        }
    }
    return result;
};

var checkEnd = function(symbol) {
    if (checkWinner(symbol)) {
        alert('Player ' + symbol + ' wins!');
        newGame();
    } else if (checkDraw()) {
        alert("It's a draw!");
        newGame();
    }
};

// adds a piece to the square that was clicked
var addPiece = function(event, symbol) {
    var squareClicked = '#' + $(event.target).attr("id");
    board[squareClicked] = symbol;
    render();
};


var turn = function(symbol) {
    $('.square').not('.square-not-empty').on('click', function(event) {
        addPiece(event,symbol);
        checkEnd(symbol);
        if (symbol == "O") {
            symbol = 'X';
        } else {
            symbol = 'O';
        }
    });
};

$(function() {
    newGame();
    $('button').on('click',newGame);
});
