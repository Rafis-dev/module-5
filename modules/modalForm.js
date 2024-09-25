import {
  modalForm, priceInput, discountInput, totalQuantityModal, discountCheckbox,
  totalPriceModal, modalError, errorMessageElement,
} from './variables.js';
import {promo} from './variables.js';
import {closeReset} from './modalControl.js';

// Считаем общую стоимость внутри формы с учетом скидки
const modalTotalPrice = () => {
  modalForm.addEventListener('change', e => {
    const target = e.target;
    if (target === priceInput || target === discountInput ||
      target === totalQuantityModal || target === discountCheckbox) {
      promo.discountPrice = (priceInput.value - (discountInput.value /
        100 * priceInput.value));
      totalPriceModal.textContent = (promo.discountPrice *
        totalQuantityModal.value).toFixed(2);
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
    errorMessageElement.textContent = '';
    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    newProduct.price = +promo.discountPrice;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message || 'Ошибка при отправке данных'}`);
      }

      closeReset();
      cb(url);
    } catch (error) {
      // Выводим сообщение об ошибке
      modalError.classList.add('modal__error_display_flex');
      errorMessageElement.textContent = error.message;
    }
  });
};

export default {
  modalTotalPrice,
  modalCheckbox,
  sendModalData,
};
