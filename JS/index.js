
const game_item = document.querySelectorAll(".game_item");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame() {
    game_item.forEach(game_item => game_item.addEventListener("click", giClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function giClicked() {
    const sqIndex = this.getAttribute("sqIndex");

    if (options[sqIndex] != "" || !running){
        return;
    }
    updateSq(this, sqIndex);
    checkWinner();
}

function updateSq(game_item,sqIndex) {
    (options[sqIndex] = currentPlayer);
    (game_item.textContent = currentPlayer);
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let matchWon = false;

    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const game_itemA = options[condition[0]];
        const game_itemB = options[condition[1]];
        const game_itemC = options[condition[2]];

        if(game_itemA =="" || game_itemB == "" || game_itemC == ""){
        continue;
        }
        if(game_itemA == game_itemB && game_itemB == game_itemC){
            matchWon = true;
        break;
        }
    }




    if (matchWon) {
        statusText.textContent = `${currentPlayer} WINS!`;
        running = false;
    } else if (!options.includes ("")){
        statusText.textContent = 'TIE!';
        running = false
    } else {
        changePlayer();
    }
}

function restartGame() { 
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    game_item.forEach(game_item => game_item.textContent = "");
    running = true;
}