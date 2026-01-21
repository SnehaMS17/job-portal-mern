import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("/applications/my").then((res) => setApps(res.data));
  }, []);

  return (
    <div>
      <h2>My Applications</h2>
      {apps.map((a) => (
        <p key={a._id}>
          {a.internshipId.title} - {a.status}
        </p>
      ))}
    </div>
  );
}
