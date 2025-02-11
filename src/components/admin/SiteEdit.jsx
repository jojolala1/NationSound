import React, { useEffect, useState } from "react";
import { apiFunctions } from "../logic/apiFunctions";

const SiteEdit = ({ site, setSelectedSite, handleSetToggle }) => {
   
    const [error, setError] = useState(null);

    const [siteEdit, setSiteEdit] = useState({
        name: site.name,
        latitude: site.latitude,
        longitude: site.longitude,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let sitePatch = {};
        if (siteEdit.name !== site.name) {
            sitePatch.name = siteEdit.name;
        }
        if (siteEdit.latitude !== site.latitude) {
            sitePatch.latitude = parseFloat(siteEdit.latitude);
        }
        if (siteEdit.longitude !== site.longitude) {
            sitePatch.longitude = parseFloat(siteEdit.longitude);
        }

        const res = await apiFunctions.modifyEntity(
            "sites",
            sitePatch,
            site.id
        );
        console.log("reponse de l'api", res);
        if (res.error) {
            setError(res);
            return;
        }
        setSelectedSite(null);
        handleSetToggle();
    };

    useEffect(() => {
        setSiteEdit({
            name: site.name,
            latitude: site.latitude,
            longitude: site.longitude,
        });
    }, [site]);


    const handleOnChange = (e) => {
        setSiteEdit({
            ...siteEdit,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div onClick={() => setSelectedSite(null)} className=" overlay bgGRey">
            <div
                className="d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey mx-2"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center textSize">
                    modifier le site{" "}
                    <span className="fw-bold">
                        {site.name}
                    </span>
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                >
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="nameEdit">name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            id="nameEdit"
                            value={siteEdit.name}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="latitudeEdit">Latitude</label>
                        <input
                            className="form-control"
                            type="text"
                            name="latitude"
                            id="latitudeEdit"
                            value={siteEdit.latitude}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="longitudeEdit">Longitude</label>
                        <input
                            className="form-control"
                            type="text"
                            name="longitude"
                            id="longitudeEdit"
                            value={siteEdit.longitude}
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
                    onClick={() => setSelectedSite(null)}
                >
                    annuler
                </button>
            </div>
        </div>
    );
};

export default SiteEdit;
