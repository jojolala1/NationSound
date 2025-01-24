import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UseFetch } from "./JsonContext";

export default function Carte() {
    const { artistesJson, festivalLocations } = UseFetch();

    //créé une référence qui se nome mapRef, c'est utilisé comme un useState mais evite de rerendre la page une fois changé, elle persiste aussi entre les rendus
    const mapRef = useRef()

    //gere la localisation du lieu et prend en parametre par defaut une 'localisation vide' pour eviter les bugs du a des données undefined
    const [festivalLocationAwait, setFestivalLocationAwait] = useState({
        locations: [],
        lieu: {
            id: 0,
            name: "",
            position: [0, 0],
        },
    });

    const [loading, setLoading] = useState(true);

    //recupere la localisation du festival tout en modifiant loading a false quand cest finis, ça seffectue a chaques fois que festivalLocations change
    useEffect(() => {
        const fetchData = async () => {
            if (festivalLocations) {
                setFestivalLocationAwait(festivalLocations);
                setLoading(false);
            }
        };

        fetchData();
    }, [festivalLocations]);

    //definit les valeurs du formulaire de visibilité des elements
    const [checked, setChecked] = useState({
        tous: false,
        snack: true,
        toilettes: true,
        scenes: true,
        soins: true,
        camping: true,
        parking: true,
        buvette: true,
    });

    //element visuel pour indiquer l'etat d'un depliant
    const [indice, setIndice] = useState("+");
    const togglerIndice = () => {
        if (indice === "+") {
            setIndice("-");
        } else {
            setIndice("+");
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
            snack: isAllSelected,
            toilettes: isAllSelected,
            scenes: isAllSelected,
            soins: isAllSelected,
            camping: isAllSelected,
            parking: isAllSelected,
            buvette: isAllSelected,
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

    //prend en parametre le nom de la scene en question ainsi qu'un tableau regrupant tout les artistes jouant sur cette scene en question (c'est definit plus bas)
    //on compare ensuite l'attribut de l'heure du concert pour chaques artistes et on regarde si l'heure actuel se situe entre le debut du concert et une heure apres,
    //si cest le cas on ajoute un objet contenant les infos de l'artiste et de la scene à un tableau qui servira à modifier l'affichage sur la carte
    const directScene = (scene, arrScene) => {
        for (let artiste of arrScene) {
            const timeArtist = parseInt(artiste.time, 10);
            if (artiste.date === dateNow) {
                if (timeArtist <= timeNow && timeNow < timeArtist + 1) {
                    visibleLocationsDirect.push({
                        scene: `Scène ${scene}`,
                        artisteName: artiste.name,
                        time: `de ${timeArtist}h à ${timeArtist + 1}h`,
                        artiste: { artiste: artiste },
                    });
                }
            }
        }
    };

    //permet de definir un icon en fonction de chaques localisations (toilettes, scene etc..)
    const bootstrapIcon = (iconClass) => `
    <div class="text-center">
        <i class="bi ${iconClass}" style="font-size: 24px; color: black;"></i>
    </div>
`;


    //fonction qui definit un objet contenant la position de l'utilisateur, la classe de l'icon etc..
    const successPosition = (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const newLocation = {
            id: visibleLocations.length + 2,
            name: "Moi",
            position: [lat, long],
            iconClass: "bi-person-fill me",
            category: "me",
        };

        //changement de données de l'useRef à lappel de succesposition donc dès que l'utilisateur demande sa position
        const map = mapRef.current;
        if(map) {
            map.setView([lat, long], 17)
        }

        // on rajoute cet objet au tableau qui va servir a maper chaques lieux
        setVisibleLocations([...visibleLocations, newLocation]);
    };

    //recuperev la position de l'utilisateur
    const handlePosition = () => {
        const yourPosition = navigator.geolocation.getCurrentPosition(successPosition);
        return yourPosition
    };

    //definition du tableau qui contiendra les artistes en fonction de la scene sur laquel ils jouent
    const EchoValley = [];
    const SunsetBoulevard = [];
    const HarmonyHaven = [];
    const StarlightStage = [];
    const WanderlustWoods = [];

    // definition de la date actuel qui se met à jour toute les minutes
    let date1 = new Date();

    setInterval(() => {
        date1 = new Date();
    }, 60000);

    //creation de la date actuel pour comparer avec celle des artistes
    let dateNow = date1.toLocaleString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "short",
    });

    //creation de l'heure actuel pour comparer avec celle des artistes afin de savoir si ils sont en direct ou pas

    let timeNow = date1.toLocaleString("fr-FR", {
        hour: "numeric",
        minute: "numeric",
    });

    //transformation de l'heure en nombre entier
    timeNow = parseInt(timeNow);


    //creation du tableau qui va acceuillir les objets contenant les informations des artistes en direct
    const visibleLocationsDirect = [];

    //tri des artistes avec leurs scene respective
    for (let artiste of artistesJson) {
        switch (artiste.stage) {
            case "Echo Valley":
                EchoValley.push(artiste);
        }
        switch (artiste.stage) {
            case "Sunset Boulevard":
                SunsetBoulevard.push(artiste);
        }
        switch (artiste.stage) {
            case "Harmony Haven":
                HarmonyHaven.push(artiste);
        }
        switch (artiste.stage) {
            case "Starlight Stage":
                StarlightStage.push(artiste);
        }
        switch (artiste.stage) {
            case "Wanderlust Woods":
                WanderlustWoods.push(artiste);
        }
    }

    //appel de la fonction directScene pour savoir qui joue en direct 
    directScene("Echo Valley", EchoValley);
    directScene("Sunset Boulevard", SunsetBoulevard);
    directScene("Harmony Haven", HarmonyHaven);
    directScene("Starlight Stage", StarlightStage);
    directScene("Wanderlust Woods", WanderlustWoods);

    const [visibleLocations, setVisibleLocations] = useState([]);

    useEffect(()=>{
        for (let location of visibleLocations) {
            let artisteFound = false;
    
            //viens modifier la couleur des scenes si elles sont en direct
            for (let theScene of visibleLocationsDirect) {
                if (location.name === theScene.scene) {
                    if (!location.iconClass.includes("rouge")) {
                        location.iconClass += " rouge";
                    }
                    location.artisteName = theScene.artisteName;
                    location.time = theScene.time;
                    location.artiste = theScene.artiste.artiste;
                    artisteFound = true;
                    break;
                }
            }
    
            if (!artisteFound && location.iconClass.includes("rouge")) {
                location.iconClass = location.iconClass.replace(" rouge", "");
                location.artisteName = "";
                location.artiste = null;
            }
        }
    },[visibleLocations])

    useEffect(() => {
        setVisibleLocations(filterFunc());
    }, [checked, festivalLocationAwait]);

    if (loading || !festivalLocationAwait.lieu) {
        return (
            <div className="loader d-flex align-items-center justify-content-center">
                <p className="titleFont rouge display-5">Chargement de la carte...</p>
            </div>
        );
    }

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${festivalLocationAwait.lieu.position[0]},${festivalLocationAwait.lieu.position[1]}`;


    //gere la l'affichage des lieux des lieux si ils sont coché et qu'il est dans le tableau des lieux 
    function filterFunc() {
        if (festivalLocationAwait.locations) {
            return festivalLocationAwait.locations.filter((location) => {
                if (checked.snack && location.category === "snack") return true;
                if (checked.toilettes && location.category === "toilettes")
                    return true;
                if (checked.scenes && location.category === "scene")
                    return true;
                if (checked.soins && location.category === "soins") return true;
                if (checked.camping && location.category === "camping")
                    return true;
                if (checked.parking && location.category === "parking")
                    return true;
                if (checked.buvette && location.category === "buvette")
                    return true;

                return false;
            });
        }
        return [];
    }

   

    return (
        <div className="marginUnderNav d-flex flex-column align-items-center">
            <h1 className="titleFont rouge mb-5 pVideorouge text-center titleFont fw-bolder display-2 pVideo px-4 mb-5 z-2">
                Carte interactive
            </h1>

            <div className="radius bgBlanc d-flex flex-column align-items-center mb-5 ">
                <div className="d-flex flex-column text-center">
                    <p
                        className="vert titleFont h1 my-4"
                        data-bs-toggle="collapse"
                        href="#collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapse"
                        onClick={togglerIndice}
                    >
                        Filtres {indice}
                    </p>
                    <div className="collapse" id="collapse">
                        <form className="d-flex flex-column flex-md-row gap-2 gap-md-3 gap-lg-4 ">
                            <div>
                                <input
                                    type="checkbox"
                                    id="Tous"
                                    onChange={() => checkedAll()}
                                />
                                <label htmlFor="Tous">Tous</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Snack"
                                    checked={checked.snack}
                                    onChange={() => handleCheckChange("snack")}
                                />
                                <label htmlFor="Snack">Snack</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Toilettes"
                                    checked={checked.toilettes}
                                    onChange={() =>
                                        handleCheckChange("toilettes")
                                    }
                                />
                                <label htmlFor="Toilettes">Toilettes</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Scenes"
                                    checked={checked.scenes}
                                    onChange={() => handleCheckChange("scenes")}
                                />
                                <label htmlFor="Scenes">Scènes</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Soins"
                                    checked={checked.soins}
                                    onChange={() => handleCheckChange("soins")}
                                />
                                <label htmlFor="Soins">Soins</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Camping"
                                    checked={checked.camping}
                                    onChange={() =>
                                        handleCheckChange("camping")
                                    }
                                />
                                <label htmlFor="Camping">Camping</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Parking"
                                    checked={checked.parking}
                                    onChange={() =>
                                        handleCheckChange("parking")
                                    }
                                />
                                <label htmlFor="Parking">Parking</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Buvette"
                                    checked={checked.buvette}
                                    onChange={() =>
                                        handleCheckChange("buvette")
                                    }
                                />
                                <label htmlFor="Buvette">Buvette</label>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="formborder radius  m-4 m-md-5 shadoww">
                    <MapContainer
                        className="styleMap "
                        center={festivalLocationAwait.lieu.position}
                        zoom={17}
                        scrollWheelZoom={false}
                        ref={mapRef}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {visibleLocations.map((location) => (
                            <Marker
                                key={location.id}
                                position={location.position}
                                icon={L.divIcon({
                                    className: "custom-icon",
                                    html: bootstrapIcon(location.iconClass),
                                    iconSize: [30, 30],
                                    iconAnchor: [15, 30],
                                    popupAnchor: [0, -30],
                                })}
                            >
                                <Popup className="leaflet-popup-content ">
                                    <p className="fw-bold">{location.name}</p>
                                    {location.description && (
                                        <p className="fw-light">
                                            Description: {location.description}
                                        </p>
                                    )}
                                    {location.opening && (
                                        <p>Ouverture: {location.opening}</p>
                                    )}

                                    {location.artisteName && (
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
                                                Artiste: {location.artisteName},{" "}
                                            </p>
                                            <p>
                                                Durée du concert:{" "}
                                                {location.time}
                                            </p>
                                        </>
                                    )}
                                </Popup>
                            </Marker>
                        ))}
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
                    <a href={googleMapsUrl} className="my-4">
                        addresse du lieu
                    </a>
                    <NavLink to="Modification-programmation" className="mb-5">modifier programmation</NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
