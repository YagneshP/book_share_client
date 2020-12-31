import * as actionTypes from "../actionTypes";
import axiosInstance from "../../util/apiCall"

const getSearchDataStart = () => ({
	type: actionTypes.GET_BOOKS
})

const getSerachDataSuccess = (data)=> ({
		type: actionTypes.SET_BOOKS,
		payload: data
})

const getSearchDataFail = (error) =>({
	type: actionTypes.LIB_ERROR,
	payload: error
})
export const clearResult = () => ({
		type:actionTypes.CLEAR_LIB_RESULT
	})


//getting books from backend
 export const getSearchData =(query)=>{
	 return  dispatch =>{
		 dispatch(getSearchDataStart());
		 axiosInstance.get("/books",
		{
			params:{q:query}
		})
		.then(res => 	dispatch(getSerachDataSuccess(res.data)))
		.catch(error => {
			dispatch(getSearchDataFail(error.response.data.message))
		})
	 }
};