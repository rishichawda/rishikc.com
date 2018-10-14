import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        home page
        <Link to="/not">link 2</Link>
      </div>
    );
  }
}

export default HomePage;
