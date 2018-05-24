import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';

import 'brace/mode/yaml';
import 'brace/theme/github';


const styles = theme => ({
  rowC: {
    height: '100% !important',
    width: '100% !important'
  }
});



class TextEditor extends Component {
    componentDidMount() {
        this.props.onRef(this)
    }

    constructor(props) {
        super(props);
        this.state = {
          value: ""
        }
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    setText(text) {
        this.setState({
          value: text
        });
    }

    onChange(newValue) {
      //console.log('change',newValue);
    }

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.rowC}>
            <AceEditor
              className={classes.rowC}
              mode="yaml"
              theme="github"
              onChange={this.onChange}
              name="nome"
              value={this.state.value}
            />
          </div>
        );
    }
}

TextEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextEditor);
