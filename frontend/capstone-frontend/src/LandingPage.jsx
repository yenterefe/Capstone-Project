import Title from "./Title";
import Button from "./Button";
import { Link } from "react-router-dom";
import img1 from "./images/img1.jpg";

export default function LandingPage() {
  return (
    <>
      <h1 className="text-black-300 ">Hello World</h1>

      <Title />
      <Link to="/SearchMap">
        <Button />
      </Link>
      <div>
        <img className="w-90 h-90 rounded" src={img1} />
      </div>
    </>
  );
}
