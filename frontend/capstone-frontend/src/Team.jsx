import { Link } from "react-router-dom";
import t1 from "./images/t1.jpg";
import logo1 from "./images/logo1.png";

function Team() {
  return (
    <>
      <header className="absolute left-0 top-0 z-20 flex w-full items-center p-3">
        <div className="flex items-center w-full">
          <div className="ml-10">
            <a href="/SearchMap" className="block py-5">
              <img
                src={logo1}
                alt="logo"
                className="rounded"
                style={{ width: "352.01px", height: "47.74px" }} // Set exact dimensions
              />
            </a>
          </div>
          <div className="flex justify-start ml-20">
            <Link className="p-2 mr-8" to="/Mission">
              Mission
            </Link>
            <Link className="p-2 mr-8" to="/">
              Home
            </Link>
            <Link className="p-2 mr-8" to="/SearchMap">
              Map
            </Link>
          </div>
        </div>
      </header>

      <div className="hero bg-base-200 max-h-screen rounded pt-20">
        {" "}
        {/* Added padding-top to avoid overlap */}
        <div className="hero-content flex-col lg:flex-row">
          <img src={t1} className="max-w-sm rounded-lg shadow-2xl" alt="Team" />
          <div>
            <h1 className="text-5xl font-bold mt-10">🍓Our Team🥦</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
