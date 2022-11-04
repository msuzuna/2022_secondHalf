export const moveRoulette = function () {
  // DOMの取得
  const circle = document.querySelector('.roulette__image');
  const labelContainer = document.querySelector('.js-rouletteLabelContainer'); //labelの親要素の取得
  const startButton = document.querySelector('.js-startButton');

  // アニメーションオブジェクトの生成
  const animation = {
    // キーフレームの設定
    keyframes: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],

    // スタート時のオプションの初期値設定
    startOpts: {
      duration: 2000,
      easing: 'ease-in',
    },

    // 回転中のオプションの初期値設定
    rotateOpts: {
      duration: 1000,
      easing: 'linear',
      delay: 2000,
      iterations: 3,
    },

    // 回転が終わり始めた時のオプション
    stopOpts: {
      duration: 2000,
      easing: 'ease-out',
      delay: 5000,
      fill: 'forwards',
    },

    startAnime: function (obj) {
      obj.animate(this.keyframes, this.startOpts);
    },

    rotateAnime: function (obj) {
      obj.animate(this.keyframes, this.rotateOpts);
    },

    stopAnime: function (obj) {
      obj.animate(this.keyframes, this.stopOpts);
    },
  };

  // 停止する角度をランダムで生成
  const getStopAngle = function () {
    const random = Math.floor(Math.random() * 361);

    return random;
  };

  // 現在の角度を取得する関数を定義
  const getCurrentAngle = function () {
    const matrix = window
      .getComputedStyle(circle)
      .getPropertyValue('transform');
    let angle = 0;

    if (matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    }
    return angle < 0 ? angle + 360 : angle;
  };

  // ルーレットを開始する関数を定義
  const startRotate = function () {
    const currentAngle = getCurrentAngle(); // 現在の角度
    const rotateAngle = currentAngle + 360; //　一周する角度

    // キーフレームの更新
    animation.keyframes[0].transform = 'rotate(' + currentAngle + 'deg)';
    animation.keyframes[1].transform = 'rotate(' + rotateAngle + 'deg)';

    animation.startAnime(circle);
    animation.startAnime(labelContainer);
    animation.rotateAnime(circle);
    animation.rotateAnime(labelContainer);
  };

  // ルーレットを停止する関数を定義
  const stopRotate = function () {
    const finishAngle = getStopAngle(); // ルーレット終了時の角度をランダムで生成

    // キーフレームの更新
    animation.keyframes[1].transform = 'rotate(' + finishAngle + 'deg)';

    animation.stopAnime(circle);
    animation.stopAnime(labelContainer);
  };

  startButton.onclick = function () {
    startRotate();
    stopRotate();
  };
};
