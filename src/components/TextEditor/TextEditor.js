import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';

import 'brace/mode/yaml';
import 'brace/theme/github';


const styles = theme => ({
  /*rowC: {
      display: "flex",
      flexDirection: "row",
      marginLeft: 1200,
      width: 400
  }*/
});

function onChange(newValue) {
  console.log('change',newValue);
}

class TextEditor extends Component {
    render() {
        const { classes } = this.props;

        return (
          <div className={classes.rowC}>
            <AceEditor
              mode="yaml"
              theme="github"
              onChange={onChange}
              name="nome"
              value="Valor"
            />
          </div>
        );
    }
}

TextEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextEditor);
