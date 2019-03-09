import React, {Component} from 'react';
import axios from 'axios';

import {
  Card,
  CardActions,
  CardContent,
  // Button,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core/';

function getTime() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (hour.toString().length === 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length === 1) {
    minute = '0' + minute;
  }
  if (second.toString().length === 1) {
    second = '0' + second;
  }
  var Time = hour + ':' + minute + ':' + second;
  return Time;
}

class Market extends Component {
  constructor() {
    super();
    this.state = {
      btcPrice: '',
      ltcPrice: '',
      ethPrice: '',
      isLoaded: false,
      loadedTime: '',
    };
  }
  loadMarket() {
    axios
      .get(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD',
      )
      .then(response => {
        console.log(response)
        this.setState({btcPrice: response.data.BTC.USD});
        localStorage.setItem('BTC', response.data.BTC.USD);
        this.setState({ethPrice: response.data.ETH.USD});
        localStorage.setItem('ETH', response.data.ETH.USD);
        this.setState({ltcPrice: response.data.LTC.USD});
        localStorage.setItem('LTC', response.data.LTC.USD);
        this.setState({loadedTime: getTime()});
        localStorage.setItem('TIME', getTime());
        this.setState({isLoaded: true});
      })
      .catch(error => {
        console.log(error);
      });
  }
  reloadMarket() {
    this.setState(
      {
        isLoaded: false,
      },
      () => this.loadMarket(),
    );
  }
  saveStateToLocalStorage() {
    localStorage.setItem('today-state', JSON.stringify(this.state));
    console.log('success save to local storage');
    console.log(this.state);
  };
  restoreStateFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem('today-state'));
    this.setState(state);
  };
  componentDidMount() {
    if (!navigator.onLine) {
      return this.restoreStateFromLocalStorage();
    }

    this.loadMarket()

    this.cryptoSubscription = setInterval(() => this.loadMarket(), 5000);

    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
    clearInterval(this.cryptoSubscription);
  }
  render() {
    return (
      <div className="l-container">
        <Grid container>
          <Grid className="c-card" item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                {this.state.btcPrice ? (
                  <Typography
                    gutterBottom
                    align="center"
                    variant="h2"
                    component="p">
                    ${this.state.btcPrice}
                  </Typography>
                ) : (
                  <Grid className="mb-1g" container justify="center">
                    <CircularProgress size={62} color="secondary" />
                  </Grid>
                )}
                <Typography
                  align="center"
                  variant="h4"
                  component="p"
                  color="textSecondary">
                  1 BTC
                </Typography>
              </CardContent>
              <CardActions>
                <Typography align="center" variant="p" component="p">
                  {/* <Button color="secondary">Get more info</Button> */}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid className="c-card" item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                {this.state.ethPrice ? (
                  <Typography
                    gutterBottom
                    align="center"
                    variant="h2"
                    component="p">
                    ${this.state.ethPrice}
                  </Typography>
                ) : (
                  <Grid className="mb-1g" container justify="center">
                    <CircularProgress size={62} color="secondary" />
                  </Grid>
                )}
                <Typography
                  align="center"
                  variant="h4"
                  component="p"
                  color="textSecondary">
                  1 ETH
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button color="secondary">Get more info</Button> */}
              </CardActions>
            </Card>
          </Grid>
          <Grid className="c-card" item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                {this.state.ltcPrice ? (
                  <Typography
                    gutterBottom
                    align="center"
                    variant="h2"
                    component="p">
                    ${this.state.ltcPrice}
                  </Typography>
                ) : (
                  <Grid className="mb-1g" container justify="center">
                    <CircularProgress size={62} color="secondary" />
                  </Grid>
                )}
                <Typography
                  align="center"
                  variant="h4"
                  component="p"
                  color="textSecondary">
                  1 LTC
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button color="secondary">Get more info</Button> */}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Market;
