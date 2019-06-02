import axios from 'axios';

const api = axios.create({
    baseURL: "https://spotify-api-json-server.herokuapp.com"
});

export default api;
