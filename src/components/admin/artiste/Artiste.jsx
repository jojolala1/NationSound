import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFunctions } from "../../logic/apiFunctions";
import ArtisteAdd from "./ArtisteAdd";
import ArtisteDelete from "./ArtisteDelete";
import ArtisteEdit from "./ArtisteEdit";

const Artiste = () => {
    const [artistes, setArtistes] = useState([]);
    const [artistesSort, setArtistesSort] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedArtiste, setSelectedArtiste] = useState(null);
    const [selectedAddArtiste, setSelectedAddArtiste] = useState(null);
    const [sort, setSort] = useState(null)
    const [selectedDeleteArtiste, setSelectedDeleteArtiste] = useState(null);
    const [toggleSetArtiste, setToggleSetArtiste] = useState(0);

    const [scenes, setScenes] = useState([]);

    const handleSetToggle = () => {
        setToggleSetArtiste((prevToggle) => (prevToggle === 0 ? 1 : 0)); // Toggle entre 0 et 1
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await apiFunctions.fetchEntity("artistes");
            if (res.error) {
                setError(res);
            } else {
                setArtistes(res.data.member);
            }
            setLoading(false);
        };

        fetchData();
    }, [toggleSetArtiste]);

    useEffect(() => {
        const handleSetScenes = async () => {
            try {
                const response = await apiFunctions.fetchEntity("places");
                const scenesTemp = response.data.member
                    .filter((place) => place.category === "scènes")
                    .map((place) => ({
                        name: place.name,
                        id: place.id,
                    }));
                setScenes(scenesTemp);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des scènes :",
                    error
                );
            }
        };

        handleSetScenes();
    }, []);

    const dontSort = () => {
        setSort(null)
    };

    const sortByDate = () => {

        const artistesawaitSort = artistes.reduce((acc, x) => {
            if (!acc[x.date]) {
                acc[x.date] = []
            }
            acc[x.date].push(x)
            return acc
        }, [])
        setArtistesSort(artistesawaitSort)
        setSort(true)
    };

    const sortByStyle = () => {
        const artistesawaitSort = artistes.reduce((acc, x) => {
            if (!acc[x.style]) {
                acc[x.style] = []
            }
            acc[x.style].push(x)
            return acc
        }, [])
        setArtistesSort(artistesawaitSort)
        setSort(true)

    };

    const sortByScene = () => {
        const artistesawaitSort = artistes.reduce((acc, x) => {
            if (!acc[x.stage]) {
                acc[x.stage] = []
            }
            acc[x.stage].push(x)
            return acc
        }, [])
        setArtistesSort(artistesawaitSort)
        setSort(true)
    };

    const handleSort = () => {
        if (!sort) {
            return artistes.length > 0 ? (
                artistes.map((artiste) => {
                    return (
                        renderArtisteCard(artiste)
                    );
                })
            ) : (
                <p>aucun artiste</p>
            )
        } else {
            return Object.entries(artistesSort).map(([key, artistes]) => {
                const dateKey = new Date(key)
                let formattedDate = key;
                if (!isNaN(dateKey)) {
                    formattedDate = dateKey.toLocaleDateString("fr-FR", {
                        day: "numeric", // e.g. "11"
                        month: "long", // e.g. "March"
                        year: "numeric",
                    });
                    key = formattedDate;
                }
                return (
                    <div key={key} className='rounded  my-4 col-12 col-md-6  col-lg-4 col-xl-3 d-flex flex-column position-relative width'>

                        <h2 className='text-center bg-secondary blanc w-100 px-5 rounded mb-0 py-2 ' >{key}</h2>
                        {artistes.map(artiste => (
                            renderArtisteCard(artiste)
                        ))}
                    </div>
                )
            })
        }
    }

    const renderArtisteCard = (artiste) => {
        return <div
            key={artiste.id}
            //className="bgBlanc p-4 rounded d-flex flex-column align-items-center gap-3 border  "
            className={`bgBlanc p-4 rounded d-flex flex-column align-items-center gap-3 border ${!sort ? 'width' : ''}`}
        >
            <p className="textLittleSize text-center">
                Artiste :{" "}
                <span className="fw-bold">
                    {artiste.name}
                </span>
            </p>
            <p>
                style :{" "}
                <span className="fw-bold">
                    {artiste.style}
                </span>
            </p>
            <p>
                scene :{" "}
                <span className="fw-bold">
                    {artiste.stage}
                </span>
            </p>
            <p>
                date :{" "}
                <span className="fw-bold">
                    {new Date(
                        artiste.date
                    ).toLocaleDateString("Fr-fr", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            </p>
            <p>
                heure :{" "}
                <span className="fw-bold">
                    {new Date(artiste.time)
                        .toISOString()
                        .substring(11, 16)}{" "}
                </span>
            </p>

            <div className="d-flex justify-content-around  ">
                <button
                    className="littleBouton shadow-none bgVert blanc mx-3 py-2 px-3"
                    onClick={() => {
                        setSelectedArtiste(artiste);
                    }}
                >
                    modifier
                </button>
                <button
                    className="littleBouton shadow-none bgRouge blanc mx-3 py-2 px-3"
                    onClick={() =>
                        setSelectedDeleteArtiste(
                            artiste
                        )
                    }
                >
                    supprimer
                </button>
            </div>
        </div>
    }
    const navigate = useNavigate();

    if (loading)
        return <p className="titleFont titleSize noir">chargement...</p>;
    if (error) {
        return (
            <div>
                {error.code === 401 && navigate("/login")}
                <p>erreur : {error.message} </p>
            </div>
        );
    }

    return (
        <>
            {selectedArtiste ? (
                <ArtisteEdit
                    artiste={selectedArtiste}
                    setSelectedArtiste={setSelectedArtiste}
                    handleSetToggle={handleSetToggle}
                    scenes={scenes}
                />
            ) : null}
            {selectedDeleteArtiste ? (
                <ArtisteDelete
                    artiste={selectedDeleteArtiste}
                    setSelectedDeleteArtiste={setSelectedDeleteArtiste}
                    handleSetToggle={handleSetToggle}
                />
            ) : null}
            {selectedAddArtiste ? (
                <ArtisteAdd
                    handleSetToggle={handleSetToggle}
                    setSelectedArtiste={setSelectedAddArtiste}
                    scenes={scenes}
                />
            ) : null}

            <div className="wDashboard d-flex flex-column align-items-center container ">
                <p className="mb-5 titleFont titleSize text-center noir ">
                    Artistes
                </p>
                <button
                    className="bouton bgVert blanc py-2 px-3 titleFont"
                    onClick={() => setSelectedAddArtiste(1)}
                >
                    Ajouter un artiste
                </button>
                <p className="mb-5 titleFont textSize text-center noir mt-5">
                    liste des artistes :{" "}
                </p>
                <div className="container row footer px-3 titleFont mb-5 px-5">
                    <button className="littleBouton  mx-2 bgVert blanc px-3 py-2 px-lg-3 py-lg-2 col-5 mx-auto my-3 col-lg-2" onClick={sortByDate}>trier par date</button>
                    <button className="littleBouton  mx-2 bgVert blanc px-3 py-2 px-lg-3 py-lg-2 col-5 mx-auto my-3 col-lg-2" onClick={sortByScene}>trier par scene</button>
                    <button className="littleBouton  mx-2 bgVert blanc px-3 py-2 px-lg-3 py-lg-2 col-5 mx-auto my-3 col-lg-2" onClick={sortByStyle}>trier par style</button>
                    <button className="littleBouton  mx-2 bgVert blanc px-3 py-2 px-lg-3 py-lg-2 col-5 mx-auto my-3 col-lg-2" onClick={dontSort}>Ne plus trier</button>


                </div>
                <div className="d-flex row justify-content-center gap-5 ">
                    {handleSort()}
                </div>
            </div>
        </>
    );
};

export default Artiste;
