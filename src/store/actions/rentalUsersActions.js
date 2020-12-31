import * as actionTypes from "../actionTypes";
import axiosInstance from "../../util/apiCall"

// Finding Rental Users
export const findRental = (userId, radius, bookName) => {
	return dispatch =>{
		axiosInstance.get(`/user/${userId}/findUsers`,
		{
			params:{radius:radius, bookName:bookName}
		}).then(res =>{
			console.log("response after sending radius and userId for serach rental:", res)
			rentalUsers(dispatch,res.data)
		}	)
	}
}

const rentalUsers =(dispatch,data) =>{
	dispatch({
		type:actionTypes.RENTAL_USERS,
		payload:data
	})
}
export const clearRentalUser = (dispatch) => dispatch ({
	type: actionTypes.CLEAR_RENTAL_USERS
})
