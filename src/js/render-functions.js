import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const listImg = document.querySelector('.list');
let lightbox;

export const markupInterface = data => {
  const markup = data.hits
    .map(hit => {
      return `
      <li class="item-list">
        <a href="${hit.largeImageURL}" class="item-list-link">
          <img class="item-list-img" src="${hit.webformatURL}" alt="${hit.tags}">
        </a>
        <div class='markup-info'>
          <div class="item-list-info-text">
            <h3 class="item-list-title">Likes</h3>
            <p class="item-list-text">${hit.likes}</p>
          </div>
          <div class="item-list-info-text">
            <h3 class="item-list-title">Views</h3>
            <p class="item-list-text">${hit.views}</p>
          </div>
          <div class="item-list-info-text">
            <h3 class="item-list-title">Comments</h3>
            <p class="item-list-text">${hit.comments}</p>
          </div>
          <div class="item-list-info-text">
            <h3 class="item-list-title">Downloads</h3>
            <p class="item-list-text">${hit.downloads}</p>
          </div>
        </div>
      </li>
    `;
    })
    .join('');

  listImg.innerHTML += markup;

  lightbox = new SimpleLightbox('.item-list-link', {
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });

  lightbox.refresh();
};
