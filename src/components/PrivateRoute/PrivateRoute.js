import React ,{useState} from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({children, isAuthenticated,...rest}) => {
	console.log("restProps",isAuthenticated);

	// const[isAuthenticated, setIsAuthenticated]= useState(true);
	return (<Route {...rest} render={({location})=> {
		return  isAuthenticated ? children : <Redirect to={{
			pathname:"/login"
		}} /> 
	}}>

	</Route>
	
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute);
