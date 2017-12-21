import React, { Component } from 'react';
import { ymdhis } from './clock';

// This could be written as a dumb component, but then you'd have to update the
// component in the parent container, which is impractical for this.

export default class Clock extends Component {
  constructor() {
    super();

    this.state = {
      time: '1970-1-1 13:34:00',
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        time: ymdhis(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <time className="clock">{ymdhis()}</time>;
  }
}
