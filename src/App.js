import React, {Component} from 'react';
import './App.css';
import {Grid, AppBar, Toolbar, Typography, IconButton} from '@material-ui/core/';
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
          <Grid className="l-toolbar">
            <Grid item lg={12}>
              <Toolbar className="l-d-flex l-justify-content-between">
                <Typography variant="h6" color="inherit">
                  Coin Market &mdash; Fresh information about your favorite coin
                </Typography>
                <IconButton onClick={this.refreshMarket} color="inherit">
                  <RefreshIcon />
                </IconButton>
              </Toolbar>
            </Grid>
          </Grid>
        </AppBar>
        <Market onRef={ref => (this.child = ref)} />
      </div>
    );
  }
}

export default App;
