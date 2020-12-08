import * as actionTypes from "../actionTypes";
import axiosInstance from "../../util/apiCall"
// ============== Auth =====================//

export const getUser = (dispatch)=>{
		// /gettingUser from database
		axiosInstance.get("http://localhost:8004/api/user").then(res => {
			console.log("[ReceivedUser]",res);
			dispatch({
				type: actionTypes.SET_USER,
				payload: res.data
			})
		}).catch(error => {
			console.log(error.message) // need to desplay Errormessage here
		})  
	}


export const signUpUser = (formData)=>{
	return dispatch => {
		// /signup
		axiosInstance.post("http://localhost:8004/api/auth/signup",formData).then(res => {
			console.log(res)
		})
		.catch(error => {
			console.log(error.message) // need to desplay Errormessage here
		})  
	}
}

//Login User which dispatch getUser after getting data which is token and get user from that token from server

export const logUser = (formData)=>{
	console.log("formData:", formData);
	return dispatch => {
		//login
		axiosInstance.post("http://localhost:8004/api/auth/login",formData)
		.then(res => {
			console.log(res)
			return res
		})
		.then(res =>{
			console.log("res.data",res.data);
			getUser(dispatch);
		} )
		// .then(data => console.log(`[Data after getting User]: ${data}`))
		.catch(error => {
			console.log(error.message) // need to desplay Errormessage here
		})  
	}
}












// ==================================//
const setCollection =(data) =>{
	return{
	type: actionTypes.SET_COLLECTION,
	payload: data.books
}}
const collectionError = (error) => {
	return{
		type: actionTypes.COLLECTION_ERROR,
		payload:error
	}
}
const getCollectionStart =()=>({
	type: actionTypes.GET_COLLECTION
})
//getting collection of books 
export const getCollection = (userId) =>{
	return dispatch => {
		dispatch(getCollectionStart());
		axiosInstance(`http://localhost:8004/api/user/${userId}/collection`)	
		.then(res => dispatch(setCollection(res)))
		.catch(error => dispatch(collectionError(error)));
	}
}
const addBook = (book) =>({
	type:  actionTypes.ADD_BOOK,
	payload: book
})
//adding book to collection
export const addCollection = (userId,volumeId) =>{
	return dispatch =>{
		axiosInstance(`http://localhost:8004/api/users/${userId}/collection/add/${volumeId}`)
		.then(res => dispatch(addBook(res)))
		.catch(error => dispatch(collectionError(error)))
	}
}
		
//postBook to collection
// export const postCollection = (filteredId) =>{
// 	return dispatch => {
// 		fetch(`/users/${filteredId}/books`)
// 		.then(res => {
// 			console.log(res)
// 			const data = res.json()
// 		}).then(data => {
// 			console.log(data);
// 		});
// 	}
// }
	

	
 
