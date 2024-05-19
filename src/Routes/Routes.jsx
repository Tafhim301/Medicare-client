import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import Users from "../Pages/Dashboard/Users/Users";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AddBanner from "../Pages/Dashboard/AddBanner/AddBanner";
import AllBanners from "../Pages/Dashboard/AllBanners/AllBanners";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddTest from "../Pages/Dashboard/AddTest/AddTest";
import AllTest from "../Pages/Dashboard/AllTest/AllTest";
import AllTests from "../Pages/AllTests/AllTests";
import TestDetails from "../Pages/TestDetails/TestDetails";
import Appointments from "../Pages/Appoinments/Appointments";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: 
      [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path:'signup',
          element:<Signup></Signup>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'allTests',
          element: <AllTests></AllTests>
        },
        {
          path: 'testDetails/:id',
          element: <PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
          
        }

      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:
       [
        {
          path: 'userHome',
          element: <UserHome></UserHome>


        },
        {
          path: 'updateProfile',
          element: <UpdateProfile></UpdateProfile>

        },
        {
          path: 'appointments',
          element: <Appointments></Appointments>
        },
        // Admin Only Routes
        {
          path: "users",
          element: <AdminRoute><Users></Users></AdminRoute>

        },
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'addBanner',
          element: <AdminRoute><AddBanner></AddBanner></AdminRoute>
        },
        {
          path: 'allBanners',
          element: <AdminRoute><AllBanners></AllBanners></AdminRoute>
        },
        {
          path: 'addTest',
          element: <AdminRoute><AddTest></AddTest></AdminRoute>
        },
        {
          path: 'allTest',
          element:<AdminRoute><AllTest></AllTest></AdminRoute>
        },
        
      ]
    }
  ]);