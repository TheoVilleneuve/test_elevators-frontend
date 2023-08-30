import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    currentPosition: 3,
    reqFloor: [],
    isDoorOpen: false,
  },
};

export const elevator1Slice = createSlice({
  name: "elevator1",
  initialState,
  reducers: {
    updateCurrentPosition: (state, action) => {
      state.value.currentPosition = action.payload;
    },
    updateReqFloor: (state, action) => {
      const floor = action.payload;
      if (!state.value.reqFloor.includes(floor)) {
        state.value.reqFloor.push(floor);
      }
    },
    deleteReqFloor: (state, action) => {
        const floorToDelete = action.payload;
        state.value.reqFloor = state.value.reqFloor.filter(floor => floor !== floorToDelete);
      },
    openDoor: (state) => {
      state.value.isDoorOpen = true;
    },
    shutDoor: (state) => {
      state.value.isDoorOpen = false;
    },
  },
});

export const {
  updateCurrentPosition,
  updateReqFloor,
  deleteReqFloor,
  openDoor,
  shutDoor,
} = elevator1Slice.actions;
export default elevator1Slice.reducer;
