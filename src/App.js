import Navbar from "./components/NavBar/Navbar";
import BookCard from "./components/BookCard/BookCard";
import BookCollection  from "./components/BookCollection/BookCollection";
import {
	makeStyles
} from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
	Grid
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({

	library: {
		margin: "15px 15px"
	},
}));

function App() {
	const classes = useStyles();
	return (
		<Router>
			< Grid container direction = "column"	 >
	     	<Grid item >
		      <Navbar / >
		    </Grid>
        <Grid item container className = {classes.library} >
					<Switch>
						<Route path="/library">
							<BookCard / >
						</Route>
						<Route path="/users/:id/collection">
							<BookCollection / >
						</Route>
					
					</Switch>
   	     
		    </Grid>   
    	</Grid>
		</Router>
	
  );
}

export default App;