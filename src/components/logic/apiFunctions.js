import axios from "axios";
import { baseUrl } from "./shared";
import { authFunctions } from "./authFunctions";

//permet de recupperer toutes les entité en une fonction en specifiant en parametre quel est l'entité
const fetchEntity = async (entity) => {
    const url = `${baseUrl}api/${entity}`;
    const token = authFunctions.getToken();

    try {
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (err) {
        let message = err?.response?.data?.description
        if(err.status === 401){
            message = 'Veuillez vous reconnecter'
        }
        return {
            error: true,
            code: err.status,
            message: message,
        };
    }
};

const fetchEntityWithoutToken = async (entity) => {
    const url = `${baseUrl}api/${entity}`;

    try {
        const res = await axios.get(url);
        return res;
    } catch (err) {
        let message = err?.response?.data?.description
        return {
            error: true,
            code: err.status,
            message: message,
        };
    }
};

const fetchEntityWithoutTokenByName = async (entity, name) => {
    const url = `${baseUrl}api/${entity}?name=${name}`;

    try {
        const res = await axios.get(url);
        return res;
    } catch (err) {
        let message = err?.response?.data?.description
        return {
            error: true,
            code: err.status,
            message: message,
        };
    }
};

const modifyEntity = async (entity, data, id) => {
    const url = `${baseUrl}api/${entity}/${id}`;
    const token = authFunctions.getToken();

    try {
        const res = await axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/merge-patch+json",
            },
        });
        return res;
    } catch (err) {
        let message = err?.response?.data?.description
        if(err.status === 401){
            message = 'Veuillez vous reconnecter'
        }
        return {
            error: true,
            code: err.status,
            message: message
        };
    }
};

const modifyArtiste = async (entity, data, id) => {
    const url = `${baseUrl}api/${entity}/${id}`;
    const token = authFunctions.getToken();

    try {
        const res = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (err) {
        let message = err?.response?.data?.description
        if(err.status === 401){
            message = 'Veuillez vous reconnecter'
        }
        return {
            error: true,
            code: err.status,
            message: message
        };
    }
};

const AddEntity = async (entity, data) => {
    const url = `${baseUrl}api/${entity}`;
    const token = authFunctions.getToken();
    console.log("Données envoyées à l'API :",data);

    try {
        const res = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return res;
    } catch (err) {
        let message = err?.response?.data?.description
        if(err.status === 401){
            message = 'Veuillez vous reconnecter'
        }
        return {
            error: true,
            code: err.status,
            message: message,
        };
    }
};

const AddArtiste = async (entity, data) => {
    const url = `${baseUrl}api/${entity}`;
    const token = authFunctions.getToken();

    try {
        const res = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (err) {
        let message = err?.response?.data?.description
        if(err.status === 401){
            message = 'Veuillez vous reconnecter'
        }
        return {
            error: true,
            code: err.status,
            message: message,
        };
    }
};

const deleteEntity = async (entity, id) => {
    const url = `${baseUrl}api/${entity}/${id}`;
    const token = authFunctions.getToken();

    try {
        const res = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (err) {
        let message = err?.response?.data?.description
        if(err.status === 401){
            message = 'Veuillez vous reconnecter'
        }
        return {
            error: true,
            code: err.status,
            message: message,
        };
    }
};

export const apiFunctions = {
    fetchEntity,
    modifyEntity,
    deleteEntity,
    AddEntity,
    fetchEntityWithoutToken,
    fetchEntityWithoutTokenByName,
    modifyArtiste,
    AddArtiste
};
