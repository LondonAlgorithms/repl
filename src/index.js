import 'whatwg-fetch';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/lib/codemirror.css';
import './styles.css';

import url from 'url';
import React from 'react';
import Codemirror from 'react-codemirror';
import * as initialCode from './initialCode';

const submitUrl = "http://algo.stoica.tech:4567/submit";

const App = React.createClass({
  languages: ['javascript', 'ruby'],

  getInitialState() {
    return {
      loading: false,
      language: this.languages[0],
      code: initialCode[this.languages[0]],
      touched: false,
      output: ''
    };
  },

  getCodeMirrorOptions() {
    return {
      lineNumbers: true,
      mode: this.state.language
    };
  },

  updateCode(newCode) {
    this.setState({
      code: newCode,
      touched: true
    });
  },

  handleLanguageChange(e) {
    var language = e.target.value;
    this.setState({
      language: language,
      code: this.state.touched ? this.state.code : initialCode[language]
    });
  },

  handleSubmit() {
    this.setState({
      loading: true
    });

    fetch(submitUrl, {
      method: "POST",
      body: JSON.stringify({
        language: this.state.language,
        problem: 'pathfinding',
        text: this.state.code
      })
    }).then(this.onFetchSuccess, this.onFetchError);
  },

  onFetchSuccess(response) {
    response.text().then(function(responseText) {
      this.setState({
        loading: false,
        output: JSON.parse(responseText).output
      });
    }.bind(this));
  },

  onFetchError(error) {
    this.setState({
      loading: false,
      output: error.message
    });
  },

  render() {
    return (
      <div>
        <div className="header">
          <div className="header-logo">Algo Repl</div>
          <div className="header-languages">
            <select
              value={this.state.language}
              onChange={this.handleLanguageChange}>
              {this.languages.map(language => (
                <option
                  key={language}
                  value={language}>
                  {language[0].toUpperCase() + language.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="header-buttons">
            <button onClick={this.handleSubmit}>Run Solution</button>
          </div>
        </div>
        <div className="editor">
          <Codemirror
            value={this.state.code}
            onChange={this.updateCode}
            options={this.getCodeMirrorOptions()}
          />
        </div>
        <div className="output">
          {this.state.loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <textarea
                readOnly
                value={this.state.output}
              />
            )
          }
        </div>
      </div>
    );
  }
});

export default App;
