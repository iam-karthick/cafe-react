// import { EmployeeList } from "../features/employee/EmployeeList";
import {AddEmployee} from "../features/employee/AddEmployee";
import { EditEmployee } from "../features/employee/EditEmployee";
import { Route,Routes } from "react-router-dom";

export default function Employee() {
  return  (
    <>
    {/* <Router>
    <div>
      <Switch>
        <Route path="/add-employee">
          <AddEmployee />
        </Route>
        <Route path="/edit-employee">
          <EditEmployee />
        </Route>
        <Route path="/">
          <EditEmployee />
        </Route>
      </Switch>
    </div>
  </Router> */}
  <Routes>
    <Route path='/add-employee' >
    <AddEmployee />
    </Route>
    {/* <Route path='/edit-employee' element={<EditEmployee />} />
    <Route path='/' element={<EditEmployee />} /> */}
  </Routes>
    </>
    )   
}
