import React, { useEffect } from "react";
import { TextField,Grid, Link, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Icon.css"
import { Formik, Form, Field, useField } from "formik";

import * as Yup from "yup";
import { signUpUser, logUser } from "../../store/actions/userAction";
import { connect } from "react-redux";
import { toggleForm } from "../../store/actions/toggleFormAction";
import { Icon, InlineIcon } from '@iconify/react';
import formLine from '@iconify/icons-clarity/form-line';
import loginIcon from '@iconify/icons-carbon/login';
import CustomButton from "../customComponent/CustomButton/CustomButton";

const useStyles = makeStyles((theme) => ({
  main: {
		display:"flex",
		justifyContent:"space-between"
  },
  formBox: {
		flexDirection:"column",
		padding: "12px 25px",
		backgroundColor:"rgba(4, 28, 41, 0.25)",
    borderRadius: "10px",
  },
  root: {
		display:"flex",
		flexDirection:"column",
		alignItems:"center",
    "& > *": {
			marginBottom:theme.spacing(1),
			width: "100%",
		},
	
  },
}));

const useStylesInput = makeStyles((theme)=> ({
	root:{
    borderRadius: 4
	},
	input:{
		color:"#041C29",
		backgroundColor: "white",
		'&::placeholder': {
      color: 'white'
	},
	"&:focused":{
		backgroundColor:"yellow"
	}
}
}))

const initialValues = {
  firstName: "",
  lastName: "",
  city: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be min 8 or max 30 characters long")
    .max(30, "Password must be min 8 or max 30 characters long ")
    .required("Password is required"),
});

const CustomField = ({ label, placeholder, type, required, ...props }) => {
	const inputClasses = useStylesInput();
  const [field, form] = useField(props);
  const errorText = form.error && form.touched ? form.error : "";
  return (
    <TextField
		variant= "filled"
		size="small"
      type={type}
			required={required}
			label={label}
			InputProps={{
				className: inputClasses.input
			}}
      {...field}
      helperText={errorText}
      error={!!errorText}
      placeholder={placeholder}
    />
  );
};
const LogInForm = (props) => {
  const { isAuthenticated, loggedIn, toggleForm } = props;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/library");
    }
  }, [isAuthenticated, props.history]);
	const classes = useStyles();
	
  return (
    <Container className={classes.main} xs={12}>
      <Grid item container className={classes.formBox} xs={12} sm={6}  >
        <Grid item style={{ textAlign: "center", paddingBottom:"25px"}}>
        	<h3 style={{display:"inline-block", fontSize:"1.9rem", margin:"0.5rem 0"}}> {loggedIn ? "LogIn" : "SignUp"} Form</h3>
        </Grid>
        <Grid item >
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              loggedIn
                ? props.logIn({
                    email: values.email,
                    password: values.password,
                  })
                : props.signUp(values);
            }}
            validationSchema={
              loggedIn
                ? validationSchema
                : validationSchema.shape({
                    firstName: Yup.string()
                      .min(2, "Too Short!")
                      .max(70, "Too Long!")
                      .required("Required"),
                    lastName: Yup.string()
                      .min(2, "Too Short!")
                      .max(70, "Too Long!"),
                    city: Yup.string().required("City Name is required!"),
                  })
            }
          >
            {(props) => (
              <Form className={classes.root}>
                {loggedIn ? null : (
                  <>
                    <Field
                      id="firstName"
                      name="firstName"
                      as={CustomField}
                      label="FirstName"
                      required
                    ></Field>
                    <Field
                      id="lastName"
                      name="lastName"
                      as={CustomField}
                      label="LastName"
                    ></Field>
                    <Field
                      id="city"
                      name="city"
                      as={CustomField}
                      label="City"
                      required
                    ></Field>
                  </>
                )}
                <Field
                  id="email"
                  name="email"
                  as={CustomField}
                  label="Email"
                  required
                ></Field>
                <Field
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  as={CustomField}
                  required
                />
								<CustomButton type="submit"   style={{width:"200px"}} >
								{loggedIn ? "Log In" : "Sign Up"}
								</CustomButton>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid item>
          <p style={{ textAlign: "center" }}>
           { loggedIn ? `Don't have an account ?` : `Already have an account ?`}
           <span style={{fontWeight:"bold"}}> <Link onClick={toggleForm}>{loggedIn ? "SignUp" : "LogIn"}</Link>{" "}</span>
            here
          </p>
        </Grid>
      </Grid>
			<Grid item  sm={4} style={{ alignSelf:"center"}}>
			{loggedIn?<Icon icon={loginIcon} className="icon"/>: <Icon icon={formLine} className="icon" /> }
			</Grid>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  loggedIn: state.form.logInForm,
});
const mapDispatchToProps = (dispatch) => ({
  signUp: (values) => {
    dispatch(signUpUser(values));
  },
  logIn: (values) => {
    dispatch(logUser(values));
  },
  toggleForm: () => {
    dispatch(toggleForm());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
