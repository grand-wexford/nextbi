import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-header">
          <h2>404</h2>
        </div>
        <p className="home-intro">
         <Link to="/">Вернуться на главную</Link>
        </p>
      </div>
    );
  }
}

export default NotFound;