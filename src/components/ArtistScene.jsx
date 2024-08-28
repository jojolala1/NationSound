import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFetch } from "./JsonContext";

export default function ArtistScene() {
    
    const { artistesJson, loading } = UseFetch();


    const [scenes, setScenes] = useState([])

    //a chaques fois que loading ou artistesJson change, le contenu du useEffect et rééxecuté
    useEffect(() => {
        const uniqueScenes = []

        for (let artiste of artistesJson) {
            //on recupere toutes les scenes, pour chaques artistes on recherche son attribut scene, si il n'est pas dans lla liste devant contenir toute les scènes alors on le rajoute
            if (!uniqueScenes.includes(artiste.stage)) {
                uniqueScenes.push(artiste.stage);
            }
        }
        setScenes(uniqueScenes)

    }, [loading, artistesJson])

    //gestion du lien vers la page de l'artiste, prenant en parametre le lien ainsi qu'un stat qui prendra l'objet da l'artiste en question
    const navigate = useNavigate();
    const handleNavigate = (lien, state) => {
        navigate(lien, state);
    };

    //n'affiche que les artistes auquel l'attribut stage equivaut au parametre scene
    const searchArtist = (scene) => {
        const artistes = artistesJson.filter(artiste => artiste.stage === scene);
        
        return artistes.map((artiste, index) => (
            <div key={index} onClick={()=>handleNavigate(`/programmation/${artiste.name}` , { state: { artiste }})} className="clickable d-flex justify-content-around bgBlanc py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border">
                <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                <p className="m-0 my-auto p-0 col-3">{artiste.time}</p>
                <p className="m-0 my-auto p-0 col-3">{artiste.date}</p>
            </div>
        ));
    };



    //pour chaques scènes on va utiliser la fonction qui tri les artistes par scene avec le nom de la scene concerné
    return (
        <div className="d-flex flex-column gap-5 widthCalendar fw-bolder noir p-0">

            {    scenes.map((scene, index) => (
        <div  key={index} className="d-flex flex-column">
            <h2 className="bgNoir blanc p-3 rounded m-0  text-center ">{scene}</h2>
            <div className="d-flex flex-column  container-fluid">
            <div className="d-flex justify-content-around  bgGris py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border ">
                        <p className="m-0 my-auto fw-normal p-0 col-3">Artiste</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Heure de début</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Date</p>
                    </div>
                {searchArtist(scene)}
            </div>

        </div>

    ))}
        </div>
    );
}
