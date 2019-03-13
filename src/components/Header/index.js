import React, {Component} from 'react';
import {Grid, AppBar, Toolbar, Typography, IconButton} from '@material-ui/core/';
import RefreshIcon from '@material-ui/icons/Refresh';

class Header extends Component {
  render() {
    const { refreshPriceList } = this.props
    return (
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
              <IconButton onClick={() =>{refreshPriceList()}} color="inherit">
                <RefreshIcon />
              </IconButton>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}

export default Header



