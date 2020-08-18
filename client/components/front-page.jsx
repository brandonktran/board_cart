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
        <div className="carousel slide" style={{ width: '100%' }} data-ride="carousel" data-interval="2000">
          <div className="carousel-inner">
            <div className="carousel-item active front-image front-image-1" style={{ backgroundImage: 'url("images/skate-pipe-front.jpg")' }}>
            </div>
            <div className="carousel-item front-image front-image-2" style={{ backgroundImage: 'url("images/surf-front.jpg")' }}>
            </div>
            <div className="carousel-item front-image front-image-3" style={{ backgroundImage: 'url("images/snowboard-equipment-front.jpg")' }}>
            </div>
          </div>
        </div>
        <div className="container" >
          <div className="card-deck d-flex justify-content-around" >
            <div
              className="category col-md-3 bgImg1 product my-3"
              onClick={() => { this.props.setView('catalog', { type: 'skate' }); }}
            >
              <div className="content p-3">
                <h1>Skate</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
            <div
              className="category col-md-3 bgImg2 product my-3"
              onClick={() => { this.props.setView('catalog', { type: 'snow' }); }}
            >
              <div className="content p-3">
                <h1>Snow</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
            <div
              className="category col-md-3 bgImg3 product my-3"
              onClick={() => { this.props.setView('catalog', { type: 'surf' }); }}
            >
              <div className="content p-3">
                <h1>Surf</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
