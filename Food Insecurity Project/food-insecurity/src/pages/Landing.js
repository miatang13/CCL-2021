import LandingGraphs from "../components/LandingGraphs";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <p> Landing page</p>
      <Link to="/matrix">
        {" "}
        <button> Enter Matrix Page </button>{" "}
      </Link>
      <LandingGraphs />
    </div>
  );
}
