import React from 'react';

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

  handleSubmit(event, info) {
    event.preventDefault();
    this.props.placeOrder(info);
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
      <div>
        <h1 className="text-center">My Cart</h1>
        <h3 style={{ textAlign: 'center' }}>Total: ${this.props.total} </h3>
        <form className="text-center" onSubmit={() => { this.handleSubmit(event, submitInfo); }} onReset={this.handleReset}>
          <div className="form-group">
            <label className="mr-2">Name</label> <br></br>
            <input required type="text" onChange={this.handleChange} name="name" />
          </div>
          <div className="form-group">
            <label className="mr-2">Credit Card</label> <br></br>
            <input required type="text" onChange={this.handleChange} name="card" />
          </div>
          <div className="form-group">
            <label className="mr-2">Shipping Address</label> <br></br>
            <textarea required type="text" onChange={this.handleChange} name="address"></textarea>
          </div>
          <div>
            <h4><a href="#" className="card-link m-1 mt-3 text-muted" style={{ cursor: 'pointer' }} onClick={() => { this.handleReset(); }}> &lt; Continue Shopping</a></h4>
            <button type="submit" className="btn btn-success m-1">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
