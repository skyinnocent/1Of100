import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // getting users
  async function getData() {
    let response;
    let result;
    try {
      response = await fetch("http://localhost:4000/");
      result = await response.json();
      //   console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setData(result);
      setError("");
    }
  }
  // deleting user
  async function handleDelete(id) {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log(response);
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("User removed successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  return (
    <div className="my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Show All Data</h2>
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="mb-2 text-muted">{ele.email}</h6>
                <p className=" mb-2 text-muted">{ele.age}</p>

                <a
                  href="#"
                  className="card-link"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </a>
                <Link to={`/${ele._id}`} href="#" className="card-link">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Read;
