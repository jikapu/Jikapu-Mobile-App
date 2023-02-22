import { Alert, Platform } from "react-native";
import UserController from "../../controllers/UserController";
import { CommonActions } from "@react-navigation/native";
import * as types from "../../actionTypes";
import {
  storeItem,
  getItem,
  removeItem,
  clearDB,
  clearStorage,
} from "@/utils/AsyncUtils";
import { API } from "@/constants/apiUrls";
import { loadingAction } from "../loader";
import { showToast } from "@/actions/home/HomeAction";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, NAVIGATION } from "@/constants";
import { appleAuth } from "@invertase/react-native-apple-authentication";
export const sessionLogout = (navigation) => {
  removeItem("token");
  navigation.navigate(NAVIGATION.login);
};

export const login = (params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.LOGIN, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.LOGIN_SUCCESS,
            payload: res.data,
          });
          storeItem("token", res.data.token);
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 400) {
          Alert.alert(res.message);
          dispatch({
            type: types.LOGIN_FAIL,
            payload: null,
          });
        } else {
          Alert.alert(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};
export const guestLogin = (params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.GUEST_LOGIN, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.LOGIN_SUCCESS,
            payload: res.data,
          });
          storeItem("token", res.data.token);
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 400) {
          Alert.alert(res.message);
          dispatch({
            type: types.LOGIN_FAIL,
            payload: null,
          });
        } else {
          Alert.alert(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const checkSocialLogin = (params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));

    UserController.postCall(API.LOGIN, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.LOGIN_SUCCESS,
            payload: res.data,
          });
          storeItem("token", res.data.token);
          if (cb) {
            cb(res);
          }
        } else if (res.messageID === 400) {
          Alert.alert(res.message);
          dispatch({
            type: types.LOGIN_FAIL,
            payload: null,
          });
        } else {
          Alert.alert(res.message);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const onPressGoogle = async () => {
  console.log("googlepress");
  GoogleSignin.configure({
    webClientId:
      "337437583529-jkpnmg222va6gddj9rq7k916vmkabd6f.apps.googleusercontent.com",
    offlineAccess: false,
  });
  try {
    await GoogleSignin.hasPlayServices();
    // const userInfo = await GoogleSignin.signIn();
    // console.log("User Info --> ", userInfo);
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const firebaseUserCredential = await auth().signInWithCredential(
      googleCredential
    );
    console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
    const flowdata = JSON.stringify(firebaseUserCredential.user.toJSON());
    const convertData = JSON.parse(flowdata);
    console.log("google login email", convertData.email);
    console.log("goole login display name", convertData.displayName);
    console.log("google login user id", convertData.uid);
    await AsyncStorage.setItem("semail", convertData.email);
    await AsyncStorage.setItem("sfullName", convertData.displayName);
    await AsyncStorage.setItem("suid", convertData.uid);
    /* 
       await AsyncStorage.setItem('semail', userInfo.user.email.toString());
      await AsyncStorage.setItem('sfullName', userInfo.user.name);
      await AsyncStorage.setItem('suid', userInfo.user.id);
      */

    return true;
  } catch (error) {
    console.log("Message", JSON.stringify(error));

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("User Cancelled the Login Flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("Signing In");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("Play Services Not Available or Outdated");
    } else {
      console.log(error.message);
    }
  }
};
export const onPressFacebook = async () => {
  // Attempt login with permissions

  console.log("facebpress");
  const result = await LoginManager.logInWithPermissions([
    "email",
    "public_profile",
    "user_friends",
  ]);

  if (result.isCancelled) {
    throw "User cancelled the login process";
  }
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw "Something went wrong obtaining access token";
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken
  );
  console.log("detsil", result);
  const firebaseUserCredential = await auth().signInWithCredential(
    facebookCredential
  );

  console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
  const flowdata = JSON.stringify(firebaseUserCredential.user.toJSON());
  const convertData = JSON.parse(flowdata);
  console.log("fb login email", convertData.email);
  console.log("fb login display name", convertData.displayName);
  console.log("fb login user id", convertData.uid);
  await AsyncStorage.setItem("semail", convertData.email);
  await AsyncStorage.setItem("sfullName", convertData.displayName);
  await AsyncStorage.setItem("suid", convertData.uid);

  // Sign-in the user with the credential
  return true;
};

