import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './players/playersSlice';
import scoreboardSlice from './scoreboard/scoreboardSlice';
import settingsSlice from './settings/settingsSlice';

export const store = configureStore({
    reducer: {
        players: playersSlice,
        scoreboard: scoreboardSlice,
        settings: settingsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;