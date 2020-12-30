import React  from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({children, isAuthenticated,...rest}) => {
	return (<Route {...rest} render={()=> {
		return  isAuthenticated ? children : <Redirect to={{
			pathname:"/"
		}} /> 
	}}>

	</Route>
	
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute);
