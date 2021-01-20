import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "left",
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Book-Share
          </Typography>
          {mediaQuery ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
                color="inherit"
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
                  <div>
                    <MenuItem onClick={handleClose}>
                      <Button color="inherit" component={NavLink} to="/library">
                        Library
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        color="inherit"
                        component={NavLink}
                        to="/collection"
                      >
                        Collection
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        color="inherit"
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
                      <Button color="primary" component={NavLink} to="/">
                        Login
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleSignUpCLose}>
                      <Button color="inherit" component={NavLink} to="/">
                        SignUp
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button color="inherit" component={NavLink} to="/about">
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
                color="inherit"
                onClick={handleNavClick}
                component={NavLink}
                to="/library"
              >
                Library
              </Button>
              <Button
                color="inherit"
                onClick={handleNavClick}
                component={NavLink}
                to="/collection"
              >
                Collection
              </Button>
              <Button color="inherit" component={NavLink} to="/findRental">
                FindRental
              </Button>
              <Button color="inherit" onClick={handleLogOutClick}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => changeLogIn()}
                component={NavLink}
                to="/"
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => changeSignUp()}
                component={NavLink}
                to="/"
              >
                SignUp
              </Button>
              <Button color="inherit" component={NavLink} to="/about">
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
