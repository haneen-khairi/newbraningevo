import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSamlLoading:false
};
const samlLoading = createSlice({
    name: 'saml',
    initialState,
    reducers: {
        setIsSamlLoading: (state, action) => {
            state.isSamlLoading = action.payload;
        },
    },
});
export const { setIsSamlLoading } = samlLoading.actions;
export default samlLoading.reducer;