import React, { Component } from 'react';
import {Row, Col, ListGroup, 
	ListGroupItem, Button, FormControl} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class HangManImage extends Component{
	constructor(props){
		super(props);
		this.state = {
			body_grid: [['', 'head', ''],
			['left_arm', 'body', 'right_arm'],
			['left_leg', '', 'right_leg']]
		}
	}
	render(){
		const vis=this.state.body_grid.map((grid_row, ix_row) =>{
			
			let grid_items = grid_row.map((grid_item,ix_item) =>{
				
				let text_val;
				
				if (this.props.hangmanparts.indexOf(grid_item) === -1){
					
					text_val='';
				} else{
					text_val=grid_item
				}
				
				return <Col md={4} key={ix_row+ix_item}><p>{text_val}</p></Col>
			});
			
			return (
			<Row key={ix_row}>
				{grid_items}
			</Row>
			)
		});
		
		return (
		<Row>
			<Col md={12}>
				{vis}
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
			<ListGroupItem key={'correct'+ix}>
			<p>{letter}</p>
			</ListGroupItem>)
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

class HangManGuessedInCorrect extends Component{
	render(){
		const incorrect = this.props.incorrectLetters.map((letter,ix)=>{
			return <ListGroupItem key={'incorrect'+ix}><p>{letter}</p></ListGroupItem>
		});
		return (
		<div>
		  <p>Guessed InCorrect</p>
		  <ListGroup>
			{incorrect}
			</ListGroup>
		  </div>
	  )
  }
}

class HangManController extends Component{
	constructor(props){
		super(props);
		this.state={
			word: 'serendipitous',
			correctLetters: ['i'],
			incorrectLetters: ['z'],
			hangmanparts: ['head', 'left_arm', 'right_arm']
		}
	}
	render(){
		return (
		<Row>
          <Col md={12}>
			<HangManImage hangmanparts={this.state.hangmanparts}/>
			<HangManWordToGuess word={this.state.word} correctLetters={this.state.correctLetters}/>
			<HangManGuessedCorrect correctLetters={this.state.correctLetters}/>
			<HangManGuessedInCorrect incorrectLetters={this.state.incorrectLetters}/>
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
