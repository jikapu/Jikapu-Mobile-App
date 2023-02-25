import * as TYPES from "../../actionTypes";
const initialState = {
  isLoading: false,
  isLoggedIn: null,
  userData: null,
  loginToken: null,
  wishlistData: [],
  cartData: {},
  jFreshData: {},
  cardsListData: [],
  addressListData: [],
  orderListData: [],
  addOrderData: [],
  allCouponData: [],
  activeCouponData: [],
  expiredCouponData: [],
  redeemedCouponData: [],
  subscriptionListData: [],
  orderCompleteData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userData: action.payload,
        loginToken: action.payload.token,
      };
    case TYPES.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        userData: null,
        loginToken: null,
      };
    case TYPES.SIGNUP:
      return { ...state, isLoggedIn: false, userData: action.payload };
    case TYPES.SIGNUP_SUCCESS:
      return { ...state, isLoggedIn: false, userData: action.payload };
    case TYPES.SIGNUP_FAIL:
      return { ...state, isLoggedIn: false };
    case TYPES.CLEAR_STORE:
      return {};
    case TYPES.GET_WISHLIST_SUCCESS:
      return { ...state, wishlistData: action.payload };
    case TYPES.GET_WISHLIST_FAIL:
      return { ...state, wishlistData: null };
    case TYPES.GET_CART_SUCCESS:
      return { ...state, cartData: action.payload };
    case TYPES.GET_CART_FAIL:
      return { ...state, cartData: null };
    case TYPES.GET_JFRESHCART_SUCCESS:
      return { ...state, jFreshData: action.payload };
    case TYPES.GET_JFRESHCART_FAIL:
      return { ...state, jFreshData: null };
    case TYPES.CARDS_LIST_SUCCESS:
      return { ...state, cardsListData: action.payload };
    case TYPES.CARDS_LIST_FAIL:
      return { ...state, cardsListData: null };
    case TYPES.ADDRESS_LIST_SUCCESS:
      return { ...state, addressListData: action.payload };
    case TYPES.ADDRESS_LIST_FAIL:
      return { ...state, addressListData: null };
    case TYPES.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case TYPES.UPDATE_USER_FAIL:
      return {
        ...state,
        userData: null,
      };
    case TYPES.GET_ORDER_SUCCESS:
      return { ...state, orderListData: action.payload };
    case TYPES.GET_ORDER_FAIL:
      return { ...state, orderListData: null };
    case TYPES.ADD_ORDER_SUCCESS:
      return { ...state, addOrderData: action.payload };
    case TYPES.ADD_ORDER_FAIL:
      return { ...state, addOrderData: null };
    case TYPES.USER_DETAILS_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case TYPES.USER_DETAILS_FAIL:
      return {
        ...state,
        userData: null,
      };
    case TYPES.ALL_COUPON_SUCCESS:
      return { ...state, allCouponData: action.payload };
    case TYPES.ALL_COUPON_FAIL:
      return { ...state, allCouponData: null };
    case TYPES.ACTIVE_COUPON_SUCCESS:
      return { ...state, activeCouponData: action.payload };
    case TYPES.ACTIVE_COUPON_FAIL:
      return { ...state, activeCouponData: null };
    case TYPES.EXPIRED_COUPON_SUCCESS:
      return { ...state, expiredCouponData: action.payload };
    case TYPES.EXPIRED_COUPON_FAIL:
      return { ...state, expiredCouponData: null };
    case TYPES.REDEEMED_COUPON_SUCCESS:
      return { ...state, redeemedCouponData: action.payload };
    case TYPES.REDEEMED_COUPON_FAIL:
      return { ...state, redeemedCouponData: null };
    case TYPES.SUBSCRIPTION_LIST_SUCCESS:
      return { ...state, subscriptionListData: action.payload };
    case TYPES.SUBSCRIPTION_LIST_FAIL:
      return { ...state, subscriptionListData: null };
    case TYPES.ORDER_COMPLETE_SUCCESS:
      return { ...state, orderCompleteData: action.payload };
    case TYPES.ORDER_COMPLETE_FAIL:
      return { ...state, orderCompleteData: null };
      case TYPES.CLEAR_STORE:
        return { };
    default:
      return state;
  }
};
export default userReducer;
