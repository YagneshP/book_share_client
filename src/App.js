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

const useStyles = makeStyles((theme) => ({
	navbar: {
		textAlign:"center"
	},
}));


function App(props) {
	const classes = useStyles();
	// const[books, setBooks] = useState(null);
	// const[user, setUser] = useState(null);
	const{collection} = props;
	// const[collection, setCollection]=useState(null);
	useEffect(()=>{
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
		
	
		// const getCollection = async ()=>{
		// 	const filteredId = 1;
		// 	 const res = await fetch(`/users/${filteredId}`)
		// 		const data = res.json();
		// 		return data;
		// 	 }
	return (
		<Router>
			< Grid container direction = "column"	 >
	     	<Grid item className={classes.navbar}>
		      <Navbar / >
		    </Grid>
				{/* <Grid item >
					<SearchBar/>
				</Grid> */}
				
        <Grid item  >
					<Switch>
				
							{/* <BookCard user={user} books={books} / > */}
						
					
						<PrivateRoute exact path="/library">	<Library/></PrivateRoute>
					
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
collection : state.user.collections
})

export default connect(mapStateToProps)(App) ;