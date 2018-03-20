import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import FilePicker from './FilePicker';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'absolute',
    width: drawerWidth,
  },
});

class Sidebar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Visual Kur
              </Typography>
            </Toolbar>
          </AppBar>
          <FilePicker/>
        </Drawer>
      </div>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
