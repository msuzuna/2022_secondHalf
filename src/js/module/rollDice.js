export const rollDice = () => {
  let removeButtons = document.querySelectorAll('.js-removeButton');
  const dice = document.querySelector('.js-dice');
  const button = document.querySelector('.js-diceStartButton');

  // トークリストの個数を取得する関数
  const countThemeNum = function () {
    // トークリストの更新
    removeButtons = document.querySelectorAll('.js-removeButton');

    const length = removeButtons.length;
    return length;
  };

  // サイコロの表示が変わる回数をランダムで生成する関数
  const getRollNum = function () {
    const random = Math.floor(Math.random() * 6) + 10; //10-15の整数
    return random;
  };

  // 最終的に表示されるサイコロの目をランダムで生成する関数
  const getStopDice = function (length) {
    const random = Math.floor(Math.random() * length) + 1;
    return random;
  };

  // スタートボタンが押されたら
  button.onclick = function () {
    let count = 0;
    const rollNum = getRollNum(); // サイコロの表示が変わる回数
    const themeNum = countThemeNum(); // トークテーマの個数
    const stopDiceNum = getStopDice(themeNum); // 最終的に表示されるサイコロの目
    let num = 1;

    const interval = setInterval(() => {
      dice.innerHTML = num;
      num++;
      count++;

      if (num === themeNum + 1) {
        num = 1;
      }

      if (count === rollNum) {
        clearInterval(interval);
        dice.innerHTML = stopDiceNum;
      }
    }, 100);
  };
};
