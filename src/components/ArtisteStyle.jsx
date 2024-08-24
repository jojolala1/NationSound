import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFetch } from "./JsonContext";

export default function ArtisteStyle() {

    const { artistesJson, loading } = UseFetch();


    const [styles, setStyles] = useState([])
    useEffect(() => {
        const uniqueStyles = []

        for (let artiste of artistesJson) {
            if (!uniqueStyles.includes(artiste.genre)) {
                uniqueStyles.push(artiste.genre);
            }
        }
        setStyles(uniqueStyles)

    }, [loading, artistesJson])

    const navigate = useNavigate();
    const handleNavigate = (lien, state) => {
        navigate(lien, state);
    };

    const searchArtist = (style) => {
        const artistes = artistesJson.filter(artiste => artiste.genre === style);
        
        return artistes.map((artiste, index) => (
            <div key={index} onClick={()=>handleNavigate(`/programation/${artiste.name}` , { state: { artiste }})} className="clickable d-flex justify-content-around bgBlanc py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border">
                <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                <p className="m-0 my-auto p-0 col-3">{artiste.time}</p>
                <p className="m-0 my-auto p-0 col-3">{artiste.date}</p>
            </div>
        ));
    };




    return (
        <div className="d-flex flex-column gap-5 widthCalendar fw-bolder noir p-0">

            {    styles.map((style, index) => (
        <div  key={index} className="d-flex flex-column" >
            <h2 className="bgNoir blanc p-3 rounded m-0  text-center ">{style}</h2>
            <div className="d-flex flex-column  container-fluid">
            <div className="d-flex justify-content-around  bgGris py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border ">
                        <p className="m-0 my-auto fw-normal p-0 col-3">Artiste</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Heure de début</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Date</p>
                    </div>
                {searchArtist(style)}
            </div>

        </div>

    ))}
        </div>
    );
}
