import React from 'react';

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'front'
    };
  }

  render() {
    return (
      <>
        <div className="carousel slide" data-ride="carousel" data-interval="2000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="images/men-wetsuit.jpg" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/adidas-jacket.jpg" alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/nike-sb.jpg" alt="Third slide" />
            </div>
          </div>
        </div>
        <div className="container" >
          <div className="row" >
            <div onClick={() => { this.props.setView('catalog', { type: 'skate' }); }}>Skate</div>
            <div onClick={() => { this.props.setView('catalog', { type: 'snow' }); }}>Snow</div>
            <div onClick={() => { this.props.setView('catalog', { type: 'surf' }); }}>Surf</div>
          </div>
        </div>
      </>
    );
  }
}
