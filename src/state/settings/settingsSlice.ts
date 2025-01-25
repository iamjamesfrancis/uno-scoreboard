import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
    theme: string;
    limit: number;
    hideTotalScore: boolean;
    enableScoreEdit: boolean;
    enableScoreLimit: boolean;
    enableScoreReset: boolean;
    enablePlayersReset: boolean;
}

const loadInitialState = (): SettingsState => {
    const storedSettings = localStorage.getItem('settings');
    return storedSettings
        ? JSON.parse(storedSettings)
        : {
            enablePlayersReset: false,
            enableScoreEdit: true,
            enableScoreLimit: true,
            enableScoreReset: true,
            hideTotalScore: false,
            limit: 100,
            theme: 'dark',
        };
}

const initialState: SettingsState = loadInitialState();

const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state: SettingsState, action: PayloadAction<string>) => {
            localStorage.setItem('settings', JSON.stringify({ ...state, theme: action.payload }));
            state.theme = action.payload;
        },
        setLimit: (state: SettingsState, action: PayloadAction<number>) => {
            localStorage.setItem('settings', JSON.stringify({ ...state, limit: action.payload }));
            state.limit = action.payload;
        },
        toggleHideTotalScore: (state: SettingsState) => {
            localStorage.setItem('settings', JSON.stringify({ ...state, hideTotalScore: !state.hideTotalScore }));
            state.hideTotalScore = !state.hideTotalScore;
        },
        toggleEnableScoreEdit: (state: SettingsState) => {
            localStorage.setItem('settings', JSON.stringify({ ...state, enableScoreEdit: !state.enableScoreEdit }));
            state.enableScoreEdit = !state.enableScoreEdit;
        },
        toggleEnableScoreLimit: (state: SettingsState) => {
            localStorage.setItem('settings', JSON.stringify({ ...state, enableScoreLimit: !state.enableScoreLimit }));
            state.enableScoreLimit = !state.enableScoreLimit;
        },
        toggleEnableScoreReset: (state: SettingsState) => {
            localStorage.setItem('settings', JSON.stringify({ ...state, enableReset: !state.enableScoreReset }));
            state.enableScoreReset = !state.enableScoreReset;
        },
        toggleEnablePlayersReset: (state: SettingsState) => {
            localStorage.setItem('settings', JSON.stringify({ ...state, enablePlayersReset: !state.enablePlayersReset }));
            state.enablePlayersReset = !state.enablePlayersReset;
        },
    },
});


export const { setTheme, toggleHideTotalScore, toggleEnableScoreEdit, toggleEnableScoreLimit, toggleEnablePlayersReset, toggleEnableScoreReset, setLimit } = settings.actions;
export default settings.reducer;