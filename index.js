const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winnigPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function initGame() {
    currentPlayer = "x";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        box.classList=`box box${index+1}`;

    })
}
initGame();

function swapTurn() {
    if (currentPlayer === "x") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "x";
    }
    gameInfo.innerText = `Current Player-${currentPlayer}`;
}


function checkGameover() {
    let ans = "";
    winnigPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[1]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]])
            && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if (gameGrid[position[0]] === "x")
                ans = "x";

            else
                ans = "0";

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
    });
    if (ans != "") {
        gameInfo.innerText = `winner player - ${ans}`;
        newGameBtn.classList.add("active");
        return;

    }

    let fillcount = 0;
    gameGrid.forEach((box)=>{
        if(box !== "")
            fillcount++;

    });

    if(fillcount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameover();

    }

}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);


