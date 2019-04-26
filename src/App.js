import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';

class  App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      author: ""
    };
    this.randomQuotes = this.randomQuotes.bind(this);
    this.quoteRef = React.createRef();
    this.authorRef = React.createRef();
    this.buttonsRef = React.createRef();
  }

//RANDOMIZE QUOTE AT START
  componentDidMount() {
   axios.get(`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
     .then(res => {
       const randomIndex = Math.floor(Math.random() * res.data.quotes.length);
       this.setState((state) => ({
         text: res.data.quotes[randomIndex].quote,
         author: res.data.quotes[randomIndex].author
       }));
     })
 }

  randomQuotes(e){
    axios.get(`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
      .then(res => {
        const randomIndex = Math.floor(Math.random() * res.data.quotes.length);
        this.setState((state) => ({
          text: res.data.quotes[randomIndex].quote,
          author: res.data.quotes[randomIndex].author
        }));
      })

    //Quotes text CSS amination
    this.quoteRef.current.classList.remove("bounceInLeft");
    void this.quoteRef.current.offsetWidth;
    this.quoteRef.current.classList.add("bounceInLeft");

    //Quotes authors CSS animation
    this.authorRef.current.classList.remove("bounceInRight");
    void this.authorRef.current.offsetWidth;
    this.authorRef.current.classList.add("bounceInRight");

    //Buttons CSS animation
    this.buttonsRef.current.classList.remove("bounceInUp");
    void this.buttonsRef.current.offsetWidth;
    this.buttonsRef.current.classList.add("bounceInUp");
  };

  render () {
    return (
      <div id="quote-box">
        <div className="quotes">
          <div
            className="animated bounceInLeft"
            id="text"
            ref={this.quoteRef}>
            “{this.state.text}”
        </div>
          <div
            className="animated bounceInRight"
            ref={this.authorRef}
            id="author">- {this.state.author}</div>
        </div>
        <div
          className="buttons animated bounceInUp"
          ref={this.buttonsRef}
          >
          <button
            id="new-quote"
            onClick={this.randomQuotes}
            >NEXT</button>
          <a href={`https://twitter.com/intent/tweet?hashtags=${this.state.text}
          - ${this.state.author}`}
            id="tweet-quote"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fa fa-twitter-square fa-2x"></i>
          </a>
        </div>
      </div>

)
  }
}


export default App;
