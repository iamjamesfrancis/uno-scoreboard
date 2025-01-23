import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
    theme: string;
    hideTotalScore: boolean;
    disableScoreEdit: boolean;
    disableScoreLimit: boolean;
}

const initialState: SettingsState = {
    theme: 'light',
    hideTotalScore: false,
    disableScoreEdit: false,
    disableScoreLimit: false,
};

const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state: SettingsState, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        toggleHideTotalScore: (state: SettingsState) => {
            state.hideTotalScore = !state.hideTotalScore;
        },
        toggleDisableScoreEdit: (state: SettingsState) => {
            state.disableScoreEdit = !state.disableScoreEdit;
        },
        toggleDisableScoreLimit: (state: SettingsState) => {
            state.disableScoreLimit = !state.disableScoreLimit;
        },
    },
});


export const { setTheme, toggleHideTotalScore, toggleDisableScoreEdit, toggleDisableScoreLimit } = settings.actions;
export default settings.reducer;