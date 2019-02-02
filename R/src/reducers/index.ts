import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import ConfigurationReducer from './ConfigurationReducer';
import dashboard from './DashboardReducer';
import LoginReducer from './LoginReducer';
import ReportReducer from './ReportReducer';

export default combineReducers({
  app: AppReducer,
  data: dashboard,
  login: LoginReducer,
  associate: ConfigurationReducer,
  projectBatch: ReportReducer,  
  toastr: toastrReducer
});
