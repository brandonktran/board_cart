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
    this.total = 0;
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
    if (this.state.cart.length > 0) {
      this.total = this.state.cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0);
    }
    return this.total;
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <Transition key={this.state.view.name} child={<ProductList setView={this.setView} />} />
          {/* <CSSTransitionGroup
            key={this.state.view.name}
            transitionName="transition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            <ProductList setView={this.setView} />
          </CSSTransitionGroup> */}
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
          <Transition key={this.state.view.name} child={<CartSummary cart={this.state.cart} setView={this.setView} total={this.total} />} />
        </>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <Transition key={this.state.view.name} child={<CheckoutForm setView={this.setView} placeOrder={this.placeOrder} total={this.total} />} />
        </>
      );
    }
  }
}
