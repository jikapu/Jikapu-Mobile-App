import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  Keyboard,
  Modal,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import { Input } from "react-native-elements";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultImg,
  editBtn,
  npRight,
  npDown,
  userImg,
  closeIcon,
} from "@/assets";
import ImagePicker from "react-native-image-crop-picker";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import RNFetchBlob from "rn-fetch-blob";
import {
  RadioButton,
  Button,
  CustomHeader,
  InputField,
  Loader,
  Countries,
} from "@/components";
import {
  validateIsEmpty,
  validatePhoneNumber,
  validateName,
  validateContact,
} from "@/utils/Validations";

import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Account/GeneralInfo/GeneralInfo.styles.js";
import { shadow, spacing, typography } from "@/theme";
import { Image } from "react-native-elements";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  updateUserData,
  getUserDetails,
  uploadPic,
} from "@/actions/auth/UserActions";

import { IMAGE_BASE_URL } from "../../../../constants/apiUrls";

var uploadUrl = `${IMAGE_BASE_URL + "media/uploadImage"}`;

export const GeneralInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const userData = useSelector((state) => state.user.userData);
  const userId = userData?._id;
  const loginToken = useSelector((state) => state.user.loginToken);
  const [picLocal, setPiclocal] = useState(
    userData.profileImage ? userData.profileImage : ""
  );
  const [firstName, setFirstName] = useState(
    userData?.firstName === "na" ? ""
    : userData?.firstName 
  );
  const [lastName, setLastName] = useState(
    userData.lastName === "na" ? "" : userData.lastName
  );
  const [email, setEmail] = useState(userData.email ? userData.email : "");
  const [phone, setPhone] = useState(
    userData.phone ? userData.phone.toString().substring(3) : ""
  );
  const [dob, setDob] = useState(
    userData.dob ? moment(userData.dob).utc().format("DD/MM/YYYY") : ""
  );
  const [gender, setGender] = useState(userData.gender ? userData.gender : "");
  const [altNo, setAltNo] = useState(userData.alternatePhone ? userData.alternatePhone.toString().substring(3) : "");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [altNoError, setAltNoError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [countryData, setCountryData] = useState(Countries);
  const [countryCode, setCountryCode] = useState("+254");
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [altCountryCode, setAltCountryCode] = useState("+254");

  const updateDetails = () => {
    Keyboard.dismiss();
    if (validateIsEmpty(firstName.trim())) {
      setFirstNameError(strings.error.req_field);
      return;
    }
    if (!validateName(firstName)) {
      setFirstNameError(strings.error.alphabets_only);
      return;
    }
    if (validateIsEmpty(lastName.trim())) {
      setLastNameError(strings.error.req_field);
      return;
    }
    if (!validateName(lastName.trim())) {
      setLastNameError(strings.error.alphabets_only);
      return;
    }
    if (validateIsEmpty(phone.trim())) {
      setPhoneError(strings.error.req_field);
      return;
    }
    if (!validateContact(phone.trim())) {
      setPhoneError(strings.error.invalid_no);
      return;
    }
    /* 
    if (!validateContact(altNo.trim())) {
      setAltNoError(strings.error.invalid_no);
      return;
    }

    if (validateIsEmpty(gender.trim())) {
      setGenderError(strings.error.req_field);
      return;
    }
    */
    let params = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone:countryCode+phone,
      alternatePhone:altCountryCode+altNo,
      gender: gender,
      dob: dob,
    };

    dispatch(
      updateUserData(navigation, params, () => {
        setFirstNameError("");
        setLastNameError("");
        setPhoneError("");
        setAltNoError("");
      })
    );
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    let dt = moment(date).format("DD/MM/YYYY");
    setDatePickerVisible(false);
    setDob(dt);
    hideDatePicker();
  };

  const checkPermission = (type, typeName) => {
    check(type)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            Alert.alert(
              "",
              typeName === "Camera"
                ? "Cannot access camera. Please allow access from settings if you want to be able to use camera."
                : "Cannot access Photos and media. Please allow access from settings if you want to be able to use media.",
              [
                {
                  text: "ok",
                  onPress: () => {
                    setModalVisible(false);
                  },
                },
              ],
              { cancelable: false }
            );
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              "Personal Details",
              typeName === "Camera"
                ? "Cannot access camera. Please allow access from settings if you want to be able to use camera."
                : "Cannot access Photos and media. Please allow access from settings if you want to be able to use media.",
              [
                {
                  text: "ok",
                  onPress: () => {
                    setModalVisible(false);
                  },
                },
              ],
              { cancelable: false }
            );
            break;
        }
      })
      .catch((error) => {
        // …
      });
  };

  const openGalleryPicker = () => {
    checkPermission(
      Platform.OS == "ios"
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      "Photos"
    );
    ImagePicker.openPicker({
      forceJpg: true,
      width: 300,
      height: 400,
      cropping: true,
      //  includeBase64: true, // add this line
    })
      .then((res) => {
        setModalVisible(false);
        RNFetchBlob.fetch(
          "POST",
          uploadUrl,
          {
            Authorization: `Bearer ${loginToken}`,
            "Content-Type": "multipart/form-data",
          },
          [
            // part file from storage
            {
              name: "avatar-foo",
              filename: "gvhgffh",
              type: res.mime,
              data: RNFetchBlob.wrap(res.path),
            },
          ]
        )

          .then((resp) => {
            // ...
            let response = JSON.parse(resp.data);
            console.log("resp =====>", response);
            let file = response.data[0].filePath;
       
            setPiclocal(file);
            let params = {
              profileImage: file,
              _id: userId,
            };

            dispatch(
              updateUserData(navigation, params, (res) => {
                console.log(res);
                Toast.show({
                  type: "success",
                  text1: "Profile image uploaded successfully",
                });
              })
            );
          })

          .catch((err) => {
            // ...
          });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "E_PICKER_CANCELLED") {
          return false;
        }
      });
  };
  const openCameraPicker = () => {
    checkPermission(
      Platform.OS == "ios"
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      "Photos"
    );
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((res) => {
        setModalVisible(false);
        console.log("res: " + JSON.stringify(res));
        RNFetchBlob.fetch(
          "POST",
          uploadUrl,
          {
            Authorization: `Bearer ${loginToken}`,
            otherHeader: "foo",
            "Content-Type": "multipart/form-data",
          },
          [
            // part file from storage
            {
              name: "avatar-foo",
              filename: "hghgfccthg",
              type: res.mime,
              data: RNFetchBlob.wrap(res.path),
            },
          ]
        )
          .then((resp) => {
            // ...
            let response = JSON.parse(resp.data);
            console.log("resp =====>", response);
            let file = response.data[0].filePath;
            setPiclocal(file);
            let params = {
              profileImage: file,
              _id: userId,
            };

            dispatch(
              updateUserData(navigation, params, (res) => {
                Toast.show({
                  type: "success",
                  text1: "Profile image uploaded successfully",
                });
              })
            );
          })

          .catch((err) => {
            // ...
          });
      })
      .catch((error) => {
        if (error.code === "E_PICKER_CANCELLED") {
          return false;
        }
      });
  };

  const checkGender = (which) => {
    setGender(which);
  };

  const setCountryVisible = () => {
    setCountryPickerVisible(true);
    setCountryData(Countries);
  };
  const onChangeCountry = (item) => {
    setCountryCode(item.value);
    setCountryPickerVisible(false);
  };

  const renderItemView = (item) => {
    return (
      <TouchableOpacity onPress={() => onChangeCountry(item)}>
        <View style={styles.countryModalStyle}>
          <View style={styles.modalItemContainer}>
            <Text style={styles.modalItemName}>{item.label}</Text>
            <Text style={styles.modalItemValue}>{item.value}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={strings.profile.general_info}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ alignSelf: "center", marginTop: hp(4) }}>
          <View>
            <Image
              source={
                picLocal
                  ? {
                      uri: picLocal,
                    }
                  : userImg
              }
              style={{ width: 100, height: 100, borderRadius: 50 }}
              size="large"
              color="0000ff"
            />
          </View>
        </View>
        <View style={{ position: "absolute", top: hp(12.3), left: wp(55) }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={editBtn}
              style={{
                width: 22,
                height: 22,
              }}
            />
          </TouchableOpacity>
          {/* Modal Start */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            styles={{ overlay: { background: "#FFFF00" } }}
            onBackdropPress={() => {
              setModalVisible(false);
            }}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ marginRight: wp(3) }}>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Image
                      source={closeIcon}
                      style={{ height: 22, width: 22 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity onPress={() => openCameraPicker()}>
                    <Text
                      style={{
                        color: COLORS.LIGHT_BLACK,
                        fontSize: wp(4.9),
                        marginTop: hp(1),
                        marginLeft: -wp(3),
                      }}
                    >
                      Camera
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      openGalleryPicker();
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.LIGHT_BLACK,
                        fontSize: wp(4.9),
                        marginTop: hp(2),
                      }}
                    >
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Modal End */}
        </View>
        <View style={{ marginTop: spacing.s, paddingHorizontal: spacing.m }}>
          <InputField
            setCode={(text) => setFirstName(text)}
            value={firstName}
            error={firstNameError}
            placeholder={strings.signUp.FIRST_NAME}
          ></InputField>
          <InputField
            setCode={(text) => setLastName(text)}
            value={lastName}
            error={lastNameError}
            placeholder={strings.signUp.LAST_NAME}
          ></InputField>
          <InputField
            editable={false}
            setCode={(text) => setEmail(text)}
            value={email}
            error={emailError}
            placeholder={strings.login.EMAIL}
          ></InputField>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 0.2 }}>
              <View
              //  onPress={() => setCountryVisible()}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderRadius: spacing.xs,
                  backgroundColor: COLORS.WHITE,
                  borderColor: COLORS.BORDER,
                  height: hp(6),

                  marginTop: hp(1),
                }}
              >
                <Text>{countryCode}</Text>
              </View>
            </View>

            <View style={{ flex: 0.77 }}>
              <InputField
                maxLength={13}
                setCode={(text) => setPhone(text)}
                value={phone}
                error={phoneError}
                placeholder={strings.signUp.PHONE}
              ></InputField>
            </View>
          </View>

          {countryPickerVisible && (
            <View>
              <Modal
                visible={countryPickerVisible}
                animationType="slide"
                transparent={false}
              >
                <SafeAreaView style={{ flex: 1 }}>
                  <View style={styles.modalContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={styles.filterInputContainer}>
                        <Input
                          autoFocus={true}
                          focusable={true}
                          placeholder={"Search Country"}
                          inputStyle={styles.inputStyle}
                          onChangeText={(searchText) => {
                            if (searchText !== "") {
                              let finalData = countryData.filter((item) => {
                                return (
                                  `${item.label.toLowerCase()}`.indexOf(
                                    searchText.toLowerCase()
                                  ) > -1 ||
                                  `${item.value.toLowerCase()}`.indexOf(
                                    searchText.toLowerCase()
                                  ) > -1
                                );
                              });
                              setCountryData(finalData);
                            } else {
                              setCountryData(Countries);
                            }
                          }}
                        />
                      </View>
                      <FlatList
                        style={{ flex: 1 }}
                        data={countryData}
                        extraData={countryData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                          renderItemView(item, index)
                        }
                      />
                    </ScrollView>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setCountryPickerVisible(false);
                    }}
                    style={styles.closeButton1Style}
                  >
                    <Text style={styles.closeText1Style}>Close</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </Modal>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 0.2 }}>
              <View
               // onPress={() => setCountryVisible()}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderRadius: spacing.xs,
                  backgroundColor: COLORS.WHITE,
                  borderColor: COLORS.BORDER,
                  height: hp(6),

                  marginTop: hp(1),
                }}
              >
                <Text>{altCountryCode}</Text>
              </View>
            </View>

            <View style={{ flex: 0.77 }}>
              <InputField
                maxLength={13}
                setCode={(text) => setAltNo(text)}
                value={altNo}
                error={altNoError}
                placeholder={strings.signUp.ALT_PHONE}
              ></InputField>
            </View>
          </View>

          <InputField
            isDropdown={true}
            iconStyle={{ width: 24, height: 24 }}
            type="editCalendar"
            btnPress={() => showDatePicker()}
            value={dob}
            placeholder="MM/DD/YYYY"
            label={strings.profile.dob}
          ></InputField>

          <View>
            <Text style={styles.labelStyle}>{strings.profile.gender}</Text>
            <View style={{ flexDirection: "row", marginTop: hp(0.7) }}>
              <TouchableOpacity onPress={() => checkGender("male")}>
                <RadioButton
                  selectedOption={gender === "male" ? true : false}
                  value={gender}
                  label="Male"
                  onPress={() => checkGender("male")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: wp(5) }}
                onPress={() => checkGender("female")}
              >
                <RadioButton
                  selectedOption={gender === "female" ? true : false}
                  value={gender}
                  label="Female"
                  onPress={() => checkGender("female")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: wp(5) }}
                onPress={() => checkGender("other")}
              >
                <RadioButton
                  selectedOption={gender === "other" ? true : false}
                  label="Other"
                  value={gender}
                  onPress={() => checkGender("other")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ marginTop: wp(2) }}
              onPress={() => checkGender("dnd")}
            >
              <RadioButton
                selectedOption={gender === "dnd" ? true : false}
                label="Do not wish to disclose"
                value={gender}
                onPress={() => checkGender("dnd")}
              />
            </TouchableOpacity>
            <Text>{genderError}</Text>
          </View>

          <Button
            title={"SAVE"}
            style={{ backgroundColor: "#0F96A0", marginTop: hp(1) }}
            handlePress={() => updateDetails()}
          />
        </View>
        {isDatePickerVisible && (
          <DateTimePickerModal
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "spinner"}
            maximumDate={new Date()}
            pickerContainerStyleIOS={{ paddingHorizontal: 23 }}
            isVisible={isDatePickerVisible}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};
