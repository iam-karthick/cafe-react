import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client"
import { fetchEmployees } from "./Components/employee/employeeSlice";
// import { fetchCafe_shops } from "./Components/cafe/CafeshopeSlice";
import store from "./store";
import { BrowserRouter } from "react-router-dom"

store.dispatch(fetchEmployees(),);

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>);
