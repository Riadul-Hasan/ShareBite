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
import About from "../Pages/newPages/About";
import BlogPage from "../Pages/newPages/BlogPage";
import FeatureDetails from "../Pages/newPages/FeatureDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () => fetch("https://food-sharing-server-khaki.vercel.app/featureFoods"),
        hydrateFallbackElement: <Loading></Loading>,
        Component: Home,

      },
      {
        path: "/addFoods",
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>,
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/manageFoods",
        hydrateFallbackElement: <Loading></Loading>,
        element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>,
      },
      {
        path: "/availableFoods",
        hydrateFallbackElement: <Loading></Loading>,
        loader: () => fetch("https://food-sharing-server-khaki.vercel.app/addFood"),
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
        path: "/blogs",
        element: <BlogPage></BlogPage>
      },
      {
        path: "/singleFood/:id",
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({ params }) => fetch(`https://food-sharing-server-khaki.vercel.app/addFood/${params.id}`),
        element: <PrivateRoute><SingleFood></SingleFood></PrivateRoute>
      },
      {
        path: "/featureFoods/:id",
        hydrateFallbackElement: <Loading />,
        loader: ({ params }) =>
          fetch(`https://food-sharing-server-khaki.vercel.app/featureFoods/${params.id}`),
        element: <FeatureDetails />,
      },

      {
        path: "/updateFood/:id",
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({ params }) => fetch(`https://food-sharing-server-khaki.vercel.app/addFood/${params.id}`),
        element: <PrivateRoute><UpdateManageFood></UpdateManageFood></PrivateRoute>
      }
    ],
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);
