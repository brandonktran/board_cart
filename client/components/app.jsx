import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: 'catalog', params: {} },
      cart: [],
      total: 0
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));

    this.getCartItems();
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .then(data => this.calculateTotal());
  }

  addToCart(product) {
    fetch('api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product.productId }) //
    }).then(res => res.json())
      .then(data => this.setState((prevState, props) => {
        const newArray = [...prevState.cart];
        newArray.push(product);
        return (
          {
            cart: newArray
          });
      }))
      .then(data => this.calculateTotal());
  }

  placeOrder(object) {
    fetch('api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object) //
    }).then(res => res.json())
      .then(data => this.setState({ cart: [], view: { name: 'catalog', params: {} } }));
  }

  calculateTotal() {
    let total = 0;
    if (this.state.cart.length > 0) {
      total = this.state.cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0);
    }
    this.setState({ total: total });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <ProductList setView={this.setView} />
        </>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView} />
        </>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <CartSummary cart={this.state.cart} setView={this.setView} total={this.state.total} />
        </>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} total={this.state.total} />
        </>
      );
    }
  }
}
