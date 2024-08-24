import React from "react";
import NavOpen from "./NavOpen";
import { useState } from "react";
import Fade from "./Fade";
import logo from '@images/logo.svg'
import redWave from '@images/redWave.svg';
import yellowWave2 from '@images/yellowWave2.svg';
import { NavLink } from "react-router-dom";



export default function Navbar() {

    const [open, setOpen] = useState(false)

    const toggle = () => setOpen((o) => !o);
    return (
        <div className="position-relative" id="ancrage">

            <nav className="navbar navbar-expand-lg bgRouge heightNav">
                <div className="container-fluid">
                    <p className="clickable border border-0 effectNone  z-3" onClick={toggle}>
                        <i className="bi bi-list beige display-2 transitionColor"></i>
                    </p>
                    <NavLink className="navbar-brand position-absolute start-50 translate-middle-x text-center z-2"  aria-current="page" to="/">
                        <img className="logo " src={logo} alt="logo" />
                    </NavLink>

                </div>
            </nav>
            <div className="bandeau">
                <img src={yellowWave2} alt="" className="position-absolute banner z-1 " />
                <img src={redWave} alt="" className="position-absolute banner z-1 " />
            </div>




            <Fade visible={open}>
                <NavOpen toggle={toggle} />
            </Fade>
        </div>

    )
}