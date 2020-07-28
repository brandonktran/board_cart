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
              <button className="btn incrementers previous border ml-2" onClick={() => { this.props.deleteFromCart(this.props.item.cartItemId); }}>-</button><span className="mx-2">{this.props.item.quantity}</span>
              <button href="#" className="btn incrementers next border" onClick={() => { this.props.addToCart(this.props.item, 1); }}>+</button>
            </div>
            <p>{this.props.item.shortDescription}</p>
            <button type="button" className="btn btn-danger ml-2" data-toggle="modal" data-target={`#ModalDelete${this.props.item.cartItemId}`}>
              Remove All
            </button>
            <div className="modal fade" id={`ModalDelete${this.props.item.cartItemId}`} tabIndex="-1" role="dialog" aria-labelledby="ModalDeleteCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    Are you sure you want to remove these items from your cart?
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { this.props.deleteAllFromCart(this.props.item.cartItemId); }}>Remove All From Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
