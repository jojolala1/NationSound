import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFunctions } from "../logic/apiFunctions";
import MapFilter from "./mapComponents/mapFilter";
import MapView from "./mapComponents/mapView";

const filters = [
    "snacks",
    "toilettes",
    "scènes",
    "soins",
    "campings",
    "parkings",
    "buvettes",
];

export default function Carte() {
    //créé une référence qui se nome mapRef, c'est utilisé comme un useState mais evite de rerendre la page une fois changé, elle persiste aussi entre les rendus
    const mapRef = useRef();

    const [site, setSite] = useState(null);
    const [artistes, setArtistes] = useState([])
    const [places, setPlaces] = useState([]);
    const [myPosition, setMyPosition] = useState(null);

    const [visiblePlaces, setVisiblePlaces] = useState([]);


    const [error, setError] = useState(null);
    const [checked, setChecked] = useState({});

    useEffect(() => {
        const fetchSite = async () => {
            try {
                const res = await apiFunctions.fetchEntityWithoutToken("sites/1");
                if (res.error) {
                    setError(res);
                } else {
                    setSite(res.data);
                }
            } catch (error) {
                setError({ message: "Erreur lors du chargement du site." });
                console.error("fetchSite error:", error);
            }
        };

        const fetchPlaces = async () => {
            try {
                const res = await apiFunctions.fetchEntityWithoutToken("places");
                if (res.error) {
                    setError(res);
                } else {
                    setPlaces(res.data.member);
                }
            } catch (error) {
                setError({ message: "Erreur lors du chargement des places." });
                console.error("fetchPlaces error:", error);
            }
        };

        const fetchArtistes = async () => {
            try {
                const res = await apiFunctions.fetchEntityWithoutToken('artistes');
                if (res.error) {
                    setError(res);
                } else {
                    setArtistes(res.data.member);
                }
            } catch (error) {
                setError({ message: "Erreur lors du chargement des artistes." });
                console.error("fetchArtistes error:", error);
            }
        };

        setChecked(filters.reduce((acc, x) => {
            acc[x] = true;
            return acc;
        }, { tous: true }));

        fetchSite();
        fetchPlaces();
        fetchArtistes();
    }, []);

    useEffect(() => {
        if (!places) return;

        setVisiblePlaces(places.filter(place => checked[place.category]))
    }, [checked, places])


    useEffect(() => {
    const interval = setInterval(() => {
        // On part d'une copie de places sans artiste
        let updatedPlaces = places.map(place => {
            if (place.artiste) {
                const copy = { ...place };
                delete copy.artiste;
                return copy;
            }
            return place;
        });

        const now = new Date();

        artistes.forEach(artiste => {
    if (!artiste.date || !artiste.time) return;

    const dateOnly = artiste.date.split('T')[0]; // "2025-09-07"
    const timeOnly = artiste.time.split('T')[1]?.substring(0, 5); // "17:00"

    if (!timeOnly) return; // sécurité

    // Construire une string ISO complète : "2025-09-07T17:00"
    const artisteStartString = `${dateOnly}T${timeOnly}`;

    const artisteStart = new Date(artisteStartString);
    const artisteEnd = new Date(artisteStart);
    artisteEnd.setHours(artisteEnd.getHours() + 1);


    if (now >= artisteStart && now <= artisteEnd) {
        updatedPlaces = updatedPlaces.map(place =>
            place.name === artiste.stage ? { ...place, artiste } : place
        );
    }
});

        setPlaces(updatedPlaces);
    }, 5000);

    return () => clearInterval(interval);
}, [artistes, places]);


    //gestion du lien pour lartiste en question
    const navigate = useNavigate();
    const handleNavigate = (artiste) => {
        navigate(`../programmation/${artiste.name}`, { state: { artiste } });
    };

    const successPosition = (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        if (!lat || !long) {
            return;
        }

        const newLocation = {
            id: Date.now(),
            name: "Moi",
            latitude: lat,
            longitude: long,
            iconClass: "bi-person-fill text-primary ",
            category: "me",
        };

        setMyPosition(newLocation);

        if (mapRef.current) {
            mapRef.current.setView([lat, long], 17);
        }
    };


    //recuperev la position de l'utilisateur
    const handlePosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successPosition, handleError);
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };

    const handleError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("Permission de géolocalisation refusée.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Position non disponible.");
                break;
            case error.TIMEOUT:
                alert("La demande de géolocalisation a expiré.");
                break;
            default:
                alert("Erreur inconnue.");
                break;
        }
    };

    return (
        <div className="marginUnderNav d-flex flex-column align-items-center">
            <h1 className="titleFont rouge mb-5 pVideorouge text-center titleFont fw-bolder display-2 pVideo px-4 mb-5 z-2">
                Carte interactive
            </h1>

            <div className="radius bgBlanc d-flex flex-column align-items-center mb-5 ">
                {error && (
                    <div className="alert alert-danger w-100 text-center">
                        {Object.values(error).map((msg, i) => (
                            <p key={i} className="mb-1">{msg}</p>
                        ))}
                    </div>
                )}
                <MapFilter checked={checked} setChecked={setChecked} filters={filters} />
                {site?.latitude ? (
                    <>
                        <div className="formborder radius  m-4 m-md-5 shadoww">
                            <MapView myPosition={myPosition} visiblePlaces={visiblePlaces} handleNavigate={handleNavigate} site={site} />
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <button
                                className="bouton py-2 px-3 textSize my-4  bgRouge blanc"
                                onClick={() => {
                                    handlePosition();
                                }}
                            >
                                se localiser sur la carte
                            </button>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${site.latitude},${site.longitude}`}
                                className="my-4 bouton text-center px-2 py-3 blanc bgVert text-decoration-none fw-bold mb-5"
                                target="blanck"
                            >
                                addresse du lieu
                            </a>
                        </div>
                    </>
                ) : (
                    <p className="titleFont rouge display-4 p-5 text-center">
                        Chargement de la carte..
                    </p>
                )}
            </div>
        </div>
    );
}
