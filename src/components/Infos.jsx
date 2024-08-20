import React, { useEffect, useState } from "react";

export default function Info() {



    const [indice, setIndice] = useState({
        1: "+",
        2: "+",
        3: "+",
        4: "+",
        5: "+",
        6: "+",
    });

    const togglerIndice = (id) => {
        setIndice((prevIndices) => ({
            ...prevIndices,
            [id]: prevIndices[id] === "+" ? "-" : "+",
        }));
    };

    const handleNavigateBilleterie = () => {
        window.location.href = 'https://www.seetickets.com/fr/festival-tickets';
    };

    return (
        <>
            <div className="d-flex flex-column align-items-center marginUnderNav">
                <h1 className="titleFont rouge mb-5 pVideorouge text-center titleFont fw-bolder  display-2 pVideo px-4 mb-5 z-2">
                    Informations & FAQ :
                </h1>

                <section className="faq-section d-flex flex-column align-items-center textFont vert gap-5 mb-5">
                    <div className="faq-item d-flex flex-column align-items-center shadoww infosBox" onClick={() => togglerIndice(1)}
                                data-bs-toggle="collapse"
                                href="#collapse1"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapse1">
                        <h3>
                            Quels sont les dates et heures du festival ?{" "}
                            <span
                                
                            >
                                {indice[1]}
                            </span>
                        </h3>
                        <p className="collapse " id="collapse1">
                            Le festival se déroulera du 04 Septembre 2024 au 08
                            Septembre 2024. Les portes ouvrent à 15h chaque
                            jour, et les performances se poursuivront jusqu'à 3h
                            du matin.
                        </p>
                    </div>

                    <div
                        className="faq-item d-flex flex-column align-items-center shadoww infosBox"
                        onClick={() => togglerIndice(2)}
                        data-bs-toggle="collapse"
                        href="#collapse2"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapse2"
                    >
                        <h3>
                            Où se déroule le festival ? <span>{indice[2]}</span>
                        </h3>
                        <p className="collapse" id="collapse2">
                            Le festival aura lieu au [Lieu du festival], situé à
                            [Adresse complète]. Veuillez consulter notre page de
                            localisation pour obtenir des détails sur la manière
                            de s'y rendre.
                        </p>
                    </div>

                    <div className="faq-item d-flex flex-column align-items-center shadoww infosBox" onClick={() => togglerIndice(3)}
                                data-bs-toggle="collapse"
                                href="#collapse3"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapse3">
                        <h3>
                            Comment puis-je acheter des billets ?{" "}
                            <span
                                
                            >
                                {indice[3]}
                            </span>
                        </h3>
                        <p className="collapse" id="collapse3">
                            Les billets peuvent être achetés en ligne sur notre
                            site web ou dans certains points de vente. Visitez
                            notre page <a onClick={handleNavigateBilleterie} href="https://www.seetickets.com/fr/festival-tickets" target="_blank">Billetterie</a> pour
                            plus de détails.
                        </p>
                    </div>
                    <div className="faq-item d-flex flex-column align-items-center shadoww infosBox" onClick={() => togglerIndice(4)}
                                data-bs-toggle="collapse"
                                href="#collapse4"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapse4">
                        <h3>
                            Quels sont les articles autorisés et interdits ?{" "}
                            <span
                                
                            >
                                {indice[4]}
                            </span>
                        </h3>
                        <div className="m-4 collapse" id="collapse4">
                            <table className="table table-bordered   ">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col "
                                            className="bg-success text-white"
                                        >
                                            Autorisé
                                        </th>
                                        <th
                                            scope="col"
                                            className="bg-danger text-white"
                                        >
                                            Interdit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Sacs à dos de petite taille : Les
                                            sacs à dos doivent être de petite
                                            taille (pas plus de 20L) et seront
                                            soumis à une fouille à l'entrée.
                                        </td>
                                        <td>
                                            Substances illégales : Toute drogue
                                            ou substance interdite par la loi
                                            est strictement interdite.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Bouteilles d'eau réutilisables : Les
                                            bouteilles d'eau en plastique ou en
                                            métal sont autorisées, mais elles
                                            doivent être vides lors de l'entrée.
                                        </td>
                                        <td>
                                            Alcool : Les boissons alcoolisées ne
                                            peuvent pas être apportées de
                                            l'extérieur. L'alcool est disponible
                                            à l'achat sur place.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Crèmes solaires : Crèmes solaires en
                                            bouteille non-aérosol.
                                        </td>
                                        <td>
                                            Armes : Toute arme ou objet pouvant
                                            être utilisé comme une arme
                                            (couteaux, objets tranchants, etc.).
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Appareils photo : Appareils photo
                                            compacts (pas de caméras
                                            professionnelles ou d'objectifs
                                            détachables).
                                        </td>
                                        <td>
                                            Aérosols : Tous les produits en
                                            aérosol, y compris les déodorants et
                                            sprays solaires.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Vêtements et accessoires : Chapeaux,
                                            lunettes de soleil, ponchos, et
                                            vêtements appropriés pour toutes les
                                            conditions météorologiques.
                                        </td>
                                        <td>
                                            Gros sacs : Sacs à dos ou sacs de
                                            plus de 20L.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Couvertures et serviettes : Pour
                                            s'asseoir sur le sol ou se protéger
                                            du froid le soir.
                                        </td>
                                        <td>
                                            Parapluies : Parapluies de grande
                                            taille, en raison des risques qu'ils
                                            présentent dans des foules denses.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Petits snacks : Barres énergétiques,
                                            fruits secs, etc., dans des
                                            emballages non ouverts.
                                        </td>
                                        <td>
                                            Appareils photo professionnels :
                                            Appareils photo avec objectifs
                                            détachables ou caméras
                                            professionnelles sans accréditation.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            Chaises pliantes : Les chaises de
                                            camping ou pliantes ne sont pas
                                            autorisées pour des raisons de
                                            sécurité.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            Feux d'artifice : Y compris les
                                            pétards, fusées et autres
                                            dispositifs pyrotechniques.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            Drones : Drones ou autres appareils
                                            volants télécommandés.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            Animaux : Les animaux de compagnie
                                            ne sont pas autorisés, à l'exception
                                            des animaux d'assistance.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="faq-item d-flex flex-column align-items-center shadoww infosBox" onClick={() => togglerIndice(5)}
                                data-bs-toggle="collapse"
                                href="#collapse5"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapse5">
                        <h3>
                            Y a-t-il des options de restauration sur place ?{" "}
                            <span
                                
                            >
                                {indice[5]}
                            </span>
                        </h3>
                        <p className="collapse" id="collapse5">
                            Oui, nous aurons une grande variété de stands de
                            nourriture et de boissons, y compris des options
                            végétariennes, véganes et sans gluten.
                        </p>
                    </div>

                    <div className="faq-item d-flex flex-column align-items-center shadoww infosBox" onClick={() => togglerIndice(6)}
                                data-bs-toggle="collapse"
                                href="#collapse6"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapse6">
                        <h3>
                            Le festival est-il accessible aux personnes à
                            mobilité réduite ?{" "}
                            <span
                                
                            >
                                {indice[6]}
                            </span>
                        </h3>
                        <p className="collapse" id="collapse6">
                            Oui, nous avons pris des mesures pour rendre le
                            festival accessible à tous.
                        </p>
                    </div>
                </section>
                <div className="faq-Form d-flex flex-column align-items-center my-5 infosBox formborder">
                    <h3 className="titleFont vert">Nous contacter</h3>
                    <form
                        action="https://api.web3forms.com/submit"
                        method="post"
                        className="w-100 p-3 d-flex flex-column textFont vert"
                    >
                        <input
                            type="hidden"
                            name="access_key"
                            value="63ba280a-fd42-4e09-8b97-b0be83bc4b5c"
                        />

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Votre Prénom
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="name"
                                required
                            />
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="mail" className="form-label">
                                Votre adresse mail
                            </label>
                            <input
                                type="email"
                                name="mail"
                                className="form-control"
                                id="mail"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                                Votre message
                            </label>
                            <textarea
                                type="text"
                                name="message"
                                className="form-control"
                                id="message"
                                rows="5"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className=" bouton titleFont bgVert beige px-3 py-2 px-lg-3 py-lg-2"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
