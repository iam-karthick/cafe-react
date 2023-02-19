import { employeeDeleted } from "./employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Service/rest.model";
// import { employeeUpdated } from "./employeeSlice";
import useFetch from "./fetchCafeEmployee";


export function EmployeeList() {

  const dispatch = useDispatch();  
  const { pathname } = useLocation();
  const cafeID = pathname.replace("/employee/", "");
  let url = `${baseURL}`+"employees/"+`${cafeID}`;
  let entities = [];
  entities  = useFetch(url);
  entities = entities.data || "";
  
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(employeeDeleted({ id }));
    let url = `${baseURL}`+"employee/"+`${id}`;
    axios.delete(url).then((res) => {
      console.log(res.status.code);
    })
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Employee Detail</h1>
      </div>
      <div className="row">
        <div className="column">
          <Link to="/add-employee">
            <button className="button-primary">Add employee</button>
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
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ _id, name, email_address,phone_number,gender }, i) => (
                  <tr key={i}>
                    <td>{name}</td>
                    <td>{email_address}</td>
                    <td>{phone_number}</td>
                    <td>{gender}</td>
                    <td>
                      <button onClick={() => handleDelete(_id)}>Delete</button>
                      <Link to={`/edit-employee/${_id}`}>
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
