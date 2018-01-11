import React, { Component } from 'react';
import wpQuery from '../../lib/wp-query';

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      postsPerPage: 10,

      next: () => {},
      posts: [],
      error: false,
    };
  }

  async componentDidMount() {
    // TODO: Get rid of try/catch by handling errors internally inside wpQuery, maybe.

    try {
      const response = await wpQuery();
      const { posts, next } = response;

      this.setState({
        posts,
        next, // assign function that fetches a new set of posts if it exists
      });
    } catch (error) {
      console.error(error);

      if (error.message.contains('404')) {
        this.setState({
          error: 'Got 404 trying to query for posts. Is aucor/wp_query-route-to-rest-api installed?',
        });
      }
    }
  }

  async nextPage() {
    const { offset, postsPerPage } = this.state; // Can only extract these due to name conflicts

    if (this.state.next) {
      const response = await this.state.next();
      const { posts, next } = response;

      this.setState((prev) => ({
        offset: prev.offset + prev.postsPerPage,

        posts: [
          ...prev.posts,
          ...posts,
        ],
        next,
      }));
    } else if (this.state.posts.length > offset + postsPerPage) {
      this.setState((prev) => ({
        offset: prev.offset + prev.postsPerPage,
      }));
    }
  }

  previousPage() {
    this.setState((prev) => ({
      offset: prev.offset - prev.postsPerPage,
    }));
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }

    const {
      next,
      posts,
      offset,
      postsPerPage,
    } = this.state;

    const nextCond = next || (posts.length > offset + postsPerPage);
    const nextButton = nextCond ? (
      <button className="next" key="next" onClick={() => this.nextPage()}>
        Next
      </button>
    ) : false;
    const previousButton = offset > 0 ? (
      <button className="prev" key="prev" onClick={() => this.previousPage()}>
        Previous
      </button>
    ) : false;

    const buttons = [nextButton, previousButton];
    const renderCond = (i) => i < offset || i > postsPerPage + offset;

    return (
      <div className="post-list">
        <header>
          <h2>React: Latest posts</h2>
        </header>
        <ul>
          {posts.map((post, i) => renderCond(i) ? false : (
            <li key={post.id}>
              <a href={post.link}>{post.title.rendered}</a>
            </li>
          ))}
        </ul>
        <footer>
          <p>Showing posts {offset === 0 ? 1 : offset} - {offset + postsPerPage}.</p>
          {buttons}
        </footer>
      </div>
    );
  }
}
