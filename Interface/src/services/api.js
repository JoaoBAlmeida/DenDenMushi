import axios from "axios";

 const url = 'http://localhost:5000/';

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    Accept: "application/json",
  },
});


export default api;