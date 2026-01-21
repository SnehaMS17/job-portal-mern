import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("/applications").then((res) => setApps(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status`, { status });
    alert("Status updated");
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {apps.map((a) => (
        <div key={a._id}>
          <p>{a.userId.name} applied for {a.internshipId.title}</p>
          <button onClick={() => updateStatus(a._id, "Approved")}>Approve</button>
          <button onClick={() => updateStatus(a._id, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}
