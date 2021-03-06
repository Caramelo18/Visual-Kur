import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    cursor: 'pointer',
    marginTop: '50px'
  }
});

class UndoRedo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <div>
          <Button className={classes.container} onClick={this.props.undo}>
            <span>Undo</span>
          </Button>
          <Button className={classes.container} onClick={this.props.redo}>
            <span>Redo</span>
          </Button>
        </div>
    )
  };
};

UndoRedo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UndoRedo);
