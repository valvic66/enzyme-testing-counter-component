import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counterValue: 0,
      showNegativeMessage: false
    }
  }

  handleBtnIncrementClick = () => {
    console.log('increment btn clicked');
    if(this.state.showNegativeMessage) {
      this.setState({
        showNegativeMessage: false
      });
    }
    this.setState({
      counterValue: this.state.counterValue + 1
    });
  }

  handleBtnDecrementClick = () => {
    console.log('decrement btn clicked');

    if(this.state.counterValue === 0) {
      console.log('counter will not go negative');

      this.setState({ showNegativeMessage: true })
    } else {
      this.setState({
        counterValue: this.state.counterValue - 1
      });
    }
  }

  render() {
    const msgClass = this.state.showNegativeMessage ? 'visible' : 'hidden';

    return (
      <div className="counter__wrapper" data-testid="component-counter">
        <div className="counter__display" data-testid="counter-display">
          <h2>Counter value</h2>
          <p className="display__value">{this.state.counterValue}</p>
        </div>
        {
          this.state.showNegativeMessage && <p className={`msg-${msgClass}`}><span style={{color: 'red'}}>Counter will not go negative !</span></p>
        }
        <p className={`msg-${msgClass}`}><span style={{color: 'green'}}>Pls increment in order to have this msg closed.</span></p>
        <div data-testid="last-action-display">
          <h4>Last action</h4>
          <p>action from state</p>
        </div>
  
        <button data-testid="button-increment" onClick={this.handleBtnIncrementClick}>Increment</button>
        <button data-testid="button-decrement" onClick={this.handleBtnDecrementClick}>Decrement</button>
  
      </div>
    );
  }
}

export default App;
