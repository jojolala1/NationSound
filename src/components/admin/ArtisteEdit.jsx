import React, { useEffect, useState } from "react";
import { apiFunctions } from "../logic/apiFunctions";

const ArtisteEdit = ({ artiste, setSelectedArtiste, handleSetToggle, scenes }) => {
    const [error, setError] = useState(null);

    const [artisteEdit, setArtisteEdit] = useState({
        name: artiste.name,
        date: artiste.date,
        time: artiste.time,
        stage: artiste.stage,
        style: artiste.style,
        description: artiste.description,
        videoLink: artiste.videoLink,
        imageFile: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        // Création du FormData
        const formData = new FormData();
        formData.append("name", artisteEdit.name);
        formData.append("date", artisteEdit.date);
        formData.append("time", artisteEdit.time);
        formData.append("stage", artisteEdit.stage);
        formData.append("style", artisteEdit.style);
        formData.append("description", artisteEdit.description);
        formData.append("videoLink", artisteEdit.videoLink);
    
        // Ajout du fichier image si présent
        if (artisteEdit.imageFile) {
            formData.append("imageFile", artisteEdit.imageFile);
            console.log("Image File: ", artisteEdit.imageFile); // Affiche l'image dans la console

        }
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]);
        }
    
        // Envoi des données avec `multipart/form-data`
        const res = await apiFunctions.modifyArtiste("artiste/modify", formData, artiste.id);
    
        if (res.error) {
            setError(res);
            return;
        }
    
        setSelectedArtiste(null);
        handleSetToggle();
    };

    useEffect(() => {
        setArtisteEdit({
          name: artiste.name,
            date: new Date(artiste.date).toISOString().split("T")[0],
            time: new Date(artiste.time).toISOString().substring(11, 16),
            stage: artiste.stage,
            style: artiste.style,
            description: artiste.description,
            videoLink: artiste.videoLink,
            imageFile: null
        });
    }, [artiste]);

    const handleOnChange = (e) => {
        if (e.target.type === "file") {
            setArtisteEdit({
                ...artisteEdit,
                imageFile: e.target.files[0], // Récupère le fichier sélectionné
            });
        } else {
            setArtisteEdit({
                ...artisteEdit,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <div onClick={() => setSelectedArtiste(null)} className=" overlay bgGRey">
            <div
                className="d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey mx-2 scrollable-container"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center textSize">
                    modifier l'artiste{" "}
                    <span className="fw-bold">
                        {artiste.name}
                    </span>
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                >
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="nameEdit">Nom</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            id="nameEdit"
                            value={artisteEdit.name}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="dateEdit">date</label>
                        <input
                            className="form-control"
                            type="date"
                            name="date"
                            id="dateEdit"
                            value={artisteEdit.date}
                            onChange={handleOnChange}
                        />
                        
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="timeEdit">heure</label>
                        <input
                            className="form-control"
                            type="time"
                            name="time"
                            id="timeEdit"
                            autoComplete="family-name"
                            value={artisteEdit.time}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="stageEdit">Scène</label>
                        <select 
                        className="form-control"
                        name="stage" 
                        id="stageEdit"
                        value={artisteEdit.stage}
                        onChange={handleOnChange}>
                            <option value='' disabled>Choisir une scène</option>
                            {scenes.map((scene, index)=>{return (
                                <option key={index} value={scene}>{scene}</option>
                            )})}

                        </select>
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="styleEdit">Style</label>
                        <input
                            className="form-control"
                            type="text"
                            name="style"
                            id="styleEdit"
                            value={artisteEdit.style}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="descriptionEdit">Description</label>
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            id="descriptionEdit"
                            value={artisteEdit.description}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="videoLinkEdit">Lien vidéo</label>
                        <input
                            className="form-control"
                            type="text"
                            name="videoLink"
                            id="videoLinkEdit"
                            value={artisteEdit.videoLink}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="imageEdit">Image</label>
                        <input
                            className="form-control"
                            type="file"
                            accept="image/png, image/jpeg"
                            name="image"
                            id="imageEdit"
                            onChange={handleOnChange}
                        />
                    </div>
                    {error && (
                        <div className="alert alert-danger text-center">
                            <p>Erreur : {error.code || "inconnue"}</p>
                            <p>
                                {error.message ||
                                    "Une erreur est survenue, mais aucun détail n'est disponible."}
                            </p>
                        </div>
                    )}
                    <button
                        className="bouton bgVert blanc mt-4 py-2"
                        type="submit"
                    >
                        Modifier
                    </button>
                </form>
                <button
                    className="bouton bgRouge blanc  py-2"
                    onClick={() => setSelectedArtiste(null)}
                >
                    annuler
                </button>
            </div>
        </div>
    );
};

export default ArtisteEdit;
