import React from "react";
import Navbar from "./components/NavBar/Navbar";
import BookCollection from "./components/BookCollection/BookCollection";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import LogInForm from "./components/LogInForm/LogInForm";
import Library from "./components/Library/Library";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AlertState from "./components/AlertState/AlertState";
import RentalSearch from "./components/RentalSearch/RentalSearch";
import About from "./components/About/About";
import Home from "./components/Home/Home"
import Footer from "./components/Footer/Footer";

function App(props) {
 
  return (
		<div style={{ position:"relative"}}>
		
    <Router>

      <Grid container direction="column"  >
        <Grid item >
          <Navbar />
        </Grid>
        <Grid item top={40} left="40%" postion="absolute">
          <AlertState />
        </Grid>
        <Grid item>
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <PrivateRoute exact path="/library">
              {" "}
              <Library />
            </PrivateRoute>
            <PrivateRoute exact path="/collection">
              <BookCollection />
            </PrivateRoute>
            <PrivateRoute exact path="/findRental">
              <RentalSearch />
            </PrivateRoute>
            <Route exact path="/auth" component={LogInForm} />
						<Route exact path="/" component={Home}/>
          </Switch>
        </Grid>
				<Grid item  >
					<Footer ></Footer>
        </Grid>
      </Grid>
		
    </Router>
	
		</div>
  );
}

export default App;
