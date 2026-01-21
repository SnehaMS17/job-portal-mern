import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("/applications").then((res) => setApps(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status`, { status });
    window.location.reload();
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {apps.map((a) => (
        <div className="card" key={a._id}>
          <p><b>{a.userId.name}</b> applied for <b>{a.internshipId.title}</b></p>
          <button className="admin-btn" onClick={() => updateStatus(a._id, "Approved")}>
            Approve
          </button>
          <button className="reject-btn" onClick={() => updateStatus(a._id, "Rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
