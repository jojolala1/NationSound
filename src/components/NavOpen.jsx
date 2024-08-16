import React from "react";
import { NavLink } from "react-router-dom";

export default function NavOpen({ toggle }) {


    return (
        <div className="navOpen bgRouge display-5 show ">
            <div className="d-inline-flex w-100 justify-content-end ">
                <button className="btn  p-4 d-flex effectNone" onClick={toggle}><i className="bi bi-x-lg h1 transitionColor beige"></i></button>
            </div>
                <ul className="navbar-nav d-flex align-items-center gap-4">
                    <li className="nav-item">
                        <NavLink className="nav-link beige transitionColor" onClick={toggle} aria-current="page" to="/">Accueil</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link beige transitionColor" onClick={toggle} to="informations">Informations/FAQ</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link beige transitionColor" onClick={toggle} to="programation">programation</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link beige transitionColor" onClick={toggle} to="carte-interactive">carte interactive</NavLink>
                    </li>
                </ul>
        </div>
    )
}