import db from '../lib/firebase';
import {
  addDoc,
  collection,
  doc,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

export const setHostName = () => {
  const $inputUserName = document.querySelector('.js-inputUserName');
  const $enterButton = document.querySelector('.js-enterButton');

  // ランダム文字列の生成
  const createRandomId = function () {
    const num = 20; // 20文字
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  // ユーザーネームが入力されたかどうか判断し、ボタンを非活性を制御する関数
  const checkUserName = function () {
    const userName = $inputUserName.value;
    userName === ''
      ? ($enterButton.disabled = true)
      : ($enterButton.disabled = false);
  };

  // ページが読み込まれたら
  window.addEventListener('load', function () {
    checkUserName();

    // const query = query(collection(db, 'talkTheme'));
    // const querySnapShot = getDocs(q);
    const querySnapShot = getDoc(doc(db, 'talkTheme', '1'));
    querySnapShot.then(
      () => {
        console.log(querySnapShot);
        // querySnapShot.forEach((doc) => {
        //   console.log(doc.id, '=>', doc.data());
        // });
      },
      (error) => {
        console.log('失敗');
      }
    );
  });

  // インプットボックスに入力されたら
  $inputUserName.addEventListener('keyup', function (e) {
    checkUserName();
  });

  // 入室ボタンをクリックしたら
  $enterButton.onclick = function () {
    // idをランダムで生成する
    const id = createRandomId();

    const obj = {
      hostName: $inputUserName.value,
    };

    // dbにinputの文字列を追加
    const docRef = setDoc(doc(db, 'user', id), obj);

    docRef.then(
      () => {
        location.href = 'main.html';
      },
      (error) => {
        console.log('失敗');
      }
    );
  };
};
