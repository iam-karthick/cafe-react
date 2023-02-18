import { cafe_shopDeleted,fetchCafe_shops } from "./CafeshopeSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function CafeList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.cafe_shops);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(cafe_shopDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Café Detail</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(fetchCafe_shops())}
            className="button-primary"
          >
            Load Café
          </button>
        </div>
        <div className="two columns">
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
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Cafe_shop</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, name, description }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{description}</td>
                    <td>{description}</td>
                    <td>
                      <button onClick={() => handleDelete(id)}>Delete</button>
                      <Link to={`/edit-cafe_shop/${id}`}>
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
