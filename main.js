import render from './modules/renderTable.js';
import modalControl from './modules/modalControl.js';
import modalFormData from './modules/modalForm.js';
const URL = 'https://cat-rainbow-babcat.glitch.me/api/goods?size=all';

const {openModal, closeModal} = modalControl;
const {renderGoods, removeRows, showPic} = render;
const {modalTotalPrice, modalCheckbox, sendModalData} = modalFormData;


const start = () => {
  renderGoods(URL);

  removeRows();
  showPic();

  openModal();
  closeModal();

  modalTotalPrice();
  modalCheckbox();
  sendModalData(URL, renderGoods);
};
start();

