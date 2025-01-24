import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import './App.css'
import Home from './components/public/Home';
import Prog from './components/public/Prog';
import Carte from './components/public/Carte';
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';
import ErrorElement from './components/public/ErrorElement';
import ArtistPage from "./components/public/ArtistPage";
import PartenairePage from "./components/public/PartenairePage";
import { FetchProvider } from "./components/public/JsonContext";
import ModifyArtistes from "./components/public/ModifyArtistes";
import Info from "./components/public/Infos";
import { Login } from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import { tokenService } from "./components/logic/tokenService";
import { authFunctions } from "./components/logic/authFunctions";

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
        path: '/login',
        element: <Login  />,
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute >
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <ErrorElement />
      },
    ],
  },
]);

//appLayout est definit comme la page de base, chaquesx pages sera donc doté du composant navbar et du footer, outlet prendra l'enfant en fonction du lien, 
function AppLayout() {

  //permet de renvoyer l'utilisateur un haut de page à chaques chanements de page
  const location = useLocation();
  useEffect(() => {

    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

//l'application entiere est recouvert du fetchProvider afin que les données incluse dedans oit disponnible pour tout les composants 
function App() {

  useEffect(() => {
    // Lancer le service de rafraîchissement si l'utilisateur est connecté
    if (authFunctions.isLogged()) {
      tokenService.startTokenService();
    }

    // Arrêter le service quand le composant est démonté
    return () => {
      tokenService.stopTokenService();
    };
  }, []);
  

  return (
      <FetchProvider>
        <RouterProvider router={router} />
      </FetchProvider>

  )
}

export default App
