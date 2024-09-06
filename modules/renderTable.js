import {tbody} from './variables.js';
import {createRow} from './createTable.js';
import {data} from './variables.js';

const renderGoods = items => {
  tbody.innerHTML = '';
  items.map(createRow).forEach(row => tbody.append(row));
};
// Удаляем строчки
const removeRows = () => {
  tbody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__button_type_del')) {
      const row = target.closest('.table__body-row');
      const id = Number(row.children[0].textContent);

      data.goods = data.goods.filter(item => item.id !== id);

      renderGoods(data.goods);
      console.log(data.goods);
    };
  });
};

// Открываем окно с картинкой по клику на кнопку
const showPic = () => {
  tbody.addEventListener('click', e => {
    const target = e.target;
    const imgBtn = target.closest('.table__button_type_image');
    const imgUrl = imgBtn.dataset.pic;
    const winImage = document.createElement('img');
    winImage.src = imgUrl;
    if (imgBtn) {
      // Открываем новое окно по центру экрана
      const win = open('about:blank', '', `width=600, height=600, top=${(screen.height - 600) / 2}, left=${(screen.width - 600) / 2}`);
      win.document.body.append(winImage);
    };
  });
};

export default {
  renderGoods,
  removeRows,
  showPic,
};
