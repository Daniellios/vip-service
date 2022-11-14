import { configureStore } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import type { IFlightOption, ITicket } from "../interfaces/interfaces";
import { validateDate } from "../utils/dateValidate";

const initialState: ITicket = {
  isSubmittable: false,
  fromWhere: "",
  toWhere: "",
  thereDate: "",
  backDate: "",
  fligthOptions: [
    { start: "9:20", end: "11:05", isSelected: true, id: 1 },
    { start: "10:20", end: "12:05", isSelected: false, id: 2 },
    { start: "11:20", end: "13:05", isSelected: false, id: 3 },
  ],
};

export const flightsSlice = createSlice({
  name: "flight",
  initialState: initialState,
  reducers: {
    validateForm: (state) => {
      if (
        state.fromWhere.length > 0 &&
        state.toWhere.length > 0 &&
        validateDate(state.thereDate)
      ) {
        state.isSubmittable = true;
      } else {
        state.isSubmittable = false;
      }
    },

    setFromWhere: (state, action: PayloadAction<string>) => {
      state.fromWhere = action.payload;
    },
    setToWhere: (state, action: PayloadAction<string>) => {
      state.toWhere = action.payload;
    },
    setThereDate: (state, action: PayloadAction<string>) => {
      state.thereDate = action.payload;
    },
    setBackDate: (state, action: PayloadAction<string>) => {
      state.backDate = action.payload;
    },
    changeTicketTime: (state, action: PayloadAction<number>) => {
      state.fligthOptions.map((date: IFlightOption) => {
        if (action.payload === date.id && !date.isSelected) {
          date.isSelected = true;
        } else {
          date.isSelected = false;
        }
      });
    },
  },
});

// config the store
const store = configureStore({
  reducer: {
    flight: flightsSlice.reducer,
  },
});

export const selectData = (state: RootState) => state.flight;
// export default the store

export default store;
export const {
  setFromWhere,
  setToWhere,
  setThereDate,
  setBackDate,
  changeTicketTime,
  validateForm,
} = flightsSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
