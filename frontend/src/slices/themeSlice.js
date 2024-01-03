import { createSlice } from '@reduxjs/toolkit';

const themes = {
    synthwave: 'synthwave',
    cmyk: 'cmyk',
    sunset: 'sunset',
    fantasy: 'fantasy',
};

const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem('theme') || themes.synthwave;
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
};

const initialState = {
    theme: getThemeFromLocalStorage(),
};

const themeSlice = createSlice({
    initialState,
    reducers: {
        toggleTheme: (state) => {
            const { synthwave, cmyk } = themes;
            state.theme = state.theme === synthwave ? cmyk : synthwave;
            document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('theme', state.theme);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
