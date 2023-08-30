import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        currentPosition: 3,
        reqFloor: null, 
        isDoorOpen: false,
    },
};

export const elevator1Slice = createSlice({
    name: 'elevator1',
    initialState,
    reducers: {
        updateCurrentPosition: (state, action) => {
            state.value.currentPosition = action.payload;
        },
        updateReqFloor: (state, action) => {
            state.value.reqFloor = action.payload;
        },
        resetReqFloor: (state, action) => {
            state.value.reqFloor = null
        },
        openDoor: (state) => {
            state.value.isDoorOpen = true;
        },
        shutDoor: (state) => {
            state.value.isDoorOpen = false;
        },
    },
   });

   export const { updateCurrentPosition, updateReqFloor, resetReqFloor, openDoor, shutDoor } = elevator1Slice.actions;
   export default elevator1Slice.reducer;