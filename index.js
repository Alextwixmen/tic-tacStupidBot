import whoIsTheWinner from "./modules/whoIsTheWinner.js";
import Draw from "./modules/drawClass.js";
const arrWithCelss = document.querySelectorAll(".gameСell");
const gameField = document.querySelector(".GameField");
const newGameButton = document.querySelector(".newGameButton");
const winnerText = document.querySelector(".winnerText");
const winnerWindow = document.querySelector(".PopUpContent");
const popUp = document.querySelector(".popUp");
const arrWithGameField = [[], [], [], [], [], [], [], [], []];
// наше поле для игры в ввиде массива
// во время хода игрока на нолике будем добавлять 2 на соответствуюее место
// во время хода игрока на крестике будем добавлять 1 на соответствуюшее место
let firstMove = false; // означает, что первый ход еще не был сделан. Сразу после первого хода меняем значение не true.
function whoIsTheNext() {
  //функция на определение того, кто будет делать следующий ход.
  let number = 0;
  arrWithGameField.forEach((element) => {
    number += element.length;
  });
  return number;
}
gameField.addEventListener("click", (clickPlace) => redCrossMove(clickPlace));
//функция, которая обрататывает наши ходи на крестике
function redCrossMove(clickPlace) {
  let cross = new Draw(
    "cross",
    "assets/img/cross.png",
    "270px",
    "270px"
  ).drawMethod();
  let targetOfClick = clickPlace.target;
  let numberOfSquare = clickPlace.target.className.slice(-1); //получаем конкретную цифру квадратика, на который мы кликаеем, который будет соответствовать индексу в массиве arrWithGameField
  if (firstMove == false) {
    firstMove = true;
    targetOfClick.appendChild(cross);
    arrWithGameField[numberOfSquare].push(1);
    smartComputer(numberOfSquare, true);
    return;
  }
  let numberOfTheNextMove = whoIsTheNext(); // если число достигает 8 - игра окончена, так как все подмассивы забиты цифрами, то есть все клетки на поле заполнены крестиками/ноликами
  if (numberOfTheNextMove <= 8) {
    targetOfClick.appendChild(cross);
    arrWithGameField[numberOfSquare].push(1);
    smartComputer(numberOfSquare);
    let winner = whoIsTheWinner(arrWithGameField);
    if (winner == "redCross") {
      showWinner(winner);
      return;
    } else if (winner == "greenCircle") {
      showWinner(winner);
      return;
    } else if (numberOfTheNextMove == 8) {
      showWinner("draw");
      return;
    }
  }
}
function showWinner(winner) {
  popUp.classList.toggle("hidden");
  winnerWindow.classList.add("winnerWindow");
  if (winner == "redCross") {
    winnerText.innerHTML = "Победил крестик";
    return;
  } else if (winner == "greenCircle") {
    winnerText.innerHTML = "Победил кружок";
    return;
  } else {
    winnerText.innerHTML = "Победила Дружба";
    return;
  }
}
newGameButton.addEventListener("click", () => {
  window.location.reload();
});
function smartComputer(placeOfClick, isFirst) {
  let winner = whoIsTheWinner(arrWithGameField);
  if (winner === "redCross" || winner === "greenCircle") return;
  const objWhitVariants = {
    "01": 2,
    12: 0,
    34: 5,
    45: 3,
    67: 8,
    78: 6,
    "03": 6,
    63: 0,
    14: 7,
    74: 1,
    25: 8,
    85: 2,
    58: 2,
    64: 2,
    42: 6,
    "04": 8,
    84: 0,
    "02": 1,
    35: 4,
    68: 7,
    28: 5,
    17: 4,
    "06": 3,
    "08": 4,
    62: 4,
  };
  function isItLastMove() {
    //эта функция нужна только для того, чтоб узнать последний ход на поле
    let number = 0;
    arrWithGameField.forEach((element) => {
      number += element.length;
    });
    return number;
  }
  //проверка на то, что это первый ход крестика и крестик был поставлен именно в центр. В таком случае нужно запустить функцию, которая поставит нулик в один из четырех углов нашего поля
  //0, 2, 6, 8
  if (isFirst && placeOfClick === "4") {
    const cellsIfCrossInCenter = [0, 2, 6, 8];
    function getRandomArrayElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    makeMove(getRandomArrayElement(cellsIfCrossInCenter)); //запускаем функцию с рандомным числом из количества углов поля, которая поставит на это рандомное место зеленый нулик.
  } else if (isFirst) {
    //если это все еще первый ход, но противник поставил крестик не в центр поля, то мы сами занимаем центр.
    makeMove(4);
  } else {
    if (checkTheCrossPosition(2) != undefined) {
      makeMove(checkTheCrossPosition(2));
    } else {
      accumulateInfo();
    }
  }
  function accumulateInfo() {
    let numberForCircle = checkTheCrossPosition(1);
    if (numberForCircle != undefined) {
      if (isPlaceFree(numberForCircle)) {
        makeMove(numberForCircle);
      }
    } else {
      makeRandomMove();
    }
  }
  function makeRandomMove() {
    let randomCell = randomInteger(0, 8);
    let isLastMove = isItLastMove();
    if (isPlaceFree(randomCell)) {
      makeMove(randomCell);
    } else if (isLastMove == 9) {
      return;
    } else {
      makeRandomMove();
    }
  }
  // функция на определение позиции крестика на поле
  function checkTheCrossPosition(typeOfPicture) {
    for (let key in objWhitVariants) {
      if (
        arrWithGameField[key[0]] == typeOfPicture &&
        arrWithGameField[key[1]] == typeOfPicture
      ) {
        if (isPlaceFree(objWhitVariants[key])) {
          return objWhitVariants[key];
        } else {
          continue;
        }
      }
    }
  }
  function makeMove(numberOfCell) {
    let circle = new Draw(
      "circle",
      "assets/img/circle.png",
      "200px",
      "200px"
    ).drawMethod();
    arrWithCelss[numberOfCell].appendChild(circle);
    arrWithGameField[numberOfCell].push(2);
  }
  //функция, которая проверяет, свободное ли место для нолика
  function isPlaceFree(placeForCirle) {
    if (arrWithCelss[placeForCirle].childNodes.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
