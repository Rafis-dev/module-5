import {
  modalForm, priceInput, discountInput, totalQuantityModal, discountCheckbox,
  totalPriceModal, modalError, errorMessageElement, tbody, modal, modalIdValue,
  modalFormBtn,
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
    // newProduct.price = +promo.discountPrice;

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
        throw new Error(`${response.status} - ${errorData.message ||
          'Ошибка при отправке данных'}`);
      }

      closeReset();
      cb(url);
      return;
    } catch (error) {
      // Выводим сообщение об ошибке
      modalError.classList.add('modal__error_display_flex');
      errorMessageElement.textContent = error.message;
    }
  }, {once: true});
};


// Открываем модальное окно для редактирования
const editGood = (url, cb) => {
  tbody.addEventListener('click', async ({target}) => {
    if (target.closest('.table__button_type_edit')) {
      const row = target.closest('.table__body-row');
      const id = row.children[0].textContent;
      const request = await fetch(`${url}${id}`);
      const response = await request.json();

      modalForm.reset();
      // Открываем модальное окно
      modal.classList.add('modal-edit_display_flex');
      modalFormBtn.textContent = 'Изменить товар';

      // Заполняем поля формы данными с сервера
      modalForm.title.value = response.title;
      modalForm.category.value = response.category;
      modalForm.units.value = response.units;
      modalForm.description.value = response.description;
      modalForm.count.value = response.count;
      modalForm.price.value = response.price;
      modalIdValue.textContent = response.id;

      if (response.discount > 0) {
        discountCheckbox.checked = true;
        modalForm.discount.removeAttribute('disabled');
        modalForm.discount.value = response.discount;
      } else {
        discountCheckbox.checked = false;
        modalForm.discount.setAttribute('disabled', '');
      }

      totalPriceModal.textContent = (response.count *
        response.price) -
        (response.count * response.price / 100 * response.discount).toFixed(2);


      // Добавляем обработчик на отправку формы
      modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Собираем данные для отправки
        const updatedData = {
          title: modalForm.title.value,
          category: modalForm.category.value,
          units: modalForm.units.value,
          description: modalForm.description.value,
          count: modalForm.count.value,
          price: modalForm.price.value,
          discount: discountCheckbox.checked ? modalForm.discount.value : 0,
        };

        // Отправляем PATCH запрос
        try {
          const patchResponse = await fetch(`${url}${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
          });

          if (!patchResponse.ok) {
            const errorData = await patchResponse.json();
            throw new Error(`${response.status} - ${errorData.message ||
              'Ошибка при обновлении товара'}`);
          }

          // Закрываем модальное окно
          closeReset();
          // Вызываем callback для обновления интерфейса
          if (cb) cb(url);
          return;
        } catch (error) {
          // Выводим сообщение об ошибке
          modalError.classList.add('modal__error_display_flex');
          errorMessageElement.textContent = error.message;
        };
      }, {once: true});
    };
  });
};

export default {
  modalTotalPrice,
  modalCheckbox,
  sendModalData,
  editGood,
};
