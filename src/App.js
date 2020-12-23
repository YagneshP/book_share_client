import React,{ useEffect, useState } from "react"
import Navbar from "./components/NavBar/Navbar";
import BookCard from "./components/BookCard/BookCard";
import BookCollection  from "./components/BookCollection/BookCollection";
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import {Grid} from "@material-ui/core";
import {connect} from "react-redux"
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LogInForm from "./components/LogInForm/LogInForm";
import {getSearchData} from "./store/actions/seachAction"
import SearchBar from "./components/NavBar/searchBar/SearchBar";
import Library from "./components/Library/Library";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { loadUser } from "./store/actions/userAction";
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
	const{collection,isAuthenticated, loadUser} = props;
	// const[collection, setCollection]=useState(null);
	useEffect(()=>{
		loadUser()
		// getSearchData()
		// (async()=>{
		// const booksFromApi = await getData();
		// // const currentUser  = await getCollection();
		// // setUser(currentUser);
		// setBooks(booksFromApi);
		// // setCollection(currentUser.books);
		// })();
	},
	[]);
		
	
	return (
		<Router>
			< Grid container direction = "column"	 >
	     	<Grid item className={classes.navbar}>
		      <Navbar / >
		    </Grid>
				{/* <Grid item >
					<SearchBar/>
				</Grid> */}
				
				<Grid item >
				<AlertState/>
				</Grid>
        <Grid item  >
					<Switch>
				
							{/* <BookCard user={user} books={books} / > */}
						
					<Route exact path="/about"><About/></Route>
						<PrivateRoute exact path="/library">	<Library/></PrivateRoute>
				  	<PrivateRoute exact path="/collection"><BookCollection/></PrivateRoute>
						<PrivateRoute exact path="/findRental"><RentalSearch/></PrivateRoute>
						<Route exact path="/users/:id/collection">
							{/* <BookCollection user={user} collection={collection}/ > */}
						</Route>
						<Route  path="/" component={LogInForm}/>
					
					</Switch>
		    </Grid>   
    	</Grid>
		</Router>
  );
}

const mapStateToProps = state =>({
collection : state.user.collections,
isAuthenticated:state.user.isAuthenticated
})

const mapDispatchToProps = dispatch =>({
	loadUser : () => { dispatch(loadUser())}
})
export default connect(mapStateToProps, mapDispatchToProps)(App) ;