import React, { useState } from "react";
import { apiFunctions } from "../logic/apiFunctions";

const ArtisteDelete = ({ artiste, setSelectedDeleteArtiste, handleSetToggle }) => {
    const [error, setError] = useState(null);

    const deleteArtiste = async () => {
        const res = await apiFunctions.deleteEntity("artistes", artiste.id);
        if (res.error) {
          console.log('erreur validé')
            setError(res);
        } else {
          console.log('erreur non détecté')
            setSelectedDeleteArtiste(null);
            handleSetToggle();
        }
    };
    console.log('artiste',artiste)
    return (
        <div
            onClick={() => setSelectedDeleteArtiste(null)}
            className=" overlay bgGRey"
        >
            <div
                className="d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey mx-2"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center textSize">
                    Etes vous sur de vouloir supprimer la localisation{" "}
                    <span className="fw-bold">
                        {artiste.name}
                    </span>{" "}
                    ?
                </p>
                
                <button
                    className="bouton bgVert blanc  py-2"
                    onClick={() => deleteArtiste()}
                >
                    supprimer
                </button>
                <button
                    className="bouton bgRouge blanc  py-2"
                    onClick={() => setSelectedDeleteArtiste(null)}
                >
                    annuler
                </button>
                {error && (
                    <div className="alert alert-danger text-center">
                        <p>Erreur : {error.code || "inconnue"}</p>
                        <p>
                            {error.message ||
                                "Une erreur est survenue, mais aucun détail n'est disponible."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtisteDelete;
