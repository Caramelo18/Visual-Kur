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
            layers: []
        };

        this.updateLayers = this.updateLayers.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.getLayers = this.getLayers.bind(this);
    }


    componentDidMount() {
        this.loadFile('./mnist.yml');
    }

    updateLayers(layers) {
        this.setState({layers})
    }

    loadFile(filename){
        const file = yamljs.load(filename);

        const parseFile = (file) => {
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

                if(element.hasOwnProperty('input')){
                    layer.type = "input";
                    layer.input = element["input"];
                }
                if(element.hasOwnProperty('convolution')){
                    layer.type = "convolution";
                    let components = element.convolution;
                    addLayerComponents(layer, components);
                }else if(element.hasOwnProperty('activation')){
                    layer.type = "activation";
                    layer.activation = element.activation;

                    if(element.hasOwnProperty("name")){
                        layer.name = element["name"];
                    }
                }else if(element.hasOwnProperty('pool')){
                    layer.type = "pool";
                    let components = element.pool;
                    addLayerComponents(layer, components);
                }else if(element.hasOwnProperty('flatten')){
                    layer.type = "flatten";
                    let components = element.flatten;
                    addLayerComponents(layer, components);
                }else if(element.hasOwnProperty('dense')){
                    layer.type = "dense";
                    let components = element.dense;
                    let arr = {x: components[0], y: components[1]};
                    layer["dense"] = arr;
                }

                return layer;
            }

            for(let i = 0; i < file.length; i++){
                let element = file[i];
                let layer = getLayer(element);
                layers.push(layer);
            }

            this.setState({layers})
        }

        parseFile(file.model);
    }

    getLayers(){
        return this.state.layers;
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Grid container className="root" spacing="0">
                      <Grid item xs="2">
                        <Sidebar loadFile={this.loadFile}/>
                      </Grid>
                      <Grid item xs="4">
                        <TextEditor />
                      </Grid>
                      <Grid item xs="5">
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
