import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { setOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { apiFunctions } from "../logic/apiFunctions";

export default function Carte() {
    //créé une référence qui se nome mapRef, c'est utilisé comme un useState mais evite de rerendre la page une fois changé, elle persiste aussi entre les rendus
    const mapRef = useRef();

    const [loading, setLoading] = useState(false);
    const [site, setSite] = useState(null);
    const [artistes, setArtistes] = useState(null)
    const [places, setPlaces] = useState(null);
    const [myPosition, setMyPosition] = useState(null);

    const [visiblePlaces, setVisiblePlaces] = useState(null);
    
    const filters = [
        "snacks",
        "toilettes",
        "scènes",
        "soins",
        "campings",
        "parkings",
        "buvettes",
    ];

    const [error, setError] = useState({});
    const [checked, setChecked] = useState({});

    useEffect(() => {
        const fetchSite = async () => {
            const res = await apiFunctions.fetchEntityWithoutToken("sites/1");
            if (res.error) {
                setError(res);
            } else {
                setSite(res.data);
            }
        };
        const fetchPlaces = async () => {
            const res = await apiFunctions.fetchEntityWithoutToken("places");
            if (res.error) {
                setError(res);
            } else {
                setPlaces(res.data.member);
            }
        };
        const fetchArtistes = async () => {
            const res = await apiFunctions.fetchEntityWithoutToken('artistes')
            if (res.error) {
                setError(res);
            } else {
                setArtistes(res.data.member);
            }
        }
        setChecked(filters.reduce((acc, x) => {
            acc[x]= true;
            return acc
        },{}))
        fetchSite();
        fetchPlaces();
        fetchArtistes()
    }, []);

    useEffect(()=>{
        if (!places) return;

        setVisiblePlaces(places.filter(place => checked[place.category]))
    },[checked, places])


    useEffect(()=>{
        const interval = setInterval(()=>{
            const placesCopy = places.map(place=> {
                if (place.artiste){
                    delete place.artiste
                }
                return place
            })
            setPlaces(placesCopy)
            artistes?.forEach(artiste => {
                const artisteDate = new Date(artiste.date).toLocaleDateString('fr-FR',{
                    day:'numeric',
                    month:'long',
                    year:'numeric'
                })
                const date = new Date().toLocaleDateString('fr-FR',{
                    day:'numeric',
                    month:'long',
                    year:'numeric'
                })

                if(artisteDate === date){
                    let time = new Date()
                    let timePlus1 = new Date(time)

                    timePlus1.setHours(time.getHours() + 1)

                    let timeformated = time.toISOString().substring(11, 16)
                    let timePlus1formated = timePlus1.toISOString().substring(11, 16)
                    let artisteTimeformated = new Date(artiste.time).toISOString().substring(11, 16)

                    if(artisteTimeformated >= timeformated && artisteTimeformated < timePlus1formated){
                        places.forEach(place => {
                            if(artiste.stage === place.name){
                                place.artiste = artiste
                            }
                        });
                    }
                }
            });
        },5000)
        return () => clearInterval(interval);

    },[artistes])

    //element visuel pour indiquer l'etat d'un depliant
    const [indice, setIndice] = useState("-");
    const togglerIndice = () => {
        if (indice === "-") {
            setIndice("+");
        } else {
            setIndice("-");
        }
        return indice;
    };

    //gestion du lien pour lartiste en question
    const navigate = useNavigate();
    const handleNavigate = (artiste) => {
        navigate(`../programmation/${artiste.name}`, { state: { artiste } });
    };

    //gere l'etat des filtres vis a vis de l'option 'tous'
    const checkedAll = () => {
        const isAllSelected = !checked.tous;

        setChecked({
            tous: isAllSelected,
            ...filters.reduce(
                (acc, x) => ({
                    ...acc,
                    [x]: isAllSelected,
                }),
                {}
            ),
        });
    };

    //prend en paramettre le filtre en question et modifie son etat
    const handleCheckChange = (category) => {
        setChecked((prevChecked) => {
            const newChecked = {
                ...prevChecked,
                [category]: !prevChecked[category],
            };
            return newChecked;
        });
    };

    //permet de definir un icon en fonction de chaques localisations (toilettes, scene etc..)
    const bootstrapIcon = (location) => {
        let color = 'noir'
        if(location.artiste){
            color = 'rouge'
        }
        if (location.category === "me") {
            color = 'blue'; 
        }
    return`
    <div class="text-center">
        <i class=" ${location.iconClass} ${color}" style="font-size: 24px;"></i>
    </div>
`
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
                <div className="d-flex flex-column text-center">
                    <p
                        className="vert titleFont h1 my-4 "
                        data-bs-toggle="collapse"
                        href="#collapse"
                        role="button"
                        aria-expanded="true"
                        aria-controls="collapse"
                        onClick={togglerIndice}
                    >
                        Filtres {indice}
                    </p>
                    <div className="collapse show" id="collapse">
                        <form className="d-flex flex-column flex-md-row gap-2 gap-md-3 gap-lg-4 ">
                            <div>
                                <input
                                    type="checkbox"
                                    id="Tous"
                                    onChange={() => checkedAll()}
                                />
                                <label htmlFor="Tous">Tous</label>
                            </div>
                            {filters.map((filter) => {
                                return (
                                    <div key={filter}>
                                        <input
                                            type="checkbox"
                                            id={filter}
                                            checked={checked[filter] || false}
                                            onChange={() =>
                                                handleCheckChange(filter)
                                            }
                                        />
                                        <label htmlFor={filter}>{filter}</label>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
                {site?.latitude ? (
                    <>
                        <div className="formborder radius  m-4 m-md-5 shadoww">
                            <MapContainer
                                className="styleMap "
                                center={[site.latitude, site.longitude]}
                                zoom={17}
                                scrollWheelZoom={false}
                                ref={mapRef}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {visiblePlaces?.length  > 0 && visiblePlaces.map((location) => (
                                    
                            <Marker
                                key={location.id}
                                position={[location.latitude, location.longitude]}
                                icon={L.divIcon({
                                    className: "custom-icon",
                                    html: bootstrapIcon(location),
                                    iconSize: [30, 30],
                                    iconAnchor: [15, 30],
                                    popupAnchor: [0, -30],
                                })}
                            >
                                <Popup className="leaflet-popup-content">
                                    <p className="fw-bold">{location.name}</p>
                                    {location.description && (
                                        <p className="fw-light">
                                            Description: {location.description}
                                        </p>
                                    )}
                                    {location.opening && (
                                        <>
                                        <p>Ouverture: {new Date(location.opening).toISOString().substring(11, 16)}h</p>
                                        <p>Fermeture: {new Date(location.closing).toISOString().substring(11, 16)}h</p>

                                        </>
                                    )}
                                    {location.artiste && (
                                        <>
                                            <p
                                                className="clickable text-decoration-underline text-primary"
                                                onClick={() => {
                                                    handleNavigate(
                                                        location.artiste,
                                                        {
                                                            state: location.artiste,
                                                        }
                                                    );
                                                }}
                                            >
                                                Artiste actuel : {location.artiste.name},{" "}
                                            </p>
                                        </>
                                    )}
                                </Popup>
                            </Marker>
                        ))}
                        {myPosition && <Marker
                                key={myPosition.id}
                                position={[myPosition.latitude, myPosition.longitude]}
                                icon={L.divIcon({
                                    className: "custom-icon",
                                    html: bootstrapIcon(myPosition),
                                    iconSize: [30, 30],
                                    iconAnchor: [15, 30],
                                    popupAnchor: [0, -30],
                                })}
                            >
                                <Popup className="leaflet-popup-content">
                                    <p className="fw-bold">{myPosition.name}</p>
                                </Popup>
                            </Marker>}
                            </MapContainer>
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
