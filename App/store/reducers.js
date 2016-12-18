import {combineReducers} from 'redux';
import AlbumsReducer from './albums';

const rootReducer = combineReducers({
  albums: AlbumsReducer,
});

export default rootReducer;
