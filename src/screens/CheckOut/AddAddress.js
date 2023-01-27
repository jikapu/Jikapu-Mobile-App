import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  Alert,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  ScrollView,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultImg,
  checkBox,
  downArrow,
  npUp,
  checkBoxEmpty,
  location,
  npRight,
} from "@/assets";
import { Loader, CustomHeader, InputField, Button } from "@/components";
import DropDownPicker from "react-native-dropdown-picker";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Account/Account.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { typography, spacing } from "@/theme";
import { Image } from "react-native-elements";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import Geolocation from "react-native-geolocation-service";
import {
  validateIsEmpty,
  validateEmail,
  validateContact,
  validateName,
} from "@/utils/Validations";
import {
  getAllAddress,
  addUserAddress,
  deleteAddress,
} from "@/actions/auth/UserActions";

const myApiKey = "AIzaSyBEPHDSFpxJec6qsm3zIIY1NcyN6zjQrLE";

export const AddAddress = ({ route, navigation }) => {
  const { status, isFresh } = route.params;
  const isLoading = useSelector((state) => state.common.isLoading);

  const dispatch = useDispatch();
  const [sAddressError, setSAddressError] = useState("");
  const [addressName, setAddressName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [thirdLine, setThirdLine] = useState("");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [items, setItems] = useState([
    { label: "Kenya", value: "Kenya" },
    { label: "United States", value: "United States" },
    { label: "United Kingdom", value: "United Kingdom" },
  ]);

  const [open1, setOpen1] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [item, setItem] = useState([
    { label: "Home", value: "Home" },
    { label: "Office", value: "Office" },
    { label: "Other", value: "Other" },
  ]);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [firstLineError, setFirstLineError] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipError, setZipError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [checkedShipping, setCheckedShipping] = useState(true);
  const [checkedAddress, setCheckedAddress] = useState(true);

  // billing address

  const [shippingAddAddress, setShippingAddAddress] = useState(false);
  const [shippingAddressName, setShippingAddressName] = useState("");

  const [shipppingFirstName, setShipppingFirstName] = useState("");
  const [shipppingLastName, setShipppingLastName] = useState("");
  const [shipppingCompanyName, setShipppingCompanyName] = useState("");

  const [shipppingFirstLine, setShipppingFirstLine] = useState("");
  const [shipppingSecondLine, setShipppingSecondLine] = useState("");
  const [shipppingThirdLine, setShipppingThirdLine] = useState("");
  const [shipppingCity, setShipppingCity] = useState("");
  const [shipppingWard, setShipppingWard] = useState("");
  const [shipppingZip, setShipppingZip] = useState("");
  const [shipppingPhone, setShipppingPhone] = useState();
  const [shipppingEmail, setShipppingEmail] = useState("");

  const [shipppingOpen1, setShipppingOpen1] = useState(false);
  const [shipppingCountry, setShipppingCountry] = useState("");
  const [shipppingItem, setShipppingItem] = useState([
    { label: "Kenya", value: "Kenya" },
    { label: "United States", value: "United States" },
    { label: "United Kingdom", value: "United Kingdom" },
  ]);

  const [open3, setOpen3] = useState(false);
  const [shipppingAddressType, setShipppingAddressType] = useState("");
  const [items3, setItems3] = useState([
    { label: "Home", value: "Home" },
    { label: "Office", value: "Office" },
    { label: "Other", value: "Other" },
  ]);

  const [shipppingfirstNameError, setshipppingFirstNameError] = useState("");
  const [shipppinglastNameError, setshipppingLastNameError] = useState("");
  const [shipppingfirstLineError, setshipppingFirstLineError] = useState("");
  const [shipppingcityError, setshipppingCityError] = useState("");
  const [shipppingzipError, setshipppingZipError] = useState("");
  const [shipppingphoneError, setshipppingPhoneError] = useState("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const continueToPayment = () => {
    Keyboard.dismiss();
    if (
      validateIsEmpty(firstName.trim()) ||
      validateIsEmpty(lastName.trim()) ||
      validateIsEmpty(country.trim()) ||
      validateIsEmpty(firstLine.trim()) ||
      validateIsEmpty(city.trim()) ||
      validateIsEmpty(phone)
    ) {
      if (validateIsEmpty(firstName.trim())) {
        setFirstNameError(strings.error.req_field);
      }
      if (!validateName(firstName)) {
        setFirstNameError(strings.error.alphabets_only);
      }
      if (validateIsEmpty(lastName.trim())) {
        setLastNameError(strings.error.req_field);
      }
      if (!validateName(lastName)) {
        setLastNameError(strings.error.alphabets_only);
      }
      if (validateIsEmpty(country.trim())) {
        setCountryError(strings.error.req_field);
      }
      if (validateIsEmpty(firstLine.trim())) {
        setFirstLineError(strings.error.req_field);
      }

      if (validateIsEmpty(city.trim())) {
        setCityError(strings.error.req_field);
      }

      if (validateIsEmpty(phone)) {
        setPhoneError(strings.error.req_field);
      }
    } else {
      let params = {
        addressName: addressName,
        addressType: addressType,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        countryRegion: country,
        firstLine: firstLine,
        secondLine: secondLine,
        thirdLine: thirdLine,
        ward: ward,
        city: city,
        state: county,
        zip: zip,
        phone: phone,
        email: email,
        device: Platform.OS,
      };
      let bAddress = params;
      console.log(params, "paramsahbasdjascgasv");
      dispatch(
        addUserAddress(navigation, params, (res) => {
          navigation.navigate(NAVIGATION.paymentMethod, {
            billingAddress: bAddress,
            shippingAddress: bAddress,
            status,
            isFresh,
          });
        })
      );
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("position", position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getAddressFromCoordinates(latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${myApiKey}`
      );
      const responseJson = await response.json();
      var addressComponent = responseJson.results[1].address_components;
      let area = addressComponent[1].long_name + " ," + addressComponent[2].long_name;
      setFirstLine(area);
      let houseNum = addressComponent[0].long_name
      setSecondLine(houseNum);
      let city = addressComponent[3].long_name;
      setCity(city);
      let country = addressComponent[5].long_name;
      setCountry(country);
      let pincode = addressComponent[6].long_name;
      setZip(pincode);
    } catch (error) {
      console.error(error);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization("always").then((res) => {
        console.log(res);
        getOneTimeLocation();
      });
    } else {
      const chckLocationPermission = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "required Location permission",
              message:
                "We required Location permission in order to get device location " +
                "Please grant us.",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          } else {
            Alert.alert("You don't have access for the location");
          }
        } catch (err) {
          Alert.alert(err);
        }
      }
    }
  };

  const checkShipping = () => {
    setCheckedShipping(!checkedShipping);
  };

  /* 1st dropdown */
  const onOpen = useCallback(() => {
    setOpen1(false);
    setOpen3(false);
    setShipppingOpen1(false);
  }, []);
  /* 2nd dropdown */
  const onOpen1 = useCallback(() => {
    setOpen(false);
    setOpen3(false);
    setShipppingOpen1(false);
  }, []);
  /* 3rd dropdown */
  const onShippingOpen1 = useCallback(() => {
    setOpen(false);
    setOpen1(false);
    setOpen3(false);
  }, []);
  /* 4th dropdown */
  const onOpen3 = useCallback(() => {
    setShipppingOpen1(false);
    setOpen(false);
    setOpen1(false);
  });

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}
      <CustomHeader
        title={"Add New Address"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >
        <View
          style={{
            flex: 1,
            margin: hp(2),
            paddingHorizontal: wp(1),
          }}
        >
          <Text
            style={{
              fontSize: wp(4.5),
              color: COLORS.BLACK,
              fontWeight: "bold",
            }}
          >
            Shipping Address
          </Text>
          <TouchableOpacity
            onPress={() => {
              requestLocationPermission();
            }}
            style={{
              height: hp(6),
              marginTop: hp(1.5),
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: wp(4),
              flexDirection: "row",
              backgroundColor: "#FFFF",
              borderColor: "#707070",
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: wp(3.7) }}>USE MY CURRENT LOCATION</Text>
            <Image
              source={location}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              marginTop: hp(1),
              zIndex: Platform.OS == "ios" ? 100 : null,
            }}
          >
            <InputField
              setCode={(text) => setFirstName(text)}
              value={firstName}
              error={firstNameError}
              placeholder="First Name*"
            ></InputField>
            <InputField
              setCode={(text) => setLastName(text)}
              value={lastName}
              error={lastNameError}
              placeholder="Last Name*"
              containerStyle={{
                marginTop: -hp(1.5),
              }}
            ></InputField>

            <DropDownPicker
              open={open}
              onOpen={onOpen}
              value={country}
              items={items}
              setOpen={setOpen}
              setValue={setCountry}
              setItems={setItems}
              zIndex={4000}
              zIndexInverse={1000}
              onChangeValue={(item) => console.log(item.label, item.value)}
              placeholderStyle={typography.placeholder}
              style={{
                height: hp(6),
                backgroundColor: "#FFF",
                borderColor: "#707070",
                borderWidth: 1,
                marginTop: -hp(0.5),
                borderRadius: 8,
              }}
              placeholder="Country/Region*"
            />
            <InputField
              setCode={(text) => setFirstLine(text)}
              value={firstLine}
              placeholder="Street Address*"
              error={firstLineError}
              containerStyle={{
                marginTop: hp(2.5),
              }}
            ></InputField>
            <InputField
              setCode={(text) => setSecondLine(text)}
              value={secondLine}
              placeholder="House Number and street name"
              containerStyle={{
                marginTop: -hp(1.5),
              }}
            ></InputField>

            <InputField
              setCode={(text) => setCity(text)}
              value={city}
              placeholder="Town/City*"
              containerStyle={{
                marginTop: -hp(1.5),
              }}
              error={cityError}
            ></InputField>

            <InputField
              maxLength={6}
              setCode={(text) => setZip(text)}
              value={zip}
              placeholder="Zip Code"
              containerStyle={{
                marginTop: -hp(1.5),
              }}
              error={zipError}
            ></InputField>
            <InputField
              maxLength={13}
              setCode={(text) => setPhone(text)}
              value={phone}
              placeholder="Phone*"
              containerStyle={{
                marginTop: -hp(1.5),
              }}
              error={phoneError}
            ></InputField>

            <DropDownPicker
              open={open1}
              onOpen={onOpen1}
              value={addressType}
              items={item}
              setOpen={setOpen1}
              setValue={setAddressType}
              setItems={setItem}
              placeholder="Type of Address"
              zIndex={3000}
              zIndexInverse={2000}
              placeholderStyle={typography.placeholder}
              style={{
                height: hp(6),
                borderRadius: 8,
                paddingHorizontal: spacing.s,
                backgroundColor: COLORS.WHITE,
                borderColor: COLORS.BORDER,
                borderWidth: 1,
                marginTop: -hp(0.5),
              }}
              onChangeValue={(item) => console.log(item.label, item.value)}
            />
            <Text
              style={{
                fontSize: wp(4.5),
                color: COLORS.BLACK,
                fontWeight: "bold",
                marginTop: hp(2.5),
              }}
            >
              Want to save this address?
            </Text>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: hp(1) }}
                onPress={() => setCheckedAddress(!checkedAddress)}
              >
                <Image
                  source={checkedAddress == true ? checkBox : checkBoxEmpty}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{
                    fontSize: wp(3.7),
                    color: COLORS.BLACK,
                    marginLeft: wp(2),
                  }}
                >
                  Save Address
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontSize: wp(4.5),
              color: COLORS.BLACK,
              fontWeight: "bold",
              marginTop: hp(2.5),
            }}
          >
            Billing Address
          </Text>
          <View style={{ flexDirection: "row", marginTop: hp(1) }}>
            <TouchableOpacity onPress={() => checkShipping()}>
              <Image
                source={checkedShipping == true ? checkBox : checkBoxEmpty}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: wp(3.7),
                color: COLORS.BLACK,
                marginLeft: wp(2),
              }}
            >
              Same as Shipping address
            </Text>
          </View>
          <Text style={{ color: "red", marginTop: hp(0.5) }}>
            {sAddressError}
          </Text>
          {checkedShipping == false ? (
            <View
              style={{
                flexDirection: "column",
                zIndex: Platform.OS == "ios" ? 100 : null,
              }}
            >
              <InputField
                setCode={(text) => setShipppingFirstName(text)}
                value={shipppingFirstName}
                error={shipppingfirstNameError}
                placeholder="First Name*"
              ></InputField>
              <InputField
                setCode={(text) => setShipppingLastName(text)}
                value={shipppingLastName}
                error={shipppinglastNameError}
                placeholder="Last Name*"
              ></InputField>

              <DropDownPicker
                open={shipppingOpen1}
                onOpen={onShippingOpen1}
                value={shipppingCountry}
                items={shipppingItem}
                setOpen={setShipppingOpen1}
                setValue={setShipppingCountry}
                setItems={setShipppingItem}
                zIndexInverse={2000}
                zIndex={3000}
                onChangeValue={(item) => console.log(item.label, item.value)}
                placeholderStyle={typography.placeholder}
                style={{
                  height: hp(6),
                  backgroundColor: "#FFF",
                  borderColor: "#707070",
                  borderWidth: 1,
                  marginTop: hp(1),
                  borderRadius: 8,
                }}
                placeholder="Country/Region*"
              />
              <InputField
                setCode={(text) => setShipppingFirstLine(text)}
                value={shipppingFirstLine}
                placeholder="Street Address *"
                error={shipppingfirstLineError}
              ></InputField>
              <InputField
                setCode={(text) => setShipppingSecondLine(text)}
                value={shipppingSecondLine}
                placeholder="House Number and street name"
              ></InputField>
              <InputField
                setCode={(text) => setShipppingThirdLine(text)}
                value={shipppingThirdLine}
                placeholder="Apartment, Suit, unit, etc (optional)"
                containerStyle={{
                  marginTop: -hp(1.5),
                }}
              ></InputField>

              <InputField
                setCode={(text) => setShipppingCity(text)}
                value={shipppingCity}
                placeholder="Town/City*"
                containerStyle={{
                  marginTop: -hp(1.5),
                }}
                error={shipppingcityError}
              ></InputField>

              <InputField
                maxLength={6}
                setCode={(text) => setShipppingZip(text)}
                value={shipppingZip}
                placeholder="Zip Code*"
                containerStyle={{
                  marginTop: -hp(1.5),
                }}
                error={shipppingzipError}
              ></InputField>
              <InputField
                maxLength={13}
                setCode={(text) => setShipppingPhone(text)}
                value={shipppingPhone}
                placeholder="Phone*"
                containerStyle={{
                  marginTop: -hp(1.5),
                }}
                error={shipppingphoneError}
              ></InputField>

              <DropDownPicker
                open={open3}
                onOpen={onOpen3}
                value={shipppingAddressType}
                items={items3}
                dropDownDirection="TOP"
                setOpen={setOpen3}
                setValue={setShipppingAddressType}
                setItems={setItems3}
                placeholder="Type of Address"
                placeholderStyle={typography.placeholder}
                zIndex={1000}
                zIndexInverse={4000}
                style={{
                  height: hp(6),
                  borderRadius: 8,
                  paddingHorizontal: spacing.s,
                  backgroundColor: COLORS.WHITE,
                  borderColor: COLORS.BORDER,
                  borderWidth: 1,
                  marginTop: hp(1),
                }}
              />
            </View>
          ) : null}
          <Button
            handlePress={() => continueToPayment()}
            style={{
              backgroundColor: COLORS.GREEN_BTN,
              height: hp(6),
              marginTop: hp(3),
            }}
            title={"PROCEED TO BUY"}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
