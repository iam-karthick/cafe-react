import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";

import { EmployeeList } from "./Components/employee/EmployeeList";
import {AddEmployee} from "./Components/employee/AddEmployee";
import { EditEmployee } from "./Components/employee/EditEmployee";

import { CafeList } from "./Components/cafe/CafeshopeList";
import {AddCafe} from "./Components/cafe/AddCafeshope";
import { EditCafe } from "./Components/cafe/EditCafeshope";

export default function App() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<CafeList />} />
          <Route path="/add-cafe*" element={<AddCafe />} />
          <Route path="/edit-cafe/*" element={<EditCafe />} />
          <Route path="/employee/*" element={<EmployeeList />} />
          <Route path="/add-employee/*" element={<AddEmployee />}/>
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
