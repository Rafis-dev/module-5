import render from './modules/renderTable.js';
import modalControl from './modules/modalControl.js';
import {data} from './modules/variables.js';
import modalFormData from './modules/modalForm.js';

const {openModal, closeModal} = modalControl;
const {renderGoods, removeRows, showPic} = render;
const {modalTotalPrice, modalCheckbox, sendModalData} = modalFormData;


const start = () => {
  renderGoods(data.goods);

  removeRows();
  showPic();

  openModal();
  closeModal();

  modalTotalPrice();
  modalCheckbox();
  sendModalData();
};
start();

