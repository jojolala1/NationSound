import axios from "axios"
import { baseUrl } from "./shared"
import { authFunctions } from "./authFunctions"

//permet de recupperer toutes les entité en une fonction en specifiant en parametre quel est l'entité
const fetchEntity = async (entity) => {
    const url = `${baseUrl}api/${entity}`
    const token = authFunctions.getToken()

    try {
        const responce = await axios.get(
            url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        return responce
    }catch(err){
        console.log(err)
    }
}

const modifyEntity = async (entity, data, id) => {
    const url = `${baseUrl}api/${entity}/${id}`
    const token = authFunctions.getToken()

    try {
        const responce = await axios.patch(
            url,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/merge-patch+json'
                }
            })
        return responce
    }catch(err){
        console.log(err)
    }
}

const deleteEntity = async (entity, id) => {
    const url = `${baseUrl}api/${entity}/${id}`
    const token = authFunctions.getToken()

    try {
        const responce = await axios.delete(
            url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        return responce
    }catch(err){
        console.log(err)
    }
}

export const apiFunctions = { fetchEntity, modifyEntity, deleteEntity };