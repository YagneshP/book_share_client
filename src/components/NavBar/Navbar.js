import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  MenuItem,
  Menu,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../../store/actions/userAction";
import { clearRentalUser } from "../../store/actions/rentalUsersActions";
import { getCollection } from "../../store/actions/collectionAction";
import { clearResult } from "../../store/actions/seachAction";
import { logInForm, signUpForm } from "../../store/actions/toggleFormAction";
import "./Navbar.css"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
		textAlign: "left",
	
	},
	colorPrimary:{
		backgroundColor:'#D9EAFF'
	}
}));

function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const mediaQuery = useMediaQuery(`(max-width:600px)`);
  const {
    isAuthenticated,
    logOut,
    clearLibResult,
    changeSignUp,
    changeLogIn,
    clearRental,
    rentalUsers,
  } = props;
  useEffect(() => {
    if (!mediaQuery) {
      setAnchorEl(null);
    }
  }, [mediaQuery]);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (rentalUsers) {
      clearRental();
    }
    setAnchorEl(null);
  };
  const handleLogInClose = () => {
    setAnchorEl(null);
    changeLogIn();
  };
  const handleSignUpCLose = () => {
    setAnchorEl(null);
    changeSignUp();
  };

  const handleLogOutClick = () => {
    setAnchorEl(null);
    clearLibResult();
    logOut();
  };

  const handleNavClick = () => {
    if (rentalUsers) {
      clearRental();
    }
  };
  return (
    <div >
      <AppBar position="static" className={`${classes.root} ${classes.colorPrimary}`}>
        <Toolbar>
					<h3 className={`Brand-Title`}>BookShare</h3>
          {mediaQuery ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {isAuthenticated ? (
                  <div >
                    <MenuItem onClick={handleClose}>
                      <Button  component={NavLink} to="/library">
                        Library
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        component={NavLink}
                        to="/collection"
                      >
                        Collection
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        component={NavLink}
                        to="/findRental"
                      >
                        FindRental
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleLogOutClick}>
                      <Button color="inherit">Logout</Button>
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem onClick={handleLogInClose}>
                      <Button  component={NavLink} to="/auth">
                        Login
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleSignUpCLose}>
                      <Button  component={NavLink} to="/auth">
                        SignUp
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button  component={NavLink} to="/about">
                        About
                      </Button>{" "}
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </>
          ) : isAuthenticated ? (
            <>
              <Button
                onClick={handleNavClick}
                component={NavLink}
                to="/library"
              >
                Library
              </Button>
              <Button
                onClick={handleNavClick}
                component={NavLink}
                to="/collection"
              >
                Collection
              </Button>
              <Button component={NavLink} to="/findRental">
                FindRental
              </Button>
              <Button  onClick={handleLogOutClick}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => changeLogIn()}
                component={NavLink}
                to="/auth"
              >
                Login
              </Button>
              <Button
                onClick={() => changeSignUp()}
                component={NavLink}
                to="/auth"
              >
                SignUp
              </Button>
              <Button component={NavLink} to="/about">
                About
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  getuserCollection: (id) => dispatch(getCollection(id)),
  logOut: () => dispatch(logOutUser()),
  clearLibResult: () => dispatch(clearResult()),
  changeSignUp: () => dispatch(signUpForm()),
  changeLogIn: () => dispatch(logInForm()),
  clearRental: () => dispatch(clearRentalUser(dispatch)),
});
const mapStateToProps = (state) => ({
  rentalUsers: state.rentalUsers.rentalUser,
  isAuthenticated: state.user.isAuthenticated,
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
