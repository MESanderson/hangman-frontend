import React, { Component } from 'react';
import {Row, Col, ListGroup, 
	ListGroupItem, Button, FormControl} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import hangman_0 from './images/hangman_0.png';
import hangman_1 from './images/hangman_1.png';
import hangman_2 from './images/hangman_2.png';
import hangman_3 from './images/hangman_3.png';
import hangman_4 from './images/hangman_4.png';
import hangman_5 from './images/hangman_5.png';
import hangman_6 from './images/hangman_6.png';

class HangManImage extends Component{
	constructor(props){
		super(props);
		this.state = {
			hangman_images: [
			hangman_0,
			hangman_1,
			hangman_2,
			hangman_3,
			hangman_4,
			hangman_5,
			hangman_6
			]
		}
	}
	render(){
		
		return (
		<Row>
			<Col md={12}>
				<img src={this.state.hangman_images[this.props.num_incorrect_letters]}/>
			</Col>
		</Row>
		)
	}
}

class HangManWordToGuess extends Component{
	render(){
		const hangman_pts = this.props.word.split('').map((letter,ix) =>{
			let letter_val;
			let className;
			let letter_val_ix = this.props.correctLetters.indexOf(letter);
			if (letter_val_ix === -1){
				letter_val = '_';
			} else {
				letter_val = letter;
				className='correct-letter';
			}
			return (
			<Button key={'letter'+ix}>
			{letter_val}
			</Button>
			)
		});
		return (
		<Row className={"center"}>
		<Col md={12}>
		<h2>Guess the word</h2>
		{hangman_pts}
		</Col>
		</Row>
		)
	}
}

class HangManGuessedCorrect extends Component{
	render(){
		const correct = this.props.correctLetters.map((letter,ix)=>{
			return (
			<Button key={'correct'+ix} >
			{letter}</Button>)
		});
		return (
		<Row>
		<Col md={12}>
		  <p>Guessed Correct</p>
		  <ListGroup>
			{correct}
			</ListGroup>
			</Col>
		  </Row>
	  )
  }
}

class GuessPanel extends Component{
	constructor(props){
		super(props);
		this.state = {
			letter: ''
		}
		this.setLetterState = this.setLetterState.bind(this);
		this.submitLetter = this.submitLetter.bind(this);
	}
	
	setLetterState(e){
		let letter = e.target.value;
		if (letter !== ''){
			this.setState(
			{letter: letter}
			);
		}
	}
	
	submitLetter(){
		if (this.state.letter !== ''){
			this.props.guess(this.state.letter);
		}
	}
	
	
	render(){
		const your_turn = true;
		
		if(your_turn){
			return (
				<Row>
					<Col md={4}>
						<Button bsStyle={'primary'} onClick={this.submitLetter}>Submit Guess</Button>
					</Col>
					<Col md={8}>
						<FormControl onChange={this.setLetterState} value={this.state.letter}/>
					</Col>
				</Row>
				)
		}else{
			return (
				<Row>
					<Col md={12}>
					<h3>Wait your turn</h3>
					</Col>
				</Row>
			)
		}
		
	}
}

class HangManGuessedInCorrect extends Component{
	render(){
		const incorrect = this.props.incorrectLetters.map((letter,ix)=>{
			return <Button key={'incorrect'+ix}>{letter}</Button>
		});
		return (
		<div>
		  <p>Guessed Incorrect</p>
			{incorrect}
		  </div>
	  )
  }
}

class HangManController extends Component{
	constructor(props){
		super(props);
		this.state={
			word: '',
			correctLetters: [],
			incorrectLetters: [],
			myturn: false
		}
		this.guess = this.guess.bind(this);
		this.retrieveState = this.retrieveState.bind(this);
	}
	
	guess(letter){
		if (this.state.word.indexOf(letter) !== -1){
			this.setState(
			{correctLetters: [].concat(this.state.correctLetters, [letter])}
			);
		} else{
			this.setState(
			{incorrectLetters: [].concat(this.state.incorrectLetters, [letter])}
			)
		}
	}
	
	retrieveState(){
		let state_request = new Request('/api/retrieve_state');
		fetch(state_request)
			.then(response => response.json())
			.then(blob => {
				this.setState(blob)
				});
	}
	
	componentDidMount(){
		this.retrieveState();
	}
	
	
	render(){
		const classname={border: 'solid'};
		return (
		<Row>
          <Col md={12}>
			<Row>
				<Col md={4} className={classname}>
					<HangManImage hangmanparts={this.state.hangmanparts} 
					num_incorrect_letters={this.state.incorrectLetters.length}/>
				</Col>
				<Col md={8}>
					<Row>
						<Col md={12} className={classname}>
							<HangManWordToGuess word={this.state.word} correctLetters={this.state.correctLetters}/>
						</Col>
					</Row>
					<Row>
						<Col md={6} className={classname}>
							<HangManGuessedCorrect correctLetters={this.state.correctLetters}/>
						</Col>
						<Col md={6} className={classname}>
							<HangManGuessedInCorrect incorrectLetters={this.state.incorrectLetters}/>
						</Col>
					</Row>
					<GuessPanel guess={this.guess}/>
				</Col>
			</Row>
          </Col>
        </Row>
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
        <HangManController/>
      </div>
    );
  }
}

export default App;
