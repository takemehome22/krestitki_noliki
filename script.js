const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = [
    "", "", "", "", "", "", "", "", "",
]
let go = "circle";
infoDisplay.textContent = 'Бот идет первым';

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index //тут типа прописал айдишники для ячеек
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    })
}
createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go); //сдесь добавляеться крестик когда жмякаем
    e.target.append(goDisplay);
    go = go === "circle" ? " cross" : " circle";
    infoDisplay.textContent = "it s now" + go + " s go";
    e.target.removeEventListener("click",addGo);
}
