import React from "react";

export default function partenairePage () {

    return(
        <div className="marginUnderNav d-flex flex-column align-items-center mb-5">
            <div className="d-flex flex-column align-items-center gap-5 widthPartenaire">
                <div className="d-flex  flex-column align-items-center text-center bgBlanc py-3 px-5 radius gap-2">
                    <h3 className="titleFont rouge h1 my-4">Notre école:</h3>
                    <div className="d-flex flex-column flex-lg-row align-items-center text-center   ">
                    <img src="../../images/logoEpsi.svg" alt="logo EPSI" className=' logo3 mb-3 mb-lg-5 dropSadow'  />
                    <p className="p-lg-3 my-3 textFont noir h5">L'EPSI (École Professionnelle des Sciences Informatiques) est une école supérieure française spécialisée dans la formation en informatique. Elle propose des cursus allant du bac+2 au bac+5, couvrant divers aspects de l'informatique, du développement logiciel à la gestion des systèmes d'information, tout en offrant une approche pratique et axée sur l'insertion professionnelle.  <br/><a href="https://www.epsi.fr/" target="_blank"> EPSI </a></p>
                    </div>
                </div>
                <div className="d-flex  flex-column align-items-center text-center bgBlanc py-3 px-5 radius gap-2">
                    <h3 className="titleFont rouge h1 my-4">Plateformes de streaming:</h3>
                    <div className="d-flex reverse flex-column flex-lg-row align-items-center text-center ">
                        <img src="../../images/logoSpotify.png" alt="logo EPSI" className=' logo3 mb-3 mb-lg-5' />
                        <p className="p-lg-3 my-3 textFont noir h5"> Spotify est une plateforme de streaming musical mondiale qui permet aux utilisateurs d'écouter des millions de chansons, albums, et playlists en ligne. Avec une interface conviviale et des recommandations personnalisées, Spotify propose des abonnements gratuits avec publicités et des options premium sans publicité pour une expérience d'écoute améliorée. <br/><a target="_blank" href="https://open.spotify.com/"> Spotify </a></p>
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-center text-center  ">
                        <img src="../../images/logoDeezer.svg" alt="logo EPSI" className=' mb-3 logo3 mb-lg-5 dropSadow' />
                        <p className="p-lg-3 my-3 textFont noir h5">Deezer est un service de streaming musical qui offre une vaste bibliothèque de titres, albums, et playlists. En plus de sa fonctionnalité de streaming, Deezer propose des options pour découvrir de nouveaux artistes et genres grâce à ses algorithmes de recommandation et à ses sélections éditoriales. <br/><a target="_blank" href="https://www.deezer.com/fr/"> Deezer </a></p>
                    </div>
                </div>
                
                <div className="d-flex  flex-column align-items-center text-center bgBlanc py-3 px-5 radius gap-3">
                    <h3 className="titleFont rouge h1 my-4">Les boissons:</h3>
                    <div className="d-flex reverse flex-column flex-lg-row align-items-center text-center  bgBlanc " >
                    <img src="../../images/logoCorref.webp" alt="logo EPSI" className='mb-3 logo3 mb-lg-5' />
                    <p className="p-lg-3 my-3 textFont noir h5"> La brasserie Coreff, située en Bretagne, est réputée pour ses bières artisanales de qualité. Engagée dans une approche authentique et conviviale, Coreff produit une gamme variée de bières qui reflètent le savoir-faire traditionnel breton. Avec une philosophie de "sérieux sans se prendre au sérieux", la brasserie allie passion pour la bière et esprit de camaraderie, offrant ainsi des moments de partage uniques autour de ses produits. <br/><a target="_blank" href="https://brasserie-coreff.com/"> Coreff </a></p>
                </div>
                <div className="d-flex flex-column flex-lg-row align-items-center text-center   bgBlanc ">
                    <img src="../../images/logoPerrier.png" alt="logo EPSI" className='mb-3 logo3 mb-lg-5' />
                    <p className="p-lg-3 my-3 textFont noir h5">Perrier est une marque emblématique d'eau minérale naturelle gazeuse, originaire de France. Connue pour ses bulles fines et son goût rafraîchissant, Perrier est souvent associée à un style de vie sophistiqué et à une consommation premium d'eau minérale. <br/><a  target="_blank" href="https://www.perrier.com/fr/">  Perrier </a></p>
                </div>
                </div>
                <div className="d-flex  flex-column align-items-center text-center bgBlanc py-3 px-5 radius gap-3">
                    <h3 className="titleFont rouge h1 my-4">Notre partenaire bancaire:</h3>
                    <div className="d-flex reverse flex-column flex-lg-row align-items-center text-center ">
                    <img src="../../images/logoCmb.png" alt="logo EPSI" className='mb-3 logo3 mb-lg-5'/>
                    <p className="p-lg-3 my-3 textFont noir h5">Le Crédit Mutuel de Bretagne est une banque régionale qui se distingue par son engagement envers le développement économique et social de la Bretagne. En tant qu'acteur majeur du secteur bancaire en région, le CMB offre une gamme complète de services financiers adaptés aux besoins des particuliers et des entreprises, tout en mettant l'accent sur la proximité, la solidarité et le soutien aux projets locaux. <br/><a target="_blank" href="https://www.cmb.fr/reseau-bancaire-cooperatif/web/accueil"> CMB </a></p>
                </div>
                </div>
                
            </div>
        </div>
    )
}