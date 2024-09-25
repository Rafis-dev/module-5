import {tbody} from './variables.js';
import {createRow} from './createTable.js';
import {totalPrice} from './variables.js';

// Высчитываем общую сумму всех товаров в таблице
const totalSum = items => {
  let sum = 0;
  items.forEach(item => {
    sum += item.price * item.count;
  });
  totalPrice.textContent = `$ ${sum}`;
};

// рендерим данные с сервера
// result будет объектом с массивом внутри, а не массивом изначально,
// если вызывать запрос не всех товаров сразу
const renderGoods = async (url) => {
  const data = await fetch(url);
  const result = await data.json();
  tbody.innerHTML = '';
  result.map(createRow).forEach(row => tbody.append(row));
  totalSum(result);
};
// Удаляем строчки
const removeRows = (url, cb) => {
  tbody.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.closest('.table__button_type_del')) {
      const row = target.closest('.table__body-row');
      const id = row.children[0].textContent;

      await fetch(url + id, {
        method: 'DELETE',
      });
      cb(url);
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
      const win = open('about:blank', '', `width=600, height=600, 
        top=${(screen.height - 600) / 2}, 
        left=${(screen.width - 600) / 2}`);
      win.document.body.append(winImage);
    };
  });
};

export default {
  renderGoods,
  removeRows,
  showPic,
};

