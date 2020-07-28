import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
    this.quantityChange = this.quantityChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }

  quantityChange(operator) {
    this.setState((prevState, props) => {
      if (operator === '-' && prevState.quantity !== 1) {
        return (
          {
            quantity: prevState.quantity - 1
          });
      } else if (operator === '+') {
        return (
          {
            quantity: prevState.quantity + 1
          });
      }
    }
    );
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
          <div className="modal fade" id="ModalViewCart" tabIndex="-1" role="dialog" aria-labelledby="ModalViewCartCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  Item(s) was added to your cart!
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.props.setView('cart', {}); }}>View Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="container" >
            <div className="card m-2 border-light shadow">
              <a href="#" className="card-link m-3 text-muted" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('catalog', { type: this.props.category }); }}> &lt; Back to Content</a>
              <div className="row">
                <div className="col">
                  <img className="card-img-top ml-2 h-100" src={this.state.product.image.toString()} alt="Card image cap" />
                </div>
                <div className="col m-2">
                  <h5 className="card-title">{this.state.product.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">${this.state.product.price}</h6>
                  <p className="card-text">{this.state.product.shortDescription}</p>
                                Quantity:
                  <button className="btn incrementers previous border ml-2" onClick={() => this.quantityChange('-')}>-</button><span className="m-2">{this.state.quantity}</span>
                  <button href="#" className="btn incrementers next border" onClick={() => this.quantityChange('+')}>+</button>
                  <button type="button" className="btn btn-primary ml-2" data-toggle="modal" data-target="#ModalViewCart" onClick={() => { this.props.addToCart(this.state.product, this.state.quantity); }}>
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="card-body m-2">
                <p className="card-text">{this.state.product.longDescription}</p>
              </div>
            </div>
          </div >
        </CSSTransitionGroup >
      );
    }
    return (
      null
    );

  }
}
