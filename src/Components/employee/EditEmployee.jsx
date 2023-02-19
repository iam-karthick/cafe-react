import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import { employeeUpdated } from "./employeeSlice";
import { baseURL } from "../../Service/rest.model";
import axios from "axios";
import useFetch from "./fetchCafeEmployee";

export function EditEmployee() {
  const { pathname } = useLocation();
  const employeeId = pathname.replace("/edit-employee/", "");
  // const employee = useSelector((state) =>
  //   state.employees.entities[0].find((employee) => employee._id === employeeId)
  // );
  
  let url = `${baseURL}`+"employee/"+`${employeeId}`;
  // let employee = "";
  let {data,Loading} = useFetch(url);
  let employee = data;

  // console.log(employee.name)
  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState(employee?.name);
  let [email_address, setEmail] = useState(employee?.email_address);
  let [phone_number, setPhone] = useState(employee?.phone_number);
  let [gender, setGender] = useState(employee?.gender);
  // const [cafeID, setCafeID] = useState(employee.cafeID);
  let [error, setError] = useState(null);

  let handleName = (e) => setName(e.target.value);
  let handleEmail = (e) => setEmail(e.target.value);
  let handlePhone = (e) => setPhone(e.target.value);
  let handleGender = (e) => setGender(e.target.value);

  const handleClick = () => {
    if (name && email_address && phone_number && gender) {
      dispatch(
        employeeUpdated({
          id: employeeId,
          name,
          email_address,
          phone_number,
          gender,        
          // cafeID
        })
      );
    let  url = `${baseURL}`+"edit-employee/"+`${employeeId}`
    console.log(url,name)

    } else {
      console.log(url,name)
      setError("Fill in all fields");
    }
  };

  // const loading = useSelector((state) => state.loading);

  if(1==1 ){
    return (
      <div className="container">
        <div className="row">
          <h1>Edit employee</h1>
        </div>
        <div className="row">
        {Loading ? (
            "Loading..."
          ) : (
          <div className="three columns">
            <label htmlFor="nameInput">Name</label>
            <input
              className="full-width"
              type="text"
              placeholder="enter employee name"
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
              type="text"
              placeholder="enter phone number"
              id="phoneInput"
              onChange={handlePhone}
              value={phone_number}
            />
  
            <label htmlFor="genderInput">Gender</label>
            <input
              className="full-width"
              type="text"
              placeholder="Gender"
              id="genderInput"
              onChange={handleGender}
              value={gender}
            />
            
            {error && error}
            <button onClick={handleClick} className="button-primary">
              Save employee
            </button>
          </div>
          )}
        </div>
      </div>
    );
  }
 

}
