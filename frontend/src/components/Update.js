import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // editying user
  async function handleEdit(e) {
    e.preventDefault();
    const updatedUser = { name, email, age };
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    if (!response.ok) {
      //   console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      navigate("/all");
    }
  }

  // prepopulating user
  const { id } = useParams();
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:4000/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}

      <h1 className="text-center">Edit Data</h1>
      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Update;
