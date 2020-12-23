import * as actionTypes from "../actionTypes";
import axiosInstance from "../../util/apiCall"

// ============== Auth =====================//

export const getUser = (dispatch)=>{
		// /gettingUser from database
		axiosInstance.get("http://localhost:8004/api/user").then(res => {
			dispatch({
				type: actionTypes.SET_USER,
				payload: res.data
			})
		}).catch(error => {
			getUserFail(dispatch, error.response.data.message)
		})  
	}


export const loadUser = () => {
	return dispatch =>	getUser(dispatch)
	}

const signUpUserFail = (dispatch,error) =>{
	dispatch({
		type: actionTypes.SIGN_USER_FAIL,
		payload:error
	})
}
const getUserFail = (dispatch,error) => {
	dispatch({
		type:actionTypes.GET_USER_FAIL,
		payload:error
	})
}
const logUserFail = (dispatch, error) =>{
	dispatch({
		type:actionTypes.LOG_USER_FAIL,
		payload:error
	})
}
export const signUpUser = (formData)=>{
	return dispatch => {
		// /signup
		axiosInstance.post("http://localhost:8004/api/auth/signup",formData)
		.then(res =>{
			getUser(dispatch);
		} )
		.catch(error => {
			signUpUserFail(dispatch, error.response.data.message) 
		})  
	}
}

//Login User which dispatch getUser after getting data which is token and get user from that token from server

export const logUser = (formData)=>{
	return dispatch => {
		//login
		axiosInstance.post("http://localhost:8004/api/auth/login",formData)
		.then(res =>{
			getUser(dispatch);
		} )
		.catch(error => {
		   logUserFail(dispatch, error.response.data.message) // need to desplay Errormessage here
		})  
	}
}

//LogOut user
const loggingOut = (dispatch)=>{
	dispatch({
		type:actionTypes.LOG_OUT_USER
	})
}


export const logOutUser = () =>{
	return dispatch =>{
		axiosInstance.post("http://localhost:8004/api/auth/logout")
		.then(()=>{
			loggingOut(dispatch)
			clearRentalUser(dispatch)
		})
	}
}

//=========== clear error ============//
export const clearError = (dispatch) => {
	dispatch({
		type: actionTypes.CLEAR_ERROR
	})
}
export const manualClearError = () => {
	return dispatch => {
		clearError(dispatch)
	}
}
export const clearAlert = () => {
return dispatch=> {
	setTimeout(()=>{
		clearError(dispatch)
			},3000)
}
}

// ==================================//
const setCollection =(dispatch,data) =>{
	dispatch({
	type: actionTypes.SET_COLLECTION,
	payload: data.books
})}
const collectionError = (dispatch,error) =>
 dispatch({
		type: actionTypes.COLLECTION_ERROR,
		payload:error
	})

const getCollectionStart =()=>({
	type: actionTypes.GET_COLLECTION
})
//getting collection of books 
export const getCollection = (userId) =>{
	return dispatch => {
		dispatch(getCollectionStart());
		axiosInstance(`http://localhost:8004/api/user/${userId}/collection`)	
		.then(res => setCollection(dispatch,res))
		.catch(error => collectionError(dispatch,error));
	}
}
const addBook = (dispatch,data) =>(
	dispatch({
	type:  actionTypes.ADD_BOOK,
	payload: data
}))

const addBookMessage = (dispatch,msg) => {
	dispatch({
		type : actionTypes.ADD_BOOK_MESSAGE,
		payload:msg
	})
}
//adding book to collection
export const addCollection = (userId,volumeId) =>{
	
	return dispatch => {
		console.log(`userId: ${userId}`,  `volumeId: ${volumeId}`);
		axiosInstance.post(`http://localhost:8004/api/user/${userId}/collection/add/${volumeId}`)
		.then(res => {
			addBookMessage(dispatch, res.data.message)
			addBook(dispatch,res.data.newBook)})
		.catch(error =>{
			collectionError(dispatch,error.response.data.message)}) 
	}
}
	
const removeBook = (dispatch,data) => {
	dispatch({
		type: actionTypes.REMOVE_BOOK,
		payload:data
	})
}
//removin book from collection

export const removeCollection = (userId, book_Id) => {
	return dispatch => {
		axiosInstance.delete(`http://localhost:8004/api/user/${userId}/collection/remove/${book_Id}`)
		.then(res => {
			removeBook(dispatch, res.data.removedBook)
			addBookMessage(dispatch, res.data.message)
		})
		.catch(error => collectionError(dispatch,error.response.data.message))
	}
}
		
// findingUsers
const rentalUsers =(dispatch,data) =>{
	dispatch({
		type:actionTypes.RENTAL_USERS,
		payload:data
	})
}
export const clearRentalUser = (dispatch) => dispatch({
	type: actionTypes.CLEAR_RENTAL_USERS
})

export const findRental = (userId, radius, bookName) => {
	return dispatch =>{
		axiosInstance.get(`http://localhost:8004/api/user/${userId}/findUsers`,
		{
			params:{radius:radius, bookName:bookName}
		}).then(res =>{
			console.log("response after sending radius and userId for serach rental:", res)
			rentalUsers(dispatch,res.data)
		}	)
	}
	
	
}
	

	
 
