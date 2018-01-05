import { el, setChildren } from 'redom';
import wpQuery from '../wpQuery';


const postsPerPage = 10;
let allPosts = [];
let offset = 0;

function populatePostList(response, ...elements) {
  // wpQuery response may contain a function to get the next set if it exists
  const { posts, next } = response;
  const [list, showingPosts, nextBtn] = elements;

  allPosts = [
    ...allPosts,
    ...posts,
  ];

  if (list) {
    const renderCond = (i) => i < offset || i > postsPerPage + offset;
    const arr = posts.map((post, i) => renderCond(i) ? false : (
      el('li',
        el('a',
          { href: post.link },
          post.title.rendered
        )
      )
    )).filter(Boolean);

    setChildren(list, arr);

    if (!next) {
      nextBtn.parentNode.removeChild(nextBtn);
    } else {
      nextBtn.addEventListener('click', function _next() {
        offset += 10;
        next(populatePostList, ...elements);
        nextBtn.removeEventListener('click', _next);
      });
    }

    showingPosts.textContent = `Showing posts ${offset === 0 ? 1 : offset} - ${offset + postsPerPage}.`;
  }
}

export default function () {
  const list = el('ul');
  const showingPosts = el('p', 'Showing posts ');
  const nextBtn = el('button.next', 'Next');
  // No prev button for vanilla because dealing with it is painful
  const footer = el('footer', showingPosts, nextBtn);
  const postList = () => el('div.post-list',
    el('header',
      el('h2', 'Vanilla: Latest posts')
    ),
    list,
    footer
  );

  // async/await is a lot harder in Vanilla, as this function can't be async or it doesn't work
  // try {
    // const response = await wpQuery();
    // populatePostList(response, list, nextBtn, totalPosts, totalPages, currPage);
  // } catch (e) {
    // console.error(e);
  // }

  wpQuery().then((response) => {
    populatePostList(response, list, showingPosts, nextBtn);
  }).catch((err) => {
    console.error(err);
  });
  return postList();
}
