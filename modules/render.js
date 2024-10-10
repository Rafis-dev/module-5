const newsList = document.querySelector('.news');

const getData = async (url) => {
  const data = await fetch(`${url}`);
  const response = await data.json();
  return response;
};

const showArticles = async (url) => {
  const data = await getData(url);
  const result = data.articles;


  if (result.urlToImage === null) {
    result.urlToImage = 'https://placehold.co/580x580/jpg?text=Hello+World';
  }

  const newsItems = result.map(item => {
    const newsListItem = document.createElement('li');
    newsListItem.className = 'news__item';
    newsListItem.innerHTML = `
     <a class="news__link" href="#">
     <img class="news__img" src="${item.urlToImage}" alt="картинка к статье">
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
    return newsListItem;
  });

  newsList.append(...newsItems);
};

showArticles('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=07465d53b9f34cbd91fffc2fd2a9898c');

