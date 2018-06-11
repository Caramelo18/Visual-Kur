import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import '../styles/App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Editor from "../components/Editor/Editor";
import TextEditor from "../components/TextEditor/TextEditor";
import yamljs from "yamljs";
import Grid from 'material-ui/Grid';

const electron = window.require('electron');
const fs = electron.remote.require('mz/fs');
const chokidar = electron.remote.require('chokidar');

const theme = createMuiTheme({
    root: {
        flexGrow: 1,
        width: 'fit-content'
    },
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
        }
    },
});

class UnwrappedApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layers: [],
            showTextEditor: true,
            textEditorWidth: 4,
            editorWidth: 6,
            fileWatcher: null
        };

        this.updateLayers = this.updateLayers.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.setWatcher = this.setWatcher.bind(this);
        this.parseFile = this.parseFile.bind(this);
        this.getLayers = this.getLayers.bind(this);
        this.toggleTextEditor = this.toggleTextEditor.bind(this);
        this.saveFile = this.saveFile.bind(this)
    }

    componentDidMount() {
        //this.loadFile('./mnist.yml');
    }

    updateLayers(layers) {
        this.setState({layers})
    }

    loadFile(filename) {
        fs.readFile(filename, 'utf-8').then(text => {
            let yamlText = text;
            this.child.setText(yamlText);
            this.parseFile(yamlText);
        });
    }

    setWatcher(filename) {
        if (this.state.fileWatcher) {
            this.state.fileWatcher.close()
        }
        
        let fileWatcher = chokidar.watch(filename, {
          persistent: true,
          usePolling: true
        });

        fileWatcher.on('change', path => this.loadFile(path));
        this.setState({fileWatcher});
    }

    saveFile(fileContent, filename) {
        var fs = require('fs');
        fs.writeFile("/tmp/test", fileContent);
    }

    parseFile(fileContent) {
        let file;
        try{
            file = yamljs.parse(fileContent).model;
        } catch(e){
            return;
        }
        let layers = [];

        const getLayer = (element) => {
            let layer = {};

            const addLayerComponents = (layer, element) => {
                for(let property in element){
                    layer[property] = element[property];
                }
            };


            if (element !== undefined && element != null) {
                if (element.hasOwnProperty('input')) {
                    layer.type = "input";
                    layer.input = element["input"];
                } else if (element.hasOwnProperty('convolution')) {

                    layer.type = "convolution";
                    let components = element.convolution;
                    addLayerComponents(layer, components);
                } else if (element.hasOwnProperty('activation')) {
                    layer.type = "activation";
                    layer.activation = element.activation;
                    if (element.hasOwnProperty("name")) {
                        layer.name = element["name"];
                    }
                } else if (element.hasOwnProperty('pool')) {
                    layer.type = "pool";
                    let components = element.pool;
                    addLayerComponents(layer, components);
                } else if (element.hasOwnProperty('flatten')) {
                    layer.type = "flatten";
                    let components = element.flatten;
                    addLayerComponents(layer, components);
                } else if (element.hasOwnProperty('dense')) {
                    layer.type = "dense";
                    layer["dense"] = element.dense && element.dense.length >= 2 ?
                        [element.dense[0],element.dense[1]] : undefined;
                }

                if (Object.keys(layer).length === 0) {
                    return null;
                }
                return layer;
            }
            return null;
        };

        for (let i = 0; i < file.length; i++) {
            let element = file[i];
            let layer = getLayer(element);
            layer != null ? layers.push(layer) : null;
        }

        this.setState({layers});
    }

    getLayers(){
        return this.state.layers;
    }

    toggleTextEditor() {
        this.setState({
            showTextEditor: !this.state.showTextEditor
        }, function() {
            if(this.state.showTextEditor){
                this.setState({
                    textEditorWidth: 4,
                    editorWidth: 6
                });
            } else{
                this.setState({
                    textEditorWidth: 0,
                    editorWidth: 10
                });
            }
        });

    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Grid container className="root" spacing={0}>
                        <Grid item xs={2}>
                            <Sidebar loadFile={this.loadFile} setWatcher={this.setWatcher} toggleTextEditor={this.toggleTextEditor} showTextEditor={this.state.showTextEditor}/>
                        </Grid>
                        <Grid item xs={this.state.textEditorWidth}>
                            <TextEditor onRef={ref => {this.child = ref}} parseFile={this.parseFile} saveFile={this.saveFile}/>
                        </Grid>
                        <Grid item xs={this.state.editorWidth}>
                            <Editor  updateLayers={this.updateLayers} getLayers={this.getLayers}/>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

const App = DragDropContext(HTML5Backend)(UnwrappedApp);
export default App;
