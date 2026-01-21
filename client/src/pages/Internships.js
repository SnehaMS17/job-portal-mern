import { useEffect, useState } from "react";
import API from "../services/api";

const Internships = () => {
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
          <h3>{i.title}</h3>
          <p>{i.company}</p>
          <button onClick={() => apply(i._id)}>Apply</button>
        </div>
      ))}
    </div>
  );
};

export default Internships;
