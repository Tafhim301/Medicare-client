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
import AddBanner from "../Pages/Dashboard/AddBanner/AddBanner";
import AllBanners from "../Pages/Dashboard/AllBanners/AllBanners";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddTest from "../Pages/Dashboard/AddTest/AddTest";
import AllTest from "../Pages/Dashboard/AllTest/AllTest";
import AllTests from "../Pages/AllTests/AllTests";
import TestDetails from "../Pages/TestDetails/TestDetails";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import Appointments from "../Pages/Dashboard/Appoinments/Appointments";
import Reservations from "../Pages/Dashboard/Reservations/Reservations";
import TestResultsForm from "../Components/TestResultForm/TestResultForm";
import TestResult from "../Pages/Dashboard/TestResult/TestResult";
import TestResultDetails from "../Pages/Dashboard/TestResult/TestResultDetails";
import FaqBlog from "../Pages/FaqBlog/FaqBlog";
import Blogs from "../Pages/Blogs/Blogs";
import Blog from "../Pages/Blogs/Blog";
import ReservationTable from "../Components/ReservationTable/ReservationTable";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
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
          
        },
        {
          path: 'faq',
          element: <FaqBlog></FaqBlog>

        },
        {
          path: 'blogs',
          element: <Blogs></Blogs>
        },
        {
          path: 'blog/:id',
          element: <Blog></Blog>,
         
        }

      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <ErrorPage></ErrorPage>,
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
        {
          path: 'testResult/details/:id',
          element: <TestResultDetails></TestResultDetails>

        },
        {
          path: 'testResult',
          element: <TestResult></TestResult>

        },
        {
          path: 'reservations/:id',
          element: <ReservationTable></ReservationTable>

        },
        // Admin Only Routes
        {
          path: "users",
          element: <AdminRoute><Users></Users></AdminRoute>

        },
        {
          path: 'submitform/:id',
          element: <AdminRoute><TestResultsForm></TestResultsForm></AdminRoute>,
          
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
        {
          path: 'reservations',
          element: <AdminRoute><Reservations></Reservations></AdminRoute>
        },
        
      ]
    }
  ]);