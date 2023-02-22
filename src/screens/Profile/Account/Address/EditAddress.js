import React, { useState } from "react";
import {  View,ScrollView, Keyboard } from "react-native";
import { useDispatch, } from "react-redux";
import {
  CustomHeader,
  InputField,
  Button
} from "@/components";
import DropDownPicker from "react-native-dropdown-picker";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Account/Account.styles";
import { typography, spacing } from "@/theme";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  validateIsEmpty,
  validateName,
} from '@/utils/Validations';
import { updateAddress, getAllAddress } from "@/actions/auth/UserActions";

export const EditAddress = ({ route, navigation }) => {
  const { details } = route.params;
  const dispatch = useDispatch();
  const id = details._id;
  const [addressName, setAddressName] = useState(details.addressName);
  const [addressType, setAddressType] = useState(details.addressType)
  const [firstName, setFirstName] = useState(details.firstName);
  const [lastName, setLastName] = useState(details.lastName);
  const [companyName, setCompanyName] = useState(details.companyName);
  const [country, setCountry] = useState(details.countryRegion);
  const [firstLine, setFirstLine] = useState(details.firstLine);
  const [secondLine, setSecondLine] = useState(details.secondLine);
  const [thirdLine, setThirdLine] = useState(details.thirdLine);
  const [county, setCounty] = useState(details.state);
  const [city, setCity] = useState(details.city);
  const [ward, setWard] = useState(details.ward);
  const [zip, setZip] = useState(details.zip);
  const [phone, setPhone] = useState(details.phone.toString());
  const [email, setEmail] = useState(details.email);


  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState([]);
  const [item, setItem] = useState([
    { label: "Home", value: "Home" },
    { label: "Office", value: "Office" },
    { label: "Other", value: "Other" },
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Kenya", value: "Kenya" },
    { label: "United States", value: "United States" },
    { label: "United Kingdom", value: "United Kingdom" },
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

  const editAddress = () => {
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

    } else {
      let params = {
        _id: id,
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
      console.log(params, "paramsahbasdjascgasv")
      dispatch(updateAddress(navigation,params, res => {
        dispatch(getAllAddress(navigation));
        navigation.navigate(NAVIGATION.address)
      })
      );
    }

  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Edit Address"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginTop: hp(2),
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
                        ></InputField>*/}

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
              marginTop: hp(0.5),
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
            placeholder="Zip Code*"
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
            items={item}
            setOpen={setOpen1}
            setValue={setAddressType}
            setItems={setItem}
            placeholder="Type of Address"
            placeholderStyle={typography.placeholder}
            style={{
              height: hp(6),
              borderRadius: 8,
              paddingHorizontal: spacing.s,
              backgroundColor: COLORS.WHITE,
              borderColor: COLORS.BORDER,
              borderWidth: 1,
              marginTop: -hp(0.5)
            }}
            onChangeValue={item => console.log(item.label, item.value)}
          />
          <Button
            title={"SAVE"}
            style={{ backgroundColor: "#0F96A0", marginTop: hp(3) }}
            handlePress={() => editAddress()}
          />

        </View>

      </ScrollView>
    </View>
  );
};
