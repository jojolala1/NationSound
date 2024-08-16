import React, { useEffect, useState } from "react";
import artistesJson from "../artistes.json";

export default function ArtistScene() {

    const [scenes, setScenes] = useState([])
    useEffect(() => {
        const uniqueScenes = []

        for (let artiste of artistesJson) {
            if (!uniqueScenes.includes(artiste.stage)) {
                uniqueScenes.push(artiste.stage);
            }
        }
        setScenes(uniqueScenes)

    }, [])

    const searchArtist = (scene) => {
        const artistes = artistesJson.filter(artiste => artiste.stage === scene);
        
        return artistes.map((artiste, index) => (
            <div key={index} className="d-flex justify-content-around bgBlanc py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border">
                <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                <p className="m-0 my-auto p-0 col-3">{artiste.time}</p>
                <p className="m-0 my-auto p-0 col-3">{artiste.date}</p>
            </div>
        ));
    };




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
