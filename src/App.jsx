import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorElement from './components/ErrorElement';

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <AppLayout />,
    errorElement: <ErrorElement />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <ErrorElement />
      },
    ],
  },
]);

function AppLayout () {

  return(
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
