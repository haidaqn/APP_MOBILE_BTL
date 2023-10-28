import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'category', 'product', 'cart']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
