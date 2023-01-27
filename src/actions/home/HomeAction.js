import { Alert, Platform } from "react-native";
import UserController from "../../controllers/UserController";
import { strings } from "@/localization";
import * as types from "../../actionTypes";
import { API } from "@/constants/apiUrls";
import { loadingAction } from "../loader";
import Toast from "react-native-toast-message";
import { sessionLogout } from "../auth/UserActions";

export const showToast = (msg) => {
  Toast.show({
    type: "success",
    text1: msg,
  });
};

export const getRootCatList = (cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getCall(API.ROOT_CAT)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ROOT_CAT_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res.data);
          }
        } else if (res.messageID === 404) {
          dispatch({
            type: types.ROOT_CAT_FAIL,
            payload: null,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getAllCatList = (cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.ALL_CAT)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ALL_CAT_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          dispatch({
            type: types.ALL_CAT_FAIL,
            payload: null,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getCategoryAlias = (navigation, alias, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getCall(API.ROOT_CAT_ALIAS + `${alias}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getAllSubCatList = (id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    let params = {
      parentId: id,
    };
    UserController.postCall(API.ALL_CAT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ALL_SUB_CAT_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          dispatch({
            type: types.ALL_SUB_CAT_FAIL,
            payload: null,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getProductsList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.PRODUCT_LIST_SUCCESS,
            payload: res.data.docs,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          dispatch({
            type: types.PRODUCT_LIST_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getProductById = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getCall(`${API.PRODUCT + id}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.PRODUCT_DETAILS_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res.data);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
          dispatch({
            type: types.PRODUCT_DETAILS_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getProductSpecificationById = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getCall(API.PRODUCT_SPECIFICATION + `${id}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.PRODUCT_DETAILS_SPECIFICATION_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res.data);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.PRODUCT_DETAILS_SPECIFICATION_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getClearanceList = (navigation,params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
           
          dispatch({
            type: types.CLEARANCE_LIST_SUCCESS,
            payload: res.data.docs,
          });
          
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
          /*
           dispatch({
            type: types.CLEARANCE_LIST_FAIL,
            payload: null,
          });
          */
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getPopularItemList = (navigation,params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_SIMILAR_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          /* 
           dispatch({
            type: types.POPULAR_LIST_SUCCESS,
            payload: res.data.docs,
          });
          */
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
          /*
          dispatch({
            type: types.POPULAR_LIST_FAIL,
            payload: null,
          });
          */
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getTopEItems = (params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.TOP_ELECTRONICS_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.TOP_ELECTRONICS_FAIL,
            payload: res.data.docs,
          });
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getTopFashionItems = (params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.TOP_FASHION_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.TOP_FASHION_FAIL,
            payload: res.data.docs,
          });
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getTopJikapuFreshItems = (params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.TOP_JIKAPU_FRESH_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.TOP_JIKAPU_FRESH_FAIL,
            payload: res.data.docs,
          });
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getTopHouseHoldItems = (params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.TOP_HOUSEHOLD_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.TOP_HOUSEHOLD_FAIL,
            payload: res.data.docs,
          });
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getTopBabyItems = (params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.TOP_BABY_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.TOP_BABY_FAIL,
            payload: res.data.docs,
          });
        } else {
          console.log(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const addToWish = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    let params = {
      productId: id,
    };
    UserController.postAuthCall(API.ADD_WISHLIST, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ADD_WISHLIST_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID === 400) {
          Alert.alert(res.message);
          dispatch({
            type: types.ADD_WISHLIST_FAIL,
            payload: null,
          });
        } else if (res.messageID === 404) {
          dispatch({
            type: types.ADD_WISHLIST_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const delWish = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    let params = {
      productId: id,
    };
    UserController.postAuthCall(API.DELETE_WISHLIST, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
          
          showToast(res.message);
        } else if (res.messageID === 400) {
          Alert.alert(res.message);
         
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getWishItems = (navigation) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.GET_WISHLIST)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.GET_WISHLIST_SUCCESS,
            payload: res.data,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.GET_WISHLIST_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const addToCart = (navigation,params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.ADD_CART, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ADD_CART_SUCCESS,
            payload: res.data,
          });

          if (
            res.data.isFresh === 1
              ? dispatch(getJikapuCartItems())
              : dispatch(getCartItems())
          )
            if (cb) {
              cb(res);
            }
          showToast(res.message);
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
          dispatch({
            type: types.ADD_CART_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const addBatchCart = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.ADD_CART_BATCH, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ADD_CART_SUCCESS,
            payload: res.data,
          });
          dispatch(getCartItems());
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
          dispatch({
            type: types.ADD_CART_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const buyNow = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));

    UserController.postAuthCall(API.BUY_NOW, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.BUY_NOW_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
          dispatch({
            type: types.BUY_NOW_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getCartItems = (navigation, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.GET_CART + `?status=${0}&isFresh=${0}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.GET_CART_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.GET_CART_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getJikapuCartItems = (navigation, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.GET_CART + `?status=${0}&isFresh=${1}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.GET_JFRESHCART_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.GET_JFRESHCART_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const delCartItem = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    let params = {
      productId: id,
      quantity: 0,
    };
    UserController.postAuthCall(API.ADD_CART, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.DELETE_CART_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
          dispatch({
            type: types.DELETE_CART_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getSearchData = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getFeaturedList = (navigation,params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_SIMILAR_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.FEATURED_LIST_SUCCESS,
            payload: res.data.docs,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
          dispatch({
            type: types.FEATURED_LIST_FAIL,
            payload: null,
          });
        } else {
          Alert.alert(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getSponsoredList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_SIMILAR_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.SPONSORED_LIST_SUCCESS,
            payload: res.data.docs,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
          dispatch({
            type: types.SPONSORED_LIST_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getOrderSearch = (params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.SEARCH_ORDER, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getOrders = (navigation, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.ORDER)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.GET_ORDER_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.GET_ORDER_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const trackOrderStatus = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.ORDER + `/${id}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const addOrder = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.ORDER, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ADD_ORDER_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          dispatch({
            type: types.ADD_ORDER_FAIL,
            payload: res.data,
          });
          console.log(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const addOrderComplete = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.ORDER_PLACE, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ORDER_COMPLETE_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.ORDER_COMPLETE_FAIL,
            payload: res.data,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getOrderSummary = (navigation, status, isFresh, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(
      API.GET_CART + `?status=${status}&isFresh=${isFresh}`
    )
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const createRegistry = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.REGISTRY, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID === 404) {
          console.log(res);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const createRegistryProduct = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.REGISTRY_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID === 404) {
          console.log(res);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getRegistryProducts = (navigation, regId, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.REGISTRY_PRODUCT + `?registryId=${regId}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res.data);
          }
          dispatch({
            type: types.GET_REGISTRY_SUCCESS,
            payload: res.data,
          });
        } else if (res.messageID === 404) {
          dispatch({
            type: types.GET_REGISTRY_FAIL,
            payload: res,
          });
          if (cb) {
            cb([]);
          }
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getRegistryDetails = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.REGISTRY_DETAILS + `? id = ${id}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.GET_REGISTRY_DETAILS_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          dispatch({
            type: types.GET_REGISTRY_DETAILS_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getRegistryUser = (navigation, userId, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(
      API.USER_REGISTRY + `?page=1&limit=10&status=all&userId=${userId}`
    )
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.GET_USER_REGISTRY_SUCCESS,
            payload: res.data.docs,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          dispatch({
            type: types.GET_USER_REGISTRY_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const findRegistry = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.REGISTRY, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getCoupons = (navigation, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.COUPON)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          cb(res);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const verifyCouponCode = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.COUPON_VERIFY, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const verifyCoupon = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.CAMPAIGN_VERIFY, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const redeemCoins = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.COIN_REDEEM, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getSubscriptions = (navigation, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.SUBSCRIPTION)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

/*

export const updateSubscription = (navigation,id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    let params = {
      productId: id,
      quantity: 0,
    };
    UserController.postAuthCall(API.SUBSCRIPTION_UPDATE, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {

          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);

        } else if (res.messageID === 403 ) {
          Alert.alert(
            "",
            res.message,
            [

              { text: "OK", onPress: () => sessionLogout(navigation) }
            ]
          )
        }
      })
      .catch((e) => console.log(e));
  };
};
*/

export const addIPayPayment = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.PAYMENT_IPAY, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const addMPaisaPayment = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.MPESA_API1, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getOrderDetailsById = (navigation,id,cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(`${API.GET_ORDER_DETAIL_BY_ID+id}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
/*
export const completeMPaisaPayment = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.MPESA_API2, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.success == true) {
          if (cb) {
            cb(res);
          }
        } else {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
*/


export const getCompareProductsList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SEARCH_SIMILAR_PRODUCT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.COMPARE_LIST_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          dispatch({
            type: types.COMPARE_LIST_FAIL,
            payload: null,
          });
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getStoresList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.STORE_LIST, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
          dispatch({
            type: types.STORE_LIST_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          dispatch({
            type: types.STORE_LIST_FAIL,
            payload: null,
          });
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          dispatch({
            type: types.STORE_LIST_FAIL,
            payload: null,
          });
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getFreshDataBystore = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    let params = {
      parentId: id,
    };
    console.log("jikapu fresh parent data", params);
    UserController.postCall(API.ALL_CAT, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 204) {
          //Alert.alert(res.message)
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const cancelOrder = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.CANCEL_ORDER, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
          showToast("Order have cancelled successfully");
        } else if (res.messageID == 400) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => {
        dispatch(loadingAction(false));
        console.log(e);
      });
  };
};
export const returnOrder = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.RETURN_ORDER, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID == 400) {
          Alert.alert(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => {
        dispatch(loadingAction(false));
        console.log(e);
      });
  };
};

export const trackOrder = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.TRACK_ORDER, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const getShippingCharges = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.SHIPPING_CHARGES, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 404) {
          console.log(res.message);
        } else if (res.messageID === 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
