import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Score {
    player: string;
    score: number;
    game: number;
    isUpdated: boolean;
}

interface ScoreboardState {
    scores: Score[];
    success?: boolean;
    gameNumber?: number;
}

const loadInitialState = (): ScoreboardState => {
    const storedScores = localStorage.getItem("scores");
    return storedScores
        ? { scores: JSON.parse(storedScores) }
        : { scores: [] }; // Default state if no players in localStorage
};

// Initialize the state
const initialState: ScoreboardState = loadInitialState();

const scoreboard = createSlice({
    name: 'scoreboard',
    initialState,
    reducers: {
        addScore: (state: ScoreboardState, action: PayloadAction<Score>) => {
            localStorage.setItem('scores', JSON.stringify([...state.scores, action.payload]));
            state.scores.push(action.payload);
        },
        deleteScore: (state: ScoreboardState, action: PayloadAction<Score>) => {
            localStorage.setItem('scores', JSON.stringify(state.scores.filter(score => score.game !== action.payload.game)));
            state.scores = state.scores.filter(score => score.game !== action.payload.game);
        },
        deleteAllScores: (state: ScoreboardState) => {
            localStorage.setItem('scores', JSON.stringify([]));
            state.scores = [];
        },
        updateScore: (state: ScoreboardState, action: PayloadAction<Score>) => {
            const index = state.scores.findIndex(score => score.game === action.payload.game);
            state.scores[index] = { ...state.scores[index], score: action.payload.score, isUpdated: true };
            localStorage.setItem('scores', JSON.stringify(state.scores));
        },
        getGameNumber: (state: ScoreboardState) => {
            state.gameNumber = state.scores[state.scores.length - 1]?.game + 1 || 1;
        }
    },
});

export const { addScore, deleteScore, deleteAllScores, getGameNumber } = scoreboard.actions;
export default scoreboard.reducer;
