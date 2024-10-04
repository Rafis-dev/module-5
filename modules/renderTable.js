import {tbody} from './variables.js';
import {createRow} from './createTable.js';
import {totalPrice} from './variables.js';

// рендерим данные с сервера
// Высчитываем общую сумму всех товаров в таблице
// result будет объектом с массивом внутри, а не массивом изначально,
// если вызывать запрос не всех товаров сразу
const renderGoods = async (url, totalPriceURL) => {
  const data = await fetch(url);
  const result = await data.json();
  const totalPriceData = await fetch(totalPriceURL);
  const totalPriceResult = await totalPriceData.json();
  tbody.innerHTML = '';

  // Получаем id по которым от сервера нет изображения
  const noImgId = result
    .filter(item => item.image === 'image/notimage.jpg')
    .map(item => item.id);

  result.map(createRow).forEach(row => {
    // создаем строчки
    tbody.append(row);
    // меняем иконки в зависимости от того,
    // были ли получены изображения  с сервера
    const rowId = row.querySelector('.table__body-id').textContent.trim();
    if (noImgId.includes(rowId)) {
      row.querySelector('.table__button-show-img').remove();
      row.querySelector('.table__button-no-img').style.display = 'block';
      row.querySelector('.table__button-no-img')
        .closest('.table__button_type_image').style.pointerEvents = 'none';
    }
  });
  totalPrice.textContent = `$ ${totalPriceResult}`;
};

// Удаляем строчки
const removeRows = (url, cb) => {
  tbody.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.closest('.table__button_type_del')) {
      const row = target.closest('.table__body-row');
      const id = row.children[0].textContent;

      await fetch(`${url}${id}`, {
        method: 'DELETE',
      });
      cb(url);
    };
  });
};

// Открываем окно с картинкой по клику на кнопку
const showPic = (url) => {
  tbody.addEventListener('click', async e => {
    const target = e.target;
    const imgBtn = target.closest('.table__button_type_image');
    const row = target.closest('.table__body-row');
    const id = row.children[0].textContent;
    const request = await fetch(`${url}${id}`);
    const response = await request.json();

    // if (response.image === 'image/notimage.jpg') {
    //   const showImgIcon = document.querySelector('.table__button-show-img');
    //   const noImgIcon = document.querySelector('.table__button-no-img');
    //   showImgIcon.style.display = 'none';
    //   noImgIcon.style.display = 'block';
    // }

    if (imgBtn) {
      const imgUrl = 'https://cat-rainbow-babcat.glitch.me/' + response.image;
      const winImage = document.createElement('img');
      winImage.src = imgUrl;

      // Открываем новое окно по центру экрана
      const win = open('about:blank', '', `width=600, height=600, 
        top=${(screen.height - 600) / 2}, 
        left=${(screen.width - 600) / 2}`);
      win.document.body.append(winImage);
    }
  });
};


export default {
  renderGoods,
  removeRows,
  showPic,
};

