import { API_URL } from '../config'
import axios from "axios";

export async function selectPost(credentials){
    return axios.get(API_URL, credentials)
}