import React, { Component } from 'react';
import './App.css';

class App extends Component{
  //setup for props of the componend App
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render(){
    return (

      <div data-test="component-app">
        
        <h1>APP!</h1>
        <div data-test="counter-display">The counter is currently {this.state.counter} </div>
        <button 
        data-test="increment-button"
        onClick={() => this.setState({ counter: this.state.counter + 1})}
        >Increment </button>

      </div>
    );
  }

}

export default App;
