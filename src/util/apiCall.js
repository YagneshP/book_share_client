import axios from "axios";


const instance = axios.create({
	baseURL:"https://book-share-server-yp.herokuapp.com/api",
	withCredentials: true,
});

instance.defaults.headers.common['Content-Type'] ="application/json";
instance.defaults.withCredentials = true
export default instance;
