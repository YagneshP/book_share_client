import React from 'react'
import {Button,Grid,Card, CardContent, Typography} from '@material-ui/core'
import { connect } from 'react-redux'
import { clearRentalUser } from '../../../store/actions/rentalUsersActions'

const RentalUsers = (props) => {
	const {rentalUsers,clearResult} = props
	const handleClick = () =>{
	clearResult()
	}
	
	return (
		<div>
			{rentalUsers === null ? null :rentalUsers.lenght !== 0 ?<div style={{ textAlign:"center", marginTop:"15px", marginBottom:"25px"}} ><Button variant="contained" color="primary" onClick={handleClick}>Clear Result</Button></div> : null}
			
			<Grid container style={{marginTop:25}} spacing={2} justify="space-around">
				{rentalUsers ?
					 rentalUsers.length === 0 ?
				// <h1>We don't find any user</h1>
				(<Grid item><Typography variant="h6" component="p">We don't find any user who have this book</Typography></Grid>) 
					: 
					rentalUsers.map((rentalUser) => (
							<Grid key={rentalUser.email} item>
								<Card style={{backgroundColor:"rgb(76 57 185 / 42%)"}}>
									<CardContent>
										<Typography>
										<strong>	Name:</strong> {rentalUser.firstName}
										</Typography>
										<Typography>
										<strong> Email:</strong>{rentalUser.email}
										</Typography>
									</CardContent>
									</Card>
							</Grid>
						))
			 : null}
				 </Grid>
		</div>
	)
}
const mapStateToProps = state => ({
	rentalUsers: state.rentalUsers.rentalUser
 })
 const mapDispatchToProps =  dispatch => ({
	clearResult : ()=> dispatch(clearRentalUser(dispatch))
 })

export default connect(mapStateToProps, mapDispatchToProps)(RentalUsers)
