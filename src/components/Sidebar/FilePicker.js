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
  upload: {
    display: 'flex',
  }
});

class FilePicker extends React.Component {
  state = {
    file: undefined
  };

  handlePickFile = (e) => {
    if (e.target.files.length === 1) {
      this.setState({
        file: e.target.files[0]
      });
      let filePath = e.target.files[0].path;
      this.props.loadFile(filePath);
      this.props.setWatcher(filePath);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="upload">
        <input onChange={this.handlePickFile} id="file-upload" type="file" className={classes.input}/>
        <label htmlFor="file-upload">
          <Button variant="raised" className={classes.button} component="span">
            <FileUpload className={classes.rightIcon}/>
          </Button>
        </label>
        <span>{this.state.file ? this.state.file.name : "No File Uploaded"}</span>
      </div>
    )
  };
};

FilePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilePicker);
