const modalTitle = document.querySelector('.modal__title');
const modalId = document.querySelector('.modal__id');
const modalButton = document.querySelector('.modal__btn');
const modalForm = document.querySelector('.modal__form');
const discountCheckbox = document.querySelector('.form__checkbox');
const discountInput = document.querySelector('#discount');
const totalPrice = document.querySelector('.amount__number');


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
      <button class="table__button" type="button">
        <img class="table__button-img" src="assets/images/icons/image.svg" alt="иконка изображения">
      </button>
      <button class="table__button" type="button">
        <img class="table__button-img" src="assets/images/icons/edit.svg" alt="иконка редактирования">
      </button>
      <button class="table__button" type="button">
        <img class="table__button-img" src="assets/images/icons/delete.svg" alt="иконка корзины">
      </button>
    </td>
`;
  return row;
};

const renderGoods = items => {
  const tbody = document.querySelector('.table__body');

  tbody.innerHTML = '';
  items.map(createRow).forEach(row => tbody.append(row));
};


