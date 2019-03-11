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
      selectedCoins: ['BTC', 'ETH', 'LTC','DASH', 'MLN', 'XRP'],
      activeCoins: ['BTC', 'ETH', 'LTC','DASH', 'MLN', 'XRP'],
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
        },()=>{
          this.loadMarket()
        });
      })
      .catch(error => {
        console.log(error);
      });

  }
  getGeneralFieldByTitle(field, name){
    try{
      return this.state.generalInfo.filter((item) => item.CoinInfo.Name === name)[0].CoinInfo[field]
    }
    catch{
      return null
    }
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
    var value = event.target.value;
    this.setState({selectedCoins: event.target.value}, ()=>{
      localStorage.setItem('selectedCoins', JSON.stringify(value));
      this.loadMarket()
    });
  };
  changeActiveCurrency = event => {
    var value = event.target.value;
    this.setState({activeTsyms: event.target.value}, ()=>{
      localStorage.setItem('activeTsyms', JSON.stringify(value));
      this.loadMarket()
    });
  };
  handleSwitch = name => event => {
    var checked = event.target.checked
    this.setState({[name]: event.target.checked},() =>{
      if (name === 'checkedViewAllCoin'){
        localStorage.setItem('checkedViewAllCoin', JSON.stringify(checked));
        this.loadMarket()
      }
    })
  }
  handleRadio = name => event => {
    var value = event.target.value;
    this.setState({[name]: event.target.value}, () =>{
      if (name === 'viewStyle'){
        localStorage.setItem('viewStyle', JSON.stringify(value));
        this.loadMarket()
      }
    })
  }
  componentDidMount() {
    // if (!navigator.onLine) {
    //   return this.restoreStateFromLocalStorage();
    // }

    this.loadGeneralInfo();

    this.cryptoSubscription = setInterval(() => this.loadMarket(), 5000);

    this.props.onRef(this);
  }
  componentWillMount(){
    this.setState({
      selectedCoins:
        localStorage.getItem('selectedCoins') === null
          ? this.state.selectedCoins
          : JSON.parse(localStorage.getItem('selectedCoins')),
      activeTsyms:
        localStorage.getItem('activeTsyms') === null
          ? this.state.activeTsyms
          : JSON.parse(localStorage.getItem('activeTsyms')),
      checkedViewAllCoin:
        localStorage.getItem('checkedViewAllCoin') === null
          ? this.state.checkedViewAllCoin
          : JSON.parse(localStorage.getItem('checkedViewAllCoin')),
      viewStyle:
        localStorage.getItem('viewStyle') === null
          ? this.state.viewStyle
          : JSON.parse(localStorage.getItem('viewStyle')),
    });
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
    clearInterval(this.cryptoSubscription);
  }
  render() {
    const priceList = this.state.priceList;
    const coinList = this.state.checkedViewAllCoin ? this.state.coinList : this.state.selectedCoins;
    return (
      <div className="l-container l-container--market">
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
              <FormControl component="fieldset" fullWidth={true} >
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
                <Grid key={name} 
                  className="c-card" 
                  item 
                  xs={12} 
                  sm={this.state.viewStyle==="card" ? 6 : 12}  
                  md={this.state.viewStyle==="card" ? 6 : 12} 
                  lg={this.state.viewStyle==="card" ? 4 : 12} >
                    {this.state.viewStyle === 'card' ? (
                      <Fade in={true} timeout={300}>
                        <Card>
                          <CardContent>
                            <Typography
                              align="center"
                              variant="h5"
                              component="p"
                              color="textSecondary">
                              1 {name}
                            </Typography>
                            <Typography align="center" variant="h3" component="div">
                              {priceList[name] &&
                                  priceList[name][this.state.activeTsyms] ? (
                                    <span>
                                      {this.state.tsymsIcons[this.state.activeTsyms]}{' '}
                                      {priceList[name][this.state.activeTsyms]}
                                    </span>
                                  ) : (
                                    <CircularProgress size={42} color="secondary" />
                                  )}
                                </Typography>
                                <Typography
                                  align="center"
                                  variant="h4"
                                  component="p"
                                  color="textSecondary">
                                  {this.state.isLoaded ? this.getGeneralFieldByTitle('FullName', name) : ''}
                                </Typography>
                              </CardContent>
                              <CardActions style={{justifyContent: 'center', flexDirection:'row'}}>
                                <Button color="secondary">Learn more</Button>
                                <Button color="secondary">Add to favorite</Button>
                              </CardActions>
                            </Card>
                          </Fade>
                    ): (
                      <Fade in={true} timeout={300}>
                        <Card>
                          <CardContent style={{paddingBottom: '16px'}}>
                            <Grid container>
                              <Grid className="text-xs-center" item  lg={2} md={3} sm={3} xs={12}>
                                <img className="detail-coin-img" alt={name} style={{maxWidth: '100%', height: 'auto', maxHeight: '120px'}} src={"https://cryptocompare.com/"+this.getGeneralFieldByTitle('ImageUrl',name)} />
                              </Grid>
                              <Grid item lg={4} md={3} sm={4} xs={12}>
                                <Typography className="text-xs-center" align="left" variant="h3" component="p">
                                  {this.getGeneralFieldByTitle('FullName',name)}
                                </Typography>
                                <Typography className="text-xs-center" align="left" variant="title" component="p">
                                  Algorithm: {this.getGeneralFieldByTitle('Algorithm',name)} 
                                </Typography>
                                <Typography gutterBottom={true} className="text-xs-center" align="left" variant="title" component="p">
                                  ProofType: {this.getGeneralFieldByTitle('ProofType',name)} 
                                </Typography>
                              </Grid>
                              <Grid item lg={4} md={3} sm={4} xs={12}>
                                {this.state.tsymsList.map((tsums => (
                                  <Typography className="text-xs-center" key={tsums} align="left" variant="h4" component="div">
                                    {priceList[name] && priceList[name][tsums] ? (
                                      <span>
                                        {this.state.tsymsIcons[tsums]}{' '}
                                        {priceList[name][tsums]}
                                      </span>
                                    ) : (
                                      <CircularProgress size={38} color="secondary" />
                                    )}
                                  </Typography>
                                )))}
                              </Grid>
                              <Grid className="d-sm-none" item lg={2} md={3} sm={4} xs={12}>
                                <Typography
                                  align="center"
                                  variant="h4"
                                  component="p"
                                  color="textSecondary">
                                  {name}
                                </Typography>
                                <CardActions  style={{alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
                                  <Button color="secondary">Learn more</Button>
                                  <Button color="secondary">Add to favorite</Button>
                                </CardActions>
                              </Grid>
                            </Grid>
                          </CardContent>
                          <CardActions className="d-none d-sm-flex" style={{alignItems: 'center', justifyContent: 'center' }}>
                            <Button color="secondary">Learn more</Button>
                            <Button color="secondary">Add to favorite</Button>
                          </CardActions>
                        </Card>
                      </Fade>
                    )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Market;
