import React from "react";
import { CircularProgress } from "@material-ui/core";
import BookTemplet from "../BookTemplet/BookTemplet";

export default function BookCard(props) {
  let { books, user } = props;
  let bookList = "Loading...";
  {
    books === null
      ? (bookList = <CircularProgress />)
      : (bookList = books.map((book) => (
          <BookTemplet
            key={book.title}
            user={user}
            isLoggedIn={true}
            book={book}
          />
        )));
  }
  return bookList;
}
