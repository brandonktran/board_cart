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
          <div className="carousel-inner shadow">
            <div className="carousel-item active front-image front-image-1" style={{ backgroundImage: 'url("images/skate-pipe-front.jpg")' }}>
            </div>
            <div className="carousel-item front-image front-image-2" style={{ backgroundImage: 'url("images/surf-front.jpg")' }}>
            </div>
            <div className="carousel-item front-image front-image-3" style={{ backgroundImage: 'url("images/snowboard-equipment-front.jpg")' }}>
            </div>
          </div>
        </div>
        <div className="container" >
          <div className="row" >
            <div className="col-md-4 front-link my-3" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('catalog', { type: 'skate' }); }}>
              <img src="images/skate-front-link.jpg" alt="Skate" style={{ width: '100%' }} />
              <div className="centered">Skate</div>
            </div>
            <div className="col-md-4 front-link my-3" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('catalog', { type: 'snow' }); }}>
              <img src="images/snow-front-link.jpg" alt="Snow" style={{ width: '18rem' }} />
              <div className="centered">Snow</div>
            </div>
            <div className="col-md-4 front-link my-3" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('catalog', { type: 'surf' }); }}>
              <img src="images/surf-front-link.jpg" alt="Surf" style={{ width: '16rem' }} />
              <div className="centered">Surf</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
