import React, { Component } from 'react';
import wpQuery from '../wpQuery';

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      maxPages: 0,
      maxPosts: 0,
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
    }).catch((err) => {
      throw err;
    });
  }

  render() {
    return (
      <div>
        <header>
          <h2>Latest posts</h2>
        </header>
        <ul>
          {this.state.posts.map((post) => console.log(post) || (
            <li key={post.ID}>
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
