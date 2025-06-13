import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import AddFood from "../Pages/AddFood";
import ManageMyFoods from "../Pages/ManageMyFoods";
import AvailableFoods from "../Pages/AvailableFoods";
import MyFoodRequest from "../Pages/MyFoodRequest";
import Login from "../Pages/AuthenticationPage/Login";
import SingUp from "../Pages/AuthenticationPage/SingUp";
import PrivateRoute from "../provider/PrivateRoute";
import SingleFood from "../Pages/SingleFood";
import UpdateManageFood from "../Pages/UpdateManageFood";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: ()=> fetch("http://localhost:3000/featureFoods"),
        hydrateFallbackElement: <p>Loading...</p>,
        Component: Home,
        
      },
      {
        path: "/addFoods",
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>,
      },
      {
        path: "/manageFoods",
        loader: ()=> fetch("http://localhost:3000/addFood"),
        element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>,
      },
      {
        path: "/availableFoods",
        loader: ()=> fetch("http://localhost:3000/addFood"),
        Component: AvailableFoods,
      },
      {
        path: "/myFoodRequest",
        element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>,
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/signUp",
        Component: SingUp
      },
      {
        path: "/singleFood/:id",
        loader: ({params})=> fetch(`http://localhost:3000/addFood/${params.id}`),
        element: <PrivateRoute><SingleFood></SingleFood></PrivateRoute>
      },
      {
        path: "/updateFood/:id",
        element: <PrivateRoute><UpdateManageFood></UpdateManageFood></PrivateRoute>
      }
    ],
  },
]);
