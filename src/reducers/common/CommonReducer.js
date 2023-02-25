import * as types from "../../actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  isSuccess: false,
  successMessage: '',
  sessionExpireMessage: '',
  isSessionError: false,

};
export const commonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADING:
      return {...state, isLoading: action.payload};
    case types.ERROR:
      return {...state, isError: true, errorMessage: action.payload};
    case types.SUCCESS_MESSAGE:
      return {...state, isSuccess: true, successMessage: action.payload};
    case types.SESSION_EXPIRED_MESSAGE:
      return {
        ...state,
        isSessionError: true,
        sessionExpireMessage: action.payload,
      };
      case types.CLEAR_STORE:
        return INITIAL_STATE;
    default:
      return state;
  }
}
