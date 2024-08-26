import React, { useEffect, useState } from "react";

export default function ModifyArtistes() {
    const [data, setData] = useState("");

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

    return (
        <div className="marginUnderNav mb-5">
            <form onSubmit={uploadArtistes}>
                <textarea 
                    name="artistesInput" 
                    rows={40} 
                    cols={100} 
                    value={data} 
                    onChange={(e) => setData(e.target.value)}
                />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}
