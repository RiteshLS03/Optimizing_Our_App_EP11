import React from "react";
import ReactDOM from "react-dom/client";
import { Header, Footer, Body, About, Error , MainRestaurant} from "./src/Components/Index";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"; // First , Need to push to the repo
import Profile from "./src/Components/profile";

function App() {
  return (
    <>
      <Header /> 
       <Outlet />
      <Footer />
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
        children: [
          {
            path:"profile",
            element:<Profile />
          }
        ]
      },
      {
        path:"/restaurant/:id",
        element: <MainRestaurant />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
