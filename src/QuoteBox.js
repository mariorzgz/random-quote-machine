import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Colors.css';
import './Fonts.css';

const colors = [
                "bg-pink",
                "bg-purple",
                "bg-orange",
                "bg-turquose",
                "bg-blue",
                "bg-darkgreen"
                ];

const fonts = [
                "serif",
                "sans-serif",
                "monospace",
                "handwriting"
              ];

const getRandomQuote = (data) => {
  return(data.quotes[Math.floor(Math.random() * data.quotes.length)])
}

const RandomColor = () =>{
  return colors[Math.floor(Math.random() * colors.length)]
}

const RandomFont = () =>{
  return fonts[Math.floor(Math.random() * fonts.length)]
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote : "",
      author: "",
      color: "",
      font: "",
    };
  }

  componentDidMount() {
    this.getQuote()
  }

  getQuote(){
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then((result) => {
      return result.json();
    }).then((jsonResult) => {
      let quote = getRandomQuote(jsonResult)
      this.setState({
        quote: quote.quote,
        author: quote.author,
        color: RandomColor(),
        font: RandomFont()
      })
    })
  }

  render() {
    document.getElementById("root").className = this.state.color;
    return <div id="quote-box">
      <div className={`quote ${this.state.font}`}>
        <div id="text" className={this.state.font}>
          <h2><FontAwesomeIcon icon={faQuoteLeft} />{this.state.quote}</h2>
        </div>
        <div id="author">— {this.state.author}</div>
      </div>
      <div className="buttons">
        <a className={this.state.color} id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${this.state.quote}"%20by%20${this.state.author}&hashtags=RandomQuoteMachine,MiPrimeraAppEnReact`}
          data-size="large"
          target="_blank"
          rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter}/>
        </a>
        <button id="new-quote" className={this.state.color} onClick={this.getQuote.bind(this)}>
          New Quote
        </button>
      </div>
    </div>;
  }
}

export default QuoteBox;
