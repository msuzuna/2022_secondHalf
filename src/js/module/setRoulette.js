export const setRoulette = () => {
  // DOMの取得
  const circle = document.querySelector('.roulette__image');
  const inputBox = document.querySelector('.js-inputBox'); //inputボックスの取得
  const labelContainer = document.querySelector('.js-rouletteLabelContainer'); //labelの親要素の取得

  // textAreaを一行ずつ配列に格納する関数を定義
  const setInputItem = function () {
    const text = inputBox.value.replace(/\r\n|\r/g, '\n'); //改行文字を\nに統一
    const lines = text.split('\n'); //改行ごとに配列に格納
    const outArray = lines.filter(Boolean); // returnするArray

    return outArray; // ラベルの配列を返す
  };

  // ラベルアイテムの個数を返す関数を定義
  const countLabelItem = function () {
    const countLabelItem = labelContainer.childElementCount;
    return countLabelItem;
  };

  // ラベルアイテムの生成
  const createLabelItem = function () {
    const labelItem = document.createElement('div');
    labelItem.classList.add('roulette__label', 'js-rouletteLabel');
    labelContainer.appendChild(labelItem);
  };

  // ラベルアイテムの削除
  const removeLabelItem = function () {
    labelContainer.lastElementChild.remove();
  };

  // ラベルアイテムを更新する関数を定義
  const setLabel = function (inputLabelNum, currentNum, arrayItem) {
    const labelItemNum = countLabelItem();

    //　textAreaの配列個数がラベル個数より大きい時
    if (labelItemNum < inputLabelNum) {
      createLabelItem(); // ラベルアイテムの生成
      labelContainer.children[currentNum].innerHTML = arrayItem; // 文字列の書き換え
    }
    // textAreaの配列個数がラベル個数と同数の時
    else if (labelItemNum == inputLabelNum) {
      labelContainer.children[currentNum].innerHTML = arrayItem; // 文字列の書き換え
    }
    // textAreaの配列個数がラベル個数より小さい時
    else {
      removeLabelItem(); // ラベルアイテムの削除
    }
  };

  // ラベルアイテム位置の角度を返す関数
  const setLabelItemAngle = function (angle) {
    let beforeRadian = 0;

    // 角度の計算
    if (angle < 90) {
      beforeRadian = 90 - angle;
    } else if (angle < 180) {
      beforeRadian = angle - 90;
    } else if (angle < 270) {
      beforeRadian = 270 - angle;
    } else {
      beforeRadian = angle - 270;
    }

    return beforeRadian;
  };

  // ラベルアイテムのrotate角度を設定する関数を定義
  const setLabelRotateAngle = function (angle) {
    let labelRotateAngle = angle - 90;

    if (angle > 270) {
      labelRotateAngle = angle - 270 - 180;
    }

    return labelRotateAngle;
  };

  // ラベルアイテムの位置を更新する関数を定義
  const setLabelPosition = function (num, angle) {
    const itemPositionAngle = angle / 2 + angle * num;
    const radian = setLabelItemAngle(itemPositionAngle) * (Math.PI / 180);
    const circle_r = 140;
    const rotateAngle = setLabelRotateAngle(itemPositionAngle);
    let x = Math.cos(radian) * circle_r;
    let y = Math.sin(radian) * circle_r;

    if (itemPositionAngle >= 270) {
      x = -x;
      y = -y;
    } else if (itemPositionAngle >= 180) {
      x = -x;
    } else if (itemPositionAngle >= 90) {
    } else {
      y = -y;
    }

    labelContainer.children[num].style.left = x - 100 + 'px';
    labelContainer.children[num].style.top = y - 10 + 'px';
    labelContainer.children[num].style.transform =
      'rotate(' + rotateAngle + 'deg)';
  };

  // 角度の計算し、1つの円弧の角度を返す関数を定義
  const calcAngle = function (num) {
    const angle = 360 / num;
    return angle;
  };

  //　色を動的に割り当てる関数を定義
  const setColorArray = function (num) {
    let colorArray = [];
    colorArray[0] = '#EC9376';

    for (let i = 1; i < num; i++) {
      if (i % 4 === 1) {
        colorArray[i] = '#ECBE75';
      } else if (i % 4 === 2) {
        colorArray[i] = '#E3E986';
      } else if (i % 4 === 3) {
        colorArray[i] = '#A9F0D1';
      } else if (i % 4 === 0) {
        colorArray[i] = '#90CDFB';
      }
    }
    return colorArray; // 色カラーが格納されている配列を返す
  };

  // 色を設定する文字列を返す関数
  const createCssText = function (num, angle) {
    let backgroundText = '';
    const lastNum = num - 1;
    const colorArray = setColorArray(num);

    //最後の1回前まで
    for (let i = 0; i < lastNum; i++) {
      backgroundText =
        backgroundText +
        colorArray[i] +
        ' ' +
        angle * i +
        'deg ' +
        angle * (i + 1) +
        'deg,';
    }

    // 最後の1回
    backgroundText =
      backgroundText +
      colorArray[lastNum] +
      ' ' +
      angle * lastNum +
      'deg ' +
      angle * (lastNum + 1) +
      'deg';

    return 'conic-gradient(' + backgroundText + ')'; // backgroundに設定する文字列を返す
  };

  // ページが読み込まれたら
  window.addEventListener('load', function () {
    const inputItemNum = setInputItem().length;
    for (let i = 0; i < inputItemNum; i++) {
      setLabel(inputItemNum, i, setInputItem()[i]); // ラベルアイテムの更新
    }
  });

  // テキストエリアが更新されたら
  inputBox.addEventListener('keyup', function (e) {
    const inputItemNum = setInputItem().length;

    // EnterもしくはDeleteが押されたら ※deleteが効かない
    if (e.key === 'Enter' || e.key === 'Delete' || e.key === 'Backspace') {
      // textAreaの配列個数分繰り返す
      for (let i = 0; i < inputItemNum; i++) {
        const angle = calcAngle(inputItemNum); // 角度の計算
        const cssText = createCssText(inputItemNum, angle); // 色の文字列更新
        circle.style.background = cssText; // 背景色の更新
        setLabel(inputItemNum, i, setInputItem()[i]); // ラベルアイテムの更新
        setLabelPosition(i, angle);
      }
    }
  });
};
