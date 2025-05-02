import videoSrc from "@/assets/images/videoDance.webm";
import yellowWave from "@/assets/images/yellowWave.svg";
import effet from "@/assets/images/effet.png";
import { useEffect, useState } from "react";
import yellowWave2 from "@/assets/images/yellowWave2.svg";
import greenWave from "@/assets/images/greenWave.svg";
import greenwave2 from "@/assets/images/greenwave2.svg";
import { useNavigate } from "react-router-dom";
import { apiFunctions } from "../logic/apiFunctions";
import { useMemo } from "react";
import map from "@/assets/images/map.png";
import epsi from "@/assets/images/logoEpsi.svg";
import perrier from "@/assets/images/logoPerrier.png";
import spotify from "@/assets/images/logoSpotify.png";
import deezer from "@/assets/images/logoDeezer.svg";
import corref from "@/assets/images/logoCorref.webp";
import cmb from "@/assets/images/logoCmb.png";
import poster from "@/assets/images/poster.webp";


export default function Home() {
    const [artistes, setArtistes] = useState([]);
    const [artistesPerDAte, setArtistesPerDAte] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stringArtisteNameTemp, setStringArtisteNameTemp] = useState("");

    useEffect(() => {
        const handleFetch = async () => {
            setLoading(true);
            const res = await apiFunctions.fetchEntityWithoutToken("artistes");
            if (res.error) {
                setError(res);
            } else {
                const artistesData = res.data.member;

                const artistesPerDAteData = artistesData.reduce((acc, x) => {
                    if (!acc[x.date]) {
                        acc[x.date] = [];
                    }
                    acc[x.date].push(x);
                    return acc;
                }, {});
                setArtistes(artistesData);
                setArtistesPerDAte(artistesPerDAteData);
            }
            setLoading(false);
        };
        handleFetch();
    }, []);

    useEffect(() => {
        const artistesName = artistes.map((x) => ` - ${x.name}`);
        const stringArtisteNameTemp = `${artistesName} - `;
        setStringArtisteNameTemp(stringArtisteNameTemp.substring(0, 110));
    }, [artistes]);

    const firstAndLastDate = useMemo(() => {
        const dates = Object.keys(artistesPerDAte).map(
            (dateStr) => new Date(dateStr)
        );
        return {
            firstDate: new Date(
                Math.min(...dates.map((date) => date.getTime()))
            ).toLocaleDateString("Fr-fr", {
                day: "numeric",
            }),
            lastDate: new Date(
                Math.max(...dates.map((date) => date.getTime()))
            ).toLocaleDateString("Fr-fr", {
                day: "numeric",
                month: "long",
            }),
        };
    }, [artistesPerDAte]);

    const navigate = useNavigate();

    const handleOpenLink = (url) => {
        window.open(url, "_blank");
    };

    const handleNavigate = () => {
        navigate("/programmation");
    };
    const handleNavigateInfo = () => {
        navigate("/Informations");
    };
    const handleNavigateCarte = () => {
        navigate("/carte-interactive");
    };
    const handleNavigatePartenaires = () => {
        navigate("/partenaires");
    };

    if (loading) {
        return (
            <div className="marginUnderNav2">
                <p className="titleFont rouge display-3 text-center my-5">
                    chargement..{" "}
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="marginUnderNav">
                <p>erreur : {error.code}</p>
                <p>erreur : {error.message}</p>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column align-items-center bgBeige pb-5 ">
            <div className=" position-relative">
                <video
                    src={videoSrc}
                    type="video/webm"
                    autoPlay
                    loop
                    muted
                    className="video"
                    poster={poster}
                    preload="auto"
                    alt="fond"
                    controls={false}
                    playsInline
                    width="100%"
                    height="auto"
                ></video>

                <div className="w-100 position-absolute top0 d-flex flex-column mt-4 mt-lg-5 h-100 justify-content-center px-lg-3 pb-5">
                    <p className=" jaune text-center titleFont fw-bolder  titleSize  px-4 pVideo">
                        Du {firstAndLastDate.firstDate} au{" "}
                        {firstAndLastDate.lastDate} :
                    </p>
                    <p className=" blanc  text-center textFont artistes fw-bolder  pt-3 px-4 ">
                        {stringArtisteNameTemp}...
                    </p>
                    <button
                        className="pVideolight bgRouge blanc mt-4 py-2 p-lg-2 p-xl-3 fw-bolder bouton textSize titleFont"
                        onClick={() =>
                            handleOpenLink(
                                "https://www.seetickets.com/fr/festival-tickets"
                            )
                        }
                    >
                        Billetterie
                    </button>
                </div>
                <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 text-center py-4">
        <img
            src={greenWave}
            alt="fond en forme de vague"
            className="banner position-absolute w-100"
        />
        <img
            src={yellowWave}
            alt="fond en forme de vague"
            className="banner position-absolute w-100"
        />
    </div>
            </div>
            
            <div className="marginEffet">
                <img src={effet} alt="effet" className="effet" />
            </div>
            <div className="text-center d-flex flex-column align-items-center">
                <p className="rouge titleFont fw-bolder pVideo display-2 my-5">
                    {" "}
                    -Programmation 2025-{" "}
                </p>
                <div className="contentDays">
                    {Object.entries(artistesPerDAte).length > 0 &&
                        Object.entries(artistesPerDAte).map(
                            ([date, artistesDay], key) => {
                                const formattedDate = new Date(
                                    date
                                ).toLocaleDateString("Fr-fr", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                });
                                return (
                                    <article
                                        key={key}
                                        className=" d-flex flex-column p-5 banner widthProgHome"
                                    >
                                        <p className=" titleFont fw-bolder h1  mb-4">
                                            {formattedDate}
                                        </p>
                                        {artistesDay.map((artiste, key) => {
                                            return (
                                                <p
                                                    key={key}
                                                    className=" textFont fw-bolder  h4"
                                                >
                                                    {artiste.name}
                                                </p>
                                            );
                                        })}
                                    </article>
                                );
                            }
                        )}
                </div>
                <button
                    className="bgRouge pVideolight blanc  my-5 px-3 py-2 px-lg-3 py-lg-2 fw-bolder bouton textSize titleFont"
                    onClick={handleNavigate}
                >
                    Voir toute la programmation
                </button>
            </div>
            <img
                src={yellowWave2}
                alt="fond en forme de vague"
                className="banner rotated mt-5"
            />
            <div className="d-flex flex-column bgJaune w-100  align-items-center justify-content-center">
                <div className="d-flex flex-column mb-0 px-3 py-3 align-items-center justify-content-center ">
                    <h3 className="titleFont fw-bold pVideo display-2 rouge">
                        Informations
                    </h3>
                    <p className="textFont blanc my-5 fw-bold h4 pVideolight text-center">
                        Vous vous posez quelques questions ? Accedez à notre
                        page info avec ce bouton.
                    </p>
                    <button
                        className="bouton bgVert blanc titleFont py-2 pVideolight  px-5 textSize"
                        onClick={handleNavigateInfo}
                    >
                        Page Infos
                    </button>
                </div>
            </div>
            <img
                src={yellowWave2}
                alt="fond en forme de vague"
                className="banner mb-4 "
            />

            <div className="my-5 d-flex container flex-column-reverse flex-md-row  align-items-center justify-content-center">
                <img
                    src={map}
                    alt="extrait de la carte"
                    className="formborder m-3 mb-5 col-10 col-md-5 clickable shadoww radius"
                    onClick={handleNavigateCarte}
                />
                <div className="d-flex text-center flex-column mx-3 align-items-center justify-content-center col-10 col-md-5 col-lg-6">
                    <h3 className="titleFont fw-bold pVideo display-2 mb-3 rouge">
                        Votre carte interactive
                    </h3>
                    <p className="textFont noir mb-5 mt-4 h4  fw-bold">
                        Vous cherchez quelque chose ? Cliquez sur la carte pour
                        accéder à la carte interactive, vous pourrez vous
                        repérer, filtrer ce que vous cherchez et même voir les
                        concerts en cours.{" "}
                    </p>
                </div>
            </div>
            <img
                src={greenwave2}
                alt="fond en forme de vague"
                className="banner rotated2 mt-4"
            />

            <div className="d-flex flex-column bgVert w-100  align-items-center justify-content-center">
                <div className="d-flex flex-column mb-0 px-3 py-2 align-items-center justify-content-center ">
                    <h3 className="mt-5 mb-3 titleFont fw-bold pVideo display-2 blanc">
                        Nos partenaires
                    </h3>
                    <div className="d-flex row gap-5 my-5 align-items-center justify-content-center">
                        <div
                            className="col-4 col-lg-3 d-flex justify-content-center clickable"
                            onClick={() =>
                                handleOpenLink("https://www.epsi.fr/")
                            }
                        >
                            <img
                                src={epsi}
                                alt="logo EPSI"
                                className=" logo2"
                            />
                        </div>
                        <div
                            className="col-4 col-lg-3 d-flex justify-content-center clickable"
                            onClick={() =>
                                handleOpenLink("https://open.spotify.com/")
                            }
                        >
                            <img
                                src={spotify}
                                alt="logo Spotify"
                                className=" logo2"
                            />
                        </div>
                        <div
                            className="col-4 col-lg-3 d-flex justify-content-center clickable"
                            onClick={() =>
                                handleOpenLink("https://www.deezer.com/fr/")
                            }
                        >
                            <img
                                src={deezer}
                                alt="logo Deezer"
                                className=" logo2"
                            />
                        </div>
                        <div
                            className="col-4 col-lg-3 d-flex justify-content-center clickable"
                            onClick={() =>
                                handleOpenLink("https://brasserie-coreff.com/")
                            }
                        >
                            <img
                                src={corref}
                                alt="logo"
                                className=" logo2"
                            />
                        </div>
                        <div
                            className="col-4 col-lg-3 d-flex justify-content-center clickable"
                            onClick={() =>
                                handleOpenLink("https://www.perrier.com/fr/")
                            }
                        >
                            <img
                                src={perrier}
                                alt="logo Perrier"
                                className=" logo2"
                            />
                        </div>
                        <div
                            className="col-4 col-lg-3 d-flex justify-content-center clickable"
                            onClick={() =>
                                handleOpenLink(
                                    "https://www.cmb.fr/reseau-bancaire-cooperatif/web/accueil"
                                )
                            }
                        >
                            <img
                                src={cmb}
                                alt="logo cmb"
                                className=" logo2"
                            />
                        </div>
                    </div>
                    <button
                        className="bouton bgRouge titleFont blanc  py-2 px-5 pVideolight textSize my-4"
                        onClick={handleNavigatePartenaires}
                    >
                        {" "}
                        Page partenaires
                    </button>
                </div>
            </div>
            <img
                src={greenwave2}
                alt="fond en forme de vague "
                className="banner mb-5 rotated1"
            />
        </div>
    );
}
