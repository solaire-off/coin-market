import React, {Component} from 'react';
import axios from 'axios';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  FormLabel,
  // FormHelperText,
  FormGroup,
  Fade,
  Paper,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core/';


class Market extends Component {
  constructor() {
    super();
    this.state = {
      coinList: [
        'BTC',
        'ETH',
        'LTC',
        'DASH',
        'MLN',
        'XRP',
        'EOS',
        'BNB',
        'BCH',
        'USDT',
        'XLM',
        'TRX',
      ],
      checkedViewAllCoin: false,
      selectedCoins: ['BTC', 'ETH', 'LTC'],
      activeCoins: ['BTC', 'ETH', 'LTC'],
      tsymsList: ['USD', 'EUR', 'JPY'],
      tsymsIcons: {USD: '$', EUR: '€', JPY: '¥'},
      activeTsyms: 'USD',
      priceList: [],
      generalInfo: [],
      isLoaded: false,
      viewStyle: 'card',
      loadedTime: '',
    };
  }
  loadMarket() {
    var coins = this.state.checkedViewAllCoin ? this.state.coinList : this.state.selectedCoins;
    var tsyms = this.state.viewStyle === 'card' ? this.state.activeTsyms : this.state.tsymsList.join(',')
    var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' +
      coins.join(',') +
      '&tsyms=' +
      tsyms;

    axios
      .get(url)
      .then(response => {
        this.setState({
          priceList: response.data,
          activeCoins: coins,
          isLoaded: true,
        });
      })
      .catch(error => {
        console.log(error);
      });

  }
  loadGeneralInfo(){
    var coins = this.state.coinList.join(',')
    var url = 'https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=' + coins + '&tsym=USD'

    axios
      .get(url)
      .then(response => {
        this.setState({
          generalInfo: response.data.Data
        });
      })
      .catch(error => {
        console.log(error);
      });

  }
  getGeneralFieldByTitle(field, name){
    console.log(this.state.generalInfo.filter((item) => item.CoinInfo.Name === name)
);
    return this.state.generalInfo.filter((item) => item.CoinInfo.Name === name)[0].CoinInfo[field]
  }
  saveStateToLocalStorage() {
    localStorage.setItem('today-state', JSON.stringify(this.state));
    console.log('success save to local storage');
    console.log(this.state);
  }
  restoreStateFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem('today-state'));
    this.setState(state);
  }
  changeActiveCoins = event => {
    this.setState({selectedCoins: event.target.value}, this.loadMarket);
  };
  changeActiveCurrency = event => {
    this.setState({activeTsyms: event.target.value}, this.loadMarket);
  };
  handleSwitch = name => event => {
    this.setState({[name]: event.target.checked},() =>{
      if (name === 'checkedViewAllCoin'){
        this.loadMarket()
      }
    })
  }
  handleRadio = name => event => {
    this.setState({[name]: event.target.value}, () =>{
      if (name === 'viewStyle'){
        this.loadMarket()
      }
    })
  }
  componentDidMount() {
    if (!navigator.onLine) {
      return this.restoreStateFromLocalStorage();
    }

    this.loadGeneralInfo();
    this.loadMarket();

    this.cryptoSubscription = setInterval(() => this.loadMarket(), 5000);

    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
    clearInterval(this.cryptoSubscription);
  }
  render() {
    const priceList = this.state.priceList;
    const coinList = this.state.checkedViewAllCoin ? this.state.coinList : this.state.selectedCoins;
    return (
      <div className="l-container">
        <Grid container>
          <Grid className="c-card" item sm={12} lg={3}>
            <Paper
              style={{
                padding: '20px',
                marginTop: '15px',
                position: 'sticky',
                top: '15px',
              }}>
              <Typography variant="h4" component="p">
                Dash Settings
              </Typography>
              <FormControl disabled={this.state.checkedViewAllCoin} margin="normal" fullWidth={true}>
                <InputLabel htmlFor="select-multiple">Select coin list</InputLabel>
                <Select
                  multiple
                  value={this.state.selectedCoins}
                  onChange={this.changeActiveCoins}
                  input={<Input id="select-multiple" />}>
                  {this.state.coinList.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl disabled={this.state.viewStyle === 'table'} margin="normal" fullWidth={true}>
                <InputLabel htmlFor="select-multiple">
                  Select currency
                </InputLabel>
                <Select
                  value={this.state.activeTsyms}
                  onChange={this.changeActiveCurrency}
                  input={<Input id="select-multiple" />}>
                  {this.state.tsymsList.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.checkedViewAllCoin}
                    onChange={this.handleSwitch('checkedViewAllCoin')}
                    value="checkedA"
                  />
                }
                label="View all coin list"
              />
              <FormControl component="fieldset" >
                <FormLabel component="legend">Select view style</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.viewStyle === 'card'} onChange={this.handleRadio('viewStyle')} value="card" />
                    }
                    label="Card-like"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.viewStyle === 'table'} onChange={this.handleRadio('viewStyle')} value="table" />
                    }
                    label="Table-like"
                  />
                </FormGroup>
              </FormControl>
            </Paper>
          </Grid>

          <Grid className="c-card" item sm={12} lg={9}>
            <Grid container>
              {coinList.map(name => (
                <>
                {this.state.viewStyle === 'card' ? (
                  <Grid key={name} className="c-card" item lg={4} md={6} xs={12}>
                  <Fade in={true} timeout={300}>
                    <Card>
                      <CardContent>
                        <Typography align="center" variant="h2" component="p">
                          {priceList[name] &&
                              priceList[name][this.state.activeTsyms] ? (
                                <span>
                                  {this.state.tsymsIcons[this.state.activeTsyms]}{' '}
                                  {priceList[name][this.state.activeTsyms]}
                                </span>
                              ) : (
                                <CircularProgress size={52} color="secondary" />
                              )}
                            </Typography>
                            <Typography
                              align="center"
                              variant="h4"
                              component="p"
                              color="textSecondary">
                              1 {name}
                            </Typography>
                          </CardContent>
                          <CardActions style={{justifyContent: 'center', flexDirection:'row'}}>
                            <Button color="secondary">Learn more</Button>
                            <Button color="secondary">Add to favorite</Button>
                          </CardActions>
                        </Card>
                      </Fade>
                  </Grid>
                ): (
                  <Fade in={true} timeout={300}>
                    <Grid key={name} className="c-card" item xs={12} >
                      <Card>
                        <CardContent>
                          <Grid container>

                            <Grid item lg={2} md={3} sm={4}>
                              <img alt={name} style={{maxWidth: '100%', height: 'auto', maxHeight: '120px'}} src={"https://cryptocompare.com/"+this.getGeneralFieldByTitle('ImageUrl',name)} />
                            </Grid>

                            <Grid item lg={4} md={4} sm={8}>
                              <Typography align="left" variant="h3" component="p">
                                {this.getGeneralFieldByTitle('FullName',name)}
                              </Typography>
                              <Typography align="left" variant="title" component="p">
                                Algorithm: {this.getGeneralFieldByTitle('Algorithm',name)} 
                              </Typography>
                              <Typography align="left" variant="title" component="p">
                                ProofType: {this.getGeneralFieldByTitle('ProofType',name)} 
                              </Typography>
                            </Grid>

                            <Grid item lg={4}>
                              {this.state.tsymsList.map((tsums => (
                                <Typography align="left" variant="h4" component="p">
                                  {priceList[name] && priceList[name][tsums] ? (
                                    <span>
                                      {this.state.tsymsIcons[tsums]}{' '}
                                      {priceList[name][tsums]}
                                    </span>
                                  ) : (
                                    <CircularProgress size={52} color="secondary" />
                                  )}
                                </Typography>
                              )))}
                            </Grid>
                            <Grid item lg={2}>
                              <Typography
                                align="center"
                                variant="h4"
                                component="p"
                                color="textSecondary">
                                1 {name}
                              </Typography>
                              <CardActions style={{justifyContent: 'center', flexDirection:'column'}}>
                                <Button color="secondary">Learn more</Button>
                                <Button color="secondary">Add to favorite</Button>
                              </CardActions>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Fade>
                )}
                </>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Market;
