import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../../../backend/src/shared/types";

type StateType =  {
    user: userType | null;
    token: null | string;
    listings: null | string[];
  }

const initialState: StateType = {
    user: null,
    token: null,
    listings: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setListings: (state, action) => {
            state.listings = action.payload.listings
        },
        setWishList: (state, action) => {
            if (state.user) {
                state.user.wishList = action.payload.wishList;
              }
        },
        setTripList: (state, action) => { 
            if (state.user) {
                state.user.tripList = action.payload.tripList;
              }
        },
        setPropertyList: (state, action) => {
            if (state.user) {
                state.user.propertyList = action.payload.propertyList;
              }
        },
        setReservationList: (state, action) => {
            if (state.user) {
                state.user.reservationList = action.payload.reservationList;
              }
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;