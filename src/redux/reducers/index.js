import { combineReducers } from 'redux';

import themeReducer from './themeReducers';
import homeReducer from './homeReducer';

export default combineReducers({
	themeReducer,
	homeReducer
});
