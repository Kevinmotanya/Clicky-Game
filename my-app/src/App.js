import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Wrapper from './components/Wrapper'
import Navig from './components/Navig'
import Title from './components/Title'
import MyCard from './components/MyCard'

class App extends Component {
  state = {
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    dogs: dogs,
    unselectedDogs: dogs
}

componentDidMount() {
}

shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

selectDog = breed => {
    const findDog = this.state.unselectedDogs.find(item => item.breed === breed);

    if(findDog === undefined) {
        // failure to select a new dog
        this.setState({ 
            message: "You guessed incorrectly!",
            topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
            curScore: 0,
            dogs: dogs,
            unselectedDogs: dogs
        });
    }
    else {
        // success to select a new dog
        const newDogs = this.state.unselectedDogs.filter(item => item.breed !== breed);
        
        this.setState({ 
            message: "You guessed correctly!",
            curScore: this.state.curScore + 1,
            dogs: dogs,
            unselectedDogs: newDogs
        });
    }

    this.shuffleArray(dogs);
};

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
