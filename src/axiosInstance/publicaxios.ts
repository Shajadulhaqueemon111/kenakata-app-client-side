import axios from "axios";

const publicAxios = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default publicAxios;
