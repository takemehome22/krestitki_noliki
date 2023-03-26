//местонахождение всех квадратиков
const gameBoard = document.querySelector("#gameboard");
//текст
const infoDisplay = document.querySelector("#info");
//все квадратики
const startCells = [
    "", "", "", "", "", "", "", "", "",
]
//первый ход за кружочком 
let go = "circle";
//стартовый текст
infoDisplay.textContent = 'Тыкай';
//функция для заполнения поля
function createBoard() {
    startCells.forEach((index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        //тут типа прописал айдишники для ячеек
        cellElement.id = index;
        //создаем клик по каждой ячейке
        cellElement.addEventListener('click', addGo);
        //отправляем результат на страницу
        gameBoard.append(cellElement);
    })
}
createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go); //сдесь добавляеться крестик либо нолик когда жмякаем
    e.target.append(goDisplay);

    //эта конструкция для чередования элементов
    go = go === "circle" ? "cross" : "circle";

    infoDisplay.textContent = "Ты поставил " + go ;

    //это что бы нельзя было несколько обьектов в одну ячейку засунуть
    e.target.removeEventListener("click",addGo);
    
    //проверка при каждом действии на победу
    checkScore();
}

function checkScore(){
    //получаем все квадратики
    const allSquares = document.querySelectorAll('.square');
    //победные комбинации
    const winningCombos = [
        [0,1,2],[3,4,5,],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    //проверочка для нолика
    winningCombos.forEach(array =>{
        // здесь рассматривается каждый элемент выигрышной позиции и сравнивается с классом круг
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));//если все дочерние элементы содержат класс круг 
        //этот if срабатывает если выигрышная позиция найдена и вернулось true
        if(circleWins){
            infoDisplay.textContent = "Кружочки вин!";
            //удаление для каждоко квадрата через костыль ))) тут мы копируем старый и вставляем его же но уже без фонкции клика)))
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        return;
        }
    })
    //проверочка для крестика
    winningCombos.forEach(array =>{
         // здесь рассматривается каждый элемент выигрышной позиции и сравнивается с классом крестик
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
      //этот if срабатывает если выигрышная позиция найдена и вернулось true
        if(crossWins){
            infoDisplay.textContent = "Крестики вин!";
             //удаление для каждоко квадрата через костыль ))) тут мы копируем старый и вставляем его же но уже без фонкции клика)))
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        return;
        }
    })
}