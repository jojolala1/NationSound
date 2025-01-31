import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFunctions } from "../logic/apiFunctions";
import { baseUrl } from '../logic/shared'
export default function ArtisteList() {

    const [artistes, setArtistes] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleFetch = async () => {
            setLoading(true)
            const res = await apiFunctions.fetchEntityWithoutToken('artistes')
            if (res.error) {
                setError(res)
            } else {
                setArtistes(res.data.member)
            }
            setLoading(false)
        }
        handleFetch()
    }, [])

    //gestion du lien vers la page de l'artiste, prenant en parametre le lien ainsi qu'un stat qui prendra l'objet da l'artiste en question
    const navigate = useNavigate();
    const handleNavigate = (lien) => {
        navigate(lien);
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

    if (artistes?.length === 0) {
        return <p>Aucun artiste disponible.</p>;
    }

    //creation de l'icon cliquable pour chaques artistes
    return artistes?.map((artiste, index) => (
        <div
            key={index}
            className="clickable m-5 shadoww roundedArtist position-relative col-12 col-md-6  col-lg-4 col-xl-3 d-flex flex-column justify-content-end align-items-center imgArtistContent"
            onClick={() =>
                handleNavigate(`/programmation/${artiste.name}`)
            }
            style={{
                backgroundImage: `url(${baseUrl}/images/artiste/${artiste.imageName})`,
                backgroundSize: 'cover',        // Couvre tout le parent
                backgroundPosition: 'center',   // Centre l'image
                backgroundRepeat: 'no-repeat',  // Empêche la répétition de l'image
            }}
        >
            <p className="m-0 mb-3 z-1 titleFont blanc pVideo h1 text-center">
                {artiste.name}
            </p>
            <p className="text-center m-0 mb-4 px-2 z-1 textFont pVideo blanc text-wrap  h2">
                {new Date(artiste.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })} <br/>à {
                        new Date(artiste.date).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) 
                    }&nbsp;heures
            </p>
        </div>
    ));
}
