////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls the form's `onSubmit` handler [x]
// - Hitting "Enter" while in a <TextInput> submits the form [x]
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the form's `onSubmit` handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { isNull } from "util";

const MyContext = React.createContext();

class MyProvider extends React.Component {

  handleSubmit = (e) => {
    // console.log("clicked")
    alert("YOU WIN!");
  };

  render() {
    return (
      <MyContext.Provider value={ {handleSubmit: this.handleSubmit} }>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

class Form extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

class SubmitButton extends React.Component {
  render() {
    return (

     <MyContext.Consumer>
       {({ handleSubmit }) => (
          <button onClick={handleSubmit}> {this.props.children} </button>
       )} 
    </MyContext.Consumer>
    )
  }
}

class TextInput extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {({ handleSubmit }) => (
          <input
            type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            onKeyDown={ (e) => { e.key === 'Enter' ? handleSubmit() : null }}  
          />
        )}
      </MyContext.Consumer>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <div>
          <h1>
            This isn't even my final <code>&lt;Form/&gt;</code>!
          </h1>
          <MyContext.Consumer>
            {({ handleSubmit }) => (
              <Form>
                <p>
                  <TextInput name="firstName" placeholder="First Name" />{" "}
                  <TextInput name="lastName" placeholder="Last Name" />
                </p>
                <p>
                  <SubmitButton> Submit</SubmitButton>
                </p>
              </Form>
            )}
          </MyContext.Consumer>
        </div>
      </MyProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
