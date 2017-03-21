import { combineReducers } from 'redux';
import demo from './demoReducer';

/**
 * Create combined root reducer
 */
const rootReducer = combineReducers({ demo })
export default rootReducer;
