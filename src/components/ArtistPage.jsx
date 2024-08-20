import React from "react";
import { useLocation } from "react-router-dom";

export default function ArtistPage() {
    const location = useLocation();
    const artiste = location.state?.artiste;

    if (!artiste) {
        return <p>Artiste non trouvé</p>;
    }

    return (
        <div className="marginUnderNav d-flex flex-column align-items-center">
            
            <div className="p-4 text-center w-75 textFont noir bgBlanc radius my-5">
            <iframe 
                className="radius imgSize ms-lg-5"  
                src={artiste.video} 
                title="YouTube video player"  
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            ></iframe>
                <h1 className="titleFont rouge my-4">{artiste.name}</h1>
                <p className="fw-bold">Date de programmation : {artiste.date} à {artiste.time} heures</p>
                <p className="fw-bold">Scène : {artiste.stage}</p>
                <p>{artiste.description}</p>
            </div>
        </div>
    );
}
