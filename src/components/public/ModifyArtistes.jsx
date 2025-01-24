import React, { useEffect, useState } from "react";

export default function ModifyArtistes() {
    const [data, setData] = useState("");

    const [pass, setPass] = useState('')
    const [verif, setVerif]= useState(false)
    const [faute, setFaute]= useState(false)

    useEffect(() => {
        fetch(
            "https://firebasestorage.googleapis.com/v0/b/nationsound-64a87.appspot.com/o/artistes.json?alt=media&token=a3bdcb45-ef8c-4455-b816-f6f5526eba6f"
        )
            .then((response) => response.json())
            .then((data) => {
                setData(JSON.stringify(data, null, 2));
            });
    }, []);

    async function uploadArtistes(event) {
        event.preventDefault();

        const textarea = event.target.elements.artistesInput;
        const content = textarea.value;

        try {
            const response = await fetch("https://firebasestorage.googleapis.com/v0/b/nationsound-64a87.appspot.com/o/artistes.json?alt=media&token=a3bdcb45-ef8c-4455-b816-f6f5526eba6f", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: content, 
            });

            if (response.ok) {
                console.log("Réussite : Le fichier a été mis à jour.");
                
            } else {
                console.error("Erreur : La mise à jour a échoué.");
            }
        } catch (erreur) {
            console.error("Erreur :", erreur);
        }
    }

    const password = (e) =>{
        e.preventDefault()
        if(pass === 'MotDePasse'){
            console.log('yess')
            setVerif(true)
            setFaute(false)
            setPass('')
            
        }else {
            console.log('no') 
            setPass('')
            setFaute(true)
            return false}
    }



    const handleOnChange = (e) => {

        const value = e.target.value
        setPass(value)
        
    }

    return (
        <div className="marginUnderNav mb-5 d-flex flex-column align-items-center ">
            {!verif?<form onSubmit={password} className="d-flex flex-column align-items-center marginUnderNav">
                <input type="password" onChange={handleOnChange} value={pass} placeholder="Mot de passe" className="form-control "/>
                <button type="submit" className="bouton bgRouge titleFont blanc my-3">Soumettre</button>
            </form>: <button className="bouton bgRouge titleFont blanc my-3" onClick={()=>setVerif(false)}>deconnection</button>}
            {faute ? <p className="text-danger">Mot de pass erroné !</p> : ''}
            {verif ? <form onSubmit={uploadArtistes} className="d-flex flex-column ">
                <textarea 
                    name="artistesInput" 
                    rows={40} 
                    cols={100} 
                    value={data} 
                    onChange={(e) => setData(e.target.value)}
                />
                <button type="submit" className="bouton bgRouge titleFont blanc h3 py-2 px-3 my-3">Valider les modifications</button>
            </form>: <p className="textFont noir fw-bold h5 my-5">Veuillez saisir le mot de passe</p>}
        </div>
    );
}
