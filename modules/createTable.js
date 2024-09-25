// Создаем новую строчку в таблице и вызываем ф-ию totalSum
export const createRow = (item) => {
  const row = document.createElement('tr');
  row.classList.add('table__body-row');

  row.innerHTML = `
    <td class="table__body-data">${item.id}</td>
    <td class="table__body-data">${item.title}</td>
    <td class="table__body-data">${item.category}</td>
    <td class="table__body-data table__body-data_type_unit 
    table__body-data_text_center">${item.units}</td>
    <td class="table__body-data table__body-data_text_center">${item.count}</td>
    <td class="table__body-data table__body-data_text_center">${'$' + item.price
    }</td>
    <td class="table__body-data 
    table__body-data_text_center">${'$' + item.price * item.count}</td>
    <td class="table__body-data 
    table__body-buttons table__body-data_text_right">
      <button class="table__button table__button_type_image" type="button"  data-pic="https://placehold.co/580x580/jpg?text=Hello+World">
        <img class="table__button-img" 
        src="assets/images/icons/image.svg" alt="иконка изображения">
      </button>
      <button class="table__button table__button_type_edit" type="button">
        <img class="table__button-img" 
        src="assets/images/icons/edit.svg" alt="иконка редактирования">
      </button>
      <button class="table__button table__button_type_del" type="button">
        <img class="table__button-img" 
        src="assets/images/icons/delete.svg" alt="иконка корзины">
      </button>
    </td>
`;
  return row;
};

export default {
  createRow,
};
