import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import '../styles/App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Editor from "../components/Editor/Editor";
import TextEditor from "../components/TextEditor/TextEditor";
import yamljs from "yamljs";
import jsyaml from "js-yaml";
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
            yamlFile: {},
            showTextEditor: true,
            textEditorWidth: 4,
            editorWidth: 6,
            fileWatcher: null,
            filepath: "",
            fileContent: "",
            stateStack: [[]],
            currentState: 0
        };

        this.updateLayers = this.updateLayers.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.setWatcher = this.setWatcher.bind(this);
        this.parseFile = this.parseFile.bind(this);
        this.getLayers = this.getLayers.bind(this);
        this.toggleTextEditor = this.toggleTextEditor.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.fileSave = this.fileSave.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        this.saveCurrentState = this.saveCurrentState.bind(this);
    }

    componentDidMount() {
        //this.loadFile('./mnist.yml');
    }

    updateLayers(layers, undoredo = false) {
        this.setState({layers: layers}, function(){
            this.updateYamlFile();
        });
        if(!undoredo)
          this.saveCurrentState();
    }

    loadFile(filepath) {
        this.setState({filepath})
        fs.readFile(filepath, 'utf-8').then(text => {
            let yamlText = text;
            this.child.setText(yamlText);
            this.parseFile(yamlText);
            this.saveCurrentState();
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

    updateContent(fileContent){
      this.setState({fileContent});
    }

    saveFile() {
        if(this.state.filepath === ""){
          const {dialog} = electron.remote;

          let filepath = dialog.showSaveDialog({ defaultPath: "./file.yaml", filters:[ {extensions : "yaml"} ] });

          if(filepath){
            this.setState({filepath});
            this.fileSave(filepath);
          }
        }
        else
          this.fileSave(this.state.filepath)
    }

    fileSave(filepath){
      fs.writeFile(filepath, this.state.fileContent, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
      });
    }

    parseFile(fileContent) {
        let file;
        try{
            let yamlFile = yamljs.parse(fileContent);
            this.setState({
              yamlFile: yamlFile
            });
            file = yamlFile.model;
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
                } else if (element.hasOwnProperty('output')) {
                    layer.type = "output";
                    layer["output"] = element.output
                } else if (element === 'batch_normalization')
                {
                    layer.type = "batch_normalization"
                }

                if (Object.keys(layer).length === 0) {
                    return null;
                }
                return layer;
            }
            return null;
        };

        if(file == null){
            return;
        }

        for (let i = 0; i < file.length; i++) {
            let element = file[i];
            let layer = getLayer(element);
            if (layer != null) {
                layers.push(layer);
            }
        }

        this.setState({layers});
        this.updateYamlFile();
    }

    updateYamlFile(){
        let newModel = [];
        for(let layer of this.state.layers) {
            if(layer.type === "input"){
                let comp = { input: layer.input };
                newModel.push(comp);
            } else if (layer.type === "convolution") {
                let comp = { convolution: { kernels: parseInt(layer.kernels, 10), size: [parseInt(layer.size[0], 10), parseInt(layer.size[1], 10)] } };
                newModel.push(comp);
            } else if (layer.type === "activation") {
                let comp = { activation: layer.activation };
                if (layer.hasOwnProperty('name')) {
                    comp.name = layer.name;
                }
                newModel.push(comp);
            } else if (layer.type === "pool") {
                let comp = { pool: [parseInt(layer[0], 10), parseInt(layer[1], 10)] };
                newModel.push(comp);
            } else if (layer.type === "flatten") {
                let comp = { flatten: '' };
                newModel.push(comp);
            } else if (layer.type === "dense") {
                let comp = layer.dense ? {dense: [parseInt(layer.dense[0], 10), parseInt(layer.dense[1], 10)]} : {dense: ['', '']};
                newModel.push(comp);
            } else if (layer.type === "output") {
                let comp = {output: layer.output};
                newModel.push(comp);
            } else if (layer.type === "batch_normalization") {
                let comp = "batch_normalization";
                newModel.push(comp);
            }
        }

        let yamlFile = this.state.yamlFile;
        yamlFile.model = newModel;

        let yamlText = jsyaml.safeDump(yamlFile);
        this.child.setText(yamlText);
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

    undo() {
        if(this.state.currentState > 0){
            let newState = this.state.stateStack[this.state.currentState - 1];
            this.setState({currentState: this.state.currentState - 1}, function() {
                this.updateLayers(newState, true);
            });
        }
    }

    redo() {
        if(this.state.currentState + 1 >= this.state.stateStack.length) {
            return;
        }
        let newState = this.state.stateStack[this.state.currentState + 1];
        this.setState({currentState: this.state.currentState + 1}, function() {
            this.updateLayers(newState, true);
        });
    }

    saveCurrentState(){
        let state = Object.assign(this.state.layers);
        let stateStack = Object.assign(this.state.stateStack);
        stateStack.push(state);
        this.setState({currentState: this.state.currentState + 1, stateStack: stateStack}, function() {
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Grid container className="root" spacing={0}>
                        <Grid item xs={2}>
                            <Sidebar loadFile={this.loadFile} saveFile={this.saveFile} setWatcher={this.setWatcher} toggleTextEditor={this.toggleTextEditor} showTextEditor={this.state.showTextEditor} undo={this.undo} redo={this.redo}/>
                        </Grid>
                        <Grid item xs={this.state.textEditorWidth}>
                            <TextEditor onRef={ref => {this.child = ref}} parseFile={this.parseFile} updateContent={this.updateContent}/>
                        </Grid>
                        <Grid item xs={this.state.editorWidth}>
                            <Editor updateLayers={this.updateLayers} getLayers={this.getLayers}/>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

const App = DragDropContext(HTML5Backend)(UnwrappedApp);
export default App;
