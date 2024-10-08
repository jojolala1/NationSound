import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * creation d'un context, peux prendre en parametre une valeur par defaut, il ne contient pas de context en lui meme, cest plus tard qu'on lui transmet avec le nom
 * du creatContext et .provider  ici ca donnera FetchContext.provider
 */
const FetchContext = createContext();


//recoit le router en enfant, ce fichier est juste l'intermediaire entre le router et la page en question
export const FetchProvider = ({children}) => {
    
    const [artistesJson, setArtistes] = useState([])
    const [festivalLocations, setFestivalLocations] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [errorLocation, setErrorLocation] = useState(null);

    //utilisation du hook useEffect pour faire la requete seulement au montage
    useEffect(()=>{
        const FetchArtistes = async () => {
            try {
                const response = await fetch (
                    "https://firebasestorage.googleapis.com/v0/b/nationsound-64a87.appspot.com/o/artistes.json?alt=media&token=a3bdcb45-ef8c-4455-b816-f6f5526eba6f"
                );
                if(!response.ok) {
                    throw new Error("la reponse n'est pas ok");
                }
                const data = await response.json();
                setArtistes(data)
            }catch (error) {
                setError(error);
                console.error("Probleme de recuperation des données", error)
            }finally {
                setLoading(false);
            }
        }
        FetchArtistes();
    },[])

    useEffect(()=>{
        const FetchFestivalLocations = async () => {
            try {
                const response = await fetch (
                    "https://firebasestorage.googleapis.com/v0/b/nationsound-64a87.appspot.com/o/festivalLocations.json?alt=media&token=adca18c5-713b-4407-9949-0a0e0d11a208"
                );
                if(!response.ok) {
                    throw new Error("la reponse n'est pas ok");
                }
                const data = await response.json();
                setFestivalLocations(data)
            }catch (error) {
                setErrorLocation(error);
                console.error("Probleme de recuperation des données", error)
            }finally {
                setLoadingLocation(false);
            }
        }
        FetchFestivalLocations();
    },[])

    //les pages, donc les enfant de ce fichier, recoivent tous les composants inclus dans value
    return (
        <FetchContext.Provider value={{ artistesJson, loading, error, festivalLocations, loadingLocation ,errorLocation }}>
            {children}
        </FetchContext.Provider>
    );
}

//c'est avec cette fonction que les enfants extraire les donées de fetchContext
export const UseFetch = () => {
    return useContext(FetchContext);
};
