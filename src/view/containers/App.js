import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import KurConfigController from '../../controller/KurConfigController';
import logo from '../images/logo.svg';
import '../styles/App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class App extends Component {
  componentWillMount() {
    let exampleController = new KurConfigController();

    this.setState({
      exampleController,
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Sidebar/>
          <p className="App-intro">
            {this.state.exampleController.getExample()}
          </p>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
