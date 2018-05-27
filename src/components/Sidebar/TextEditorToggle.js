import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    cursor: 'pointer',
    marginTop: '50px'
  }
});

class TextEditorToggle extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <span onClick={this.props.toggleTextEditor}>{this.props.showTextEditor ? "Hide Text Editor" : "Show Text Editor"}</span>
      </div>
    )
  };
};

TextEditorToggle.propTypes = {
  classes: PropTypes.object.isRequired,
  showTextEditor: PropTypes.bool
};

export default withStyles(styles)(TextEditorToggle);
