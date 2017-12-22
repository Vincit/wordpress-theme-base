import { el, setChildren } from 'redom';
import wpQuery from '../wpQuery';

const setListContents = (list, posts) => {
  setChildren(list, posts.map((post) => el('li',
    el('a',
      { href: post.link },
      post.title.rendered
    )
  )));
};

let pageCount = 0;
function populatePostList(response, ...elements) {
  const { headers, posts, next } = response;
  const [list, nextBtn, totalPosts, totalPages, currPage] = elements;

  console.log(response);

  if (list) {
    setListContents(list, posts);

    if (!next) {
      nextBtn.parentNode.removeChild(nextBtn);
    } else {
      nextBtn.addEventListener('click', function _next() {
        next(populatePostList, ...elements);
        nextBtn.removeEventListener('click', _next);
      });
    }

    totalPosts.textContent = `Total posts: ${headers['x-wp-total']}`;
    totalPages.textContent = `Total pages: ${headers['x-wp-totalpages']}`;
    currPage.textContent = `Current page: ${pageCount += 1}`;
  }
}

export default function () {
  const list = el('ul');
  const totalPosts = el('p', 'Total posts: ');
  const totalPages = el('p', 'Total pages: ');
  const currPage = el('p', 'Current page: ');
  const nextBtn = el('button.next', 'Next');
  const footer = el('footer', nextBtn, totalPosts, totalPages, currPage);
  const postList = () => el('div.post-list',
    el('header',
      el('h2', 'Vanilla: Latest posts')
    ),
    list,
    footer
  );

  wpQuery().then((response) => {
    populatePostList(response, list, nextBtn, totalPosts, totalPages, currPage);
  }).catch((err) => {
    console.error(err);
  });
  return postList();
}
