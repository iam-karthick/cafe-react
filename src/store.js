import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./Components/employee/employeeSlice";
import cafeshopeReducer from "./Components/cafe/CafeshopeSlice";

export default configureStore({
  reducer: {
    employees: employeesReducer,
    cafe_shops:cafeshopeReducer
  },
});
