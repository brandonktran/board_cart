import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const cards = this.state.products.map((card, index) => {
      return (
        <ProductListItem key={index} card={card} />
      );
    });
    return (
      <div className="container" >
        <div className="row">
          {cards}
        </div>
      </div>
    );
  }
}
