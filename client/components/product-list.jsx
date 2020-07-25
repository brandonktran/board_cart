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
    let cards = this.state.products.map((card, index) => {
      return (
        <ProductListItem key={index} card={card} setView={this.props.setView} category={this.props.category} />
      );
    });

    if (this.props.category === 'skate') {
      cards = cards.splice(0, 9);
    } else if (this.props.category === 'snow') {
      cards = cards.splice(9, 9);
    } else if (this.props.category === 'surf') {
      cards = cards.splice(18, 9);
    }

    return (
      <div className="container" >
        <div className="row" >
          {cards}
        </div>
      </div>
    );
  }
}
