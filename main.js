import {el, mount, setChildren} from 'redom';
import IMask from 'imask';
const wrapper = document.querySelector('.wrapper');

const createCard = () => {
  const card = el('div', {className: 'card'});
  const secure = el('p', {className: 'secure'}, 'Secure Checkout');
  const cc = el('div', {className: 'credit-card'});
  const ccnumber = el('span', {className: 'card__number'}, 'xxxx xxxx xxxx xxxx');
  const ccpersonal = el('div', {className: 'card__personal'}, [el('span', {className: 'card__name'}, 'John Doe'), el('span', {className: 'card__date'}, '04/24')]);

  const form = el('form', {action: '#', className: 'form', id: 'form'});

  const formInputs = [
    el('div', {className: 'form__input-wrap form__input-wrap_holder'}, [el('label', {className: 'form__label form__holder-label'}, 'Card Holder'), el('input', {className: 'input input__holder', type: 'text'})]),
    el('div', {className: 'form__input-wrap form__input-wrap_number'}, [el('label', {className: 'form__label form__number-label'}, 'Card Number'), el('input', {className: 'input input__number', type: 'text', maxlength: '19', id: 'cardNumber'})]),
    el('div', {className: 'form__input-wrap form__input-wrap_date'}, [el('label', {className: 'form__label form__date-label'}, 'Card Expiry'), el('input', {className: 'input input__date', type: 'text'})]),
    el('div', {className: 'form__input-wrap form__input-wrap_cvv'}, [el('label', {className: 'form__label form__cvv-label'}, 'CVV'), el('input', {className: 'input input__cvv', type: 'text', maxLength: '3', placeholder: '___'})]),
    el('button', {className: 'form__button'}, 'CHECK OUT'),
  ];

  setChildren(cc, [ccnumber, ccpersonal]);
  setChildren(form, formInputs);
  setChildren(card, [secure, cc, form]);
  mount(wrapper, card);

  const inputHolder = document.querySelector('.input__holder');
  const cardName = document.querySelector('.card__name');
  const inputNumber = document.querySelector('.input__number');
  const cardNumber = document.querySelector('.card__number');
  const inputDate = document.querySelector('.input__date');
  const cardDate = document.querySelector('.card__date');
  const ccv = document.querySelector('.input__cvv');

  // отображаем имя держателя карты
  inputHolder.addEventListener('input', () => {
    const filteredValue = inputHolder.value.replace(/\d/g, '');
    inputHolder.value = filteredValue;
    cardName.textContent = filteredValue || 'John Doe';
  });

  // отображаем номер карты
  // запрещаем ввод не цифр
  // используем маску
  inputNumber.addEventListener('input', () => {
    const filteredValue = inputNumber.value.replace(/\D/g, '');
    const formattedValue = filteredValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    cardNumber.textContent = formattedValue || 'xxxx xxxx xxxx xxxx';
  });

  // отображаем дату карты
  // запрещаем ввод не цифр
  // используем маску
  inputDate.addEventListener('input', () => {
    let filteredValue = inputDate.value.replace(/[^0-9/]/g, '');

    // Ограничиваем длину до 5 символов (MM/YY)
    if (filteredValue.length > 5) {
      filteredValue = filteredValue.slice(0, 5); // обрезаем лишние символы
    }

    inputDate.value = filteredValue;

    cardDate.textContent = filteredValue || '04/24';
  });

  // используем маски из библиотеки iMask
  const cardMask = IMask(inputNumber, {
    mask: '0000 0000 0000 0000',
  });

  const dateMask = IMask(inputDate, {
    mask: Date,  // enable date mask

    pattern: `m/Y`,  // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
    // you can provide your own blocks definitions, default blocks for date mask are:
    blocks: {
      m: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 99,
        maxLength: 2,
      },
    },
    format: date => {
      let month = date.getMonth() + 1;
      const year = date.getFullYear() % 100; // Получаем последние две цифры года

      if (month < 10) month = "0" + month;

      return [month, year].join('/');
    },

    // Функция парсинга значения
    parse: str => {
      const [month, year] = str.split('/');
      return new Date(year, month - 1);
    },

    overwrite: true, // Позволяет перезаписывать ввод, если длина больше ожидаемой
  });
};

createCard();
