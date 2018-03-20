import KurConfigController from '../../controller/KurConfigController';
import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import Tree from '../components/TreeGraph';
import { DragDropContext, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {YourExternalNodeComponent,externalNodeType} from '../components/NodetoDrag';


class UnwrappedApp extends Component {
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
                    <div className="sideBar">
                        <YourExternalNodeComponent  node={{ title: 'Baby Rabbit'}} />
                        <YourExternalNodeComponent  node={{ title: 'Pumba na fofinha' }} />
                    </div>

                    <div style={{flex: 3}}>
                        <Tree dndType={externalNodeType}/>
                    </div>
                </div>
            </div>
        );
    }
}

const App = DragDropContext(HTML5Backend)(UnwrappedApp);
export default App;