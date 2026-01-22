import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Internships() {
  const [jobs, setJobs] = useState([]);
const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [workType, setWorkType] = useState("");
const [workMode, setWorkMode] = useState("");

const token = localStorage.getItem("token");

useEffect(() => {
  API.get("/internships", {
    params: {
      search,
      workType,
      workMode,
      page,
      limit: 6,
    },
  })
    .then((res) => {
      setJobs(res.data.internships || []); // 🔑 SAFETY
      setTotalPages(res.data.totalPages || 1);
    })
    .catch(() => {
      setJobs([]);
    });
}, [search, workType, workMode, page]);
useEffect(() => {
  setPage(1);
}, [search, workType, workMode]);


  const apply = async (id) => {
    if (!token) {
      alert("Please login to apply");
      return;
    }

    try {
      await API.post("/applications/apply", { internshipId: id });
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container three-column-layout">
        {/* LEFT FILTER PANEL */}
        <aside className="left-panel">
          <h3>All Filters</h3>

          <div className="filter-group">
            <div className="filter-title">
              <h4>Work Mode</h4>
            </div>

            <label className="filter-option">
  <input
    type="radio"
    name="workMode"
    checked={workMode === "Remote"}
    onChange={() => setWorkMode("Remote")}
  />
  <span className="filter-text">Remote</span>
</label>

<label className="filter-option">
  <input
    type="radio"
    name="workMode"
    checked={workMode === "On-site"}
    onChange={() => setWorkMode("On-site")}
  />
  <span className="filter-text">On-site</span>
</label>

          </div>

          <div className="filter-group">
            <div className="filter-title">
              <h4>Work Type</h4>
              <span className="badge">1</span>
            </div>

           <label className="filter-option">
  <input
    type="radio"
    name="workType"
    checked={workType === "Full time"}
    onChange={() => setWorkType("Full time")}
  />
  <span className="filter-text">Full time</span>
</label>

            <label className="filter-option">
  <input
    type="radio"
    name="workType"
    checked={workType === "Part time"}
    onChange={() => setWorkType("Part time")}
  />
  <span className="filter-text">Part time</span>
</label>

            <label className="filter-option">
  <input
    type="radio"
    name="workType"
    checked={workType === "Internship"}
    onChange={() => setWorkType("Internship")}
  />
  <span className="filter-text">Internship</span>
</label>
          </div>
        </aside>

        {/* CENTER JOB LIST */}
        <main className="center-panel">
          <h2>Available Internships</h2>

          <input
            type="text"
            placeholder="Search by role or company"
            className="job-search"
            onChange={(e) => setSearch(e.target.value)}
          />

          {jobs.length === 0 ? (
  <p>No internships found</p>
) : (
  jobs.map((j) => (
    <div className="job-row" key={j._id}>
      <div>
        <div className="badges">
  <span className="badge blue">{j.workType}</span>
  <span className="badge green">{j.location}</span>
</div>

        <h3>{j.title}</h3>
        <p className="company">{j.company}</p>
        <p className="meta">{j.location}</p>
      </div>

      <button onClick={() => apply(j._id)}>
        {token ? "Apply" : "Login to Apply"}
      </button>
    </div>
  ))
)}

            <div className="pagination">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>

        </main>

        {/* RIGHT PANEL */}
        <aside className="right-panel">
          <h3>Featured Companies</h3>

          <div className="company-box">Google</div>
          <div className="company-box">Amazon</div>
          <div className="company-box">Infosys</div>
          <div className="company-box">Accenture</div>
        </aside>
      </div>
    </>
  );
}
