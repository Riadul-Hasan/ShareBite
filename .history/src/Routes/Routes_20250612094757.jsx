import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import AddFood from "../Pages/AddFood";
import ManageMyFoods from "../Pages/ManageMyFoods";
import AvailableFoods from "../Pages/AvailableFoods";
import MyFoodRequest from "../Pages/MyFoodRequest";
import Login from "../Pages/AuthenticationPage/Login";
import SingUp from "../Pages/AuthenticationPage/SingUp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: ()=> fetch("http://localhost:3000/featureFoods"),
        hydrateFallbackElement: <p>Loading...</p>
      },
      {
        path: "/addFoods",
        Component: AddFood,
      },
      {
        path: "/manageFoods",
        Component: ManageMyFoods,
      },
      {
        path: "/availableFoods",
        Component: AvailableFoods,
      },
      {
        path: "/myFoodRequest",
        Component: MyFoodRequest,
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "signUp",
        Component: SingUp
      }
    ],
  },
]);
