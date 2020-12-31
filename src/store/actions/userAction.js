import * as actionTypes from "../actionTypes";
import axiosInstance from "../../util/apiCall"
import {clearRentalUser} from "./rentalUsersActions"
// ============== Auth actions =====================//


//=== signup user actions ======//
export const signUpUser = (formData)=>{
	return dispatch => {
		// /signup
		axiosInstance.post("/auth/signup",formData,{withCredentials: true})
		.then(res =>{
			getUser(dispatch);
		} )
		.catch(error => {
		console.log(error.toJSON())
			console.log(error)
			signUpUserFail(dispatch, error.response.data.message) 
		})  
	}
}

const signUpUserFail = (dispatch,error) =>{
	dispatch({
		type: actionTypes.SIGN_USER_FAIL,
		payload:error
	})
}

//Login User which dispatch getUser after getting data which is token and get user from that token from server

export const logUser = (formData)=>{
	return dispatch => {
		//login
		axiosInstance.post("/auth/login",formData,{withCredentials: true})
		.then(res =>{
			getUser(dispatch);
		} )
		.catch(error => {
		   logUserFail(dispatch, error.response.data.message) // need to desplay Errormessage here
		})  
	}
}

const logUserFail = (dispatch, error) =>{
	dispatch({
		type:actionTypes.LOG_USER_FAIL,
		payload:error
	})
}

export const getUser = (dispatch)=>{
		// /gettingUser from database
		axiosInstance.get("/user",{withCredentials: true}).then(res => {
			dispatch({
				type: actionTypes.SET_USER,
				payload: res.data
			})
		}).catch(error => {
			getUserFail(dispatch, error.response.data.message)
		})  
	}

const getUserFail = (dispatch,error) => {
	dispatch({
		type:actionTypes.GET_USER_FAIL,
		payload:error
	})
}

//LogOut user
const loggingOut = (dispatch)=>{
	dispatch({
		type:actionTypes.LOG_OUT_USER
	})
}
export const logOutUser = () =>{
	return dispatch =>{
		axiosInstance.post("/auth/logout")
		.then((res)=>{
			console.log(res)
			loggingOut(dispatch)
			clearRentalUser(dispatch)
		}).catch(error => {
			logUserFail(dispatch,error.response.data.message)
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



	

	
 
