import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './players/playersSlice';
import scoreboardSlice from './scoreboard/scoreboardSlice';

export const store = configureStore({
    reducer: {
        players: playersSlice,
        scoreboard: scoreboardSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;