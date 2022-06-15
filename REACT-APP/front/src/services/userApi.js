import { URL_REGISTER } from '../config'
import { API_URL } from '../config'
import axios from "axios";
import jwrDecode from "jwt-decode"

///
export async function selectUserData(id){
    const response = await axios.get(`${API_URL}/api/users/${id}?populate=*`)
    return response;
}

export function creatUserAcount(credentials){
    return axios.post(URL_REGISTER, credentials)
}