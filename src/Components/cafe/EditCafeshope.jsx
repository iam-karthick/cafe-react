import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import {  cafe_shopUpdated } from "../employee/employeeSlice";
import { baseURL } from "../../Service/rest.model";
import axios from "axios";

export function EditCafe() {
  const { pathname } = useLocation();
  const cafe_shopId = pathname.replace("/edit-cafe/", "");

  const cafe_shop = useSelector((state) =>
  state.employees.entities.find((employee) => employee._id === cafe_shopId)
  );

  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState(cafe_shop.name);
  const [location, setLocation] = useState(cafe_shop.location);
  const [description,setDescription] = useState(cafe_shop.description);  
  const [error, setError] = useState(null);

  
  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleClick = () => {
    if (name && location && description) {
      dispatch(
        cafe_shopUpdated({
          id: cafe_shopId,
          name,location,description
        })
      );
      let  url = `${baseURL}`+"edit-cafe/"+`${cafe_shopId}`
      axios.put(url, {
            name,
            description,
            location
          }).then((res) => {
            console.log(res.status.code)
              setError(null);
              history('/')
      })
      // history("/");
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit Café details</h1>
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
          <label htmlFor="desInput">Description</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="short description about the app"
            id="desInput"
            onChange={handleDescription}
            value={description}
          />
           <label htmlFor="locInput">Location</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="short description about the app"
            id="locInput"
            onChange={handleLocation}
            value={location}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Save cafe
          </button>
        </div>
      </div>
    </div>
  );
}
