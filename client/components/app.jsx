import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Transition from './transition-component';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
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
      .then(data => this.calculateTotal(this.state.cart));
  }

  addToCart(product) {
    fetch('api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product.productId })
    }).then(res => res.json())
      .then(data => this.setState((prevState, props) => {
        const newArray = [...prevState.cart];
        newArray.push(data);
        return (
          {
            cart: newArray
          });
      }))
      .then(data => this.calculateTotal(this.state.cart));
  }

  deleteFromCart(cartItemId) {
    fetch(`/api/carts/${cartItemId}`, {
      method: 'DELETE'

    }).then(data => this.setState((prevState, props) => {
      const newArray = prevState.cart.filter(item => {
        if (item.cartItemId !== cartItemId) {
          return item;
        }
      });
      return (
        {
          cart: newArray
        });
    }));
  }

  placeOrder(object) {
    fetch('api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    }).then(res => res.json())
      .then(data => this.setState({ cart: [], view: { name: 'catalog', params: {} } }));
  }

  calculateTotal(array) {
    let result = 0;
    if (array.length > 0) {
      result = array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0);
    }
    return result;

  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <Transition key={this.state.view.name}>
            <ProductList setView={this.setView} />
          </Transition>
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
          <Transition key={this.state.view.name}>
            <CartSummary cart={this.state.cart} setView={this.setView} total={this.calculateTotal} deleteFromCart={this.deleteFromCart} />
          </Transition>
        </>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <Transition key={this.state.view.name}>
            <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} total={this.calculateTotal} cart={this.state.cart} />
          </Transition>
        </>
      );
    }
  }
}
