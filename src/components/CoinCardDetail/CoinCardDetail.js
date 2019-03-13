import React, {Component} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Fade
} from '@material-ui/core/';

import { tsymsList, tsymsIcons } from '../../constants';

class CoinCardDetail extends Component {
  render() {
    const { name,  priceList, coin } = this.props
    return (
      <Fade in={coin ? true : false} timeout={300}>
        <Card>
          <CardContent style={{paddingBottom: '16px'}}>
            <Grid container>
              <Grid className="text-xs-center" item  lg={2} md={3} sm={3} xs={12}>
                <img
                  className="detail-coin-img"
                  alt={name}
                  style={{maxWidth: '100%', height: 'auto', maxHeight: '120px'}}
                  src={coin && 'https://cryptocompare.com/' + coin['ImageUrl']} />
              </Grid>
              <Grid item lg={4} md={3} sm={4} xs={12}>
                <Typography className="text-xs-center" align="left" variant="h3" component="p">
                  {name}
                </Typography>
                <Typography className="text-xs-center" align="left" variant="title" component="p">
                  Algorithm: {coin && coin['Algorithm']} 
                </Typography>
                <Typography gutterBottom={true} className="text-xs-center" align="left" variant="title" component="p">
                  ProofType: {coin && coin['ProofType']} 
                </Typography>
              </Grid>
              <Grid item lg={4} md={3} sm={4} xs={12}>
                {tsymsList.map((tsums => (
                  <Typography className="text-xs-center" key={tsums} align="left" variant="h4" component="div">
                    {priceList[name] && priceList[name][tsums] ? (
                      <span>
                        {tsymsIcons[tsums]}{' '}
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
    );
  }
}

export default CoinCardDetail


