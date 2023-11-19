import { combineReducers } from 'redux';
import themeReducer, { ThemeState } from './themeReducer';

export interface RootState {
    theme: ThemeState;
}

const rootReducer = combineReducers({
    theme: themeReducer,
});

export default rootReducer;
