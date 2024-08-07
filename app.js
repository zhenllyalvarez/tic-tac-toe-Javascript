const gameBoard = document.querySelector("#gameboard");
const gameInfo = document.querySelector("#info");
const winner = document.querySelector("#winnerMessage");
let start = "circle";
let startCells = [
    "", "", "",
    "", "", "",
    "", "", ""
]

gameInfo.textContent = "Circle goes first!";

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElements = document.createElement("div");
        cellElements.classList.add("square");
        cellElements.id = index;
        cellElements.addEventListener("click", addElement);
        gameBoard.append(cellElements);
    });
}

createBoard();


function addElement(e) {
    const elementDisplay = document.createElement("div");
    elementDisplay.classList.add(start);
    e.target.append(elementDisplay);
    start = start ===  "circle" ? "cross" : "circle";
    gameInfo.textContent = "It is " + start + "'s turn";
    e.target.removeEventListener("click", addElement);
    checkScore();
}

function checkScore() {
    const allSqaures = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [2, 4, 6],
        [1, 4, 7],
        [0, 3, 6],
        [2, 5, 8],
    ];

    winningCombos.forEach((array) => {
        const circleWins = array.every((cell) => 
            allSqaures[cell].firstChild?.classList.contains("circle")   
        );

        if(circleWins) {
            winner.textContent = "Circle Wins!👏";
            gameInfo.textContent = "";

            allSqaures.forEach((square) => {
                square.replaceWith(square.cloneNode(true));
            });
            return;
        }
    })
    

    winningCombos.forEach((array) => {
        const crossWin = array.every((cell) => 
            allSqaures[cell].firstChild?.classList.contains("cross")
        );

        if(crossWin) {
            winner.textContent = "Square Wins!👏";
            gameInfo.textContent = ""

            allSqaures.forEach((square) => {
                square.replaceWith(square.cloneNode(true));
            });
            return;
        }
    })
}

function resetGame() {
    const button = document.getElementById("restart");
    button.addEventListener("click", () => {
        startCells = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
        start = "circle";
    });
    
    console.log(startCells);
    console.log(start);
    checkScore();
}