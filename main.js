import render from './modules/renderTable.js';
import modalFormData from './modules/modalForm.js';
import {showModal, createModal} from './modules/generateModal.js';

const getPostURL = 'https://cat-rainbow-babcat.glitch.me/api/goods?size=all';
const deleteURL = 'https://cat-rainbow-babcat.glitch.me/api/goods/';
const totalPriceURL = 'https://cat-rainbow-babcat.glitch.me/api/total';


const {renderGoods, removeRows, showPic} = render;
const {editGood} = modalFormData;


const start = () => {
  renderGoods(getPostURL, totalPriceURL);

  removeRows(deleteURL, () => {
    renderGoods(getPostURL, totalPriceURL);
  });

  showPic();

  showModal(getPostURL, () => {
    renderGoods(getPostURL, totalPriceURL);
  });

  editGood(deleteURL, createModal, () => {
    renderGoods(getPostURL, totalPriceURL);
  });
};

start();

