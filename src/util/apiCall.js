import axios from "axios";


const instance = axios.create({
	baseURL:"http://localhost:8004",
	withCredentials: true,
});

instance.defaults.headers.common['Content-Type'] ="applicatio/json";

export default instance;