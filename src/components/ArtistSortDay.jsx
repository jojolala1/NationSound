import React, { useEffect, useState } from "react";
import artistesJson from "../artistes.json";
import { useNavigate } from "react-router-dom";

export default function ArtistSortDay() {

    const quickSort = (arr, key) => {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[0];
        const left = [];
        const right = [];

        for (let artiste = 1; artiste < arr.length; artiste++) {
            if (arr[artiste][key] < pivot[key]) {
                left.push(arr[artiste]);
            } else {
                right.push(arr[artiste]);
            }
        }
        return [...quickSort(left, key), pivot, ...quickSort(right, key)];
    };

    const [program, setProgram] = useState({
        mercredi: [],
        jeudi: [],
        vendredi: [],
        samedi: [],
        dimanche: [],
    });

    useEffect(() => {
        const loadProgram = () => {
            const jours = {
                 mercredi : [],
                 jeudi : [],
                 vendredi : [],
                 samedi : [],
                 dimanche : []
            }
            

            for (let artiste of artistesJson) {
                if (artiste.date === "mercredi 04 septembre") {
                    jours.mercredi.push(artiste);
                } else if (artiste.date === "jeudi 05 septembre") {
                    jours.jeudi.push(artiste);
                } else if (artiste.date === "vendredi 06 septembre") {
                    jours.vendredi.push(artiste);
                } else if (artiste.date === "samedi 07 septembre") {
                    jours.samedi.push(artiste);
                } else if (artiste.date === "dimanche 08 septembre") {
                    jours.dimanche.push(artiste);
                }
            }

            for (let day in jours) {
                jours[day] = quickSort(jours[day], "time");
            }

            setProgram(jours);
        };
        loadProgram();
    }, []);

    const navigate = useNavigate();
    const handleNavigate = (lien, state) => {
        navigate(lien, state);
    };

    return (
        <div className="d-flex flex-column gap-5 widthCalendar fw-bolder noir p-0">
            
            <div  className="d-flex flex-column">
                <h2 className="bgNoir blanc p-3 rounded m-0  text-center ">Mercredi</h2>
                <div className="d-flex flex-column  container-fluid">
                <div className="d-flex justify-content-around  bgGris py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border ">
                        <p className="m-0 my-auto fw-normal p-0 col-3">Artiste</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Heure de début</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Scène</p>
                    </div>
                {program.mercredi.map((artiste, index) => (
                    <div key={index} onClick={()=>handleNavigate(`/programation/${artiste.name}` , { state: { artiste }})} className="clickable d-flex justify-content-around  bgBlanc py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border">
                        <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                        <p  className="m-0 my-auto p-0 col-3">{artiste.time}</p>
                        <p  className="m-0 my-auto p-0 col-3">{artiste.stage}</p>
                    </div>
                ))}
                </div>
                
            </div>
            
            <div  className="d-flex flex-column">
                <h2 className="bgNoir blanc p-3 rounded m-0 text-center">Jeudi</h2>
                <div className="d-flex flex-column container-fluid">
                <div className="d-flex justify-content-around  bgGris py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border ">
                        <p className="m-0 my-auto fw-normal p-0 col-3">Artiste</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Heure de début</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Scène</p>
                    </div>
                {program.jeudi.map((artiste, index) => (
                    <div key={index} className="d-flex justify-content-around  bgBlanc py-3 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border">
                    <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                    <p  className="m-0 my-auto p-0 col-3">{artiste.time}</p>
                    <p  className="m-0 my-auto p-0 col-3">{artiste.stage}</p>
                </div>
                ))}
                </div>
                
            </div>
            <div  className="d-flex flex-column">
                <h2 className="bgNoir blanc p-3 rounded m-0 text-center">Vendredi</h2>
                <div className="d-flex flex-column container-fluid">
                <div className="d-flex justify-content-around  bgGris py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border ">
                        <p className="m-0 my-auto fw-normal p-0 col-3">Artiste</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Heure de début</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Scène</p>
                    </div>
                {program.vendredi.map((artiste, index) => (
                    <div key={index} className="d-flex justify-content-around  bgBlanc py-3 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border">
                    <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                    <p  className="m-0 my-auto p-0 col-3">{artiste.time}</p>
                    <p  className="m-0 my-auto p-0 col-3">{artiste.stage}</p>
                </div>
                ))}
                </div>
                
            </div>
            <div  className="d-flex flex-column">
                <h2 className="bgNoir blanc p-3 rounded m-0 text-center">Samedi</h2>
                <div className="d-flex flex-column container-fluid">
                <div className="d-flex justify-content-around  bgGris py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border ">
                        <p className="m-0 my-auto fw-normal p-0 col-3">Artiste</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Heure de début</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Scène</p>
                    </div>
                {program.samedi.map((artiste, index) => (
                    <div key={index} className="d-flex justify-content-around  bgBlanc py-3 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-4 border">
                    <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                    <p  className="m-0 my-auto p-0 col-3">{artiste.time}</p>
                    <p  className="m-0 my-auto p-0 col-3">{artiste.stage}</p>
                </div>
                ))}
                </div>
            </div>
            <div  className="d-flex flex-column">
                <h2 className="bgNoir blanc p-3 rounded m-0 text-center">Dimanche</h2>
                <div className="d-flex flex-column container-fluid">
                <div className="d-flex justify-content-around  bgGris py-4 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border ">
                        <p className="m-0 my-auto fw-normal p-0 col-3">Artiste</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Heure de début</p>
                        <p  className="m-0 my-auto fw-normal p-0 col-3">Scène</p>
                    </div>
                {program.dimanche.map((artiste, index) => (
                    <div key={index} className="d-flex justify-content-around  bgBlanc py-3 rounded text-center gap-1 gap-md-3 gap-lg-5 row px-3 border">
                    <p className="m-0 my-auto p-0 col-3">{artiste.name}</p>
                    <p  className="m-0 my-auto p-0 col-3">{artiste.time}</p>
                    <p  className="m-0 my-auto p-0 col-3">{artiste.stage}</p>
                </div>
                ))}
                </div>
            </div>
        </div>
    );
}
