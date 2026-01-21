import { useEffect, useState } from "react";
import API from "../services/api";

export default function Internships() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    API.get("/internships").then((res) => setInternships(res.data));
  }, []);

  const apply = async (id) => {
    try {
      await API.post("/applications/apply", { internshipId: id });
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    }
  };

  return (
    <div className="container">
      <h2>Internships</h2>
      {internships.map((i) => (
        <div className="card" key={i._id}>
          <h3>{i.title} - {i.company}</h3>
          <p>{i.description}</p>
          <button onClick={() => apply(i._id)}>Apply</button>
        </div>
      ))}
    </div>
  );
}
