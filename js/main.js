const ads = document.querySelector('.ads');
const items = document.querySelector('.items');
const itemsTitle = document.querySelectorAll('.item__title');
const itemsImage = document.querySelectorAll('.item__image');
const propsItemTwo = document.querySelectorAll('.props__item_two');
const propsItemFour = document.querySelectorAll('.props__item_four');
const propsList = document.querySelectorAll('.props__list');
const itemOne = document.querySelector('.item_one');
const itemTwo = document.querySelector('.item_two');
const itemThree = document.querySelector('.item_three');
const itemFour = document.querySelector('.item_four');
const itemFive = document.querySelector('.item_five');
const itemSix = document.querySelector('.item_six');
const clonePropsListThree = propsList[4].cloneNode(true);
const clonePropsListFour = propsList[3].cloneNode(true);

ads.remove();
items.append(itemOne, itemTwo, itemThree, itemFour, itemFive, itemSix);
itemsImage[2].after(itemsTitle[3]);
itemsImage[5].after(itemsTitle[1]);
itemsImage[4].after(itemsTitle[4]);
itemsTitle[2].innerText = 'This и прототипы объектов';
propsItemFour[2].after(propsItemFour[5]);
propsList[2].append(propsItemTwo[8], propsItemTwo[9]);
propsList[3].replaceWith(clonePropsListThree);
propsList[4].replaceWith(clonePropsListFour);
