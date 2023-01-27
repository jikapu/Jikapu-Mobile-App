import * as types from "../../actionTypes";
/**
 * Handle Loader
 */
 export const loadingAction = (payload) => (dispatch) =>
 dispatch({
   type: types.LOADING,
   payload,
 });