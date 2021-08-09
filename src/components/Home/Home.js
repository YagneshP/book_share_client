import {  Container, Grid} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as LpMain}  from "../../images/lp-main.svg";
import CustomButton from '../customComponent/CustomButton/CustomButton';
import "./Home.css"
const Home = () => {
	return (
		<Container style={{ height:500, display:"flex"}}>
		<Grid container style={{ alignItems:"center",justifyContent:"center"}} >
			<Grid item xs={12} sm={7} className="grid-1">
					<h2 className={`main-desc`}> Enjoy Sharing & Renting Your Books</h2>
					<p className={`headline`}>Find books near you and enjoy reading!</p>
					<CustomButton component = {Link} to="/auth">Register Here</CustomButton>
			</Grid>
			<Grid item sm={4} style={{textAlign:"right"}} >
				<LpMain className='lp-main'/>
			</Grid>
		</Grid>
	</Container>
	)
}

export default Home
