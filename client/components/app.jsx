import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Transition from './transition-component';
import FrontPage from './front-page';
import Footer from './footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: 'checkout', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.deleteAllFromCart = this.deleteAllFromCart.bind(this);
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
    window.scrollTo(0, 0);
    this.setState({ view: { name: name, params: params } });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
  }

  addToCart(product, amount) {
    fetch('api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product.productId, amount: amount })
    }).then(res => res.json())
      .then(data => this.setState((prevState, props) => {
        let newArray = [...prevState.cart];
        const item = newArray.filter(item => {
          if (item.productId === product.productId) {
            return item;
          }
        });
        if (item.length > 0) {
          newArray = newArray.map(item => {
            if (item.productId === product.productId) {
              return data;
            } else {
              return item;
            }
          });
        } else {
          newArray.push(data);
        }
        return (
          {
            cart: newArray
          });
      }));
  }

  deleteFromCart(cartItemId) {
    fetch(`/api/carts/${cartItemId}`, {
      method: 'DELETE'

    }).then(data => this.setState((prevState, props) => {
      const newArray = prevState.cart.filter(item => {
        if (item.cartItemId !== cartItemId) {
          return item;
        } else if (item.cartItemId === cartItemId && item.quantity > 1) {
          item.quantity--;
          return item;
        }
      });
      return (
        {
          cart: newArray
        });
    }));
  }

  deleteAllFromCart(cartItemId) {
    fetch(`/api/carts/all/${cartItemId}`, {
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
      .then(data => this.setState({ cart: [] }));
  }

  calculateTotal(array) {
    let result = 0;
    if (array.length > 0) {
      result = array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0);
    }
    return result;

  }

  totalItems(array) {
    let result = 0;
    if (array.length > 0) {
      result = array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0);
    }
    return result;
  }

  render() {
    if (this.state.view.name === 'front') {
      return (
        <>
          <Header cartItemCount={this.totalItems(this.state.cart)} setView={this.setView} />
          <Transition key={this.state.view.name}>
            <FrontPage setView={this.setView} />
          </Transition>
          <Footer />
        </>
      );
    } else if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header cartItemCount={this.totalItems(this.state.cart)} setView={this.setView} />
          <Transition key={this.state.view.name}>
            <ProductList setView={this.setView} category={this.state.view.params.type} />
          </Transition>
          <Footer />
        </>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <>
          <Header cartItemCount={this.totalItems(this.state.cart)} setView={this.setView} />
          <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView} category={this.state.view.params.type} />
          <Footer />
        </>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <>
          <Header cartItemCount={this.totalItems(this.state.cart)} setView={this.setView} />
          <Transition key={this.state.view.name}>
            <CartSummary cart={this.state.cart} setView={this.setView} total={this.calculateTotal(this.state.cart)} deleteFromCart={this.deleteFromCart} deleteAllFromCart={this.deleteAllFromCart} category={this.state.view.params.type} addToCart={this.addToCart} />
            <Footer view={this.state.view.name} cart={this.state.cart} />
          </Transition>
        </>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <>
          <Header cartItemCount={this.totalItems(this.state.cart)} setView={this.setView} />
          <Transition key={this.state.view.name}>
            <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} total={this.calculateTotal(this.state.cart)} cart={this.state.cart} />
            <Footer />
          </Transition>
        </>
      );
    }
  }
}
