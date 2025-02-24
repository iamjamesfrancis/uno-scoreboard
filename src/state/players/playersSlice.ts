import { createSlice } from '@reduxjs/toolkit';

interface Player {
    id: string;
    name: string;
}

interface PlayersState {
    players: Player[];
}

const loadInitialState = (): PlayersState => {
    const storedPlayers = localStorage.getItem("players");
    return storedPlayers
        ? { players: JSON.parse(storedPlayers) }
        : { players: [] }; // Default state if no players in localStorage
};

// Initialize the state
const initialState: PlayersState = loadInitialState();

const counter = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            localStorage.setItem('players', JSON.stringify([...state.players, action.payload]));
            state.players.push(action.payload);
        },
        editPlayer: (state, action) => {
            const playerIndex = state.players.findIndex(player => player.id === action.payload.id);
            state.players[playerIndex].name = action.payload.name;
            localStorage.setItem('players', JSON.stringify(state.players));
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

export const { addPlayer, deletePlayer, deleteAllPlayers, editPlayer } = counter.actions;
export default counter.reducer;
