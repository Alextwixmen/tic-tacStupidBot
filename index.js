const gameCell0 = document.querySelector(".gameСell0");
const gameCell1 = document.querySelector(".gameСell1");
const gameCell2 = document.querySelector(".gameСell2");
const gameCell3 = document.querySelector(".gameСell3");
const gameCell4 = document.querySelector(".gameСell4");
const gameCell5 = document.querySelector(".gameСell5");
const gameCell6 = document.querySelector(".gameСell6");
const gameCell7 = document.querySelector(".gameСell7");
const gameCell8 = document.querySelector(".gameСell8");
const arrWithCelss = [
  gameCell0,
  gameCell1,
  gameCell2,
  gameCell3,
  gameCell4,
  gameCell5,
  gameCell6,
  gameCell7,
  gameCell8,
];
const gameField = document.querySelector(".GameField");
const newGameButton = document.querySelector(".newGameButton");
const winnerText = document.querySelector(".winnerText");
const winnerWindow = document.querySelector(".PopUpContent");
const popUp = document.querySelector(".popUp");
const arrWithGameField = [[], [], [], [], [], [], [], [], []]; // наше поле для игры в ввиде массива
// во время хода игрока на нолике будем добавлять 2 на соответствуюее место
// во время хода игрока на крестике будем добавлять 1 на соответствуюшее место
let firstMove = false; // означает, что первый ход еще не был сделан. Сразу после первого хода меняем значение не true.
function whoIsTheWinner() {
  let winner = "Draw";
  if (
    arrWithGameField[0] == 1 &&
    arrWithGameField[1] == 1 &&
    arrWithGameField[2] == 1
  ) {
    winner = "redCross";
  } else if (
    arrWithGameField[3] == 1 &&
    arrWithGameField[4] == 1 &&
    arrWithGameField[5] == 1
  ) {
    winner = "redCross";
  } else if (
    arrWithGameField[6] == 1 &&
    arrWithGameField[7] == 1 &&
    arrWithGameField[8] == 1
  ) {
    winner = "redCross";
  } else if (
    arrWithGameField[0] == 1 &&
    arrWithGameField[3] == 1 &&
    arrWithGameField[6] == 1
  ) {
    winner = "redCross";
  } else if (
    arrWithGameField[1] == 1 &&
    arrWithGameField[4] == 1 &&
    arrWithGameField[7] == 1
  ) {
    winner = "redCross";
  } else if (
    arrWithGameField[2] == 1 &&
    arrWithGameField[5] == 1 &&
    arrWithGameField[8] == 1
  ) {
    winner = "redCross";
  } else if (
    arrWithGameField[0] == 1 &&
    arrWithGameField[4] == 1 &&
    arrWithGameField[8] == 1
  ) {
    winner = "redCross";
  } else if (
    arrWithGameField[6] == 1 &&
    arrWithGameField[4] == 1 &&
    arrWithGameField[2] == 1
  ) {
    winner = "redCross";
  }
  //
  if (
    arrWithGameField[0] == 2 &&
    arrWithGameField[1] == 2 &&
    arrWithGameField[2] == 2
  ) {
    console.log("1");
    winner = "greenCircle";
  } else if (
    arrWithGameField[3] == 2 &&
    arrWithGameField[4] == 2 &&
    arrWithGameField[5] == 2
  ) {
    console.log(arrWithGameField);
    console.log("2");

    winner = "greenCircle";
  } else if (
    arrWithGameField[6] == 2 &&
    arrWithGameField[7] == 2 &&
    arrWithGameField[8] == 2
  ) {
    console.log("3");
    winner = "greenCircle";
  } else if (
    arrWithGameField[0] == 2 &&
    arrWithGameField[3] == 2 &&
    arrWithGameField[6] == 2
  ) {
    console.log("4");
    winner = "greenCircle";
  } else if (
    arrWithGameField[1] == 2 &&
    arrWithGameField[4] == 2 &&
    arrWithGameField[7] == 2
  ) {
    console.log("5");
    winner = "greenCircle";
  } else if (
    arrWithGameField[2] == 2 &&
    arrWithGameField[5] == 2 &&
    arrWithGameField[8] == 2
  ) {
    console.log("6");
    winner = "greenCircle";
  } else if (
    arrWithGameField[0] == 2 &&
    arrWithGameField[4] == 2 &&
    arrWithGameField[8] == 2
  ) {
    console.log("7");
    winner = "greenCircle";
  } else if (
    arrWithGameField[6] == 2 &&
    arrWithGameField[4] == 2 &&
    arrWithGameField[2] == 2
  ) {
    console.log("8");
    winner = "greenCircle";
  }
  return winner;
}
function whoIsTheNext() {
  //функция на определение того, кто будет делать следующий ход.
  let number = 0;
  arrWithGameField.forEach((element) => {
    number += element.length;
  });
  return number;
}
// тут есть баг, поэтому лучше всего вешать листнера не на все поле, а на каждую отдельную клетку. Но пока я это не фиксил.
gameField.addEventListener("click", (clickPlace) => redCrossMove(clickPlace));
//функция, которая обрататывает наши ходи на крестике
function redCrossMove(clickPlace) {
  let redCross = document.createElement("img");
  redCross.src = "assets/img/cross.png";
  redCross.style.height = "270px";
  redCross.style.width = "270px";
  let targetOfClick = clickPlace.target;
  let numberOfSquare = clickPlace.target.className.slice(-1); //получаем конкретную цифру квадратика, на который мы кликаеем, который будет соответствовать индексу в массиве arrWithGameField
  if (firstMove == false) {
    firstMove = true;
    targetOfClick.appendChild(redCross);
    arrWithGameField[numberOfSquare].push(1);
    smartComputer(numberOfSquare, true);
    return;
  }
  let numberOfTheNextMove = whoIsTheNext(); // если число достигает 8 - игра окончена, так как все подмассивы забиты цифрами, то есть все клетки на поле заполнены крестиками/ноликами
  if (numberOfTheNextMove <= 8) {
    targetOfClick.appendChild(redCross);
    arrWithGameField[numberOfSquare].push(1);
    smartComputer(numberOfSquare);
    let winner = whoIsTheWinner();
    if (winner == "redCross") {
      showWinner(winner);
    } else if (winner == "greenCircle") {
      showWinner(winner);
    } else if (numberOfTheNextMove == 8) {
      showWinner("draw");
    }
  }
}
function showWinner(winner) {
  popUp.classList.toggle("hidden");
  winnerWindow.classList.add("winnerWindow");
  if (winner == "redCross") {
    winnerText.innerHTML = "Победил redCross";
  } else if (winner == "greenCircle") {
    winnerText.innerHTML = "Победил greenCircle";
  } else {
    winnerText.innerHTML = "Победила Дружба";
  }
}
newGameButton.addEventListener("click", () => {
  window.location.reload();
});
function smartComputer(placeOfClick, isFirst) {
  console.log("smartComputer is working");
  const objWhitVariants = {
    01: 2,
    12: 0,
    34: 5,
    45: 3,
    67: 8,
    78: 6,
    03: 6,
    63: 0,
    14: 7,
    74: 1,
    25: 8,
    85: 2,
    58: 2,
    64: 2,
    42: 6,
    04: 8,
    84: 0,
    02: 1,
    35: 4,
    68: 7,
    28: 5,
    17: 4,
    06: 3,
    08: 4,
    62: 4,
  };
  function FuncForRandomMove() {
    //эта функция нужна только для того, чтоб узнать последний ход на поле
    let number = 0;
    arrWithGameField.forEach((element) => {
      number += element.length;
    });
    return number;
  }
  //проверка на то, что это первый ход крестика и крестик был поставлен именно в центр. В таком случае нужно запустить функцию, которая поставит нулик в один из четырех углов нашего поля.
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
    console.log("Это второй и последующие ходы крестика");
    if (checkTheCrossPosition(2) != undefined) {
      console.log("щас запушу функцию на определение победной позиции");
      makeMove(checkTheCrossPosition(2));
    } else {
      accumulateInfo();
    }
  }
  function accumulateInfo() {
    console.log("внутри функции accumulateInfo");
    let numberForCircle = checkTheCrossPosition(1);
    console.log(
      "checkTheCrossPosition вернула",
      typeof numberForCircle,
      numberForCircle
    );
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
    let isLastMove = FuncForRandomMove();
    console.log("isLastMove = ", isLastMove);
    if (isPlaceFree(randomCell)) {
      makeMove(randomCell);
    } else if (isLastMove == 9) {
      return;
    } else {
      makeRandomMove();
    }
  }
  function checkTheCrossPosition(typeOfPicture) {
    for (key in objWhitVariants) {
      if (key.length == 1) {
        let superKey = "0" + key;
        // superKey - string
        if (
          arrWithGameField[superKey[0]] == typeOfPicture &&
          arrWithGameField[superKey[1]] == typeOfPicture
        ) {
          if (isPlaceFree(objWhitVariants[key])) {
            return objWhitVariants[key];
          } else {
            continue;
          }
        }
      } else {
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
  }
  //функция всегда вызывается с числом и она на это число(которое соответствует ячейке) ставит нолик, если место для нолика свободно, что проверяется функцией isPlaceFree()
  function makeMove(numberOfCell) {
    console.log("внутри функции makeMove с числом", numberOfCell);
    let greenCircle = document.createElement("img");
    greenCircle.src = "assets/img/circle.png";
    greenCircle.style.height = "200px";
    greenCircle.style.width = "200px";
    arrWithCelss[numberOfCell].appendChild(greenCircle);
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
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
