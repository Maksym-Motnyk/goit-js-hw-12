import { searchPhotos } from './js/pixabay-api';
import { markupInterface } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { listImg } from './js/render-functions';

const searchButton = document.querySelector('.searchButton');
const clearInput = () => {
  const input = document.querySelector('.input');
  input.value = '';
};

function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

searchButton.addEventListener('click', event => {
  event.preventDefault();

  const input = document.querySelector('.input');

  if (input.value.trim() == '') {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message:
        'The search field cannot be empty! Please enter the search query!',
    });
    return;
  } else {
    searchPhotos(input)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        hideLoader();
        markupInterface(data);
        if (!listImg.childElementCount) {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
        }
      })
      .catch(error => {
        hideLoader();
        console.error('Error:', error);
      });
  }
  clearInput();
});
