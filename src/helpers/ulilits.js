import axios from "axios";

export async function getApi(url) {
       let response = await axios.get(url)
       return response.data;
}
export async function getPost(url, data) {
       let response = await axios.post(url, data)
       return response.data;
}

export async function deleteItem(url, data) {
       let response = await axios.delete(url, data)
       return response.data;
}
