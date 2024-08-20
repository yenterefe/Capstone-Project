import Title from "./Title";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
            <Title />
            <Link to="/SearchMap"><Button /></Link>
        </>
    );
}