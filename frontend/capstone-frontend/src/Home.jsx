import { Link } from "react-router-dom";
import img3 from "./images/img3.jpg";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img className="w-90 h-90 rounded" src={img3} />
      <h1 className="text-4xl font-bold mb-6"> This is the Home Page.</h1>
      <p className="text-lg mb-4 italic">Home page</p>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/mission">Mission</Link>
          </li>
          <li>
            <Link to="/team">Team</Link>
          </li>
          <li>
            <Link to="/">Welcome</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
