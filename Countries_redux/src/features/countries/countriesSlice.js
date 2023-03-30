import { createSlice } from "@reduxjs/toolkit";
import countriesAPI from "../../services/countriesAPI";

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading: true
  },
  reducers: {
    getCountries(state, actions) {
      state.countries = actions.payload;
    },
    isLoading(state, action){
        state.isLoading = action.payload;
    }
  },
});
export const initializeCountries = () => {
    return async (dispatch) => {
        const countries = await countriesAPI.getAll();
        dispatch(getCountries(countries))
        dispatch(isLoading(false))
    }
};

export const {getCountries, isLoading} = countriesSlice.actions;
export default countriesSlice.reducer;