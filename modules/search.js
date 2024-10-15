import {getArticles} from './render.js';
import {newsList} from './render.js';
const form = document.querySelector('.header__search-form');
const main = document.querySelector('.main');

const getSearchArticles = () => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataResult = Object.fromEntries(formData);
    const searchQuery = formDataResult.search;

    // Формируем URL для запроса результатов поиска и заголовков новостей
    const key = '33057ca922c73f3312249ea367e64960';
    const searchUrl = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=ru&country=ru&sortby=relevance&max=8&apikey=${key}`;
    const headlinesUrl = `https://gnews.io/api/v4/top-headlines?category=general&lang=ru&country=ru&max=4&apikey=${key}`;

    let searchResponse;
    let headlinesResponse;
    try {
      // Используем Promise.all для параллельного выполнения запросов
      [searchResponse, headlinesResponse] = await Promise.all([
        getArticles(searchUrl),
        getArticles(headlinesUrl),
      ]);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }

    // Удаляем предыдущие результаты поиска, если они есть
    // и заголовки тоже
    const previousSearchTitle = document.querySelector('.search__title-container');
    const previousSearchNews = document.querySelector('.search-news');
    const previousNewsList = document.querySelector('.news-list');
    if (previousSearchTitle) {
      previousSearchTitle.remove();
      if (previousSearchNews) {
        previousSearchNews.remove();
      }
    }

    if (previousNewsList) {
      newsList.innerHTML = '';
    }


    // Создаем новые элементы для отображения результатов поиска
    const titleContainer = document.createElement('div');
    titleContainer.className = 'container search__title-container';
    main.prepend(titleContainer);
    const container = document.createElement('div');
    container.className = 'container';
    titleContainer.after(container);
    const searchNews = document.createElement('ul');
    searchNews.className = 'search-news news';
    container.append(searchNews);


    titleContainer.innerHTML = `
    <div class="container">
        <h2 class="main__title">По вашему запросу ${searchQuery} найдено результатов: ${searchResponse.length} </h2>
      </div>
    `;

    if (searchResponse.length > 0) {
      // Отображаем статьи на странице
      searchNews.append(...searchResponse);
    } else {
      searchNews.remove();
    }

    // Отображаем статьи на странице

    newsList.append(...headlinesResponse);

    // Сбрасываем форму
    form.reset();

  });
};

getSearchArticles();

