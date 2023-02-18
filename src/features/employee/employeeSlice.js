import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEmployees = createAsyncThunk("employees/fetchEmployees", async () => {
  const response = await fetch("http://localhost:8080/employee");
  const employees = await response.json();
  console.log(employees)
  return employees;
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

export const { employeeAdded, employeeUpdated, employeeDeleted } = employeesSlice.actions;

export default employeesSlice.reducer;
