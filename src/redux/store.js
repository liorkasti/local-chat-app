import { createStore, combineReducers } from 'redux';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
})

const configureStore = () => createStore(rootReducer);

export default configureStore;