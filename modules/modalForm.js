import {tbody} from './variables.js';
import {closeReset} from './modalControl.js';
import modalControl from './modalControl.js';
import {loadModalStyles} from './loadModalStyles.js';
const {closeModal, closeErrorModal} = modalControl;


// Обработчик для подсчета общей стоимости товара
// в форме модального окна
const handleChange = (e) => {
  const target = e.target;
  const priceInput = document.querySelector('#price');
  const discountInput = document.querySelector('#discount');
  const totalQuantityModal = document.querySelector('#quantity');
  const discountCheckbox = document.querySelector('.form__checkbox');
  let discountPrice;
  const totalPriceModal = document.querySelector('.amount__number-modal');
  if (target === priceInput || target === discountInput ||
    target === totalQuantityModal || target === discountCheckbox) {
    discountPrice = (priceInput.value - (discountInput.value /
      100 * priceInput.value));
    totalPriceModal.textContent = (discountPrice *
      totalQuantityModal.value).toFixed(2);
  }
};
// Считаем общую стоимость внутри формы с учетом скидки
const modalTotalPrice = () => {
  document.removeEventListener('change', handleChange);
  document.addEventListener('change', handleChange);
};

// Обработчик клика на чекбокс
const handleCheckbox = (e) => {
  const discountCheckbox = document.querySelector('.form__checkbox');
  const discountInput = document.querySelector('#discount');
  const target = e.target;
  if (target === discountCheckbox) {
    discountInput.toggleAttribute('disabled');
    // для поля со скидкой с атрибутом disabled очищаем значение
    if (discountInput.hasAttribute('disabled')) {
      discountInput.value = '';
    }
  }
};

// навешиваем клик на чекбокс
const modalCheckbox = () => {
  document.removeEventListener('click', handleCheckbox);
  document.addEventListener('click', handleCheckbox);
};

// конвертация файлов  формат base64
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});

// Превью изображения
const showPreview = () => {
  const file = document.querySelector('#file');
  const formFieldset = document.querySelector('.form__fieldset');
  const previewMessage = document.createElement('p');
  previewMessage.className = 'preview__message';
  previewMessage.textContent = 'Изображение не должно превышать размер 1 Мб';
  const preview = document.createElement('div');
  preview.className = 'preview';
  const previewImg = document.createElement('img');
  previewImg.className = 'preview__img';
  preview.append(previewImg);

  file.addEventListener('change', async () => {
    const existingMessage = document.querySelector('.preview__message');
    const existingPreview = document.querySelector('.preview');

    if (existingMessage) existingMessage.remove();
    if (existingPreview) existingPreview.remove();

    if (file.files.length > 0) {
      if (file.files[0].size > (1024 ** 2)) {
        formFieldset.append(previewMessage);
        return;
      } else {
        // const src = URL.createObjectURL(file.files[0]);
        const res = await toBase64(file.files[0]);
        previewImg.src = res;
        formFieldset.append(preview);
        return;
      }
    }
  });

  preview.addEventListener('click', () => {
    preview.remove();
  });
};

// Работа с формой
export const sendModalData = (url, cb) => {
  document.addEventListener('submit', async (e) => {
    const target = e.target;
    const modalForm = document.querySelector('.modal__form');
    const errorMessageElement =
      document.querySelector('.modal__error-message');
    const modalError = document.querySelector('.modal__error-wrapper');
    errorMessageElement.textContent = '';

    if (target === modalForm) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newProduct = Object.fromEntries(formData);
      newProduct.image = await toBase64(newProduct.image);
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
    }
  }, {once: true});
};

// Регулярное выражение для textarea
const checkTextarea = () => {
  const regex = /^[А-Яа-яЁё\s]+$/;
  const textarea = document.getElementById('descr');

  textarea.addEventListener('input', () => {
    // Проверка на соответствие шаблону и минимальную длину
    if (!regex.test(textarea.value) || textarea.value.length < 80) {
      // Устанавливаем сообщение об ошибке, используя атрибут title
      textarea.setCustomValidity(textarea.title);
    } else {
      // Сбрасываем сообщение об ошибке, если всё в порядке
      textarea.setCustomValidity('');
    }
    textarea.reportValidity();
  });
};

// Открываем модальное окно для редактирования
const editGood = (url, createModal, cb) => {
  tbody.addEventListener('click', async ({target}) => {
    if (target.closest('.table__button_type_edit')) {
      const row = target.closest('.table__body-row');
      const id = row.children[0].textContent;
      const request = await fetch(`${url}${id}`);
      const response = await request.json();
      const existingModal = document.querySelector('.modal');

      // Убираем баг двойного модального окна при
      // двойном клике на редактирование
      if (existingModal) existingModal.remove();
      // Подгружаем стили
      await loadModalStyles('./css/modal.css');
      // Открываем модальное окно
      createModal();
      // Находим нужные данные
      const totalPriceModal = document.querySelector('.amount__number-modal');
      const modalError = document.querySelector('.modal__error-wrapper');
      const modalIdValue = document.querySelector('.modal__id-value');
      const modalForm = document.querySelector('.modal__form');
      const discountCheckbox = document.querySelector('.form__checkbox');
      const modalFormBtn = document.querySelector('.form__button');
      const modalTitle = document.querySelector('.modal__title');
      const formFieldset = document.querySelector('.form__fieldset');
      const errorMessageElement =
        document.querySelector('.modal__error-message');

      modalForm.reset();
      modalFormBtn.textContent = 'Изменить товар';
      modalTitle.textContent = 'Изменить товар';

      // Заполняем поля формы данными с сервера
      modalForm.title.value = response.title;
      modalForm.category.value = response.category;
      modalForm.units.value = response.units;
      modalForm.description.value = response.description;
      modalForm.count.value = response.count;
      modalForm.price.value = response.price;
      modalIdValue.textContent = response.id;


      // Если с сервера получено изображение, то показываем превью
      if (response.image !== 'image/notimage.jpg') {
        const preview = document.createElement('div');
        const previewImg = document.createElement('img');
        preview.className = 'preview';
        previewImg.className = 'preview__img';
        const src = 'https://cat-rainbow-babcat.glitch.me/' + response.image;
        previewImg.src = src;
        preview.append(previewImg);
        formFieldset.append(preview);

        preview.addEventListener('click', () => {
          preview.remove();
        });
      }


      if (response.discount > 0) {
        discountCheckbox.checked = true;
        modalForm.discount.removeAttribute('disabled');
        modalForm.discount.value = response.discount;
      } else {
        discountCheckbox.checked = false;
        modalForm.discount.setAttribute('disabled', '');
      }

      totalPriceModal.textContent = ((response.count *
        response.price) -
        (response.count * response.price / 100 * response.discount)).toFixed(2);

      checkTextarea();
      modalCheckbox();
      // Функция показа превью при добавлении
      // изображения
      showPreview();
      modalTotalPrice();
      closeErrorModal();
      closeModal();

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

        if (modalForm.file.files.length > 0) {
          updatedData.image = await toBase64(modalForm.file.files[0]);
        }

        if (!formFieldset.querySelector('.preview')) {
          updatedData.image = 'image/notimage.jpg';
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
  showPreview,
  checkTextarea,
};
