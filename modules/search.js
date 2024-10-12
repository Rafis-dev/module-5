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
    const searchUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&searchIn=content&pageSize=16&sortBy=popularity&apiKey=07465d53b9f34cbd91fffc2fd2a9898c`;
    const headlinesUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=8&apiKey=07465d53b9f34cbd91fffc2fd2a9898c`;

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
      previousSearchNews.remove();
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

    // Отображаем статьи на странице
    searchNews.append(...searchResponse);
    newsList.append(...headlinesResponse);

    // Сбрасываем форму
    form.reset();
  });
};

getSearchArticles();

