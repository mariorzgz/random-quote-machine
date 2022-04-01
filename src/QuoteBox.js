import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

const getRandomQuote = (data) => {
  return(data.quotes[Math.floor(Math.random() * data.quotes.length)])
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote : "",
      author: ""
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
        author: quote.author
      })
    })
  }

  render() {
    return <div id="quote-box">
      <div className="quote">
        <div id="text">
          <h2><FontAwesomeIcon icon={faQuoteLeft} />{this.state.quote}</h2>
        </div>
        <div id="author">— {this.state.author}</div>
      </div>
      <div className="buttons">
        <a id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${this.state.quote}"%20by%20${this.state.author}&hashtags=RandomQuoteMachine,MiPrimeraAppEnReact`}
          data-size="large"
          target="_blank"
          rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter}/>
        </a>
        <button id ="new-quote" onClick={this.getQuote.bind(this)}>
          New Quote
        </button>
      </div>
    </div>;
  }
}

export default QuoteBox;
