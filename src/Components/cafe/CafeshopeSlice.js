import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../Service/rest.model";

export const fetchCafe_shops = createAsyncThunk("cafe_shops/fetchCafe_shops", async () => {
  const response = await fetch(`${baseURL}`+"cafe");
  const cafe_shops = await response.json();
  console.log(cafe_shops)
  return cafe_shops;
});

const CofeshopeSlice = createSlice({
  name: "cafe_shops",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    cafe_shopAdded(state, action) {
      state.entities.push(action.payload);
    },
    cafe_shopUpdated(state, action) {
      const { id, name, description } = action.payload;
      const existingCafe_shop = state.entities.find((cafe_shop) => cafe_shop._id === id);
      if (existingCafe_shop) {
        existingCafe_shop.name = name;
        existingCafe_shop.description = description;
      }
    },
    cafe_shopDeleted(state, action) {
      const { id } = action.payload;
      const existingCafe_shop = state.entities.find((cafe_shop) => cafe_shop._id === id);
      if (existingCafe_shop) {
        state.entities = state.entities.filter((cafe_shop) => cafe_shop._id !== id);
      }
    },
  },
  extraReducers: {
    [fetchCafe_shops.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCafe_shops.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchCafe_shops.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { cafe_shopAdded, cafe_shopUpdated, cafe_shopDeleted } = CofeshopeSlice.actions;

export default CofeshopeSlice.reducer;
