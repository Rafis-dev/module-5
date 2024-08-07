const list = document.querySelector('.list');

const createListItems = () => {
  const userPromt = prompt('Введите что-нибудь');

  if (userPromt === null) {
    return;
  }

  switch (userPromt.trim()) {
    case 'del':
      if (list.lastElementChild) {
        list.lastElementChild.remove();
      }
      break;
    case 'clear':
      list.innerHTML = '';
      break;
    case '':
    case ' ':
      return createListItems();
    case 'exit':
      return;
    default:
      list.insertAdjacentHTML('beforeend', `<li>${userPromt}</li>`);
  }

  createListItems();
};

createListItems();
