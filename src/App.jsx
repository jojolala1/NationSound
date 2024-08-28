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
import {FetchProvider } from "./components/JsonContext";
import ModifyArtistes from "./components/ModifyArtistes";

// creation d'un tableau contenant des objets, chacuns des objet gerent une route, cest géré avec creatBrowserRouter, une fonction de la bibliotheque react-router
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
        path: '/programmation',
        element: <Prog />,
      },
      {
        path: '/programmation/:artiste',
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
        path: '/carte-interactive/Modification-programmation',
        element: <ModifyArtistes />,
      },
      {
        path: '*',
        element: <ErrorElement />
      },
    ],
  },
]);

//appLayout est definit comme la page de base, chaquesx pages sera donc doté du composant navbar et du footer, outlet prendra l'enfant en fonction du lien, 
function AppLayout () {

  //permet de renvoyer l'utilisateur un haut de page à chaques chanements de page
  const location = useLocation();
  useEffect(()=>{
    
    window.scrollTo(0, 0)
},[location.pathname])

  return(
    <>
      <Navbar />
      <Outlet/>
      <Footer/>
    </>
  )
}

//l'application entiere est recouvert du fetchProvider afin que les données incluse dedans oit disponnible pour tout les composants 
function App() {


  return (
    <FetchProvider>
      <RouterProvider router={router} />
    </FetchProvider>
  )
}

export default App
