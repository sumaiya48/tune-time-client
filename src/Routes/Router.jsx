import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructor from "../Pages/Instructor/Instructor";
import Classes from "../Pages/Classes/Classes";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

import MySelectedClasses from "../Pages/StudentDashboard/Dashboard/MySelectedClasses/MySelectedClasses";
import MyEnrolledClasses from "../Pages/StudentDashboard/Dashboard/MyEnrolledClasses/MyEnrolledClasses";
import Payment from "../Pages/StudentDashboard/Dashboard/Payment/Payment";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../Pages/AdminDashboard/Manageusers/ManageUsers";
import ManageClasses from "../Pages/AdminDashboard/ManageClasses/ManageClasses";



 
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path :'/instructor',
          element:<Instructor></Instructor>,
          loader:() => fetch(`http://localhost:5000/info`)
          
      },{
        path:'/classes',
        element:<Classes></Classes>,
        loader:() => fetch(`http://localhost:5000/info`)
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/signup",
        element:<SignUp></SignUp>
      }
      ]
    },
    {
      path:"/dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        
    {
      path:"selectedclass",
      element:<MySelectedClasses></MySelectedClasses>
    },
    {
      path:"enrolledclass",
      element:<MyEnrolledClasses></MyEnrolledClasses>
    },
    {
      path:"payment",
      element:<Payment></Payment>
    },
    {
      path:"payment",
      element:<Payment></Payment>
    },
    {
      path:"manageusers",
      element:<ManageUsers></ManageUsers>
    },
    {
      path:"manageclasses",
      element:<ManageClasses></ManageClasses>
    }
      ]
    }
  ]);