const modalTitle = document.querySelector('.modal__title');
const modalId = document.querySelector('.modal__id');
const modalButton = document.querySelector('.modal__btn');
const modalForm = document.querySelector('.modal__form');
const discountCheckbox = document.querySelector('.form__checkbox');
const discountInput = document.querySelector('#discount');
const totalPrice = document.querySelector('.amount__number');
const modalOpen = document.querySelector('.cms__header-modal');
const modal = document.querySelector('.modal');
const tbody = document.querySelector('.table__body');
const formInput = modalForm.querySelector('.form__input');
const priceInput = modalForm.querySelector('#price');
const totalQuantityModal = modalForm.querySelector('#quantity');
const totalPriceModal = modalForm.querySelector('.amount__number');
const modalIdValue = document.querySelector('.modal__id-value');
let discountPrice;

let goods = [
  {
    'id': 253842678,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 296378448,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 215796548,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 246258248,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

// Высчитываем общую сумму всех товаров в таблице в объекте goods
const totalSum = items => {
  let sum = 0;
  items.forEach(item => {
    sum += item.price * item.count;
  });
  totalPrice.textContent = `$ ${sum}`;
};
// Генерируем случайный ID длиной количеством символов length
const generateId = length => {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};
// Создаем новую строчку в таблице и вызываем ф-ию totalSum
const createRow = item => {
  const row = document.createElement('tr');
  row.classList.add('table__body-row');

  row.innerHTML = `
    <td class="table__body-data">${item.id}</td>
    <td class="table__body-data">${item.title}</td>
    <td class="table__body-data">${item.category}</td>
    <td class="table__body-data table__body-data_type_unit table__body-data_text_center">${item.units}</td>
    <td class="table__body-data table__body-data_text_center">${item.count}</td>
    <td class="table__body-data table__body-data_text_center">${'$' + item.price
    }</td>
    <td class="table__body-data table__body-data_text_center">${'$' + item.price * item.count}</td>
    <td class="table__body-data table__body-buttons table__body-data_text_right">
      <button class="table__button table__button_type_image" type="button">
        <img class="table__button-img" src="assets/images/icons/image.svg" alt="иконка изображения">
      </button>
      <button class="table__button table__button_type_edit" type="button">
        <img class="table__button-img" src="assets/images/icons/edit.svg" alt="иконка редактирования">
      </button>
      <button class="table__button table__button_type_del" type="button">
        <img class="table__button-img" src="assets/images/icons/delete.svg" alt="иконка корзины">
      </button>
    </td>
`;
  totalSum(goods);
  return row;
};

// Очищаем форму, поле со скидкой, закрываем форму
const closeReset = () => {
  modalForm.reset();
  discountInput.setAttribute('disabled', '');
  modal.classList.remove('modal_display_flex');
};


const renderGoods = items => {
  tbody.innerHTML = '';
  items.map(createRow).forEach(row => tbody.append(row));
};

renderGoods(goods);

// Удаляем строчки
tbody.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('.table__button_type_del')) {
    const row = target.closest('.table__body-row');
    const id = Number(row.children[0].textContent);

    goods = goods.filter(item => item.id !== id);

    renderGoods(goods);
    console.log(goods);
  };
});

// Открываем  модалку, устанавливаем общую стоимость на 0, генерим новый id при открытии модалки
modalOpen.addEventListener('click', () => {
  modal.classList.add('modal_display_flex');
  totalPriceModal.textContent = '0';
  modalIdValue.textContent = generateId(9);
});

// Закрываем  модалку, очищаем форму
modal.addEventListener('click', e => {
  const target = e.target;
  if (target === modal || target.closest('.modal__btn')) {
    closeReset();
  };
});

// Считаем общую стоимость внутри формы с учетом скидки
modalForm.addEventListener('change', e => {
  const target = e.target;
  if (target === priceInput || target === discountInput ||
    target === totalQuantityModal || target === discountCheckbox) {
    discountPrice = (priceInput.value - (discountInput.value / 100 * priceInput.value));
    totalPriceModal.textContent = (discountPrice * totalQuantityModal.value).toFixed(2);
  }
});

// Клик на чекбокс
discountCheckbox.addEventListener('click', () => {
  discountInput.toggleAttribute('disabled');
  // для поля со скидкой с атрибутом disabled очищаем значение
  if (discountInput.hasAttribute('disabled')) {
    discountInput.value = '';
  }
});

// Работа с формоq
modalForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newProduct = Object.fromEntries(formData);
  newProduct.id = +modalIdValue.textContent;
  newProduct.price = +discountPrice;
  goods.push(newProduct);
  tbody.append(createRow(newProduct));
  console.log(goods);
  closeReset();
});
