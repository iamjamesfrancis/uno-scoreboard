import { createSlice } from '@reduxjs/toolkit';

interface Player {
    id: string;
    name: string;
}

interface PlayersState {
    players: Player[];
}

const initialState: PlayersState = {
    players: [
        {
            id: '1',
            name: 'James',
        },
        {
            id: '2',
            name: 'Aljin',
        },
        {
            id: '3',
            name: 'Joyal',
        },
    ],
};

const counter = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            state.players.push(action.payload);
        },
        deletePlayer: (state, action) => {
            state.players = state.players.filter(player => player.id !== action.payload);
        }
    },
});

export const { addPlayer, deletePlayer } = counter.actions;
export default counter.reducer;
