import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Loader,
  CustomHeader,
  InputField,
  Button
} from "@/components";
import DropDownPicker from "react-native-dropdown-picker";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Account/Account.styles";
import { typography, spacing } from "@/theme";
import { Image } from "react-native-elements";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  validateIsEmpty,
  validateName,
} from '@/utils/Validations';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addUserAddress,getAllAddress } from "@/actions/auth/UserActions";

export const AddRegistryAddress = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.common.isLoading);
  const addressListData = useSelector((state) => state.user.addressListData);

  const dispatch = useDispatch();
  const [addAddress, setAddAddress] = useState(false);
  const [addressName, setAddressName] = useState("");
  const [addressType, setAddressType] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
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
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Kenya", value: "Kenya" },
    { label: "United States", value: "United States" },
    { label: "United Kingdom", value: "United Kingdom" },
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState([]);
  const [addressItem, setAddressItem] = useState([
    { label: "Home", value: "Home" },
    { label: "Office", value: "Office" },
    { label: "Other", value: "Other" },
  ]);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [firstLineError, setFirstLineError] = useState("");
  const [countyError, setCountyError] = useState("");
  const [cityError, setCityError] = useState("");
  const [wardError, setWardError] = useState("");
  const [zipError, setZipError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");


  const saveAddress = () => {
    Keyboard.dismiss();
    if (
      validateIsEmpty(firstName.trim()) ||
      validateIsEmpty(lastName.trim()) ||
      validateIsEmpty(country.trim()) ||
      validateIsEmpty(firstLine.trim()) ||
    //  validateIsEmpty(county.trim()) ||
      validateIsEmpty(city.trim()) ||
    //  validateIsEmpty(ward.trim()) ||
    //  validateIsEmpty(zip.trim()) ||
      validateIsEmpty(phone)
     // validateIsEmpty(email.trim())
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
      /* 
       if (validateIsEmpty(county)) {
        setCountyError(strings.error.req_field);
        
      }
      */
     
      if (validateIsEmpty(city.trim())) {
        setCityError(strings.error.req_field);
        
      }
    
      /*
        if (validateIsEmpty(ward.trim())) {
        setWardError(strings.error.req_field);
       
      }
       if (validateIsEmpty(zip.trim())) {
        setZipError(strings.error.req_field);
       
      }
       */
     
      if (validateIsEmpty(phone)) {
        setPhoneError(strings.error.req_field);
      }     
     
    } else  {
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
        device: Platform.OS
      }
      console.log(params,"paramsahbasdjascgasv")
      dispatch(addUserAddress(navigation,params, res => {
        navigation.pop()
        dispatch(getAllAddress(navigation));
      })
      );
    }
     
  }

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}
      <CustomHeader
        title={"Add Address"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}>
        <View
          style={{
            marginTop: hp(1),
            paddingHorizontal: wp(6),
            borderRadius: spacing.xs,
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
          {/* 
                  <InputField
                  setCode={(text) => setCompanyName(text)}
                  value={companyName}
                  placeholder="Company Name (optional)"
                  containerStyle={{
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                */}
          <DropDownPicker
            open={open}
            value={country}
            items={items}
            setOpen={setOpen}
            setValue={setCountry}
            setItems={setItems}
            zIndexInverse={7000}
            zIndex={1000}
            onChangeValue={item => console.log(item.label, item.value)}
            placeholderStyle={typography.placeholder}
            style={{
              height: hp(6),
              backgroundColor: "#FFF",
              borderColor: "#707070",
              borderWidth: 1,
             marginTop:-hp(0.5),
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
              marginTop: hp(2),
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
          {/*
                 <InputField
                  maxLength={30}
                  setCode={(text) => setThirdLine(text)}
                  value={thirdLine}
                  placeholder="Apartment, Suit, unit, etc (optional)"
                  containerStyle={{
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                 <InputField
                 
                  setCode={(text) => setCounty(text)}
                  value={county}
                  placeholder="County*"
                  containerStyle={{
                    marginTop: -hp(1.5),
                  }}
                  error={countyError}
                ></InputField>
                */}


          <InputField

            setCode={(text) => setCity(text)}
            value={city}
            placeholder="Town/City*"
            containerStyle={{
              marginTop: -hp(1.5),
            }}
            error={cityError}
          ></InputField>
          {/*
                 <InputField
                  setCode={(text) => setWard(text)}
                  value={ward}
                  placeholder="Ward*"
                  containerStyle={{
                    marginTop: -hp(1.5),
                  }}
                  error={wardError}
                ></InputField>
                */}

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
          {/* 
                 <InputField
                  setCode={(text) => setEmail(text)}
                  value={email}
                  error={emailError}
                  placeholder="Email address*"
                  containerStyle={{
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                */}

          <DropDownPicker
            open={open1}
            value={addressType}
            items={addressItem}
            setOpen={setOpen1}
            setValue={setAddressType}
            setItems={setAddressItem}
            placeholder="Type of Address"
            placeholderStyle={typography.placeholder}
            style={{
              height: hp(6),
              borderRadius: spacing.xs,
              paddingHorizontal: spacing.s,
              backgroundColor: COLORS.WHITE,
              borderColor: COLORS.BORDER,
              borderWidth: 1,
              marginTop:-hp(0.5)
            }}
            onChangeValue={item => console.log(item.label, item.value)}
          />
          <Button
            title={"ADD ADDRESS"}
            style={{ backgroundColor: "#0F96A0", marginTop: hp(3) }}
            handlePress={saveAddress}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
