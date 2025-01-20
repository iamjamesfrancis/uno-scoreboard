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
            localStorage.setItem('players', JSON.stringify([...state.players, action.payload]));
            state.players.push(action.payload);
        },
        deletePlayer: (state, action) => {
            localStorage.setItem('players', JSON.stringify(state.players.filter(player => player.id !== action.payload)));
            state.players = state.players.filter(player => player.id !== action.payload);
        },
        deleteAllPlayers: (state) => {
            localStorage.setItem('players', JSON.stringify([]));
            state.players = [];
        }
    },
});

export const { addPlayer, deletePlayer, deleteAllPlayers } = counter.actions;
export default counter.reducer;
