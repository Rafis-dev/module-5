const items = document.querySelector('.items');
const propsItem_2 = document.querySelectorAll('.props__item_two');
const propsItem_4 = document.querySelectorAll('.props__item_four');
const propsList = document.querySelectorAll('.props__list');
const item_1 = document.querySelector('.item_one');
const item_2 = document.querySelector('.item_two');
const item_3 = document.querySelector('.item_three');
const item_4 = document.querySelector('.item_four');
const item_5 = document.querySelector('.item_five');
const item_6 = document.querySelector('.item_six');
const clonePropsList_3 = propsList[4].cloneNode(true);
const clonePropsList_4 = propsList[3].cloneNode(true);

items.append(item_1, item_2, item_3, item_4, item_5, item_6);
propsItem_4[2].after(propsItem_4[5]);
propsList[2].append(propsItem_2[8], propsItem_2[9]);
propsList[3].replaceWith(clonePropsList_3);
propsList[4].replaceWith(clonePropsList_4);