import React from 'react'

import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';

export default function Player({ player }) {
    const total =  player.returning - player.buying
    return (
        <>
            <ListItemText
                primary={`${player.name}`}
                secondary={
                    `buy: ${player.buying}
                    return: ${player.returning}
                    own: ${total}`
                }
            />
             <Divider/>
        </>
    )
}
