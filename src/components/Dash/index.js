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
  Collapse
} from '@material-ui/core/';

import { coinListAll, tsymsList } from '../../constants';

class Dash extends Component {
  changeFilterBySwitch(e){
      if (!e.target.checked){
        this.props.setViewFilter("VIEW_SELECTED")
      }
      else{
        this.props.setViewFilter(e.target.value)
      }

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.viewStyle !== this.props.viewStyle || 
        nextProps.selectedCoins !== this.props.selectedCoins ||
        nextProps.activeTsyms !== this.props.activeTsyms ||
        nextProps.viewFilter !== this.props.viewFilter
    ) {
      this.props.fetchPriceList()
    }
  }
  render() {
    // Vars
    const { selectedCoins, viewStyle, activeTsyms, favoriteCoins, viewFilter } = this.props
    // Actions
    const { setActiveTsyms, setViewStyle, setSelectedCoins } = this.props

    const isHaveFavoriteCoins = favoriteCoins.length ? true : false;

    return (
      <Paper
        style={{
          padding: '20px',
          marginTop: '15px',
          position: 'sticky',
          top: '15px',
        }}>
        <Typography variant="h4" component="p">
          Settings
        </Typography>
        <FormControl disabled={viewFilter === "VIEW_SELECTED" ? false : true} margin="normal" fullWidth={true}>
          <InputLabel htmlFor="select-multiple">Coins list</InputLabel>
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
            Currency
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

        <FormControl margin="normal" component="fieldset" fullWidth={true} >
          <FormLabel component="legend">Filter</FormLabel>

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={viewFilter === "VIEW_ALL" ? true : false}
                  onChange={(e) => this.changeFilterBySwitch(e)}
                  value="VIEW_ALL"
                />
              }
              label="All coins"
            />
            <Collapse in={isHaveFavoriteCoins} timeout="auto" unmountOnExit>
              <FormControlLabel
                control={
                  <Switch
                    checked={viewFilter === "VIEW_ONLY_FAVORITE" ? true : false}
                    onChange={(e) => this.changeFilterBySwitch(e)}
                    value="VIEW_ONLY_FAVORITE"
                  />
                }
                label="Only favorite"
              />
            </Collapse>
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" fullWidth={true} >
          <FormLabel component="legend">Style</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox checked={viewStyle === 'card'} onChange={e => setViewStyle(e.target.value)} value="card" />
              }
              label="Cards"
            />
            <FormControlLabel
              control={
                <Checkbox checked={viewStyle === 'table'} onChange={e => setViewStyle(e.target.value)} value="table" />
              }
              label="Blocks"
            />
          </FormGroup>
        </FormControl>
      </Paper>
    );
  }
}

export default Dash;


