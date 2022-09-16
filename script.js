"use strict";

let p1Turn = true;
let gameOver = false;

const squares = document.querySelectorAll(".square");

squares.forEach((square, index) => {
    square.addEventListener("click", placeSquare);
});

function toggleTurn() {
    p1Turn = !p1Turn;
}

function placeSquare(square) {
    if (gameOver) {
        return;
    }
    // Can I even put an X or O
    let squareChar = square.target.innerHTML;
    if (squareChar.match(/[XO]/)) {
        console.log("already has a square")
        return;
    }

    // whose turn is it?
    if (p1Turn === true) {
        square.target.innerHTML = "X";
        square.target.classList.add("anim");
    } else {
        square.target.innerHTML = "O";
        square.target.classList.add("anim");
    }
    toggleTurn();

    // check if anyone won the game
    if (checkWinner()) {
        gameOver = true;
        if (p1Turn) {
            document.getElementById("output").innerHTML = "player 2 won!";
        } else {
            document.getElementById("output").innerHTML = "player 1 won!";
        }
        document.getElementById("output").classList.remove("hidden");
    }
}

function clearBoard() {
    squares.forEach(target => {
        target.innerHTML = "";
        target.classList.remove("anim");
    });
    // Array.from(squares).forEach(square => {
    //     square.innerHTML = "";
    //     square.classList.remove("anim");
    // });
    document.getElementById("output").classList.add("hidden");
    p1Turn = true;
    gameOver = false;
}

function checkWinner() {
    let squares = document.getElementsByClassName("square");
    console.log(squares);
    let board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = squares[i].innerHTML;
    }
    console.log(board);
    let boardLines = ["", "", "", "", "", "", "", "", ""];
    for (let i = boardLines; i < boardLines.length; i++) {
        boardLines[i] = "";
    }
    for (let i = 0; i < 3; i++) {
        boardLines[0] += board[i];
        boardLines[1] += board[i + 3];
        boardLines[2] += board[i + 6];
        boardLines[3] += board[i * 3];
        boardLines[4] += board[(i * 3) + 1];
        boardLines[5] += board[(i * 3) + 2];
        boardLines[6] += board[i * 4];
        boardLines[7] += board[(i * 2) + 2];
    }
    console.log(board[0]);
    console.log(boardLines);
    var winnerExists = false;
    boardLines.forEach(line => {
        if (line.match(/(XXX|OOO)/g)) {
            winnerExists = true;
            return;
        }
    });
    return winnerExists;
}