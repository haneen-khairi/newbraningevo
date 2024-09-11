import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import AbilityReducer from './slices/AbilitySlice';
import themeReducer from './slices/themeSlice';
import samlLoading from './slices/samlLoading';
const store = configureStore({
    reducer: {
        auth: AuthReducer,
        ability: AbilityReducer,
        theme: themeReducer,
        loading:samlLoading
    }
})
export default store;