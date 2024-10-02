let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let startGAme = document.querySelector("#startGame");
let start =  document.querySelector("#start");
let form =  document.querySelector(".player-form");
let player1Name = document.getElementById('player1').value;
let player2Name = document.getElementById('player2').value;
let player = document.querySelector("#player");

let turnO = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


player.classList.add("hide");

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            player.innerText = `${player2Name} Turn`;
            box.innerText = "O";
            turnO = false;
        }else{
            player.innerText = `${player1Name} Turn`;
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const showWinner = (winner) => {
    if(winner === "O"){
        msg.innerText = `Winner is ${player1Name}`;
    }else{
        msg.innerText = `Winner is ${player2Name}`;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
for(let pattern of winPatterns){
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val != "" && pos2val != "" && pos3val != ""){
        if(pos1val === pos2val && pos2val===pos3val){
            disableBoxes();
            boxes[pattern[0]].classList.add("winner-boxes");
            boxes[pattern[1]].classList.add("winner-boxes");
            boxes[pattern[2]].classList.add("winner-boxes");
            setTimeout(() => {
                showWinner(pos1val);
                boxes[pattern[0]].classList.remove("winner-boxes");
                boxes[pattern[1]].classList.remove("winner-boxes");
                boxes[pattern[2]].classList.remove("winner-boxes");
            },2000);
           
        }
    }
    
}
};



const resetGame = () => {
    turnO = true;
    for(let box of boxes){
        box.innerText = "";
    }
    enableBoxes();
    msgContainer.classList.add("hide");
}

const newGame = () => {
    enableBoxes();
    for(let box of boxes){
        box.innerText = "";
    }
    msgContainer.classList.add("hide");
    if(turnO)
       player.innerText = `${player1Name} Turn`;
    else
       player.innerText = `${player2Name} Turn`;
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
    }
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const Start = () => {
    form.classList.remove("hide");
}

const StartGame = () => {
    form.classList.add("hide");
    player.classList.remove("hide");
    player.innerText = `${player1Name} Turn`;
}

start.addEventListener("click",Start);

startGame.addEventListener("click",StartGame);
resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",newGame);
