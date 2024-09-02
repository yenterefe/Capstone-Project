import { Link } from "react-router-dom";
import t1 from "./images/t1.jpg";

function Team() {
  return (
    <div className="hero bg-base-200 max-h-screen rounded">
      <div className="hero-content flex-col lg:flex-row">
        <img src={t1} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <Link className="p-2 mr-8" to="/mission">
            Mission
          </Link>
          <Link className="p-2 mr-8" to="/">
            Home
          </Link>
          <Link className="p-2 mr-8" to="/SearchMap">
            Map
          </Link>

          <h1 className="text-5xl font-bold mt-10">Our Team</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Team;
