import {
  modalForm, priceInput, discountInput, totalQuantityModal, discountCheckbox,
  totalPriceModal, modalIdValue,
} from './variables.js';
import {promo} from './variables.js';
import {createRow} from './createTable.js';
import {tbody} from './variables.js';
import {closeReset} from './modalControl.js';

// Считаем общую стоимость внутри формы с учетом скидки
const modalTotalPrice = () => {
  modalForm.addEventListener('change', e => {
    const target = e.target;
    if (target === priceInput || target === discountInput ||
      target === totalQuantityModal || target === discountCheckbox) {
      promo.discountPrice = (priceInput.value - (discountInput.value / 100 * priceInput.value));
      totalPriceModal.textContent = (promo.discountPrice * totalQuantityModal.value).toFixed(2);
    }
  });
};

// Клик на чекбокс
const modalCheckbox = () => {
  discountCheckbox.addEventListener('click', () => {
    discountInput.toggleAttribute('disabled');
    // для поля со скидкой с атрибутом disabled очищаем значение
    if (discountInput.hasAttribute('disabled')) {
      discountInput.value = '';
    }
  });
};

// Работа с формой
const sendModalData = (url, cb) => {
  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    newProduct.price = +promo.discountPrice;
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    // newProduct.id = +modalIdValue.textContent;
    // newProduct.price = +data.discountPrice;
    // data.goods.push(newProduct);
    // tbody.append(createRow(newProduct));

    closeReset();
    cb(url);
  });
};

export default {
  modalTotalPrice,
  modalCheckbox,
  sendModalData,
};
