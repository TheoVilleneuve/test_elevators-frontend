import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const callButtonsSlice = createSlice({
    name: 'callButtons',
    initialState,
    reducers: {
        addRequest: (state, action) => {
            if (!state.value.some(e => e.title === action.payload.title)) {
                state.value.push(action.payload);
              }       
        },
        removeRequest: (state, action) => {
            state.value = state.value.filter(e => e.title !== action.payload.title);
        },
    },
   });
   
   export const { addRequest, removeRequest } = callButtonsSlice.actions;
   export default callButtonsSlice.reducer;