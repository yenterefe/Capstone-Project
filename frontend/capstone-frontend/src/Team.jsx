import { Link } from "react-router-dom";
import t1 from "./images/t1.jpg";
import logo1 from "./images/logo1.png";
import Navigation from "./Navigation";

function Team() {
  return (
    <>
    <Navigation/>

      <div className="hero bg-base-200 max-h-screen rounded pt-20">
        {" "}
        {/* Added padding-top to avoid overlap */}
        <div className="hero-content flex-col lg:flex-row">
          <img src={t1} className="max-w-sm rounded-lg shadow-2xl" alt="Team" />
          <div>
            <h1 className="text-5xl font-bold mt-10">🍓Our Team🥦</h1>
            <p className="py-6">
              At Fresh Finder, our team is made up of passionate individuals,
              including new developers dedicated to positively impacting food
              access. We collaborate closely, combining our diverse skills to
              create a platform connecting communities with fresh, healthy food
              sources. Our developers are committed to ensuring the website is
              user-friendly, innovative, and effective in addressing the
              challenges of food deserts. We believe that teamwork is key to our
              success, and we support each other every step of the way. While we
              work hard to deliver the best possible solutions, we also value
              having fun and building strong bonds as a team. Together, we're
              not just building a website — we're building a movement to ensure
              everyone can access nutritious food.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
