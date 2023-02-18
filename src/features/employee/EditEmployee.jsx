import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import { employeeUpdated } from "./employeeSlice";

export function EditEmployee() {
  const { pathname } = useLocation();
  const employeeId = pathname.replace("/edit-employee/", "");
  console.log(pathname,employeeId)
  const employee = useSelector((state) =>
    state.employees.entities.find((employee) => employee._id === employeeId)
  );

  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email_address);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleClick = () => {
    if (name && email) {
      dispatch(
        employeeUpdated({
          id: employeeId,
          name,
          email,
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit employee</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="emailInput">Email</label>
          <input
            className="u-full-width"
            type="email"
            placeholder="test@mailbox.com"
            id="emailInput"
            onChange={handleEmail}
            value={email}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Save employee
          </button>
        </div>
      </div>
    </div>
  );
}
