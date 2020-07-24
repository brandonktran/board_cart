import React from 'react';

export default class CartSummary extends React.Component {

  render() {
    if (this.props.item) {
      return (
        null
      );
    }
    return null;
  }
}
