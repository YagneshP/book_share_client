import React, { useState } from 'react';
import {fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link, NavLink } from 'react-router-dom';
import {connect} from "react-redux"
import {getCollection,logOutUser} from "../../store/actions/userAction"
import { clearResult } from '../../store/actions/seachAction';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
	},

  
}));

 function Navbar(props) {
	const classes = useStyles();

const {getuserCollection,isAuthenticated,logOut,clearLibResult} = props;
const handleClick = () => {
	clearLibResult()
  logOut()
}
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography  className={classes.title}>
            BookShare
          </Typography>

				
					{isAuthenticated ?(<>
					<Button color="inherit" component={NavLink} to="/library">Library</Button>
	        <Button color="inherit" component={NavLink} to="/collection">Collection</Button>
         <Button color="inherit" onClick={handleClick}>Logout</Button>
				 </>):(<><Button color="inherit">Login</Button>
					<Button color="inherit">SignUp</Button></>)} 
					<Button color="inherit">About</Button> 
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapDispatchToProps = dispatch =>({
	getuserCollection : id => dispatch(getCollection(id)),
	logOut:()=> dispatch(logOutUser()),
	clearLibResult:()=>dispatch(clearResult())
})
const mapStateToProps = state => ({
	isAuthenticated : state.user.isAuthenticated
})
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);