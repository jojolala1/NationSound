import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authFunctions } from "../logic/authFunctions";
import { tokenService } from "../logic/tokenService";
import { baseUrl } from "../logic/shared";

export const Login = () => {
    let navigate = useNavigate();

    const [eye, setEye] = useState("bi bi-eye-slash-fill");
    const [error, setError] = useState(null)
    const [submitForm, setSumbitForm] = useState({
        email: "",
        password: "",
    });

    const onSubmit =async (e) => {
        e.preventDefault();

       try{
        const res =await axios.post(`${baseUrl}api/auth`, submitForm)

            authFunctions.saveToken(res.data.token);
            authFunctions.saveRefreshToken(res.data.refresh_token);

            tokenService.startTokenService();

            navigate("/admin");
        
       }catch(err){
        setError("Erreur de connexion. Veuillez vérifier vos identifiants.");
        console.log("Erreur : ", err.response ? err.response.data : err.message);
       }
    };

    const handleOnChange = (e) => {
        setSumbitForm({
            ...submitForm,
            [e.target.name]: e.target.value,
        });
    };

    const [passwordSee, setPasswrdSee] = useState("password");

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



    return (
        <>
            <div className="m-5 d-flex justify-content-center ">
                <form
                    onSubmit={onSubmit}
                    className="d-flex flex-column py-5 gap-3 align-items-center marginUnderNav "
                >
                    <div className="group d-flex flex-column align-items-center w-100">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control w-100"
                            type="email"
                            name="email"
                            id="email"
                            value={submitForm.email}
                            autoComplete="email"
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="group d-flex flex-column align-items-center w-100">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="input-group w-100">
                            <input
                                type={passwordSee}
                                name="password"
                                id="password"
                                value={submitForm.password}
                                autoComplete="new-password"
                                onChange={handleOnChange}
                                className="form-control"
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    togglePassword();
                                }}
                                className="btn btn-secondary"
                            >
                                <i className={eye}></i>
                            </button>
                        </div>
                    </div>
                    <div className="group">
                        <button className="bouton bgVert blanc py-2">
                            Connection
                        </button>
                    </div>
                    {error && <>
                        <div>
                            <p>{error}</p>
                        </div>
                    </>}
                </form>
            </div>
        </>
    );
};
