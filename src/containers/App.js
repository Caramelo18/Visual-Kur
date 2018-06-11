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
            yamlFile: "",
            showTextEditor: true,
            textEditorWidth: 4,
            editorWidth: 6
        };

        this.updateLayers = this.updateLayers.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.parseFile = this.parseFile.bind(this);
        this.getLayers = this.getLayers.bind(this);
        this.toggleTextEditor = this.toggleTextEditor.bind(this);
    }


    componentDidMount() {
        //this.loadFile('./mnist.yml');
    }

    updateLayers(layers) {
        //console.log(layers);
        this.setState({layers: layers}, function(){
            this.updateYamlFile();
        });
    }

    loadFile(filename) {
        let yamlText;
        fetch(filename)
          .then(response => response.text())
          .then(text => {
              yamlText = text;
              this.child.setText(yamlText);
              this.parseFile(yamlText);
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
                    if(Array.isArray(element[property])){
                        let arr = {x: element[property][0], y: element[property][1]};
                        layer[property] = arr;
                        continue;
                    }
                    layer[property] = element[property];
                }
            }

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
                    layer["dense"] = element.dense && element.dense.length >= 2 ? {x: element.dense[0], y: element.dense[1]} : undefined;
                }

                if (Object.keys(layer).length === 0) {
                  return null;
                }

                return layer;
            }

            return null;
        };

        for(let i = 0; i < file.length; i++){
            let element = file[i];
            let layer = getLayer(element);
            layer != null ? layers.push(layer) : null;
        }

        this.setState({layers});
        this.updateYamlFile();
    }

    updateYamlFile(){
        /*console.log(this.state.layers);
        console.log(this.state.yamlFile);*/
        let newModel = [];
        for(let layer of this.state.layers) {
            if(layer.type === "input"){
                let comp = { input: layer.input };
                newModel.push(comp);
            } else if (layer.type === "convolution"){
                let comp = { convolution: { kernels: layer.kernels, size: [layer.size.x, layer.size.y] } };
                newModel.push(comp);
            } else if (layer.type === "activation"){
                let comp = { activation: layer.activation };
                newModel.push(comp);
            } else if (layer.type === "pool") {
                let comp = { pool: [layer[0], layer[1]] };
                newModel.push(comp);
            } else if (layer.type === "flatten") {
                let comp = { flatten: null };
                newModel.push(comp);
            } else if (layer.type === "dense") {
                let comp = { dense: [layer.dense.x, layer.dense.y] };
                newModel.push(comp);
            }
        }

        let yamlFile = this.state.yamlFile;
        yamlFile.model = newModel;

        let yamlString = yamljs.stringify(this.state.yamlFile, 4);
        //console.log(yamlString);
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
                        <Sidebar loadFile={this.loadFile} toggleTextEditor={this.toggleTextEditor} showTextEditor={this.state.showTextEditor}/>
                      </Grid>
                      <Grid item xs={this.state.textEditorWidth}>
                        <TextEditor onRef={ref => {this.child = ref}} parseFile={this.parseFile}/>
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
