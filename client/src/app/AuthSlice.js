import { createSlice } from "@reduxjs/toolkit";
const localData = JSON.parse(localStorage.getItem("account"));
const initialState = {
    account: localData ? localData : [],
    isLoggedIn: localData ? localData.isLoggedIn : true,
    role: localData ? localData.role : "user",
};

const AuthSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
            state.isLoggedIn = true;
            const temp = { ...state.account, "isLoggedIn": state.isLoggedIn };
            localStorage.setItem("account", JSON.stringify(temp));
            state.role = state.account.role;
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem("role", JSON.stringify(...state.role));
        },
        LogOut: (state) => {
            state.account = [];
            state.profileData = [];
            state.isLoggedIn = false;
            localStorage.clear();
        },
        setAccountAfterRegister: (state, action) => {
            state.account = action.payload;
            state.isLoggedIn = false;
            const temp1 = { ...state.account, "isLoggedIn": state.isLoggedIn };
            localStorage.setItem("account", JSON.stringify(temp1));
        },
    }
});

export const { setRole, setAccount, setAccountAfterRegister, LogOut } = AuthSlice.actions;

export const isUserLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAccount = (state) => state.auth.account;
export const selectRole = (state) => state.auth.role;


export default AuthSlice.reducer;