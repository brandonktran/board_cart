import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className="m-3 p-1 shadow border-light" style={{ backgroundColor: 'white' }}>
        <div className="row">
          <div className="col-6">
            <img className="card-img-top ml-1" src={this.props.item.image.toString()} alt="Card image cap" />
          </div>
          <div className="col m-2 mb-3">
            <h1>{this.props.item.name}</h1>
            <h6 className="card-subtitle mb-2 text-muted">${this.props.item.price * this.props.item.quantity}</h6>
            <div>
              Quantity:
              <button className="incrementers previous border ml-2" onClick={() => { this.props.deleteFromCart(this.props.item.cartItemId); }}>-</button><span className="mx-2">{this.props.item.quantity}</span>
              <button href="#" className="incrementers next border" onClick={() => { this.props.addToCart(this.props.item, 1); }}>+</button>
            </div>
            <p>{this.props.item.shortDescription}</p>
            <button type="button" className="btn btn-danger" onClick={() => { this.props.deleteAllFromCart(this.props.item.cartItemId); }}>Remove all from Cart</button>
          </div>
        </div>
      </div>
    );
  }
}
