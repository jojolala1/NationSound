import React from "react";
import artistesJson from "../artistes.json";
import { useNavigate } from "react-router-dom";

export default function ArtisteList () {

    const navigate = useNavigate();
    const handleNavigate = (lien, state) => {
        navigate(lien, state);
    };
    return artistesJson.map((artiste, index) => (
        <div
            key={index}
            className="clickable m-5 shadoww roundedArtist position-relative col-12 col-md-6  col-lg-4 col-xl-3 d-flex flex-column justify-content-end align-items-center imgArtistContent"
            onClick={()=>handleNavigate(`/programation/${artiste.name}` , { state: { artiste }})}
        >
            <img
                src={artiste.image}
                className="roundedArtist img-fluid position-absolute  imgArtist"
                alt="image"
            />
            <p className="m-0 mb-3 z-1 titleFont blanc pVideo h1 text-center">
                {artiste.name}
            </p>
            <p className="text-center m-0 mb-4 px-2 z-1 textFont pVideo blanc text-wrap  h2">
                {artiste.date}
            </p>
        </div>
    ));
};