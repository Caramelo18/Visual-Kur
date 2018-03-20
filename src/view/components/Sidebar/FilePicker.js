import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import FileUpload from 'material-ui-icons/FileUpload';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class FilePicker extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <input id="file-upload" type="file" className={classes.input}/>
        <label htmlFor="file-upload">
          <Button variant="raised" className={classes.button} component="span">
            <FileUpload className={classes.rightIcon} />
          </Button>
        </label>
      </div>
    )
  }
}

FilePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilePicker);
