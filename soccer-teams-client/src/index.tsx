import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FetcherService } from './services/fetcher.service';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './slices/rootReducer';
import { Provider } from 'react-redux';
import { FavoriteStateService } from './services/favoriteState.service';

const fetcherService = new FetcherService(process.env.REACT_APP_TEAMS_API_BASE_URL);
const favoriteStateService = new FavoriteStateService();

const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

export { fetcherService, favoriteStateService };
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>