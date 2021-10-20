import { Link } from "react-router-dom";
import "../styles/landing.css";
import "../styles/utility.css";

export function Landing() {
  return (
    <div>
      <h1> Landing page! </h1>
      <p>
        {" "}
        This is a website for TOP Census Data Project by team at CMU led by
        Professor Kyuha Shim.
      </p>
      <Link to="/p5map"> p5 map on census data</Link>
    </div>
  );
}
