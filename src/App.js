import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class HangManImage extends Component{
	render(){
		return <h2>Here be Image</h2>
	}
}

class HangManWordToGuess extends Component{
	render(){
		return <h2>Here be word to guess</h2>
	}
}

class HangeManGuessedCorrect extends Component{
	render(){
		return (
		<div>
		  <p>Guessed Correct</p>
		  </div>
	  )
  }
}

class HangeManGuessedInCorrect extends Component{
	render(){
		return (
		<div>
		  <p>Guessed InCorrect</p>
		  </div>
	  )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <h3 className="App-intro">
          Here be the hanging man.
        </h3>
        <Row>
          <Col md={12}>
			<HangManImage/>
			<HangManWordToGuess/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
