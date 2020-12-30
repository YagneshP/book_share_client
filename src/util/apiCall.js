import axios from "axios";


const instance = axios.create({
	baseURL:"https://book-share-server-yp.herokuapp.com/api",
	withCredentials: true,
});

instance.defaults.headers.post['Content-Type'] ="applicatio/json";

export default instance;