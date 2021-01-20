import { CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import BookTemplet from "../BookTemplet/BookTemplet";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  ul: {
    display: "flex",

    flexWrap: "wrap",
    listStyle: "none",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const BookCollection = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  let { collection } = props;
  const bookPerPage = 3;
  const totalBooks = collection !== null ? collection.length : 0;
  const totalPages = Math.ceil(totalBooks / bookPerPage);
  const indexOfLastBook = currentPage * bookPerPage;
  const indexOfFirstBook = indexOfLastBook - bookPerPage;
  const currentBooks =
    collection !== null
      ? collection.slice(indexOfFirstBook, indexOfLastBook)
      : 0;
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const classes = useStyles();

  let bookCollection = <CircularProgress />;

  return (
    <>
      <div>
        {collection === null ? (
          bookCollection
        ) : collection.length === 0 ? (
          <Typography
            style={{ textAlign: "center" }}
            variant="h6"
            component="p"
          >
            You don't have any book in your library
          </Typography>
        ) : (
          currentBooks.map((collection) => (
            <BookTemplet
              key={collection.id}
              isCollection={true}
              book={collection}
            />
          ))
        )}
      </div>
      <div className={classes.root}>
        {collection !== null && collection.length !== 0 ? (
          <Pagination
            count={totalPages}
            page={currentPage}
            className={classes.ul}
            onChange={handleChange}
            color="primary"
          />
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  collection: state.user.user.books,
});

export default connect(mapStateToProps)(BookCollection);
