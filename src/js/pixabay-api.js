function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}
import axios from 'axios';

axios.default.baseURL = BASE_URL;

export function searchPhotos(input) {
  showLoader();

  const searchParams = new URLSearchParams({
    key: '43803497-a801e9cfe7ea9bdd19d306bb3',
    q: input.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;

  return fetch(url);
}
