import { createSlice } from "@reduxjs/toolkit";

const favourites =
  localStorage.getItem("Favourites") !== null
    ? JSON.parse(localStorage.getItem("Favourites"))
    : [];

export const favouritesSlice = createSlice({
  name: "Favourites",
  initialState: {
    favourites: favourites,
  },
  reducers: {
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
      localStorage.setItem("Favourites", JSON.stringify(state.favourites));
    },
    removeOneFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favorite) => favorite !== action.payload
      );
      localStorage.setItem("Favourites", JSON.stringify(state.favourites));
    },
    clearFavourites(state, action) {
      localStorage.removeItem("Favourites");
      state.favourites = [];
    },
  },
});
export const {
  getFavourite,
  addFavourite,
  clearFavourites,
  removeOneFavourite,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
