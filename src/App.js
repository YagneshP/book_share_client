import React from "react"
import Navbar from "./components/NavBar/Navbar";
import BookCollection  from "./components/BookCollection/BookCollection";
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import {Grid} from "@material-ui/core";
import LogInForm from "./components/LogInForm/LogInForm";
import Library from "./components/Library/Library";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AlertState from "./components/AlertState/AlertState"
import RentalSearch from "./components/RentalSearch/RentalSearch";
import About from "./components/About/About";

const useStyles = makeStyles((theme) => ({
	navbar: {
		textAlign:"center"
	},
}));


function App(props) {
	const classes = useStyles();
	return (
		<Router>
			< Grid container direction = "column"	 >
	     	<Grid item className={classes.navbar}>
		      <Navbar / >
		    </Grid>
				<Grid item >
				<AlertState/>
				</Grid>
        <Grid item  >
					<Switch>
					<Route exact path="/about"><About/></Route>
						<PrivateRoute exact path="/library">	<Library/></PrivateRoute>
				  	<PrivateRoute exact path="/collection"><BookCollection/></PrivateRoute>
						<PrivateRoute exact path="/findRental"><RentalSearch/></PrivateRoute>
						<Route  path="/" component={LogInForm}/>
					
					</Switch>
		    </Grid>   
    	</Grid>
		</Router>
  );
}


export default App;