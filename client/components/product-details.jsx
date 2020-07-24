import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    if (this.state.product) {
      return (
        <div className="container" >
          <div className="card m-2">
            <a href="#" className="card-link m-1" onClick={() => { this.props.setView('catalog', {}); }}> &lt; Back to Content</a>
            <div className="row">
              <div className="col">
                <img className="card-img-top ml-1 h-100" src={this.state.product.image.toString()} alt="Card image cap" />
              </div>
              <div className="col">
                <h5 className="card-title">{this.state.product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">${this.state.product.price}</h6>
                <p className="card-text">{this.state.product.shortDescription}</p>
                <button type="button" className="btn btn-primary" onClick={() => { this.props.addToCart(this.state.product); }}>Add to Cart</button>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">{this.state.product.longDescription}</p>
            </div>
          </div>
        </div >
      );
    }
    return null;

  }
}
