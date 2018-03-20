import KurConfigController from '../../controller/KurConfigController';
import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import Tree from '../components/TreeGraph';

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
          <h1 className="App-title">Visual Kur</h1>
        </header>
        <div className="rowC">
            <div style={{flex: 1}}>
                <p> Teste lado a lado </p>
                <p> Fancy stuff</p>
            </div>

            <div style={{flex: 3}}>
              <Tree/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
