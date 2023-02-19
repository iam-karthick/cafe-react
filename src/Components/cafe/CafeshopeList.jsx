/*eslint-env es6*/
import { cafe_shopDeleted } from "../employee/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Service/rest.model";

export function CafeList() {
  const dispatch = useDispatch();

  let { entities } = useSelector((state) => state.employees);
  // entities = entities[1];
  console.log(entities)
  const loading = useSelector((state) => state.loading);
  
  const handleDelete = (id) => {
    let url = `${baseURL}`+"cafe/"+`${id}`;
    dispatch(cafe_shopDeleted({ id }));
    axios.delete(url).then((res) => {
      console.log(res.status.code)
    })
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Café Detail</h1>
      </div>
      <div className="row">
        <div className="column">
          <Link to="/add-cafe">
            <button className="button-primary">Add Café details</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Employee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ _id,name, description,location }, i) => (
                  <tr key={i}>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{location}</td>
                    <td>
                      <Link to={`/employee/${_id}`}>
                        <button>Employee Details</button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(_id)}>Delete</button>
                      <Link to={`/edit-cafe/${_id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
