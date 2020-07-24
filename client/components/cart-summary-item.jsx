import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className="m-4 p-1 shadow" style={{ margin: 'auto', backgroundColor: 'white' }}>
        <div className="row">
          <div className="col-6">
            <img className="card-img-top ml-1" src={this.props.item.image.toString()} alt="Card image cap" />
          </div>
          <div className="col">
            <h1>{this.props.item.name}</h1>
            <h6 className="card-subtitle mb-2 text-muted">${this.props.item.price}</h6>
            <p>{this.props.item.shortDescription}</p>
            <button>Remove from Cart</button>
          </div>
        </div>
      </div>
    );
  }
}
