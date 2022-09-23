import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND,
});

export const useApi = () => ({
  showMazes: async () => {
    try {
      const response = await api.get("/mazes");

      var mazes = response.data.data;
      mazes.forEach((item) => {
        if (item.name.length > 8) {
          item.name = item.name.substr(0, 8);
          item.name = item.name.concat("...");
        }
        item.created_at = new Date(item.created_at).toLocaleDateString("pt-BR");
      });

      return mazes;
    } catch (error) {
      return error;
    }
  },
  showUser: async () => {},
});
