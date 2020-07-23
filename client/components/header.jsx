import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <h1 className="navbar-brand" style={{ fontSize: '35px' }}>
          Wicked Sales
        </h1>
      </nav>
    );
  }
}
