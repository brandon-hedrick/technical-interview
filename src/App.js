import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Connections</h1>
        </header>
        <Button primary icon labelPosition='right'>
          Edit
          <Icon name='edit' />
        </Button>
      </div>
    );
  }
}

export default App;
