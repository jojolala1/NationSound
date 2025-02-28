import React, { useState } from "react";
import { apiFunctions } from "../../logic/apiFunctions";

const ArtisteAdd = ({ setSelectedArtiste, handleSetToggle , scenes}) => {
    const [error, setError] = useState(null);

    const [artisteEdit, setArtisteEdit] = useState({
        name: "",
        date: "",
        time: "",
        style: "",
        description: "",
        videoLink: "",
        imageFile: null,
        place_id: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", artisteEdit.name);
        formData.append("date", artisteEdit.date);
        formData.append("time", artisteEdit.time);
        formData.append("place_id", `/api/places/${artisteEdit.place_id}`);
        formData.append("style", artisteEdit.style);
        formData.append("description", artisteEdit.description);
        formData.append("videoLink", artisteEdit.videoLink);

        // Ajout du fichier image s'il est sélectionné
        if (artisteEdit.imageFile) {
            formData.append("imageFile", artisteEdit.imageFile);
        }

        const res = await apiFunctions.AddArtiste("artistes", formData);
        if (res.error) {
            setError(res);
            return;
        }
        setSelectedArtiste(null);
        handleSetToggle();
    };

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
        <div
            onClick={() => setSelectedArtiste(null)}
            className=" overlay bgGRey"
        >
            <div
                className="d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey mx-2 scrollable-container"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center textSize">Ajouter un artiste</p>
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
                        name="place_id" 
                        id="stageEdit"
                        value={artisteEdit.place_id}
                        onChange={handleOnChange}>
                            <option value='' disabled>Choisir une scène</option>

                            {scenes.map((scene)=>{return (
                                <option key={scene.id} value={scene.id}>{scene.name}</option>
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
                            accept="image/png, image/jpeg, image/webp"
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
                        Ajouter
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

export default ArtisteAdd;
