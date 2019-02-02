import 'bootstrap/dist/css/bootstrap.min.css';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { render } from 'react-dom';
import 'react-fa';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './containers/App';
import store, { history } from './store';
import './style.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <React.Fragment>
      <ReduxToastr timeOut={0} newestOnTop={true} preventDuplicates={true} position="top-right" transitionIn="fadeIn" transitionOut="fadeOut" progressBar={false} closeOnToastrClick={true} />
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </React.Fragment>
  </Provider>,
  target
);
