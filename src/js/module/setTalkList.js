export const setTalkList = () => {
  // DOMの取得
  const inputBox = document.querySelector('.js-themeInputBox');
  const talkList = document.querySelector('.js-talkList');
  const addButton = document.querySelector('.js-addButton');
  let removeButtons = document.querySelectorAll('.js-removeButton');

  // inputBoxのテキストを取得する関数
  const getInputBoxContents = function () {
    const theme = inputBox.value;
    return theme;
  };

  // talkListに追加する関数
  const addTalkList = function (theme) {
    // li要素作成
    const newListItem = document.createElement('li');
    newListItem.classList.add('talkList__listItem');
    // div要素作成
    const newListItemContents = document.createElement('div');
    newListItemContents.classList.add('talkList__listItemContents');
    // p要素作成
    const newListItemText = document.createElement('p');
    newListItemText.classList.add('talkList__text');
    newListItemText.innerHTML = theme;
    // button要素作成
    const newButton = document.createElement('button');
    newButton.classList.add('talkList__button', 'js-removeButton');
    newButton.setAttribute('type', 'button');
    newButton.innerHTML = '削除';

    newListItemContents.appendChild(newListItemText);
    newListItemContents.appendChild(newButton);
    newListItem.appendChild(newListItemContents);
    talkList.appendChild(newListItem);
  };

  // talkListの配列更新する関数
  const upDateRemoveButtons = function () {
    removeButtons = document.querySelectorAll('.js-removeButton');

    for (let i = 0; i < removeButtons.length; i++) {
      const removeButton = removeButtons[i];
      removeButton.addEventListener('click', function () {
        const removeItem = removeButton.parentNode.parentNode;
        removeItem.remove();
      });
    }
  };

  // 追加ボタンが押されたら
  addButton.onclick = function () {
    const theme = getInputBoxContents();

    // inputBoxの中身が空欄ではない時に処理を行う
    if (theme != '') {
      addTalkList(theme);
      inputBox.value = '';
    }

    // talkListの配列更新
    upDateRemoveButtons();
  };

  upDateRemoveButtons();
};
