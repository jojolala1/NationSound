import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFunctions } from "../../logic/apiFunctions";

export default function ArtisteStyle() {

    
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
                    if (!acc[x.style]) {
                        acc[x.style] = []
                    }
                    acc[x.style].push(x)
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
            {Object.entries(artistes).map(([style, artiste]) => {
                return (<div className="d-flex flex-column" key={style}>
                    <h2 className="bgNoir blanc p-3 rounded m-0  text-center ">{style}</h2>
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
                                    <p className="m-0 my-auto p-0 col-3">{new Date(artiste.time).toISOString().substring(11, 16)}</p>
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
