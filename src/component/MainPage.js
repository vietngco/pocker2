import * as React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PlayerList from './PlayerList';
import { useDispatch, useSelector } from 'react-redux';
import { clearLocalStorage, PLAYERLIST, status, TABINDEX, writeToLocalStorage } from './util';
import { initPlayerState, addPlayer } from '../store/playerListReducer';
import AddIcon from '@mui/icons-material/Add';

import { isEmpty, isNil } from 'lodash'
import { Alert, Button, ButtonGroup, IconButton, Paper, TextField, Typography } from '@mui/material';
import Popup from './Popup';
import { useTabIndex } from './useTabIndex';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function getPlayers(players, status) {
  return players.filter(player => {
    return player.status === status
  })
}




export default function MainPage() {
  const theme = useTheme();

  const dispatch = useDispatch()

  const players = useSelector(state => {
    return state.playerList
  })

  React.useEffect(() => {
    dispatch(initPlayerState())
  }, [dispatch])

  React.useEffect(() => {
    writeToLocalStorage(players)
  }, [players])

  const [tabIndex, setTabIndex] = useTabIndex(0);

  const [openAdd, setOpenAdd] = React.useState(false)
  const [openClearCache, setOpenClearCache] = React.useState(false)

  const handleChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  const playingPlayers = getPlayers(players, status.PLAYING)
  const checkoutPlayers = getPlayers(players, status.CHECKOUT)
  const finalPlayers = getPlayers(players, status.FINAL)

  const totalBalance = React.useMemo(() => {
    let balance = 0
    let buying = 0
    let returning = 0
    players.forEach(player => {
      buying += player.buying
      returning += player.returning
    })
    balance = returning - buying
    return balance
  }, [players])

  const isAlert = totalBalance !== 0
  const nameFieldRef = React.useRef("")

  function addNewPlayer(playerName) {
    dispatch(addPlayer({
      name: playerName,
      buying: 0,
      returning: 0,
      status: status.PLAYING
    }))
  }
  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Popup open={openAdd} setOpen={setOpenAdd} title="Adding player" actionFunc={() => addNewPlayer(nameFieldRef.current.value)}>
        <TextField
          label="Player Name"
          variant="outlined"
          fullWidth
          inputRef={nameFieldRef}
        />
      </Popup>
      <Popup open={openClearCache} setOpen={setOpenClearCache} title="Are you sure you want to clear the cache?" actionFunc={clearLocalStorage}>
      </Popup>
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Playing" {...a11yProps(0)} />
          <Tab label="Checkout" {...a11yProps(1)} />
          <Tab label="Final" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Paper sx={{ width: "100%", position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Alert severity={isAlert ? "warning" : "success"}
          action={
            <ButtonGroup>
              <IconButton color="info" onClick={() => setOpenAdd(true)}>
                <AddIcon />
              </IconButton>
              <IconButton color="error" onClick={() => setOpenClearCache(true)}>
                <DeleteForeverIcon />
              </IconButton>
            </ButtonGroup>
          }
        >
          Total Balance:  {totalBalance} - {isAlert ? "bad" : "good"}
        </Alert>
      </Paper>
      <TabPanel value={tabIndex} index={0} dir={theme.direction}>
        <PlayerList page="playing" players={playingPlayers} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1} dir={theme.direction}>
        <PlayerList page="checkout" players={checkoutPlayers} />

      </TabPanel>
      <TabPanel value={tabIndex} index={2} dir={theme.direction}>
        <PlayerList page="final" players={finalPlayers} />
      </TabPanel>

    </Box>
  );
}
