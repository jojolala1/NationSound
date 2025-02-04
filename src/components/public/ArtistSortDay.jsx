import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFunctions } from "../logic/apiFunctions";

export default function ArtistSortDay() {

     const navigate = useNavigate();
     const handleNavigate = (lien) => {
         navigate(lien);
     };

    const [error, setError] = useState(null)
    const [artistes, setArtistes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleFetch = async () => {
            setLoading(true)
            const res = await apiFunctions.fetchEntityWithoutToken('artistes')
            if (res.error) {
                setError(res)
            } else {
                setArtistes(res.data.member.reduce((acc, x) => {
                    if (!acc[x.date]) {
                        acc[x.date] = []
                    }
                    acc[x.date].push(x)
                    return acc
                }, {}))
            }
            setLoading(false)
        }
        handleFetch()
    }, [])

    if (loading) {
        return (<>
            <p>chargement..</p>
        </>)
    }

    if (error) {
        return (<>
            <p>erreur {error.code}</p>
            <p> {error.message}</p>
        </>)
    }

    if (!artistes) {
        return <p>pas d'artistes</p>
    }


    return (
        <div className="d-flex flex-column gap-5 widthCalendar fw-bolder noir p-0">
            {/* objet.entries transforme des objets en tableau de sous-tableau, ce qui permet de mapper et de definir date comme premier element et le tableau d'artistes en deuxieme element. exemple ["mercredi 04 septembre", [{ name: "Drake", time: "20:00", stage: "Main" },{ name: "Beyoncé", time: "21:30", stage: "Main" }]],*/}

            {Object.entries(artistes).map(([date, artiste]) => {
                return (<div className="d-flex flex-column" key={date}>
                    <h2 className="bgNoir blanc p-3 rounded m-0  text-center ">{new Date(date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}</h2>
                    <div className="d-flex flex-column  container-fluid">
                        <div className="d-flex justify-content-around  bgGris py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border ">
                            <p className="m-0 my-auto fw-normal p-0 col-3">artiste</p>
                            <p className="m-0 my-auto fw-normal p-0 col-3">Heure de début</p>
                            <p className="m-0 my-auto fw-normal p-0 col-3">Scène</p>
                        </div>
                        {

                            artiste.map((artiste, index) => (
                                <div key={index} onClick={() => handleNavigate(`/programmation/${artiste.name}`, { state: { artiste } })} className="clickable d-flex justify-content-around  bgBlanc py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border">
                                    <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                                    <p className="m-0 my-auto p-0 col-3">{new Date(artiste.time).toLocaleTimeString("fr-FR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</p>
                                    <p className="m-0 my-auto p-0 col-3">{artiste.stage}</p>
                                </div>
                            ))

                        }


                    </div>
                </div>)
            })}
        </div>
    );
}
