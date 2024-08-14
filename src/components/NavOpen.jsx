import React from "react";

export default function NavOpen({ toggle }) {

    return (
        <div className="navOpen bgRouge display-5 show">
            <div className="d-inline-flex w-100 justify-content-end ">
                <button className="btn  p-4 d-flex effectNone" onClick={toggle}><i className="bi bi-x-lg h1 transitionColor beige"></i></button>
            </div>
                <ul className="navbar-nav d-flex align-items-center gap-4">
                    <li className="nav-item">
                        <a className="nav-link beige transitionColor" aria-current="page" href="#">Accueil</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link beige transitionColor" href="#">Informations</a>
                    </li>
                    <li className="nav-item " >
                        <a className="nav-link beige transitionColor" href="#">Programation</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link beige transitionColor" aria-disabled="true">Carte Interactive</a>
                    </li>
                </ul>
        </div>
    )
}