import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import React from "react";

import { EmployeeList } from "./features/employee/EmployeeList";
import {AddEmployee} from "./features/employee/AddEmployee";
import { EditEmployee } from "./features/employee/EditEmployee";

import { CafeList } from "./features/cafe/CafeshopeList";
import {AddCafe} from "./features/cafe/AddCafeshope";
import { EditCafe } from "./features/cafe/EditCafeshope";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafe" element={<CafeList />} />
          <Route path="/add-cafe" element={<AddCafe />} />
          <Route path="/edit-cafe" element={<EditCafe />} />
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />}/>
          <Route path="/edit-employee/*" element={<EditEmployee />}/>
        </Routes>
      </div>    
    </>
    // <Router>
    //   <div>
    //     <Switch>
    //       <Route path="/add-employee">
    //         <AddEmployee />
    //       </Route>
    //       <Route path="/edit-employee">
    //         <EditEmployee />
    //       </Route>
    //       <Route path="/">
    //         <EmployeeList />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
}
