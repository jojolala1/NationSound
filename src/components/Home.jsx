import videoSrc from '@images/videoDance.webm';
import yellowWave from '@images/yellowWave.svg';
import effet from '@images/effet.png';
import { useEffect, useState } from 'react';
import yellowWave2 from '@images/yellowWave2.svg';
import greenWave from '@images/greenWave.svg';
import greenwave2 from '@images/greenwave2.svg';
import { useNavigate } from 'react-router-dom';
import logo from '@images/logo.svg'
import { UseFetch } from './JsonContext';



export default function Home() {

    const { artistesJson, loading } = UseFetch();


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

            for (let artiste of artistesJson) {
                if (artiste.date === "mercredi 04 septembre") {
                    mercredi.push(artiste.name + " - ")
                } else if (artiste.date === "jeudi 05 septembre") {
                    jeudi.push(artiste.name + " - ")
                } else if (artiste.date === "vendredi 06 septembre") {
                    vendredi.push(artiste.name + " - ")
                } else if (artiste.date === "samedi 07 septembre") {
                    samedi.push(artiste.name + " - ")
                } else if (artiste.date === "dimanche 08 septembre") {
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

    }, [loading, artistesJson])

    const navigate = useNavigate();

    const handleNavigateBilleterie = () => {
        window.open('https://www.seetickets.com/fr/festival-tickets', '_blank');
    };
    const handleNavigateEpsi = () => {
        window.open('https://www.epsi.fr/', '_blank');
    };
    const handleNavigateSpotify = () => {
        window.open('https://open.spotify.com/', '_blank');
    };
    const handleNavigateDeezer = () => {
        window.open('https://www.deezer.com/fr/', '_blank');
    };
    const handleNavigateCorref = () => {
        window.open('https://brasserie-coreff.com/', '_blank');
    };
    const handleNavigatePerrier = () => {
        window.open('https://www.perrier.com/fr/', '_blank');
    };
    const handleNavigateCmb = () => {
        window.open('https://www.cmb.fr/reseau-bancaire-cooperatif/web/accueil', '_blank');
    };


    const handleNavigate = () => {
        navigate('/programmation');
    };
    const handleNavigateInfo = () => {
        navigate('/Informations');
    };
    const handleNavigateCarte = () => {
        navigate('/carte-interactive');
    };
    const handleNavigatePartenaires = () => {
        navigate('/partenaires');
    };


    return (
        <div className="d-flex flex-column align-items-center bgBeige pb-5 " >
            <div className=" position-relative">

                <video
                    src={videoSrc}
                    type="video/webm"
                    autoPlay
                    loop
                    muted
                    className="video"
                    poster="/assets/images/poster.webp"
                    preload="auto"
                    alt="fond"
                    controls={false}
                    playsInline 
                ></video>



                <div className="w-100 position-absolute top0 d-flex flex-column mt-4 mt-lg-5 h-100 justify-content-center px-lg-3 pb-5">
                    <p className=" jaune text-center titleFont fw-bolder  titleSize  px-4 pVideo">Du 04 au 08 Septembre :</p>
                    <p className=" blanc  text-center textFont artistes fw-bolder  pt-3 px-4 ">Eels · Red Hot Chili Peppers · Aupinard · Luidji · Smash Mouth · Leny Kravitz · System Of A Down · Foo Fighters . Radiohead · Royal Blood…</p>
                    <button className="pVideolight bgRouge blanc mt-4 py-2 p-lg-2 p-xl-3 fw-bolder bouton textSize titleFont" onClick={handleNavigateBilleterie}>Billetterie</button>
                </div>
            </div>
            <div className=' bandeau mb-5'>
                <img src={greenWave} alt='fond en forme de vague' className='banner position-absolute' />
                <img src={yellowWave} alt='fond en forme de vague' className='banner position-absolute' />

            </div>
            <div className='marginEffet'>
                <img src={effet} alt="effet" className="effet" />

            </div>
            <div className="text-center px-3">
                <p className="rouge titleFont fw-bolder pVideo display-2 mt-5"> -Programmation 2024- </p>
                <article className="bgVert d-flex flex-column mt-5 p-5 banner">
                    <p className='blanc titleFont fw-bolder h1 pVideolight mb-4'>Mercredi 04 Septembre</p>
                    <p className="blanc textFont fw-bolder pVideolight h4">{program.mercredi}
                    </p>
                </article>
                <article className=" d-flex flex-column p-5 banner">
                    <p className='rouge titleFont fw-bolder  h1 mb-4'>Jeudi 05 Septembre</p>
                    <p className="rouge textFont fw-bolder  h4">{program.jeudi}
                    </p>
                </article>
                <article className="bgVert d-flex flex-column  p-5 banner">
                    <p className='blanc titleFont pVideolight fw-bolder h1 mb-4'>Vendredi 06 Septembre</p>
                    <p className="blanc textFont pVideolight fw-bolder h4">{program.vendredi}
                    </p>
                </article>
                <article className=" d-flex flex-column p-5 banner">
                    <p className='rouge titleFont  fw-bolder h1 mb-4'>Samedi 07 Septembre</p>
                    <p className="rouge textFont  fw-bolder h4">{program.samedi}
                    </p>
                </article>
                <article className="bgVert d-flex flex-column mb-4 p-5 banner">
                    <p className='blanc titleFont pVideolight fw-bolder h1 mb-4'>Dimanche 08 Septembre</p>
                    <p className="blanc textFont pVideolight fw-bolder h4">{program.dimanche}
                    </p>
                </article>
                <button className='bgRouge pVideolight blanc  my-5 px-3 py-2 px-lg-3 py-lg-2 fw-bolder bouton textSize titleFont' onClick={handleNavigate}>Voir toute la programmation</button>
            </div>
            <img src={yellowWave2} alt='fond en forme de vague' className='banner rotated mt-5' />
            <div className='d-flex flex-column bgJaune w-100  align-items-center justify-content-center'>
                <div className='d-flex flex-column mb-0 px-3 py-3 align-items-center justify-content-center '>
                    <h3 className='titleFont fw-bold pVideo display-2 rouge'>Informations</h3>
                    <p className='textFont blanc my-5 fw-bold h4 pVideolight text-center'>Vous vous posez quelques questions ? Accedez à notre page info avec ce bouton.</p>
                    <button className='bouton bgVert blanc titleFont py-2 pVideolight  px-5 textSize' onClick={handleNavigateInfo}>Page Infos</button>
                </div>
            </div>
            <img src={yellowWave2} alt='fond en forme de vague' className='banner mb-4 ' />


            <div className='my-5 d-flex container flex-column-reverse flex-md-row  align-items-center justify-content-center'>
                <img src="/assets/images/map.png" alt="extrait de la carte" className='formborder m-3 mb-5 col-10 col-md-5 clickable shadoww radius' onClick={handleNavigateCarte} />
                <div className='d-flex text-center flex-column mx-3 align-items-center justify-content-center col-10 col-md-5 col-lg-6'>
                    <h3 className='titleFont fw-bold pVideo display-2 mb-3 rouge'>Votre carte interactive</h3>
                    <p className='textFont noir mb-5 mt-4 h4  fw-bold'>Vous cherchez quelque chose ? Cliquez sur la carte pour accéder à la carte interactive, vous pourrez vous repérer, filtrer ce que vous cherchez et même voir les concerts en cours. </p>
                </div>
            </div>
            <img src={greenwave2} alt='fond en forme de vague' className='banner rotated2 mt-4' />

            <div className='d-flex flex-column bgVert w-100  align-items-center justify-content-center'>
                <div className='d-flex flex-column mb-0 px-3 py-2 align-items-center justify-content-center '>
                    <h3 className='mt-5 mb-3 titleFont fw-bold pVideo display-2 blanc'>Nos partenaires</h3>
                    <div className="d-flex row gap-5 my-5 align-items-center justify-content-center">
                        <div className="col-4 col-lg-3 d-flex justify-content-center clickable" onClick={handleNavigateEpsi}>
                            <img src="assets/images/logoEpsi.svg" alt="logo EPSI" className=' logo2' />
                        </div>
                        <div className="col-4 col-lg-3 d-flex justify-content-center clickable" onClick={handleNavigateSpotify}>
                            <img src="assets/images/logoSpotify.png" alt="logo Spotify" className=' logo2' />
                        </div>
                        <div className="col-4 col-lg-3 d-flex justify-content-center clickable" onClick={handleNavigateDeezer}>
                            <img src="assets/images/logoDeezer.svg" alt="logo Deezer" className=' logo2' />
                        </div>
                        <div className="col-4 col-lg-3 d-flex justify-content-center clickable" onClick={handleNavigateCorref}>
                            <img src="assets/images/logoCorref.webp" alt="logo" className=' logo2' />
                        </div>
                        <div className="col-4 col-lg-3 d-flex justify-content-center clickable" onClick={handleNavigatePerrier}>
                            <img src="assets/images/logoPerrier.png" alt="logo Perrier" className=' logo2' />
                        </div>
                        <div className="col-4 col-lg-3 d-flex justify-content-center clickable" onClick={handleNavigateCmb}>
                            <img src="assets/images/logoCmb.png" alt="logo cmb" className=' logo2' />
                        </div>

                    </div>
                    <button className="bouton bgRouge titleFont blanc  py-2 px-5 pVideolight textSize my-4" onClick={handleNavigatePartenaires}> Page partenaires</button>

                </div>
            </div>
            <img src={greenwave2} alt='fond en forme de vague ' className='banner mb-5 rotated1' />
            <a href="#ancrage" className='heightLog y-5'>
                <img className="  logoBis  " src={logo} alt="logo" />
            </a>
        </div>

    );
}
