import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Player from './Player';
import Popup from './Popup';
import { useDispatch } from 'react-redux';
import { removePlayer, updateBuying, updateReturning, updateState } from '../store/playerListReducer';
import { Box } from '@mui/system';
import { status } from './util';

export default function PlayerList({ page, players }) {
  const isPlaying = page === status.PLAYING
  const isCheckingOut = page === status.CHECKOUT
  const isFinal = page === status.FINAL

  const dispatch = useDispatch()
  const [openDelete, setOpenDelete] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openCashout, setOpenCashout] = React.useState(false)

  const updatePlayerBuy = (playerName, value) => {
    dispatch(updateBuying({ playerName, buying: value }))
  }
  const updatePlayerReturn = (playerName, value) => {
    dispatch(updateReturning({ playerName, returning: value }))
  }

  const changeBack = (playerName) => {
    if (isCheckingOut) dispatch(updateState({ playerName, status: "playing" }))
    if (isFinal) dispatch(updateState({ playerName, status: "checkout" }))
  }

  const changeNext = (playerName) => {
    if (isPlaying) dispatch(updateState({ playerName, status: "checkout" }))
    if (isCheckingOut) dispatch(updateState({ playerName, status: "final" }))
  }

  const deletePlayer = (playerName) => {
    dispatch(removePlayer(playerName))
  }
  const deleteNameRef = React.useRef("")
  const cashoutValRef = React.useRef(0)
  const cashoutNameRef = React.useRef("")

  return (
    <>
      <Popup title={`Are you sure you want to remove ${deleteNameRef.current}?`} open={openDelete} setOpen={setOpenDelete} actionFunc={
        () => deletePlayer(deleteNameRef.current)
      }></Popup>
      <Popup title={`Input the value to cashout for ${cashoutNameRef.current}`} open={openCashout} setOpen={setOpenCashout} actionFunc={
        () => updatePlayerReturn(cashoutNameRef.current, parseInt(cashoutValRef.current.value))
      }>
        <TextField
          label="cashout value"
          variant="outlined"
          fullWidth
          type="number"
          inputRef={cashoutValRef}
        />
      </Popup>
      <Popup title="edit" open={openEdit} setOpen={setOpenEdit}></Popup>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {players.map((player) => {
          return (
            <div key={player.name}>
              <ListItem alignItems="flex-start"
                secondaryAction={
                  <div style={{ display: 'flex', flexDirection: "column" }}>
                    <ButtonGroup variant="contained">
                      <IconButton
                        disabled={isPlaying}
                        sx={{ transform: "rotateY(180deg)" }}
                        size="small" color="info" onClick={() => changeBack(player.name)}>
                        <CheckoutIcon />
                      </IconButton>
                      <IconButton
                        disabled={isFinal}
                        size="small" color="info" onClick={() => changeNext(player.name)}>
                        <CheckoutIcon />
                      </IconButton>

                      <IconButton size="small" color="error" onClick={() => {
                        setOpenDelete(true)
                        deleteNameRef.current = player.name
                      }}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </ButtonGroup>
                    {isCheckingOut && <Button onClick={() => {
                      setOpenCashout(true)
                      cashoutNameRef.current = player.name
                    }} variant='contained'>cashout</Button>}
                    {isPlaying &&
                      <ButtonGroup variant="contained">
                        <IconButton size="small" onClick={() => updatePlayerBuy(player.name, -1)}>
                          <RemoveIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => updatePlayerBuy(player.name, 1)}>
                          <AddIcon />
                        </IconButton>

                      </ButtonGroup>
                    }
                  </div>
                }
              >
                <Player player={player} />
              </ListItem>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Divider />
              </Box>
            </div>
          )
        })}

      </List>
    </>
  );
}
