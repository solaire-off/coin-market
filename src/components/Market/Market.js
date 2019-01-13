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
        this.setState({btcPrice: response.data.BTC.USD});
        this.setState({ethPrice: response.data.ETH.USD});
        this.setState({ltcPrice: response.data.LTC.USD});
        this.setState({loadedTime: getTime()});
        this.setState({isLoaded: true});
      })
      .catch(error => {
        console.log(error);
      });
  }
  reloadMarket() {
    this.setState(
      {
        isLoaded: false ,
      },
      () => this.loadMarket(),
    );
  }
  componentWillMount() {
    this.loadMarket();
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  render() {
    return (
      <div className="l-container">
        {this.state.isLoaded ? (
          <Typography gutterBottom align="center" variant="h2" component="p">
            Last update: {this.state.loadedTime}
          </Typography>
        ) : (
          <Grid className="mb-1g" container justify="center">
            <CircularProgress size={60} color="inherit" />
          </Grid>
        )}

        <Grid container spacing={24}>
          <Grid item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                {this.state.isLoaded ? (
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
          <Grid item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                {this.state.isLoaded ? (
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
          <Grid item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                {this.state.isLoaded ? (
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
