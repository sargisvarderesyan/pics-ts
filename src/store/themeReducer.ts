export interface ThemeState {
    darkMode: boolean;
}

const initialState: ThemeState = {
    darkMode: false,
};

const themeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return { ...state, darkMode: !state.darkMode };
        default:
            return state;
    }
};

export default themeReducer;
