function whoIsTheWinner(arr) {
  let lossWariants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  let winner = "Draw";
  function iterateLossWariants(lossWariantsArr) {
    lossWariantsArr.forEach((element) => checkTheLossWariant(element));
  }
  function checkTheLossWariant(warriant) {
    if (warriant.every((element) => arr[element] == 1)) {
      winner = "redCross";
    } else if (warriant.every((element) => arr[element] == 2)) {
      winner = "greenCircle";
    }
  }
  iterateLossWariants(lossWariants);
  return winner;
}
export default whoIsTheWinner;
