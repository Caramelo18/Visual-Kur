import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import KurConfigController from '../../controller/KurConfigController';
import '../styles/App.css';
import { DragDropContext, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Editor from "../components/Editor/Editor";



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
                      <Editor/>
                    </div>
            </MuiThemeProvider>
        );
    }
}

const App = DragDropContext(HTML5Backend)(UnwrappedApp);
export default App;