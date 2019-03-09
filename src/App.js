import React, {Component} from 'react';
import './App.css';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core/';
import RefreshIcon from '@material-ui/icons/Refresh';
import Market from './components/Market/Market';

class App extends Component {
  refreshMarket = () => {
    this.child.loadMarket();
  };
  render() {
    return (
      <div className="App">
        <AppBar
          className="l-section"
          position="static"
          color="secondary">
          <Toolbar className="l-d-flex l-justify-content-between">
            <Typography variant="h6" color="inherit">
              Coin Market
            </Typography>
            <IconButton onClick={this.refreshMarket} color="inherit">
              <RefreshIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Market onRef={ref => (this.child = ref)} />
      </div>
    );
  }
}

export default App;
