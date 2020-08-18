import React from 'react';

export default class Footer extends React.Component {

  render() {
    // if (this.props.view === 'cart' && this.props.cart.length < 2) {
    //   return (
    //     <footer className="page-footer bg-dark mt-3 py-3 fixed-bottom" id="footer" style={{ color: 'white' }}>

    //       <div className="text-center py-3">
    //         <span className=" ml-3" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('front', {}); }}>
    //           <i className="fas fa-snowboarding my-3 ml-3"></i>
    //         </span>
    //         BoardCart
    //       </div>

    //     </footer>
    //   );
    // } else {
    return (
      <footer className="page-footer bg-dark mt-3 py-3" id="footer" style={{ color: 'white' }}>

        <div className="text-center py-3">
          <span style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('front', {}); }}>
            <i className="fas fa-snowboarding my-3"></i>
          </span>
          <span className="ml-1">BoardCart</span>
          <p className="text-center">Built and Developed by Brandon Tran</p>
        </div>

      </footer>
    );
    // }
  }
}
