import React, { useState } from "react";
import { apiFunctions } from "../logic/apiFunctions";

const UserAdd = ({ handleSetToggle, setSelectedUser }) => {
    const [passwordSee, setPasswrdSee] = useState("password");
    const [eye, setEye] = useState("bi bi-eye-slash-fill");
    const [error, setError] = useState(null);

    const [userEdit, setUserEdit] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

            const res = await apiFunctions.AddEntity("users", userEdit);
            console.log("reponse de l'api", res);
            if(res.error){
              setError(res)
            }else{
            setSelectedUser(null);
            handleSetToggle();
            }


    };

    const togglePassword = () => {
        //on peut rajouter une vraiante d'icon oeil pour remlacer 'voir'
        if (passwordSee === "password") {
            setPasswrdSee("text");
            setEye("bi bi-eye-fill");
        } else {
            setPasswrdSee("password");
            setEye("bi bi-eye-slash-fill");
        }
    };

    const handleOnChange = (e) => {
        setUserEdit({
            ...userEdit,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div onClick={() => setSelectedUser(null)} className=" overlay bgGRey">
            <div
                className="d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey mx-2"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center textSize">Ajouter un utilisateur</p>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                >
                    <div className="group d-flex flex-column align-items-center ">
                        <label htmlFor="emailAdd">E-mail</label>
                        <input
                            className="form-control"
                            // type="email"
                            name="email"
                            id="emailAdd"
                            autoComplete="email"
                            value={userEdit.email}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="passwordAdd">Mot de passe</label>
                        <div className="d-flex">
                            <input
                                className="form-control"
                                type={passwordSee}
                                name="password"
                                id="passwordAdd"
                                autoComplete="new-password"
                                value={userEdit.password}
                                onChange={handleOnChange}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    togglePassword();
                                }}
                                className="rounded textFont noir bg-white border"
                            >
                                <i className={eye}></i>
                            </button>
                        </div>
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="firstNameAdd">Prénom</label>
                        <input
                            className="form-control"
                            type="text"
                            name="firstName"
                            id="firstNameAdd"
                            autoComplete="given-name"
                            value={userEdit.firstName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="group d-flex flex-column align-items-center">
                        <label htmlFor="lastNameAdd">Nom</label>
                        <input
                            className="form-control"
                            type="text"
                            name="lastName"
                            id="lastNameAdd"
                            autoComplete="family-name"
                            value={userEdit.lastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <button
                        className="bouton bgVert blanc mt-4 py-2"
                        type="submit"
                    >
                        Ajouter
                    </button>
                </form>
                <button
                    className="bouton bgRouge blanc  py-2"
                    onClick={() => setSelectedUser(null)}
                >
                    annuler
                </button>
                {error && (
                    <div className="alert alert-danger text-center">
                        <p>Erreur : {error.code || "inconnue"}</p>
                        <p>
                            {error.message ||
                                "Une erreur est survenue, mais aucun détail n'est disponible."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAdd;
