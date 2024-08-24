import React from "react";
import { useNavigate } from "react-router-dom";
import { UseFetch } from "./JsonContext";

export default function ArtisteList() {
    const { artistesJson, loading, error } = UseFetch();

    const navigate = useNavigate();
    const handleNavigate = (lien, state) => {
        navigate(lien, state);
    };

    if (loading) {
        return (
            <div className="loader d-flex align-items-center justify-content-center">
                <p className="titleFont rouge display-5 mb-5 pb-5">
                    Chargement des artistes...
                </p>
            </div>
        );
    }

    if (error) {
        return <p>Erreur lors du chargement des artistes : {error.message}</p>;
    }

    if (artistesJson.length === 0) {
        return <p>Aucun artiste disponible.</p>;
    }

    return artistesJson.map((artiste, index) => (
        <div
            key={index}
            className="clickable m-5 shadoww roundedArtist position-relative col-12 col-md-6  col-lg-4 col-xl-3 d-flex flex-column justify-content-end align-items-center imgArtistContent"
            onClick={() =>
                handleNavigate(`/programation/${artiste.name}`, {
                    state: { artiste },
                })
            }
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
}
