import React, { useEffect, useState } from "react";
import ArtistSortDay from "./ArtistSortDay";
import ArtisteList from "./ArtistList";
import ArtistSCene from "./ArtistScene";
import ArtistStyle from "./ArtisteStyle";


export default function Prog() {
    

    const[page, setPage] = useState('lineup')

    const handlePage= (thePage) => {
        setPage(thePage)
    }

    const getButtonClass = (thepage) => {
        return page === thepage
            ? "littleBouton titleFont mx-2 bgRouge blanc px-3 py-2 px-lg-3 py-lg-2 col-5 mx-auto my-3 col-lg-2"
            : "littleBouton titleFont mx-2 bgVert blanc px-3 py-2 px-lg-3 py-lg-2 col-5 mx-auto my-3 col-lg-2";
    };

    return (
        <div className="d-flex flex-column align-items-center marginUnderNav ">
            <h1 className="rouge text-center titleFont fw-bolder  display-2 pVideo px-4 mb-5 z-2">
                Programation :
            </h1>
            <div className="d-flex flex-column align-content-center">
                <p className="titleFont  fw-bolder noir mb-2 h2 text-center ">Trier par :</p>
                <div className="container row footer px-3">
                <button className={getButtonClass('lineup')} onClick={()=>{handlePage('lineup')}}>line-up</button>
                <button  className={getButtonClass('jours')} onClick={()=>{handlePage('jours')}}>Jours</button>
                <button  className={getButtonClass('scene')} onClick={()=>{handlePage('scene')}}>Scène</button>
                <button  className={getButtonClass('style')} onClick={()=>{handlePage('style')}}>Style de musique</button>
                </div>
                
            </div>
            <div >
                <div className="row d-flex justify-content-center my-5">
                {page === 'lineup' && <ArtisteList />}
                {page === 'jours' && <ArtistSortDay />}
                {page === 'scene' && <ArtistSCene/>}
                {page === 'style' && <ArtistStyle/>}


                </div>
            </div>
        </div>
    );
}
