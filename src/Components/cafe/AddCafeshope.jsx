import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cafe_shopAdded } from "../employee/employeeSlice";
import { baseURL } from "../../Service/rest.model";
import axios from "axios";

export function AddCafe() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description,setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const cafe_shopAmount = useSelector((state) => state.cafe_shops.entities.length);

  const handleClick = () => {
    if (name && location) {
      dispatch(
        cafe_shopAdded({
          id: cafe_shopAmount + 1,
          name,
          description,
          location,
        })
      );

      axios.post(`${baseURL}`+"cafe", {
        name,
        description,
        location,
      }).then((res) => {
        console.log(res.status.code)
          history('/')
  })
      // setError(null);
      // history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setLocation("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add Café details</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Full Name"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="desctiptionInput">Description</label>
          <input
            className="u-full-width"
            type="text"
            placeholder=" description"
            id="desctiptionInput"
            onChange={handleDescription}
            value={description}
          />
             <label htmlFor="loctionInput">Location</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Place"
            id="loctionInput"
            onChange={handleLocation}
            value={location}
          />
               {/* <label htmlFor="genderInput">Employee</label> */}
          {/* <input
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="genderInput"
            onChange={h}
            value={phone}
          /> */}
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Add Café
          </button>
        </div>
      </div>
    </div>
  );
}
