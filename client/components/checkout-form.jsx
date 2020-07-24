import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      card: '',
      address: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    this.setState({
      [property]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      name: '',
      card: '',
      address: ''
    });
  }

  handleReset() {
    this.setState({
      name: '',
      card: '',
      address: ''
    });
    this.props.setView('catalog', {});
  }

  render() {
    const submitInfo = { name: this.state.name, creditCard: this.state.card, shippingAddress: this.state.address };
    return (
      <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <div>
          <h1 className="text-center">My Cart</h1>
          <h3 style={{ textAlign: 'center' }}>Total: ${this.props.total}</h3>
          <form className="text-center" onSubmit={this.handleSubmit} onReset={this.handleReset}>
            <div className="form-group">
              <label className="mr-2">Name</label> <br></br>
              <input type="text" onChange={this.handleChange} name="name" />
            </div>
            <div className="form-group">
              <label className="mr-2">Credit Card</label> <br></br>
              <input type="text" onChange={this.handleChange} name="card" />
            </div>
            <div className="form-group">
              <label className="mr-2">Shipping Address</label> <br></br>
              <textarea type="text" onChange={this.handleChange} name="address"></textarea>
            </div>
            <div>
              <button type="submit" className="btn btn-success m-1" onClick={() => { this.props.placeOrder(submitInfo); }}>Place Order</button>
              <h4><a href="#" className="card-link m-1 mt-3 text-muted" style={{ cursor: 'pointer' }} onClick={() => { this.handleReset(); }}> &lt; Continue Shopping</a></h4>
            </div>
          </form>
        </div>
      </CSSTransitionGroup>
    );
  }
}
