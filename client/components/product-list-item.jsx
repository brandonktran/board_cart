import React from 'react';

export default class ProductListItem extends React.Component {

  render() {
    return (
      <div className="col-md-4 py-2">
        <div className="card m-2 h-100">
          <img className="card-img-top h-50" src={this.props.card.image.toString()} alt="Card image cap" />
          <div className="card-body">
            <h3>{this.props.card.name}</h3>
            <h6>${this.props.card.price}</h6>
            <p className="card-text">{this.props.card.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
