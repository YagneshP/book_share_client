import axios from "axios";


const instance = axios.create({
	
	withCredentials: true,
});

instance.defaults.headers.common['Content-Type'] ="applicatio/json";

export default instance;
// baseURL:"https://book-share-server-yp.herokuapp.com/api",