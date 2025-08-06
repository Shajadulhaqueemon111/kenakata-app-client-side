import axios from "axios";

const publicAxios = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  withCredentials: true,
});

export default publicAxios;
