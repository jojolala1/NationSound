import React from "react";
import { useState } from "react";
import logo from "@/assets/images/logo.svg";
import redWave from "@/assets/images/redWave.svg";
import yellowWave2 from "@/assets/images/yellowWave2.svg";
import { authFunctions } from "../logic/authFunctions";


import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    let navigate = useNavigate()
    const logout = () => {
        authFunctions.logout()
        navigate('/')
    }
    const handleBurgerClick = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleCloseNav = () => {
        setIsNavOpen(false);
    };


    return (
        <>
            <nav
                className={`nav  d-flex bgRouge align-items-center p-3 z-3 heightNav ${
                    isNavOpen ? "navOpen scrollable-navBar" : ""
                }`}
            >
                <ul className={isNavOpen ? " z-3 gap-3" : ""}>
                    <li className={isNavOpen ? "fadeIn " : ""}>
                        <NavLink
                            onClick={handleCloseNav}
                            to="/"
                            className="nav-link beige transitionColor textSize"
                        >
                            Accueil
                        </NavLink>
                    </li>
                    <li className={isNavOpen ? "fadeIn" : ""}>
                        <NavLink
                            onClick={handleCloseNav}
                            to="informations"
                            className="nav-link beige transitionColor textSize"
                        >
                        Informations/FAQ
                        </NavLink>
                    </li>
                    <li className={isNavOpen ? "fadeIn" : ""}>
                        <NavLink
                            onClick={handleCloseNav}
                            to="programmation"
                            className="nav-link beige transitionColor textSize"
                        >
                            Programmation
                        </NavLink>
                    </li>
                    <li className={isNavOpen ? "fadeIn" : ""}>
                        <NavLink
                            onClick={handleCloseNav}
                            to="carte-interactive"
                            className="nav-link beige transitionColor textSize"
                        >
                            Carte-interactive
                        </NavLink>
                    </li>
                    <li className={isNavOpen ? "fadeIn" : ""}>
                        <NavLink
                            onClick={handleCloseNav}
                            to="partenaires"
                            className="nav-link beige transitionColor textSize"
                        >
                            Nos partenaires
                        </NavLink>
                    </li>
                    {authFunctions.isLogged() && (
                        <>
                    <li className={isNavOpen ? "fadeIn" : ""}>
                        <NavLink
                            onClick={handleCloseNav}
                            className="nav-link beige transitionColor textSize text-center"
                            to="admin"
                        >
                            Panneau de controle
                        </NavLink>
                    </li>
                    <li className={isNavOpen ? "fadeIn" : ""}>
                    <button
                        onClick={()=>{
                            logout()
                             handleCloseNav()
                            }}
                        className="nav-link beige transitionColor textSize"
                    >
                        Déconnection
                    </button>
                </li>
                </>
                )}
                </ul>

                {!isNavOpen ? 
                <div className=" w-100 text-center">
                    <NavLink
                        to="/"
                        className="fontTitle noirI text-center m-0 display-5"
                    >
                        <img className="logo " src={logo} alt="logo" />
                    </NavLink>
                </div> : ""}

                <button
                    className={`burger  ${isNavOpen ? "active" : ""}`}
                    onClick={handleBurgerClick}
                    title="menu"
                >
                    <span className="barBurger "></span>
                </button>
                {!isNavOpen ? 
                <div className="bandeau">
                <img
                    src={yellowWave2}
                    alt=""
                    className="position-absolute banner z-2 "
                />
                <img
                    src={redWave}
                    alt=""
                    className="position-absolute banner z-2"
                />
            </div>
             : ""}
                
            </nav>
        </>
    );
}
