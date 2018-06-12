import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import FilePicker from './FilePicker';
import TextEditorToggle from './TextEditorToggle';
import Button from 'material-ui/Button';


const drawerWidth = '18%';

const styles = theme => ({
  appBar: {
    'margin-bottom': 20,
  },
  appTitle: {
    margin: 'auto',
  },
  drawerPaper: {
    position: 'absolute',
    width: drawerWidth,
  }
});

class Sidebar extends React.Component {
  render() {
    const { classes, loadFile, setWatcher } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          >
            <AppBar position="static" color="primary" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.appTitle}>
                 Visual Kur
              </Typography>
            </Toolbar>
          </AppBar>
          <FilePicker loadFile={loadFile} setWatcher={setWatcher}/>
          <TextEditorToggle toggleTextEditor={this.props.toggleTextEditor} showTextEditor={this.props.showTextEditor}/>
          <Button onClick={this.props.saveFile}>Save</Button>
        </Drawer>
      </div>
    )
  };
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  showTextEditor: PropTypes.bool
};

export default withStyles(styles)(Sidebar);
