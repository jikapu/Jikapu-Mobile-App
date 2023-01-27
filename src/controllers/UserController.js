"use strict";
import NetInfo from "@react-native-community/netinfo";
import { HttpClient } from "./HttpClient";
import { BASE_URL } from "../constants/apiUrls";
import { getItem } from "./../utils/AsyncUtils";
import axios from "axios";
import { Alert } from "react-native";

class UserController {
  static isConnected() {
    console.log("hey", NetInfo);
    return new Promise(function (fulfill, reject) {
      NetInfo.fetch().then((isConnected) => {
        console.log("isConnectedisConnected", isConnected);
        if (isConnected.isConnected) fulfill(isConnected);
        else {
          reject(isConnected);
        }
      });
    });
  }
  static async getAuthCall(url, params = {}) {
    console.log("get Auth URL>>>>>>>>>>>>>>>>", BASE_URL + url, params);
    let context = this;
    const token = await getItem("token");
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          HttpClient.get(BASE_URL + url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log(
                "response Post API Rest Client>>>>>>>",
                url,
                response
              );
              if (response.messageId === 200) {
                fulfill(response.data);
              } else {
                fulfill(response);
              }
            })
            .catch((e) => {
              console.log(e);
              fulfill(e);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
        });
    });
  }
  static async postAuthCall(url, params) {
    console.log("url post  client>>>>>>", BASE_URL + url, params);
    let context = this;
    const token = await getItem("token");
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          HttpClient.post(BASE_URL + url, params, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log(
                "response Post API Rest Client>>>>>>>",
                url,
                response
              );
              if (response.messageId === 200) {
                fulfill(response.data);
              } else {
                fulfill(response);
              }
            })
            .catch((e) => {
              console.log(e);
              fulfill(e);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
          Alert.alert("Please check your internet connectivity.")
        });
    });
  }
  static async getCall(url, params = {}) {
    console.log("get URL>>>>>>>>>>>>>>>>", BASE_URL + url, params);
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          HttpClient.get(BASE_URL + url, params)
            .then((response) => {
              console.log(
                "response Post API Rest Client>>>>>>>",
                url,
                response
              );
              if (response.messageId === 200) {
                fulfill(response.data);
              } else {
                fulfill(response);
              }
            })
            .catch((e) => {
              console.log(e);
              fulfill(e);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
          Alert.alert("Please check your internet connectivity.")
        });
    });
  }

  static async postAuthMultiCall(url, params) {
    const token = await getItem("token");
    console.log("token valuesassaas", token);
    console.log("url post  client>>>>>>", BASE_URL + url, params);
    let context = this;

    return new Promise(function (fulfill, reject) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      context
        .isConnected()
        .then(() => {
          axios.post(BASE_URL + url, params, config).then((response) => {
            console.log("response Post API Rest Client>>>>>>>", url, response);
            if (response.status === 200) {
              fulfill(response.data);
            } else {
              fulfill(response.data);
            }
          });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
         
        });
    });
  }

  static postCall(url, params) {
    console.log("url post  client>>>>>>", BASE_URL + url, params);
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          HttpClient.post(BASE_URL + url, params)
            .then((response) => {
              console.log(
                "response Post API Rest Client>>>>>>>",
                url,
                response
              );
              if (response.messageId === 200) {
                fulfill(response.data);
              } else {
                fulfill(response);
              }
            })
            .catch((e) => {
              console.log(e);
              fulfill(e);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
         
        });
    });
  }

  static deleteCall(url, params) {
    console.log(
      "url delete URL>>>>>>>>>>rest client>>>>>>",
      BASE_URL + url,
      params
    );
    HttpClient.setAuthorization();
    return new Promise(function (fulfill, reject) {
      if (isConnected()) {
        HttpClient.delete(BASE_URL + url, params).then((response) => {
          console.log("response Post API Rest Client>>>>>>>", response);
          if (response.messageId === 200) {
            fulfill(response.data);
          }
          fulfill(response);
        });
      } else {
        fulfill({
          message:
            "The server is not reachable right now, sorry for inconvenience.",
        });
      }
    });
  }
}

export default UserController;
