import React, { useState } from "react";
import { apiFunctions } from "../../logic/apiFunctions";

const PlaceAdd = ({ handleSetToggle, setSelectedPlace, categories }) => {
    const [error, setError] = useState(null);

    const [placeEdit, setPlaceEdit] = useState({
        name: "",
        latitude: 0,
        longitude: 0,
        iconClass: "",
        category: "",
        opening: "",
        closing: "",
        description: "",


    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...placeEdit,
            latitude: parseFloat(placeEdit.latitude),
            longitude: parseFloat(placeEdit.longitude),
            iconClass: categories[placeEdit.category]
        };

        const res = await apiFunctions.AddEntity("places", dataToSend);
        if (res.error) {
            setError(res)
        } else {
            setSelectedPlace(null);
            handleSetToggle();
        }


    };


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
                <p className="text-center textSize">Ajouter un lieu</p>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                >
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="nameAdd">Lieu</label>
                        <input
                            className="form-control"
                            // type="email"
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
                            // type="email"
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
                            <option value="" disabled>Choisir une catégorie</option>

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
                    <button
                        className="bouton bgVert blanc mt-4 py-2"
                        type="submit"
                    >
                        Ajouter
                    </button>
                </form>
                <button
                    className="bouton bgRouge blanc  py-2"
                    onClick={() => setSelectedPlace(null)}
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

export default PlaceAdd;
