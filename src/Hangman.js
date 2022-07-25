import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";
class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    words:["apple"]
  };
  
  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() ,finish:false, win: false};
    this.handleGuess = this.handleGuess.bind(this);
    this.Restart = this.Restart.bind(this);
  }
  
  randWord(){
    let num = Math.floor(Math.random() * this.props.words.length);
    return this.props.words[num]
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let count = 0;
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));

    for(let l of this.state.guessed){
      this.state.answer.split("").map((lt)=>{
        if(lt==l){
          count=count+1
        }
      })
    }
    if(count+1==this.state.answer.split("").length){
      this.setState((st)=>({
        win:true
      }))
    }
  }

 
  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }
  Restart(){
    this.setState(st=>({
      win:false,
      finish:false,
      answer: randomWord(),
      nWrong: 0,
      guessed: new Set()
    }))
  }
  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        {this.state.nWrong !== this.props.maxWrong && <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/6`}/>}
        { this.state.win ? 
          <div>
            <p>You win !</p>
            <button style={{width:'250px'}} value='Restart' onClick={this.Restart}>Restart</button>
          </div> 
        :
          <div>
            <p>Number wrong: {this.state.nWrong}</p>
            <p className='Hangman-word'>{this.guessedWord()}</p>
            { this.state.nWrong === this.props.maxWrong ? 
                <div>
                    <p>You lose</p> 
                    <p>The correct word is: {this.state.answer}</p>
                    <div>
                      <button style={{width:'250px'}} value='Restart' onClick={this.Restart}>Restart</button>
                    </div>
                </div> 
                :  
                <p className='Hangman-btns'>{this.generateButtons()}</p> }

          </div>
          }
        
      </div>
    );
  }
}

export default Hangman;
