import { useEffect, useState } from "react";
import API from "../services/api";

export default function Internships() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    API.get("/internships").then((res) => setInternships(res.data));
  }, []);

  const apply = async (id) => {
    await API.post("/applications/apply", { internshipId: id });
    alert("Applied successfully");
  };

  return (
    <div>
      <h2>Internships</h2>
      {internships.map((i) => (
        <div key={i._id}>
          <h4>{i.title} - {i.company}</h4>
          <button onClick={() => apply(i._id)}>Apply</button>
        </div>
      ))}
    </div>
  );
}
