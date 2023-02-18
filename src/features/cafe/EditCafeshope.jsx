import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import {  cafe_shopUpdated } from "./CafeshopeSlice";

export function EditCafe() {
  const { pathname } = useLocation();
  const cafe_shopId = parseInt(pathname.replace("/edit-cafe/", ""));

  const cafe_shop = useSelector((state) =>
    state.cafe_shops.entities.find((cafe_shop) => cafe_shop.id === cafe_shopId)
  );

  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState(cafe_shop.name);
  const [location, setLocation] = useState("");
  const [description,setDescription] = useState("");  
  const [error, setError] = useState(null);

  
  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleClick = () => {
    if (name && location) {
      dispatch(
        cafe_shopUpdated({
          id: cafe_shopId,
          name,location,description
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
            Save cafe_shop
          </button>
        </div>
      </div>
    </div>
  );
}
