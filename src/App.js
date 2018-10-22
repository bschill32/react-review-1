import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// React is Crazy

class App extends Component {

  constructor() {
    super()
    // We cannot use this inside of a constructor that extends another class without invoking super first
    //If you want to know more about what exactly super does, check out this link
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super#Description
    this.state = {
      list: ['get groceries', 'drop off check'],
      inputVal: ''
    }    
    //Here we are binding these two functions to this class so that the this keyword will always be our App
    this.handleChange = this.handleChange.bind(this)
    this.addItem = this.addItem.bind(this)
  }

  handleChange(e) {
    //Handle change takes in an event passed from the on change event listener. We can get the value out of this event by accessing e.target.value and then use that value to set the value of inputVal on state each time we enter in a new character 
    console.log('I am the events value', e.target.value)
    //this.setState is the method that we use to update the state of the component. We pass it an object with key value pairs we would like to update. this.setState here is only concerned with updating inputVal on our state and will leave the rest of state alone
    this.setState({
      inputVal: e.target.value
    })
  }

  addItem() {
    //One of the most important things about React is that we do not directly alter state. This means that in order to make sure I can push to a new array I can't just set a variable equal to this.state.list and then push to that new array because that will alter the old array as well which is a big React no no. I instead have to make a copy, alter the copy and use that copy to update the old value of list
    let listCopy = this.state.list.slice(0)
    listCopy.push(this.state.inputVal)
    //Here we are updating list with the listcopy that has the new item and we are also setting the value of inputVal back to an empty string to set the input on the dom back to an empty input. This is just for a good user experience.
    this.setState({
      list: listCopy,
      inputVal: ''
    })
  }

  render() {
    return (
      <div className="App">
      {/* The input will always display the value of this.state.inputVal. The onchange event listener will always invoke this.handleChange which will update state, then cause a rerender and the inputs value will have changed to reflect the new value of this.state.inputVal */}
        <input value={this.state.inputVal} onChange={this.handleChange}/>
        {/* We pass a function here that will be invoked when the button is clicked. that function will take the current value of this.state.inputVal which has been updated by the preceding input and use that to add to the list and then setState */}
        <button onClick={this.addItem}>Add Item</button>
        {/* Finally we are mapping through this.state.list and returning a div for each */}
        {
          this.state.list.map( (item, i) => {
            return (
              <div key={i}>
                {item}
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
