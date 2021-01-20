import * as actionTypes from "../actionTypes";
import axiosInstance from "../../util/apiCall";
// ============Collection Actions ======================//

//=====getting collection of books ========//
export const getCollection = (userId) => {
  return (dispatch) => {
    dispatch(getCollectionStart());
    axiosInstance(`/user/${userId}/collection`)
      .then((res) => setCollection(dispatch, res))
      .catch((error) => collectionError(dispatch, error));
  };
};
const getCollectionStart = () => ({
  type: actionTypes.GET_COLLECTION,
});
const setCollection = (dispatch, data) => {
  dispatch({
    type: actionTypes.SET_COLLECTION,
    payload: data.books,
  });
};

//======= Add Book To Collection Action ======//

export const addCollection = (userId, volumeId) => {
  return (dispatch) => {
    axiosInstance
      .post(`/user/${userId}/collection/add/${volumeId}`)
      .then((res) => {
        addBookMessage(dispatch, res.data.message);
        addBook(dispatch, res.data.newBook);
      })
      .catch((error) => {
        collectionError(dispatch, error.response.data.message);
      });
  };
};
const addBook = (dispatch, data) =>
  dispatch({
    type: actionTypes.ADD_BOOK,
    payload: data,
  });

const addBookMessage = (dispatch, msg) => {
  dispatch({
    type: actionTypes.ADD_BOOK_MESSAGE,
    payload: msg,
  });
};
//======= Remove book from collection Action ========//

export const removeCollection = (userId, book_Id) => {
  return (dispatch) => {
    axiosInstance
      .delete(`/user/${userId}/collection/remove/${book_Id}`)
      .then((res) => {
        removeBook(dispatch, res.data.removedBook);
        addBookMessage(dispatch, res.data.message);
      })
      .catch((error) => collectionError(dispatch, error.response.data.message));
  };
};

const removeBook = (dispatch, data) => {
  dispatch({
    type: actionTypes.REMOVE_BOOK,
    payload: data,
  });
};
//====== collection error action ========//
const collectionError = (dispatch, error) =>
  dispatch({
    type: actionTypes.COLLECTION_ERROR,
    payload: error,
  });
