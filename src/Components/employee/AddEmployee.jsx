import { useDispatch, useSelector } from "react-redux";

import { json, useNavigate } from "react-router-dom";
import { useState } from "react";
import { employeeAdded } from "./employeeSlice";
import axios from "axios";
import { baseURL } from "../../Service/rest.model";

export function AddEmployee() {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.employees);

  const history = useNavigate();

  const [name, setName] = useState("");
  const [email_address, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [cafeID, setCafeID] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const hadleGender = (e) => setGender(e.target.value);
  const hadleCafeID = (e) => setCafeID(e.target.value);

  const employeesAmount = useSelector(
    (state) => state.employees.entities.length
  );

  const handleClick = () => {
    if (name && email_address && phone_number && gender && cafeID) {
      dispatch(
        employeeAdded({
          id: employeesAmount + 1,
          name,
          email_address,
          phone_number,
          gender,
          cafeID
        })
      );
        // cafeID = String(cafeID);
      axios
        .post(`${baseURL}` + "employee", {
          name,
          email_address,
          phone_number,
          gender,
          cafeID
        })
        .then((res) => {
          console.log(res.status.code);
          history("/");
        }).catch( (err) =>{
          console.log(err.response,err.message);
          alert(err.response.statusText)
        });
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add employee</h1>
      </div>
      <div className="row">
        <div className="column">
          <label htmlFor="nameInput">Name</label>
          <input
            className="full-width"
            type="text"
            placeholder="enter name"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="emailInput">Email</label>
          <input
            className="full-width"
            type="email"
            placeholder="test@mailbox.com"
            id="emailInput"
            onChange={handleEmail}
            value={email_address}
          />
          <label htmlFor="phoneInput">Phone</label>
          <input
            className="full-width"
            type="number"
            placeholder="enter phone number"
            id="phoneInput"
            onChange={handlePhone}
            value={phone_number}
          />
          <label htmlFor="genderInput">Gender</label>
          <input
            className="full-width"
            type="text"
            placeholder="add your gender"
            id="genderInput"
            onChange={hadleGender}
            value={gender}
          />
          <label htmlFor="cafeInput">Select Cafe</label>
         
              <select placeholder="select cafe"  onChange={hadleCafeID} className="full-width" id="cafeInput" >
              <option value="">Select Cafe</option>
              {entities.length &&
                entities.map(({ _id, name }, i) => (
                <option  key={i} value={_id}>{name}</option>
            ))}
              </select>

          {error && error}
          <div className="full-width">
          <button onClick={handleClick} className="button-primary">
            Add employee
          </button>
          </div>
       
        </div>
      </div>
    </div>
  );
}
