import React, { useEffect, useState } from "react";
import { apiFunctions } from "../logic/apiFunctions";

const PlaceEdit = ({ place, setSelectedPlace, handleSetToggle, categories }) => {
    const [error, setError] = useState(null);

    const [placeEdit, setPlaceEdit] = useState({
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
        iconClass: place.iconClass,
        category: place.category,
        opening: place.opening,
        closing: place.closing,
        description: place.description,

    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Création du FormData
        let placePatch = {};

        if (placeEdit.name !== place.name) {
            placePatch.name = placeEdit.name;
        }
        if (placeEdit.latitude !== place.latitude) {
            placePatch.latitude = parseFloat(placeEdit.latitude);
        }
        if (placeEdit.longitude !== place.longitude) {
            placePatch.longitude = parseFloat(placeEdit.longitude);
        }
        if (placeEdit.category !== place.category) {
            placePatch.category = placeEdit.category;
            placePatch.iconClass = categories[placeEdit.category];
        }
        if (placeEdit.opening !== place.opening) {
            placePatch.opening = placeEdit.opening;
        }
        if (placeEdit.closing !== place.closing) {
            placePatch.closing = placeEdit.closing;
        }
        if (placeEdit.description !== place.description) {
            placePatch.description = placeEdit.description;
        }
        // Envoi des données avec `multipart/form-data`
        console.log('testing format : ', placePatch)

        const res = await apiFunctions.modifyEntity(
            "places",
            placePatch,
            place.id
        );

        if (res.error) {
            setError(res);
            return;
        }

        setSelectedPlace(null);
        handleSetToggle();
    };

    useEffect(() => {
        const formatTime = (timeString) => {
            if (!timeString) return "";
            const date = new Date(timeString);
            return date.toISOString().substring(11, 16)};
        setPlaceEdit({
            name: place.name,
            latitude: place.latitude,
            longitude: place.longitude,
            iconClass: place.iconClass,
            category: place.category,
            opening: formatTime(place.opening),
            closing: formatTime(place.closing),
        });
    }, [place]);

    const handleOnChange = (e) => {
        setPlaceEdit({
            ...placeEdit,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div onClick={() => setSelectedPlace(null)} className=" overlay bgGRey">
            <div
                className="d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey mx-2 scrollable-container"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center textSize">
                    modifier le lieu{" "}
                    <span className="fw-bold">{place.name}</span>
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                >
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="nameAdd">Lieu</label>
                        <input
                            className="form-control"
                            name="name"
                            id="nameAdd"
                            autoComplete="name"
                            value={placeEdit.name}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="descriptionAdd">description</label>
                        <input
                            className="form-control"
                            name="description"
                            id="descriptionAdd"
                            value={placeEdit.description}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="latitudeAdd">Latitude</label>
                        <input
                            className="form-control"
                            type="number"
                            name="latitude"
                            id="latitudeAdd"
                            value={placeEdit.latitude}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="longitudeAdd">Longitude</label>
                        <input
                            className="form-control"
                            type="number"
                            name="longitude"
                            id="longitudeAdd"
                            value={placeEdit.longitude}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="categoryAdd">Catégorie</label>
                        <select className="form-control"
                                    name="category"
                                    id="categoryAdd"
                                    value={placeEdit.category}
                                    onChange={handleOnChange}
                                    >
                            {Object.entries(categories).map((categorie, index) => {
                                return <option
                                    key={index}
                                    value={categorie[0]}
                                >{categorie[0]}</option>
                            })}
                        </select>
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="openingAdd">Ouverture</label>
                        <input
                            className="form-control"
                            type="time"
                            name="opening"
                            id="openingAdd"
                            value={placeEdit.opening}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="closingAdd">fermeture</label>
                        <input
                            className="form-control"
                            type="time"
                            name="closing"
                            id="closingAdd"
                            value={placeEdit.closing}
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
                    onClick={() => setSelectedPlace(null)}
                >
                    annuler
                </button>
            </div>
        </div>
    );
};

export default PlaceEdit;
