import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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
      .then(data => this.setState({ cart: data }));
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
      }));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} />
          <ProductList setView={this.setView} />
        </>
      );
    } else {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} />
          <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView} />
        </>
      );
    }
  }
}
