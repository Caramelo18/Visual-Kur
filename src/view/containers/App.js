import KurConfigController from '../../controller/KurConfigController';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from '../components/Sidebar/Sidebar';
import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';

class App extends Component {
  componentWillMount() {
    let exampleController = new KurConfigController();

    this.setState({
      exampleController,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MuiThemeProvider>
            <Sidebar/>
        </MuiThemeProvider>
        <p className="App-intro">
          {this.state.exampleController.getExample()}
        </p>
      </div>
    );
  }
}

export default App;
