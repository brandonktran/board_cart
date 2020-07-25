import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

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
        <CSSTransitionGroup
          transitionName="transition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <div className="container" >
            <div className="card m-2 border-light shadow">
              <a href="#" className="card-link m-3 text-muted" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('catalog', { type: this.props.category }); }}> &lt; Back to Content</a>
              <div className="row">
                <div className="col">
                  <img className="card-img-top ml-1 h-100" src={this.state.product.image.toString()} alt="Card image cap" />
                </div>
                <div className="col">
                  <h5 className="card-title">{this.state.product.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">${this.state.product.price}</h6>
                  <p className="card-text">{this.state.product.shortDescription}</p>
                  <button type="button" className="btn btn-primary" style={{ cursor: 'pointer' }} onClick={() => { this.props.addToCart(this.state.product); }}>Add to Cart</button>
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">{this.state.product.longDescription}</p>
              </div>
            </div>
          </div >
        </CSSTransitionGroup>
      );
    }
    return (
      null
    );

  }
}
