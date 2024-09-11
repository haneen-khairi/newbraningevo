import { createSlice } from '@reduxjs/toolkit';
import { defineAbility } from '@casl/ability';
const initialState = {
    ability: defineAbility((can) => {
        can('read', 'all');
    })
};
const abilitySlice = createSlice({
    name: 'ability',
    initialState,
    reducers: {
        setAbility: (state, action) => {
            state.ability = action.payload;
        },
    },
});
export const { setAbility } = abilitySlice.actions;
export default abilitySlice.reducer;