import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import getUserHome from '@/utils/getUserHome';
import {getUserVersion} from "../utils/getUserHome.js";
const initialState = {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    token: Cookies.get("token") ? Cookies.get("token") : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        login: (state, action) => {
            const services=action.payload?.services?.map(el=>{return{
                nameAr:el.nameAr,
                nameEn:el.nameEn,
                routes:el.routes,
            }})
            const user = {
                id:action.payload.id,
                userName: action.payload.userName,
                fullName: action.payload.fullName,
                mobileNo: action.payload.mobileNo,
                email: action.payload.email,
                imageProfile: action.payload.imageProfile,
                roles: action.payload.roles,
                permissions: action.payload.permissions,
                services,
                home: getUserHome(action.payload),
                type: action.payload.type,
            }
            state.user = user;
            state.token = action.payload.token
            if (action.payload.busOrders && action.payload.busOrders.length > 0) {
                Cookies.set("busOrders", JSON.stringify(action.payload.busOrders[0].tripInfo));
            }
            Cookies.set("user", JSON.stringify(user));
            Cookies.set("token", action.payload.token);
            Cookies.set("version", getUserVersion(user))

        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("user");
            Cookies.remove("token");
        },
        toggleStatus: (state, action) => {
            let user = { ...state.user, ...action.payload }
            state.user = user
            Cookies.set("user", JSON.stringify(user));
        },
    },
})

export const { login, logout, toggleStatus } = userSlice.actions
export default userSlice.reducer