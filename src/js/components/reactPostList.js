import React, { Component } from 'react';
import wpQuery from '../wpQuery';

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      maxPages: 0,
      maxPosts: 0,
      error: false,
    };
  }

  componentDidMount() {
    wpQuery().then((response) => {
      const { headers, posts } = response;

      this.setState({
        posts,
        maxPages: headers['x-wp-totalpages'],
        maxPosts: headers['x-wp-total'],
      });
    }).catch((error) => {
      if (error.message.contains('404')) {
        this.setState({
          error: 'Got 404 trying to query for posts. Is aucor/wp_query-route-to-rest-api installed?',
        });
      }
    });
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }

    return (
      <div>
        <header>
          <h2>React: Latest posts</h2>
        </header>
        <ul>
          {this.state.posts.map((post) => (
            <li key={post.id}>
              <a href={post.link}>{post.title.rendered}</a>
            </li>
          ))}
        </ul>
        <footer>
          <p>Total posts: {this.state.maxPosts}</p>
          <p>Total pages: {this.state.maxPages}</p>
        </footer>
      </div>
    );
  }
}
