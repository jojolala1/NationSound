import axios from "axios"
import { baseUrl } from "./shared"
import { authFunctions } from "./authFunctions"

//permet de recupperer toutes les entité en une fonction en specifiant en parametre quel est l'entité
const fetchEntity = async (entity) => {
    const url = `${baseUrl}api/${entity}`
    const token = authFunctions.getToken()

    try {
        const res = await axios.get(
            url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        return res
    }catch(err){
        console.log(err)
    }
}

const modifyEntity = async (entity, data, id) => {
    const url = `${baseUrl}api/${entity}/${id}`
    const token = authFunctions.getToken()

    try {
        const res = await axios.patch(
            url,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/merge-patch+json'
                }
            })
        return res
    }catch(err){
        console.log('apifunction erreur',err)

        return{
            error: true,
            code: err.status,
            message: err.response.data.description
          }

    }
}

const AddEntity = async (entity, data) => {
    const url = `${baseUrl}api/${entity}`
    const token = authFunctions.getToken()

    try {
        const res = await axios.post(
            url,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            })
        return res
    }catch(err){
        console.log(err)
    }
}

const deleteEntity = async (entity, id) => {
    const url = `${baseUrl}api/${entity}/${id}`
    const token = authFunctions.getToken()

    try {
        const res = await axios.delete(
            url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        return res
    }catch(err){
        console.log(err)
    }
}

export const apiFunctions = { fetchEntity, modifyEntity, deleteEntity, AddEntity };