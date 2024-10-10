const board = (function () {
    const board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    //const board = [['p','p','o'],['a','b','c'],['d','e',' ']];
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

    function printBoard(board){
        cells = board.getBoard();
        boardContainer = document.querySelector('.boardContainer');
        boardContainer.innerHTML = '';
        
        let cellCount = 0;
        for (let i = 0; i < 3; i++){
            
            for (let j = 0; j < 3; j++){
                const newCell = document.createElement('div');
                newCell.className = 'cell';
                newCell.id = 'c'+ cellCount;

                const newCellText = document.createTextNode(cells[i][j]);

                newCell.appendChild(newCellText);
                boardContainer.appendChild(newCell);
                if (cells[i][j]===' '){
                    document.querySelector(`#c${cellCount}`).addEventListener('click', updateCellClick);
                }
                cellCount ++;
            }
        }
    }

    function updateCellClick (event){
        cellChoice = event.target.id;
        document.querySelector(`#${cellChoice}`).textContent = document.querySelector('.playerDisplay').id;
        switch (cellChoice) {
            case 'c0':
                cells[0][0] = document.querySelector('.playerDisplay').id;
                break;
            case 'c1':
                cells[0][1] = document.querySelector('.playerDisplay').id;
                break;
            case 'c2':
                cells[0][2] = document.querySelector('.playerDisplay').id;
                break;
            case 'c3':
                cells[1][0] = document.querySelector('.playerDisplay').id;
                break;
            case 'c4':
                cells[1][1] = document.querySelector('.playerDisplay').id;
                break;
            case 'c5':
                cells[1][2] = document.querySelector('.playerDisplay').id;
                break;
            case 'c6':
                cells[2][0] = document.querySelector('.playerDisplay').id;
                break;
            case 'c7':
                cells[2][1] = document.querySelector('.playerDisplay').id;
                break;
            case 'c8':
                cells[2][2] = document.querySelector('.playerDisplay').id;
                break;
        }     

        gameController.play(board);
    }

    function turnPrompt (player){
        playerDisplay = document.querySelector('.playerDisplay')
        playerDisplay.id = player.playerMark;
        playerDisplay.textContent = `It's ${player.name}'s turn to play`;
    }

    function endGame(gameEndandWinner){
        if(gameEndandWinner[0]===1){
            window.alert("GAME OVER! " + gameEndandWinner[1] + " wins!");
        }
        else if(gameEndandWinner[0]===2){
            window.alert("GAME OVER! It's a draw!");
        }
    }
    return{printBoard, turnPrompt, endGame};
})();

const gameController = (function(board) {
    player1 = new player('Player 1', 'X');
    player2 = new player('Player 2', 'O');

    playerTurn = 0;

    let gameEndandWinner = [0,' '];
    
    function playTurn (board){
        board.addCell(player.playerMark, cellChoice);
        display.board(board);
    }

    function play(board){
            gameEndandWinner = checkEngine.checkGameEnd(board.getBoard());
        
        if (playerTurn === 1){
            display.printBoard(board);
            display.turnPrompt(player1);
            display.endGame(gameEndandWinner);
            
            playerTurn = 2;
        }
        else if (playerTurn === 0){
            display.printBoard(board);
            display.turnPrompt(player1);
            playerTurn = 2;
        }
        else {
            display.printBoard(board);
            display.turnPrompt(player2);
            display.endGame(gameEndandWinner);
            playerTurn = 1;
        }
        //


   /*     while (gameEndandWinner[0] === 0){
            //playTurn(player1, board);
            display.endGame(gameEndandWinner);
            if (gameEndandWinner[0] === 0){
                playTurn(player2, board);
                display.endGame(gameEndandWinner);
            } 
            
        }*/
    }
    return{play, playTurn};
})();

function player (name, playerMark) {
    this.name = name;
    this.playerMark = playerMark;
}

const checkEngine = (function() {
    function checkChoice(cellChoice, board){
        boardValue = board[cellChoice[0]][cellChoice[1]];

        if (boardValue != ' '){
            return 0;
        }

        else {
            return 1;
        }
    }

    function checkGameEnd(board){
        let gameOver = [0,' '];

        gameOver = checkLine(board);

        if (gameOver[0] === 0){
            gameOver = checkColumn(board);
        }
        //check diagonals
        if (gameOver[0] === 0){
            gameOver = checkDiagonal(board);
        }

        //check draw
        if (gameOver[0]===0){
            gameOver = checkDraw(board);
        }
        return gameOver;
        

    }

    function checkLine(board){
        for (let i = 0; i < 2; i++){
            if ((board[i][0]===board[i][1]) & (board[i][0]===board[i][2]) & (board[i][0] != ' ')){
                
                return [1, board[i][0]];
            }
        }
        return [0, ' '];
    }

    function checkColumn(board){
        for (let i = 0; i < 2; i++){
            if ((board[0][i]===board[1][i]) & (board[0][i]===board[2][i]) & (board[0][i] != ' ')){
                return [1, board[0][i]];
            }
            
        }
        return [0, ' '];
    }

    function checkDiagonal(board){
        
        if ((board[0][0]===board[1][1]) & (board[0][0]===board[2][2]) & (board[1][1] != ' ')){
            return [1, board[1][1]];
        }
        else if ((board[0][2]===board[1][1]) & (board[0][2]===board[2][0]) & (board[1][1] != ' ')){
            return [1, board[1][1]];
        }
        else{
            return [0, ' '];
        }
    }

    function checkDraw(board){
        if((board[0][0]===' ')||(board[0][1]===' ')||(board[0][2]===' ')){
            return [0, ' '];
        }
        else if((board[1][0]===' ')||(board[1][1]===' ')||(board[1][2]===' ')){
            return [0, ' '];
        }
        else if((board[2][0]===' ')||(board[2][1]===' ')||(board[2][2]===' ')){
            return [0, ' '];
        }
        else {
            return [2, ' '];
        }
    }

    return {checkChoice, checkGameEnd};
})();


gameController.play(board);



