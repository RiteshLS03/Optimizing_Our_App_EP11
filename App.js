import React, { lazy , Suspense} from "react";
import ReactDOM from "react-dom/client";
import { Header, Footer, Body, About, Error , MainRestaurant, ShimmarUI} from "./src/Components/Index";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"; // First , Need to push to the repo
import Profile from "./src/Components/profile";
import ShimmarUI from "./src/Components/Index";
import { ShimmarCard } from "./src/Components/ShimmarUI/ShimmarUI";
// import Instamart from "./src/Components/Instamart";

const Instamart = lazy(()=> import("./src/Components/Instamart"))

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
      },
      {
/**
 * chunking
 * dynamic bundling
 * lazy loading
 * on demand loading
 * dynamic import
 * 
 * 
 * adding comment to push
 */
        path:"/instamart",
        element:<Suspense fallback={<ShimmarCard/>}><Instamart /></Suspense>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
