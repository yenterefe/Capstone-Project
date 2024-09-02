import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import Home from "./Home.jsx";
import Mission from "./Mission.jsx";
import Team from "./Team.jsx";
import LandingPage from "./LandingPage.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/SearchMap",
    element: <App />,
  },

  // {
  //   path: "/Home",
  //   element: <Home />,
  // },

  {
    path: "/Mission",
    element: <Mission />,
  },

  {
    path: "/Team",
    element: <Team />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
