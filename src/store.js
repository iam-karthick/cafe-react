import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./features/employee/employeeSlice";

export default configureStore({
  reducer: {
    employees: employeesReducer,
  },
});
