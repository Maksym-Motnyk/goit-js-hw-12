import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchPhotos, PER_PAGE } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

import {
  hideLoader,
  showLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  disableSearchFormSubmitBtn,
  enableSearchFormSubmitBtn,
} from './js/helpers/funcs.js';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.js-search-form');
const searchFormSubmitBtnEl = document.querySelector(
  '.js-search-form-submit-btn'
);
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more-btn');

let query = '';
let photosCurrentPage = 1;
let totalPages = 0;

const lightbox = new SimpleLightbox('.item-gallery__link', {
  captionsData: 'alt',
  captionsDelay: 250,
});

const onSearch = async event => {
  event.preventDefault();
  galleryEl.innerHTML = '';
  photosCurrentPage = 1;

  hideLoadMoreBtn(loadMoreBtnEl);

  const form = event.currentTarget;
  query = form.elements.searchword.value.trim();

  if (query === '') {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    form.reset();
    return;
  }

  try {
    disableSearchFormSubmitBtn(searchFormSubmitBtnEl);

    showLoader(loaderEl);

    const { hits, totalHits } = await fetchPhotos(query, photosCurrentPage);

    if (totalHits === 0) {
      enableSearchFormSubmitBtn(searchFormSubmitBtnEl);

      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      form.reset();
      hideLoader(loaderEl);
      return;
    }

    galleryEl.insertAdjacentHTML('beforeend', createMarkup(hits));

    lightbox.refresh();

    hideLoader(loaderEl);

    enableSearchFormSubmitBtn(searchFormSubmitBtnEl);

    totalPages = Math.ceil(totalHits / PER_PAGE);
    if (totalPages > 1) {
      showLoadMoreBtn(loadMoreBtnEl);
    }
  } catch (error) {
    enableSearchFormSubmitBtn(searchFormSubmitBtnEl);

    hideLoader(loaderEl);

    iziToast.error({
      message: 'Search params is not valid!',
      position: 'topRight',
    });
    form.reset();
    return;
  }

  form.reset();
};

searchFormEl.addEventListener('submit', onSearch);

const smoothScrollOnLoadMore = () => {
  const lastPhoto = document.querySelector('.gallery__item');
  const photosHeight = lastPhoto.getBoundingClientRect().height;
  const twoPhotosHeight = photosHeight * 2;
  window.scrollBy({
    top: twoPhotosHeight,
    left: 0,
    behavior: 'smooth',
  });
};

const onLoadMorePress = async event => {
  try {
    hideLoadMoreBtn(loadMoreBtnEl);

    showLoader(loaderEl);

    photosCurrentPage += 1;

    const { hits, totalHits } = await fetchPhotos(query, photosCurrentPage);

    galleryEl.insertAdjacentHTML('beforeend', createMarkup(hits));

    lightbox.refresh();

    smoothScrollOnLoadMore();

    hideLoader(loaderEl);

    totalPages = Math.ceil(totalHits / PER_PAGE);
    if (photosCurrentPage < totalPages) {
      showLoadMoreBtn(loadMoreBtnEl);
    } else {
      loadMoreBtnEl.removeEventListener('click', onLoadMorePress);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }
  } catch (error) {
    enableSearchFormSubmitBtn(searchFormSubmitBtnEl);

    hideLoader(loaderEl);

    iziToast.error({
      message: 'Search params is not valid!',
      position: 'topRight',
    });
    form.reset();
    return;
  }
};

loadMoreBtnEl.addEventListener('click', onLoadMorePress);
