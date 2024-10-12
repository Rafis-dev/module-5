export const newsList = document.querySelector('.news');

// запрашиваем данные с сервера
const getData = async (url) => {
  const data = await fetch(`${url}`);
  const response = await data.json();
  return response;
};

export const getArticles = async (url) => {
  const data = await getData(url);
  const result = data.articles;
  // фильтруем удаленные статьи, чтобы они не выводились на страницу
  const filteredArray = result.filter(item => item.title !== '[Removed]' && item.title !== null);

  const newsItems = filteredArray.map(item => {
    const newsListItem = document.createElement('li');

    // проверяем наличие изображения, автора, описания
    if (item.urlToImage === null) {
      item.urlToImage = 'https://placehold.co/270x200/jpg?text=No+image';
    }
    if (item.author === null) {
      item.author = 'Author unknown';
    }
    if (item.description === null) {
      item.description = 'No description';
    }

    newsListItem.className = 'news__item';
    newsListItem.innerHTML = `
     <a class="news__link" href="${item.url}" target="_blank">
     <img class="news__img" src="${item.urlToImage}" alt="обложка статьи">
       <h2 class="news__title">${item.title}</h2>
       <p class="news__intro">${item.description}</p>
       <div class="news__footer">
         <p class="news__date">
           <span class="news__day">${item.publishedAt.split('T')[0]}</span>
           <span class="news__time">${item.publishedAt.split('T')[1].split('Z')[0]}</span>
         </p>
         <p class="news__author">${item.author}</p>
       </div>
   </a>
     `;

    // Получаем ссылку на изображение и добавляем обработчик error
    const newsImg = newsListItem.querySelector('.news__img');
    newsImg.addEventListener('error', () => {
      newsImg.src = 'https://placehold.co/270x200/jpg?text=No+image'; // Замена при ошибке загрузки
    });

    return newsListItem;
  });
  return newsItems;
};

getArticles('https://newsapi.org/v2/top-headlines?country=us&apiKey=07465d53b9f34cbd91fffc2fd2a9898c').then(data => newsList.append(...data));
