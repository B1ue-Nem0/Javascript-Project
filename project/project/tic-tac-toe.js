/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');
const { brotliCompress } = require('zlib');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    console.log(' ' + board[1] + ' | '+ board[2] + ' | '+ board[3] + '\n' +
                '------------\n'+
                ' ' + board[4] + ' | '+ board[5] + ' | '+ board[6] + '\n' +
                '------------\n'+
                ' ' + board[7] + ' | '+ board[8] + ' | '+ board[9] + '\n' 
    );    
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    position = parseInt(position);// convert the position into integer
    if (position < 1 || position > 9){
        return false;
    } else {
        if (board[position] !== ' '){
            return false;
        }else {
            return true;
        }
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for( let i=0; i < winCombinations.length; i++){
        const combinations = winCombinations[i];
        let winner = true;
        for ( let j=0; j< combinations.length; j++){
            const winposition = combinations[j];
            if (board[winposition] !== player){
                winner = false;
                break;
            }
        }
        if (winner){
            return true;
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for( let position in board){
        if (board[position] === ' '){
            return false;
        }
    }
    return true;
}
// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position;

    while(true){
        position = parseInt(prompt( 'Okay, ' + player + ' turn, please enter your move(position from 1-9): '));
        if (validateMove(position)){
            break;
        }
    }

    markBoard(position, player);
    printBoard();

    if(checkWin(player)){
        console.log( player + ' wins');
        return true;
    } else if ( checkFull()){
        console.log( 'It`s a tie');
        return true;
    }
    return false;
}


// entry point of the whole program
//add a function for the getting the game reset
function playTheGame(){
    console.log('Game started: \n\n' +
         ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');

    let winnerIdentified = false
    let currentTurnPlayer = 'X'

    while (!winnerIdentified){
        if (playTurn(currentTurnPlayer)){
            winnerIdentified = true;
            console.log(' Gameeeeeee Over!');
        } else {
            currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
        }
        // feel free to add logic here if needed, e.g. announcing winner or tie
    }
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
function Newgame(){ //clear the game position to zero
    for (let key in board){
        board[key] = ' ';
    }
}
do{
    Newgame();
    playTheGame();
    var playAgain = prompt("Do you want to play again? (YES/NO): ").toUpperCase();
} while (playAgain === 'yes' || playAgain === "YES");

console.log("Okay, Thanks for playing!");