export const onPressApple = async () => {
  // Attempt login with permissions
  console.log("applepress");
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  console.log(appleAuthRequestResponse, "REACHED_1");
  let appleToken =
    appleAuthRequestResponse && appleAuthRequestResponse.identityToken;
  console.log(appleToken, "REACHED_2");
  // let decoded = JSON.parse(atob && atob.atob(appleToken.split(".")[1]));
  // console.log(decoded, "REACHED_3");

  let appleName = appleAuthRequestResponse.fullName.givenName
    ? appleAuthRequestResponse.fullName.givenName
    : "" + " " + appleAuthRequestResponse.fullName.familyName
    ? appleAuthRequestResponse.fullName.familyName
    : "";

  console.log(
    "APPLE DATAAA apple token,user,email,name",
    appleToken,
    appleAuthRequestResponse.user,
    // decoded.email,
    appleName
  );
  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error("Apple Sign-In failed - no identify token returned");
  }
  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  );
  const firebaseUserCredential = await auth().signInWithCredential(
    appleCredential
  );
  console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
  const flowdata = JSON.stringify(firebaseUserCredential.user.toJSON());
  const convertData = JSON.parse(flowdata);
  console.log("firebase data", convertData);
  console.log("apple login email", convertData.email);
  console.log("apple login display name", convertData.displayName);
  console.log("apple login user id", convertData.uid);
  await AsyncStorage.setItem("semail", convertData.email);
 // await AsyncStorage.setItem("sfullName", " ");
  await AsyncStorage.setItem("suid", convertData.uid);

  // Sign the user in with the credential
  // return auth().signInWithCredential(appleCredential);
  return true;
};

export const register = (params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.REGISTER, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          dispatch({
            type: types.SIGNUP_SUCCESS,
            payload: res,
          });
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID == 400) {
          dispatch({
            type: types.SIGNUP_FAIL,
            payload: null,
          });
          Alert.alert(res.message);
        } else {
          //  Alert.alert(res.message);
        }
      })
      .catch((e) => {
        dispatch(loadingAction(false));
        console.log(e);
      });
  };
};

export const forgotPassword = (params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postCall(API.FORGOT_PASSWORD, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          dispatch({
            type: types.FORGOTPASS_SUCCESS,
            payload: res,
          });
          Alert.alert(res.message);
        } else if (res.messageID == 400) {
          dispatch({
            type: types.FORGOTPASS_FAIL,
            payload: null,
          });
          Alert.alert(res.message);
        } else {
          //  Alert.alert(res.message);
        }
      })
      .catch((e) => {
        dispatch(loadingAction(false));
        console.log(e);
      });
  };
};

