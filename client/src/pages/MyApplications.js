import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("/applications/my").then((res) => setApps(res.data));
  }, []);

  return (
    <div className="container">
      <h2>My Applications</h2>
      {apps.map((a) => (
        <div className="card" key={a._id}>
          <h3>{a.internshipId.title}</h3>
          <p className={`status ${a.status}`}>{a.status}</p>
        </div>
      ))}
    </div>
  );
}
