import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {
    const items = this.props.cart.map((item, index) => {
      return (
        <CartSummaryItem key={index} item={item} deleteFromCart={this.props.deleteFromCart} deleteAllFromCart={this.props.deleteAllFromCart} addToCart={this.props.addToCart} />
      );
    });

    if (this.props.cart.length > 0) {
      return (
        <div className="container">
          <div className="click text-muted ml-auto m-4" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { this.props.setView('front', {}); }}>
            <i className="fas fa-arrow-circle-left mr-2"></i>
            Back to Home
          </div>
          <h1>My Cart</h1>
          {items}
          <div className="mb-4">
            <h3 className="mb-4 my-2">Total: ${this.props.total} <button type="submit" className="btn btn-success m-1" onClick={() => { this.props.setView('checkout', {}); }} style={{ float: 'right' }}>Checkout</button></h3>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="click text-muted ml-auto m-4" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { this.props.setView('front', {}); }}>
          <i className="fas fa-arrow-circle-left mr-2"></i>
            Back to Home
        </div>
        <h1 className="mb-2">My Cart</h1>
        <h3 className="my-2">Cart is Empty!</h3>
      </div>
    );

  }
}
