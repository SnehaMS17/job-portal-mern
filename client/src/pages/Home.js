import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="hero-content">
          <h1>Find the Right Internship for You</h1>
          <p>
            Explore opportunities from top companies and start your career journey.
          </p>

          <div className="hero-actions">
            <Link to="/internships">
              <button className="primary-btn">Explore Internships</button>
            </Link>
            <Link to="/register">
              <button className="secondary-btn">Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}