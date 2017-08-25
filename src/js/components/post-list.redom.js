import { el, setChildren } from 'redom';
import wp_query from '../wp-query';

export default function() {
  const list = el('ul');
  const totalPosts = el('p', 'Total posts: ');
  const totalPages = el('p', 'Total pages: ');
  const footer = el('footer', totalPosts, totalPages);
  const post_list = () => el('div',
    el('header',
      el('h2', 'Latest posts')
    ),
    list,
    footer
  );

  wp_query().then(response => {
    const { headers, posts } = response;

    setChildren(list, posts.map(post => {
      return el('li',
        el('a',
          { href: post.link },
          post.title.rendered
        )
      );
    }));

    totalPosts.textContent = `Total posts: ${headers['x-wp-total']}`;
    totalPages.textContent = `Total pages: ${headers['x-wp-totalpages']}`;

    return;
  }).catch(err => {
    throw err;
  });

  return post_list();
}
