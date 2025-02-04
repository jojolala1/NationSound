import { useRouteError, useNavigate } from "react-router-dom";

const ErrorElement = () => {
    const error = useRouteError(); // Capture l'erreur renvoyée par React Router
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1 className="text-danger">Oops ! Une erreur est survenue</h1>
            {error ? (
                <>
                    <h2>Code : {error.status || "Inconnu"}</h2>
                    <p>{error.statusText || error.message || "Erreur inconnue."}</p>
                </>
            ) : (
                <p>Une erreur inattendue s'est produite.</p>
            )}
            <button onClick={() => navigate("/")} className="btn btn-primary mt-3">Retour à l'accueil</button>
        </div>
    );
};

export default ErrorElement;
