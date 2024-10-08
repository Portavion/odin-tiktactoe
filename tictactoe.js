const board = (function () {
    const board = [['','',''],['','',''],['','','']]

    const getBoard = () => board;

    function addCell(playerMark, playerChoice){
        const lineChoice = playerChoice[0];
        const columnChoice = playerChoice[1];

        //let newBoard = [...getBoard()];

        board[lineChoice][columnChoice] = playerMark;

        return board;
    }
    return {getBoard, addCell};
})();

const display = (function () {

    function board(board){
        console.log(board.getBoard());
    }


    return{board};
})();


console.log('Start:')
display.board(board);

board.addCell('x',[0,0]);
display.board(board);