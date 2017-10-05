import { el, setChildren } from 'redom';
import wpQuery from '../wpQuery';

export default function () {
  const list = el('ul');
  const totalPosts = el('p', 'Total posts: ');
  const totalPages = el('p', 'Total pages: ');
  const footer = el('footer', totalPosts, totalPages);
  const postList = () => el('div',
    el('header',
      el('h2', 'Vanilla: Latest posts')
    ),
    list,
    footer
  );

  wpQuery().then((response) => {
    const { headers, posts } = response;

    setChildren(list, posts.map((post) => el('li',
      el('a',
        { href: post.link },
        post.title.rendered
      )
    )));

    totalPosts.textContent = `Total posts: ${headers['x-wp-total']}`;
    totalPages.textContent = `Total pages: ${headers['x-wp-totalpages']}`;
  }).catch((err) => {
    setChildren(list, el('.error', JSON.parse(err.message).message));
  });

  return postList();
}
