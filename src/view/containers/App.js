import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import KurConfigController from '../../controller/KurConfigController';
import logo from '../images/logo.svg';
import '../styles/App.css';
import Tree from '../components/TreeGraph';
import { DragDropContext, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {YourExternalNodeComponent,externalNodeType} from '../components/NodetoDrag';



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

class UnwrappedApp extends Component {
    componentWillMount() {
        let exampleController = new KurConfigController();

        this.setState({
            exampleController,
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Sidebar/>
                        <div className="rowC">
                            <div className="sideBar">
                                <YourExternalNodeComponent className="dragItem" node={{ title: 'Baby Rabbit'}} />
                                <YourExternalNodeComponent className="dragItem" node={{ title: 'Pumba na fofinha' }} />
                            </div>

                            <div className="treeDisplayer">
                                <Tree dndType={externalNodeType}/>
                            </div>
                        </div>
                    </div>
            </MuiThemeProvider>
        );
    }
}

const App = DragDropContext(HTML5Backend)(UnwrappedApp);
export default App;