import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import rabbits from '.rabbits.json'

import Wrapper from './components/Wrapper'
import Navig from './components/Navig'
import Title from './components/Title'
import MyCard from './components/MyCard'

class App extends Component {
  state = {
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    rabbits: rabbits,
    unselectedrabbits: rabbits
}

componentDidMount() {
}

shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

selectRabbit = breed => {
    const findRabbit = this.state.unselectedrabbits.find(item => item.breed === breed);

    if(findRabbit === undefined) {
        // failure to select a new rabbit
        this.setState({ 
            message: "You guessed incorrectly!",
            topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
            curScore: 0,
            rabbits: rabbits,
            unselectedrabbits: rabbits
        });
    }
    else {
        // success to select a new  rabbit
        const newrabbits = this.state.unselectedrabbits.filter(item => item.breed !== breed);
        
        this.setState({ 
            message: "You guessed correctly!",
            curScore: this.state.curScore + 1,
            rabbits: rabbits,
            unselectedrabbits: newrabbits
        });
    }

    this.shuffleArray(rabbits);
};

  render() {
    return (
      <Wrapper>
          <Navig
              message={this.state.message}
              curScore={this.state.curScore}
              topScore={this.state.topScore}
          />
          <Title />
          {
              this.state.rabbits.map(rabbit => (
                  <MyCard
                      breed={rabbit.breed}
                      image={rabbit.image}
                      selectRabbit={this.selectRabbit} 
                      curScore={this.state.curScore}
                  />
              ))
          }
      </Wrapper>
  );
}
}
export default App;
