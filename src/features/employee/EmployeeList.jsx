import { fetchEmployees, employeeDeleted } from "./employeeSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function EmployeeList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.employees);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(employeeDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Employee Detail</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(fetchEmployees())}
            className="button-primary"
          >
            Load employees
          </button>
        </div>
        <div className="two columns">
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
                    {/* <td>{_id}</td> */}
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
