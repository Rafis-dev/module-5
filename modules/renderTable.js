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

export default {
  renderGoods,
  removeRows,
};
