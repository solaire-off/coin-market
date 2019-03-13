import React, {Component} from 'react';
import {
  Paper,
  Typography,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Input,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core/';

import { coinListAll, tsymsList } from '../../constants';

class Dash extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.viewStyle !== this.props.viewStyle || 
        nextProps.selectedCoins !== this.props.selectedCoins ||
        nextProps.activeTsyms !== this.props.activeTsyms ||
        nextProps.isViewAllCoin !== this.props.isViewAllCoin
    ) {
      this.props.fetchPriceList(
        nextProps.selectedCoins,
        nextProps.activeTsyms,
        nextProps.viewStyle,
        nextProps.isViewAllCoin,
      )
    }
  }
  render() {
    console.log('Render <Dash />');

    // Vars
    const { isViewAllCoin, selectedCoins, viewStyle, activeTsyms } = this.props
    // Actions
    const { setActiveTsyms, setViewStyle, setIsViewAllCoins, setSelectedCoins } = this.props

    return (
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
        <FormControl disabled={isViewAllCoin} margin="normal" fullWidth={true}>
          <InputLabel htmlFor="select-multiple">Select coin list</InputLabel>
          <Select
            multiple
            value={selectedCoins}
            onChange={(e) => {
              setSelectedCoins(e.target.value)
            }}
            input={<Input id="select-multiple" />}>
            {coinListAll.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl disabled={viewStyle === 'table'} margin="normal" fullWidth={true}>
          <InputLabel htmlFor="select-multiple">
            Select currency
          </InputLabel>
          <Select
            value={activeTsyms}
            onChange={(e) => {
              setActiveTsyms(e.target.value)

            }}
            input={<Input id="select-multiple" />}>
            {tsymsList.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={isViewAllCoin}
              onChange={(e) => setIsViewAllCoins(e.target.checked)}
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
                <Checkbox checked={viewStyle === 'card'} onChange={e => setViewStyle(e.target.value)} value="card" />
              }
              label="Card-like"
            />
            <FormControlLabel
              control={
                <Checkbox checked={viewStyle === 'table'} onChange={e => setViewStyle(e.target.value)} value="table" />
              }
              label="Table-like"
            />
          </FormGroup>
        </FormControl>
      </Paper>
    );
  }
}

export default Dash;


