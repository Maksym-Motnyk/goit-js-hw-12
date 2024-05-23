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

document.querySelector('.btn');
let page = 1;
// Controls the number of items in the group
let perPage = 10;

fetchPostsBtn.addEventListener('click', async () => {
  try {
    const posts = await fetchPosts();
    renderPosts(posts);
    // Increase the group number
    page += 1;

    // Replace button text after first request
    if (page > 1) {
      fetchPostsBtn.textContent = 'Load more';
    }
  } catch (error) {
    console.log(error);
  }
});

async function fetchPosts() {
  const params = new URLSearchParams({
    _limit: perPage,
    _page: page,
  });

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?${params}`
  );
  return response.data;
}

function renderPosts(posts) {
  const markup = posts
    .map(({ id, title, body, userId }) => {
      return `<li>
          <h2 class="post-title">${title.slice(0, 30)}</h2>
          <p><b>Post id</b>: ${id}</p>
          <p><b>Author id</b>: ${userId}</p>
          <p class="post-body">${body}</p>
        </li>`;
    })
    .join('');
  postList.insertAdjacentHTML('beforeend', markup);
}
