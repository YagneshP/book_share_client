import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {connect} from "react-redux"
import { clearAlert,  manualClearError } from '../../store/actions/userAction';
import { Snackbar } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
		margin:"15px auto",
    width: '50%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

 function AlertState (props) {
	 const{userError,bookError,removeError,removeAlert, message} = props;
	 useEffect(()=>{
			if(userError || bookError || message){
				removeAlert()
			}
	 },[userError,bookError,removeAlert,message])
  const classes = useStyles();

  return (<div className={classes.root}>{
		(userError || bookError || message) ?
	// <Snackbar open={(userError || bookError || message)?true :false}>
		<Alert variant="filled" severity={(userError||bookError) ? "error" : message ? "success":"warning"} onClose={removeError}>{userError ? userError : bookError ? bookError : message ? message : null}</Alert>
	//  </Snackbar>	
		
	: null
	}
    </div>
  );
}


const mapStateToProps = state => ({
	userError : state.user.error,
	message: state.user.message,
	bookError : state.library.error
});

const mapDispatchToProps = dispatch => ({
	removeError : () => dispatch(manualClearError()),
	removeAlert : () => dispatch(clearAlert())
})
export default connect(mapStateToProps, mapDispatchToProps)(AlertState);