// import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/app/store';
import Main from './src/views/main/index';
import Toast from 'react-native-toast-message';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Main />
                <Toast />
            </PersistGate>
        </Provider>
    );
}
