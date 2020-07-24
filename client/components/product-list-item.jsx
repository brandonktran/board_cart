import React from 'react';

export default class ProductListItem extends React.Component {

  render() {
    return (
      <div className="col-md-4 py-2">
        <div className="card m-2 h-100 shadow" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('details', { productId: this.props.card.productId }); }}>
          <img className="card-img-top mt-1" src={this.props.card.image.toString()} alt="Card image cap" />
          <div className="card-body">
            <h3>{this.props.card.name}</h3>
            <h6 className="text-muted">${this.props.card.price}</h6>
            <p className="card-text">{this.props.card.shortDescription}</p>
          </div>
        </div>
      </div >
    );
  }
}
