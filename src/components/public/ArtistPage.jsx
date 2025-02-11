import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { apiFunctions } from "../logic/apiFunctions"

export default function ArtistPage() {

    const { artisteName } = useParams();

    const [artiste, setArtiste] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchArtiste = async () => {
            setLoading(true)
            const fetchArtiste = await apiFunctions.fetchEntityWithoutTokenByName('artistes', artisteName)
            if (fetchArtiste.error) {
                setError(fetchArtiste)
            } else {
                setArtiste(fetchArtiste.data.member[0])
            }
            setLoading(false)
        }

        fetchArtiste()
    }, [artisteName])


    if (loading) {
        return (
            <div className="marginUnderNav d-flex flex-column align-items-center">
                <div className="p-4 text-center w-75 textFont noir bgBlanc radius my-5">
                    <p>Chargement</p>
                </div>
            </div>

        )
    }
    if (error) {
        return (
            <div className="marginUnderNav d-flex flex-column align-items-center">
                <div className="p-4 text-center w-75 textFont noir bgBlanc radius my-5">
                    <p>erreur {error.code}</p>
                    <p>erreur {error.message}</p>

                </div>
            </div>
        )
    }
    if (!artiste) {
        return (
            <div className="marginUnderNav d-flex flex-column align-items-center">
                <div className="p-4 text-center w-75 textFont noir bgBlanc radius my-5">
                    <p>Artiste non trouvé</p>
                </div>
            </div>
        )
    }

    return (

        <div className="marginUnderNav d-flex flex-column align-items-center">

            <Helmet>
                <title>{artiste.name} - Details</title>
            </Helmet>
            <div className="p-4 text-center w-75 textFont noir bgBlanc radius my-5">
                <iframe
                    className="radius imgSize ms-lg-5"
                    src={artiste.videoLink}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                <h1 className="titleFont rouge my-4">{artiste.name}</h1>
                <p className="fw-bold">Date de programmation : {
                    new Date(artiste.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                }
                 &nbsp;à {
                    new Date(artiste.time).toISOString().substring(11, 16)
                }&nbsp;h</p>
                <p className="fw-bold">Scène : {artiste.stage}</p>
                <p >{artiste.description}</p>
            </div>
        </div>
    );
}
