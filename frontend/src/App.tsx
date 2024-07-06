import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Auth from './features/auth/Auth';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Auth />
      </div>
    </Provider>
  );
};

export default App;