import videoSrc from '../../images/videoDanse.mp4';
import yellowWave from '../../images/yellowWave.svg';
import effet from '../../images/effet.png';
import artistesJson from '../artistes.json'
import { useEffect, useState } from 'react';
import redWave from '../../images/redWave.svg';
import greenWave from '../../images/greenWave.svg';




export default function Home() {

    const [program, setProgram] = useState({
        mercredi: [],
        jeudi: [],
        vendredi: [],
        samedi: [],
        dimanche: []
    })

    useEffect(() => {

        const loadProgram = () => {
            const mercredi = [" - "]
            const jeudi = [" - "]
            const vendredi = [" - "]
            const samedi = [" - "]
            const dimanche = [" - "]

            for (let artiste of artistesJson){
                if (artiste.date === "2024-09-04") {
                    mercredi.push(artiste.name + " - ")
                } else if (artiste.date === "2024-09-05") {
                    jeudi.push(artiste.name + " - ")
                } else if (artiste.date === "2024-09-06") {
                    vendredi.push(artiste.name + " - ")
                } else if (artiste.date === "2024-09-07") {
                    samedi.push(artiste.name + " - ")
                } else if (artiste.date === "2024-09-08") {
                    dimanche.push(artiste.name + " - ")
                }
            }
            setProgram({
                mercredi,
                jeudi,
                vendredi,
                samedi,
                dimanche
            })
        }
        loadProgram()
    },[])


   



    return (
        <div className="d-flex flex-column align-items-center">
            <div className=" position-relative">

                <video src={videoSrc} type="video/mp4" autoPlay loop muted className="video"  ></video>

                <div className="w-100 position-absolute top0 d-flex flex-column mt-4 mt-lg-5 h-100 justify-content-center px-lg-3 pb-5">
                    <p className=" jaune text-center titleFont fw-bolder  titleSize  px-4 pVideo z-2">Du 04 au 08 Septembre :</p>
                    <p className=" beige  text-center textFont artistes fw-bolder  pt-3 px-4 z-2">Eels · Red Hot Chili Peppers · Aupinard · Luidji · Smash mouth · Leny Kravitz · System Of A Down · Foo Fighters . Radiohead · Royal Blood…</p>
                    <button className=" bgRouge beige mt-4 py-2 p-lg-2 p-xl-3 fw-bolder bouton textSize titleFont ">Billetterie</button>
                </div>
            </div>
            <div className=' bandeau mb-5'>
            <img src={yellowWave} alt='fond en forme de vague' className='banner position-absolute z-2'/>
            <img src={greenWave} alt='fond en forme de vague' className='banner position-absolute'/>
            </div>
            <div className='marginEffet'>
            <img src={effet} alt="effet" className="effet" />

            </div>
            <div className="text-center">
                <p className="rouge titleFont fw-bolder display-3"> - Programation 2024 - </p>
                <article className="bgVert d-flex flex-column mt-5 p-5 banner">
                    <p className='beige titleFont fw-bolder h1 mb-4'>Mercredi 04 Septembre</p>
                    <p className="beige textFont fw-bolder h4">{program.mercredi}
                    </p>
                </article>
                <article className=" d-flex flex-column p-5 banner">
                    <p className='rouge titleFont fw-bolder h1 mb-4'>Jeudi 05 Septembre</p>
                    <p className="rouge textFont fw-bolder h4">{program.jeudi}
                    </p>
                </article>
                <article className="bgVert d-flex flex-column  p-5 banner">
                    <p className='beige titleFont fw-bolder h1 mb-4'>Vendredi 06 Septembre</p>
                    <p className="beige textFont fw-bolder h4">{program.vendredi}
                    </p>
                </article>
                <article className=" d-flex flex-column p-5 banner">
                    <p className='rouge titleFont fw-bolder h1 mb-4'>Samedi 07 Septembre</p>
                    <p className="rouge textFont fw-bolder h4">{program.samedi}
                    </p>
                </article>
                <article className="bgVert d-flex flex-column mb-4 p-5 banner">
                    <p className='beige titleFont fw-bolder h1 mb-4'>Dimanche 08 Septembre</p>
                    <p className="beige textFont fw-bolder h4">{program.dimanche}
                    </p>
                </article>
                <button className='bgRouge beige mb-4 px-3 py-2 px-lg-3 py-lg-2 fw-bolder bouton textSize titleFont'>Voir la programation</button>
            </div>
            <div>
                clin d'oeil info
            </div>
            <div>
                clin d'oeil carte 
            </div>
        </div>

    );
}
