import { combineReducers } from 'redux';
import dashboard from './DashboardReducer';
import LoginReducer from './LoginReducer';

export default combineReducers({
  data: dashboard,
  LoginReducer
});
