import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import * as actions from "../../../store/actions/seachAction";
import { connect } from "react-redux";

import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import { Formik, Form, Field, useField } from "formik";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "500px",
    margin: "10px 20px",
  },
  searchForm: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  input: {
    // marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
    marginLeft: 5,
    backgroundColor: "#1d751dd6",
    borderRadius: "10%",
    "&:hover": {
      backgroundColor: "#caad02",
    },
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const initialValues = {
  query: "",
};

const validationSchema = Yup.object().shape({
  query: Yup.string().required("Query is Required"),
});

const CustomField = ({ label, placeholder, type, required, ...props }) => {
  const [field, form] = useField(props);
  const errorText = form.error && form.touched ? form.error : "";
  return (
    <TextField
      type={type}
      required={required}
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
      placeholder={placeholder}
    />
  );
};
const SearchBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.searchForm}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          props.searchData(values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <>
            <Form>
              <Field
                id="query"
                name="query"
                as={CustomField}
                placeholder="SearchBooks"
                required
              ></Field>

              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  searchData: (q) => dispatch(actions.getSearchData(q)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
