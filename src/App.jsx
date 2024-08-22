import React, { useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Info from './components/infos';
import Prog from './components/Prog';
import Carte from './components/Carte';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorElement from './components/ErrorElement';
import ArtistPage from "./components/ArtistPage";
import PartenairePage from "./components/PartenairePage";


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
        path: '/informations',
        element: <Info />,
      },
      {
        path: '/programation',
        element: <Prog />,
      },
      {
        path: '/programation/:artiste',
        element: <ArtistPage />,
      },
      {
        path: '/carte-interactive',
        element: <Carte />,
      },
      {
        path: '/partenaires',
        element: <PartenairePage />,
      },
      {
        path: '*',
        element: <ErrorElement />
      },
    ],
  },
]);

function AppLayout () {

  const location = useLocation();
  useEffect(()=>{
    
    window.scrollTo(0, 0)
},[location.pathname])
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
