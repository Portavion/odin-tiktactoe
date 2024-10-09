const board = (function () {
    //const board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    const board = [['p','p','o'],['a','b','c'],['d','e',' ']];
    const getBoard = () => board;

    function addCell(playerMark, playerChoice){
        const lineChoice = playerChoice[0];
        const columnChoice = playerChoice[1];

        board[lineChoice][columnChoice] = playerMark;

        return board;
    }

    return {getBoard, addCell};
})();

const display = (function () {

    function board(board){
        cells = board.getBoard();

        console.log('---------------------------------')

        for (let i = 0; i < 3; i++){
            console.log('|' + cells[i][0] + '|' + cells[i][1] + '|' + cells[i][2] + '|');
        }

        console.log('---------------------------------')

    }
    function turnPrompt (player){
        console.log("It's " + player.name + " turn to play. ");

        const lineChoice = prompt("Which line do you want to play (0/1/2): ");
        const columnChoice = prompt("Which column do you want to play(0/1/2): ");
        
        return[lineChoice, columnChoice];
    }

    return{board, turnPrompt};
})();

const gameEngine = (function() {
    
    function playTurn (player, board){
        let validChoice = 0;
        let cellChoice ='';

        while (!validChoice){
            cellChoice = display.turnPrompt(player);
            validChoice = checkChoice(cellChoice, board.getBoard());
        }

        board.addCell(player.playerMark, cellChoice);
        display.board(board);
        checkEngine(board.getBoard());
    }

    function checkChoice(cellChoice, board){
        boardValue = board[cellChoice[0]][cellChoice[1]];

        if (boardValue != ' '){
            console.log('wrong choice');
            return 0;
        }

        else {
            console.log('valid choice');
            return 1;
        }
    }

    function checkEngine(board){
        let gameOver = [0,' '];

        gameOver = checkLine(board);

        if (gameOver[0] === undefined){
            gameOver = checkColumn(board);
        }
        //check diagonals
        if (gameOver[0] === undefined){
            gameOver = checkDiagonal(board);
        }

        //check draw
        if (gameOver[0]===undefined){
            gameOver = checkDraw(board);
        }

        if(gameOver[0]===1){
            console.log("GAME OVER! " + gameOver[1] + " wins!");
        }
        else if(gameOver[0]===2){
            console.log("GAME OVER! It's a draw!");
        }

    }

    function checkLine(board){
        for (let i = 0; i < 2; i++){
            if ((board[i][0]===board[i][1]) & (board[i][0]===board[i][2])){
                return [1, board[i][0]];
            }
            else {
                return 0;
            }
        }
    }

    function checkColumn(board){
        for (let i = 0; i < 2; i++){
            if ((board[0][i]===board[1][i]) & (board[0][i]===board[2][i])){
                return [1, board[0][i]];
            }
            else {
                return 0;
            }
        }
    }

    function checkDiagonal(board){
        
        if ((board[0][0]===board[1][1]) & (board[0][0]===board[2][2])){
            return [1, board[1][1]];
        }
        else if ((board[0][2]===board[1][1]) & (board[0][2]===board[2][0])){
            return [1, board[1][1]];
        }
        else{
            return 0;
        }
    }

    function checkDraw(board){
        console.log('check draw');
        if((board[0][0]===' ')||(board[0][1]===' ')||(board[0][1]===' ')){
            return 0;
        }
        else if((board[1][0]===' ')||(board[1][1]===' ')||(board[1][1]===' ')){
            return 0;
        }
        else if((board[2][0]===' ')||(board[2][1]===' ')||(board[2][1]===' ')){
            return 0;
        }
        else {
            return [2, ' '];
        }
    }

    return{playTurn};
})();

function player (name, playerMark) {
    this.name = name;
    this.playerMark = playerMark;
}

player1 = new player('Player 1', 'X');
player2 = new player('Player 2', 'O');

console.log('Start:')
display.board(board);

gameEngine.playTurn(player1, board);
gameEngine.playTurn(player2, board);
gameEngine.playTurn(player1, board);
gameEngine.playTurn(player2, board);
gameEngine.playTurn(player1, board);
gameEngine.playTurn(player2, board);
gameEngine.playTurn(player1, board);
gameEngine.playTurn(player2, board);
gameEngine.playTurn(player1, board);
gameEngine.playTurn(player2, board);
gameEngine.playTurn(player1, board);
gameEngine.playTurn(player2, board);


