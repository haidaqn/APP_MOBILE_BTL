import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        logging: false,
        registering: false,
        actionAuth: 'No action',
        currentUser: {
            name: undefined,
            phone: undefined,
            address: undefined,
            email: undefined
        },
        isRehydrating: true
    },
    reducers: {
        login(state, action) {
            state.logging = true;
            state.actionAuth = 'No action';
        },
        loginSuccess(state, action) {
            state.logging = false;
            state.actionAuth = 'Success';
            // state.currentUser.name = action.payload.name;
            // state.currentUser.email = action.payload.email;
            // state.currentUser.phone = action.payload.phone;
            // state.currentUser.address = action.payload.address;
            state.currentUser = action.payload
        },
        loginFailed(state) {
            state.logging = false;
            state.actionAuth = 'Failed';
        },
        register(state, action) {
            state.registering = true;

            state.actionAuth = 'No action';
        },
        registerSuccess(state, action) {
            state.registering = false;
            state.actionAuth = 'Success';
        },
        registerFailed(state) {
            state.registering = false;
            state.actionAuth = 'Failed';
        },
        logout(state) {
            state.logging = false;
            state.registering = false;
            state.actionAuth = 'No action';
            state.currentUser = undefined;
        },
        resetAction(state) {
            state.actionAuth = 'No action';
        },
        setAddress(state, action) {
            state.currentUser.address = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.endsWith('/REHYDRATE'),
            (state) => {
                state.isRehydrating = false;
            }
        );
    }
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
