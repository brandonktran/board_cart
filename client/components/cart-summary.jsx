import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {
    const items = this.props.cart.map((item, index) => {
      return (
        <CartSummaryItem key={index} item={item} deleteFromCart={this.props.deleteFromCart} />
      );
    });

    if (this.props.cart.length > 0) {
      return (
        <div className="container">
          <h4><a href="#" className="card-link m-1 mt-3 text-muted" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('catalog', {}); }}> &lt; Back to Catalog</a></h4>
          <h3>My Cart</h3>
          {items}
          <div>
            <h3 className="mb-4">Total: ${this.props.total(this.props.cart)} <button type="submit" className="btn btn-success m-1" onClick={() => { this.props.setView('checkout', {}); }} style={{ float: 'right' }}>Checkout</button></h3>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <h4><a href="#" className="card-link m-1 mt-3 text-muted" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('catalog', {}); }}> &lt; Back to Catalog</a></h4>
        <h3>My Cart</h3>
        {items}
      </div>
    );

  }
}
