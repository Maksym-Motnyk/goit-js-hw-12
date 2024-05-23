import {
  searchPhotos,
  resetPage,
  incrementPage,
  getCurrentPage,
  setCurrentQuery,
  getCurrentQuery,
  getTotalHits,
} from './js/pixabay-api.js';
import { markupInterface, listImg } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchButton = document.querySelector('.searchButton');
const loadMoreButton = document.querySelector('.btn');

const clearInput = () => {
  const input = document.querySelector('.input');
  input.value = '';
};

function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

searchButton.addEventListener('click', async event => {
  event.preventDefault();

  const input = document.querySelector('.input');

  if (input.value.trim() === '') {
    iziToast.error({
      title: 'Error',
      message:
        'The search field cannot be empty! Please enter the search query!',
    });
    return;
  }

  resetPage();
  setCurrentQuery(input.value);
  listImg.innerHTML = '';
  loadMoreButton.style.display = 'none';

  try {
    const data = await searchPhotos(getCurrentQuery(), getCurrentPage());
    markupInterface(data);

    if (data.hits.length) {
      loadMoreButton.style.display = 'block';
    }

    if (data.totalHits === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there was an error when receiving data. Please try again!',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there was an error when receiving data. Please try again!',
    });
  }

  clearInput();
});

loadMoreButton.addEventListener('click', async () => {
  incrementPage();

  try {
    const data = await searchPhotos(getCurrentQuery(), getCurrentPage());
    markupInterface(data);

    const totalLoadedImages = document.querySelectorAll('.item-list').length;

    if (totalLoadedImages >= getTotalHits()) {
      loadMoreButton.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const { height: cardHeight } = document
      .querySelector('.item-list')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there was an error when receiving data. Please try again!',
    });
  }
});
