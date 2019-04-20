import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
    getAlbum(albumName) {
        return apiClient.get(`album?q=${albumName}`);
    },
    getTracks(idAlbum) {
        return apiClient.get(`tracks?id=${idAlbum}`);
    }
}