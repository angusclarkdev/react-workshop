////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing [x]
//   - Disable the shipping fields so they are not directly editable [x]
//   - Keep the shipping fields up to date as billing fields change [x]
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
  state = {
    billingName: null,
    billingState: null,
    shippingName: null,
    shippingState: null,
    checked: false
  }
  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name: <input type="text" onChange={(e) => this.setState( {billingName: e.target.value })} />
              </label>
            </p>
            <p>
              <label>
                Billing State: <input type="text" size="2" onChange={(e) => this.setState({ billingState: e.target.value })} />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input type="checkbox" onChange={() => this.setState({ checked: !this.state.checked} )} /> Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name: <input 
                type="text" 
                disabled={this.state.checked === true}
                onChange={(e) => {this.setState({ shippingName: e.target.value })}} 
                  value={this.state.checked ? this.state.billingName : this.state.shippingName} />
              </label>
            </p>
            <p>
              <label>
                Shipping State: <input 
                type="text" 
                size="2" 
                disabled={this.state.checked === true} 
                onChange={(e) => this.setState({ shippingState: e.target.value })}
                value={this.state.checked ? this.state.billingState : this.state.shippingState}  />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
