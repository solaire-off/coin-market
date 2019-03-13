import React, {Component} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CircularProgress,
  Fade
} from '@material-ui/core/';

import { tsymsIcons } from '../../constants';


class CoinCard extends Component {
  render() {
    const { name, coin, tsyms, priceList } = this.props
    return (
      <Fade in={coin ? true : false} timeout={300}>
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
              {priceList[name] && priceList[name][tsyms] ? (
                <span>
                  {tsymsIcons[tsyms]}{' '}
                  {priceList[name][tsyms]}
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
              {coin && coin['FullName']}
            </Typography>
          </CardContent>
          <CardActions style={{justifyContent: 'center', flexDirection:'row'}}>
            <Button color="secondary">Learn more</Button>
            <Button color="secondary">Add to favorite</Button>
          </CardActions>
        </Card>
      </Fade>
    );
  }
}

export default CoinCard;
