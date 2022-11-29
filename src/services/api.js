import axio from "axios";

const api = axio.create({
  baseURL: process.env.REACT_APP_API_BACKEND,
});

export default api;
