import { PostFormData, PostState } from "./PostSlice";
import axios from "axios";

const API_URL = "http://localhost:3000";


export async function fetchPosts() {
    return axios.get(`${API_URL}/posts`)
        .then(response => response.data)
        .catch(error => {
            console.log("Error: ", error);
            return {} as PostState;
        });
}

export async function createPost(payload: PostFormData) {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    return axios.post(`${API_URL}/posts`, payload, config)
        .then(response => response)
        .catch(error => {
            // console.log("Error: ", error);
            // return {} as PostState;
            return error.response
        });
}