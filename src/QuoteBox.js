import React, { Component } from 'react';

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
      <div id="text"><i class="fa fa-quote-left"> </i>{this.state.quote}</div>
      <div id="author">By {this.state.author}</div>
      <button id ="new-quote" onClick={this.getQuote.bind(this)}>
        New Quote
      </button>
      <a id="tweet-quote"
         href={`https://twitter.com/intent/tweet?text="${this.state.quote}"%20by%20${this.state.author}&hashtags=RandomQuoteMachine,MiPrimeraAppEnReact`}
         data-size="large"
         target="_blank"
         rel="noreferrer">
      Tweet
      </a>
    </div>;
  }
}

export default QuoteBox;
