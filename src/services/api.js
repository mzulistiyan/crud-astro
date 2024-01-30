//import axios
import axios from "axios";

const api = axios.create({
  //set default endpoint API
  baseURL: "http://localhost:1337",
});

export default api;