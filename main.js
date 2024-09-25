import render from './modules/renderTable.js';
import modalControl from './modules/modalControl.js';
import modalFormData from './modules/modalForm.js';
const getPostURL = 'https://cat-rainbow-babcat.glitch.me/api/goods?size=all';
const deleteURL = 'https://cat-rainbow-babcat.glitch.me/api/goods/';

const {openModal, closeModal, closeErrorModal} = modalControl;
const {renderGoods, removeRows, showPic} = render;
const {modalTotalPrice, modalCheckbox, sendModalData} = modalFormData;


const start = () => {
  renderGoods(getPostURL);

  removeRows(deleteURL, () => {
    renderGoods(getPostURL);
  });
  showPic();

  openModal();
  closeModal();

  modalTotalPrice();
  modalCheckbox();
  closeErrorModal();
  sendModalData(getPostURL, renderGoods);
};
start();


