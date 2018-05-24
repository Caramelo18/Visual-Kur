import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AceEditor from 'react-ace';

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
        this.props.onRef(this);
    }

    constructor(props) {
        super(props);
        this.state = {
          value: ""
        };

        this.onChange = this.onChange.bind(this);
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
      this.props.parseFile(newValue);
      this.setState({
        value: newValue
      });
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
    parseFile: PropTypes.func
};

export default withStyles(styles)(TextEditor);