export const updateUserData = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.UPDATE_USER, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          dispatch({
            type: types.UPDATE_USER_SUCCESS,
            payload: res.data,
          });
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID == 404) {
          dispatch({
            type: types.UPDATE_USER_FAIL,
            payload: null,
          });
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

export const uploadPic = (navigation, params, cb) => {
  return (dispatch, getState) => {
    dispatch(loadingAction(true));
    UserController.postAuthMultiCall(API.UPLOAD_MEDIA, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          dispatch({
            type: types.UPDATE_USER_SUCCESS,
            payload: res,
          });
          showToast(res.message);
        } else if (res.messageID == 404) {
          dispatch({
            type: types.UPDATE_USER_FAIL,
            payload: null,
          });
          Alert.alert(res.message);
        } else if (
          res.messageID === 403 &&
          res.message === "Session expired! Please Login Again!"
        ) {
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

export const getUserDetails = (navigation) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.GET_USER)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          dispatch({
            type: types.USER_DETAILS_SUCCESS,
            payload: res.data,
          });
        } else if (res.messageID == 404) {
          dispatch({
            type: types.USER_DETAILS_FAIL,
            payload: res.data,
          });
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

export const addUserCard = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.ADD_CARD, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID == 404) {
          //  Alert.alert(res.message);
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

export const updateUserCard = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.UPDATE_CARD, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID == 404) {
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

export const deleteCard = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.DELETE_CARD, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID == 404) {
          //  Alert.alert(res.message);
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

export const getAllCards = (navigation, params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.ADD_CARD, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          dispatch({
            type: types.CARDS_LIST_SUCCESS,
            payload: res.data,
          });
        } else if (res.messageID == 404) {
          dispatch({
            type: types.CARDS_LIST_FAIL,
            payload: res.data,
          });
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
export const addUserAddress = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.ADD_ADDRESS, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
          dispatch(getAllAddress());
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
export const addDefaultAddress = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.DEFAULT_ADDRESS, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
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

export const updateAddress = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.UPDATE_ADDRESS, params)
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

export const deleteAddress = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.DELETE_ADDRESS, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
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

export const getAllAddress = (navigation, params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.ADD_ADDRESS, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          dispatch({
            type: types.ADDRESS_LIST_SUCCESS,
            payload: res.data,
          });
        } else if (res.messageID == 400) {
          dispatch({
            type: types.ADDRESS_LIST_FAIL,
            payload: res.data,
          });
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

export const changePassword = (navigation, params) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.CHANGE_PASSWORD, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          Alert.alert(res.message);
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

export const addSubscriptionsList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.SUBSCRIPTION_ADD_OR_LIST, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID == 404) {
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

export const getSubscriptionsList = (navigation, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.SUBSCRIPTION_ADD_OR_LIST)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          /*
           const r =  res.data.docs
          const subsData = r.reduce((r,s) => {
            r.push({title: s.createdAt, data: s.products});
            return r;
          }, []);
           */
          if (cb) {
            cb(res);
          }
          dispatch({
            type: types.SUBSCRIPTION_LIST_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID == 404) {
          dispatch({
            type: types.SUBSCRIPTION_LIST_FAIL,
            payload: null,
          });
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

export const updateSubscriptionsList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.SUBSCRIPTION_UPDATE, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
        } else if (res.messageID == 404) {
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

export const deleteSubscriptionsList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.SUBSCRIPTION_DELETE, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          dispatch(getSubscriptionsList());
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID == 404) {
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

export const editSubscriptionsList = (navigation, id, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(
      API.SUBSCRIPTION_EDIT + `/?productSubscriptionId=${id}`
    )
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
          dispatch(getSubscriptionsList());
        } else if (res.messageID == 404) {
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

export const deleteSubscriptionProduct = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.SUBSCRIPTION_DELETE_PRODUCTS, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID == 404) {
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
export const addProductInSubsList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.postAuthCall(API.SUBSCRIPTION_ADD_PRODUCTS, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          if (cb) {
            cb(res);
          }
          showToast(res.message);
        } else if (res.messageID == 404) {
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
export const getProductInSubsList = (navigation, params, cb) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.SUBSCRIPTION_ADD_PRODUCTS, params)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          console.log("Add products in to subscription", res);
          if (cb) {
            cb(res);
          }
        } else if (res.messageID == 404) {
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

export const getAllCoupons = (navigation) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.CAMPAIGN + `?status=all&limit=${100}`)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ALL_COUPON_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.ALL_COUPON_FAIL,
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

export const getActiveCoupons = (navigation) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.CAMPAIGN + `?status=${1}`)
      .then((res) => {
        console.log("response active coupons", res);
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.ACTIVE_COUPON_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.ACTIVE_COUPON_FAIL,
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
export const getExpiredCoupons = (navigation) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.CAMPAIGN + `?status=${0}`)
      .then((res) => {
        console.log("response expired coupons", res);
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.EXPIRED_COUPON_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.EXPIRED_COUPON_FAIL,
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

export const getRedeemedCoupons = (navigation) => {
  return async (dispatch, getState) => {
    const token = await getItem("token");
    dispatch(loadingAction(true));
    UserController.getAuthCall(API.CAMPAIGN + `?status=all&userToken=${token}`)
      .then((res) => {
        console.log("response redeemed coupons", res);
        dispatch(loadingAction(false));
        if (res.messageID === 200) {
          dispatch({
            type: types.REDEEMED_COUPON_SUCCESS,
            payload: res.data.docs,
          });
        } else if (res.messageID === 404) {
          console.log(res.message);
          dispatch({
            type: types.REDEEMED_COUPON_FAIL,
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

export const logOut = (navigation) => {
  return (dispatch) => {
    UserController.getAuthCall(API.LOGOUT)
      .then((res) => {
        dispatch(loadingAction(false));
        if (res.messageID == 200) {
          removeItem("token");
          dispatch({
            type: types.CLEAR_STORE,
            payload: null,
          });
          navigation.navigate(NAVIGATION.login);
        } else if (res.messageID == 400) {
          console.log(res.message);
        } else if (res.messageId == 403) {
          Alert.alert("", res.message, [
            { text: "OK", onPress: () => sessionLogout(navigation) },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };
};
