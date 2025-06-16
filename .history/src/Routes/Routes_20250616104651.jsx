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
import Loading from "../components/Loading";
import ErrorPage from "../Pages/ErrorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: ()=> fetch("http://localhost:3000/featureFoods"),
        hydrateFallbackElement: <Loading></Loading>,
        Component: Home,
        
      },
      {
        path: "/addFoods",
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>,
      },
      {
        path: "/manageFoods",
        hydrateFallbackElement: <Loading></Loading>,
        loader: ()=> fetch("http://localhost:3000/addFood"),
        element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>,
      },
      {
        path: "/availableFoods",
        hydrateFallbackElement: <Loading></Loading>,
        loader: ()=> fetch("http://localhost:3000/addFood"),
        Component: AvailableFoods,
      },
      {
        path: "/myFoodRequest",
        // loader: ()=> fetch('http://localhost:3000/myRequest'),
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
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({params})=> fetch(`http://localhost:3000/addFood/${params.id}`),
        element: <PrivateRoute><SingleFood></SingleFood></PrivateRoute>
      },
      {
        path: "/updateFood/:id",
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({params})=> fetch(`http://localhost:3000/addFood/${params.id}`),
        element: <PrivateRoute><UpdateManageFood></UpdateManageFood></PrivateRoute>
      }
    ],
  },
  {
        path: "*",
        Component: ErrorPage
    }
]);
