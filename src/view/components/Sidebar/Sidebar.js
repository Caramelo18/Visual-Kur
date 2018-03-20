import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

export default class Sidebar extends React.Component {
  render() {
    return (
      <Drawer>
        <AppBar title="Visual Kur" showMenuIconButton={false}/>
      </Drawer>
    )
  }
}
