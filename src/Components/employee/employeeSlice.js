/* eslint no-use-before-define: 2 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../Service/rest.model";

export const fetchEmployees = createAsyncThunk("employees/fetchEmployees", async () => {
  const cafe_shop = await fetch(`${baseURL}`+"cafe");
  const cafe_shops = await cafe_shop.json();
  // const employee = await fetch(`${baseURL}`+"employee");
  // const employees = await employee.json();
  return cafe_shops;
});

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    employeeAdded(state, action) {
      state.entities.push(action.payload);
    },
    employeeUpdated(state, action) {
      const { id, name, email_address } = action.payload;
      const existingEmployee = state.entities.find((employee) => employee._id === id);
      if (existingEmployee) {
        existingEmployee.name = name;
        existingEmployee.email_address = email_address;
      }
    },
    employeeDeleted(state, action) {
      const { id } = action.payload;
      const existingEmployee = state.entities.find((employee) => employee._id === id);
      if (existingEmployee) {
        state.entities = state.entities.filter((employee) => employee._id !== id);
      }
    },
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
    [fetchEmployees.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchEmployees.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchEmployees.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { cafe_shopAdded, cafe_shopUpdated, cafe_shopDeleted,employeeAdded, employeeUpdated, employeeDeleted } = employeesSlice.actions;

export default employeesSlice.reducer;
