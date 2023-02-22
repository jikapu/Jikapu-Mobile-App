import React, { useState } from "react";
import { Text, View, Keyboard, TouchableOpacity, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton, CustomHeader, InputField, Button } from "@/components";
import moment from "moment";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Account/Account.styles";
import { spacing } from "@/theme";
import { NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateIsEmpty } from "@/utils/Validations";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAllCards, updateUserCard } from "@/actions/auth/UserActions";

export const EditCard = ({ route, navigation }) => {
  const { details } = route.params;
  const dispatch = useDispatch();
  const id = details._id;
  const [addCard, setAddCard] = useState(false);
  const [name, setName] = useState(details.nameOnCard);
  const [cardNo, setCardNo] = useState(details.cardNumber);
  const [expiry, setExpiry] = useState(details.expiryDate);
  const [cvv, setCvv] = useState(details.cvv);
  const [cardType, setCardType] = useState(details.cardType);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [fieldReq, setFieldReq] = useState("");
  const [nameError, setNameError] = useState("");
  const [noError, setNoError] = useState("");
  const [expError, setExpError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const checkCard = (which) => {
    setCardType(which);
  };

  const addCardDetails = () => {
    Keyboard.dismiss();
    if (validateIsEmpty(name.trim())) {
      setNameError(strings.error.req_field);
      return;
    } else if (validateIsEmpty(cardNo.trim())) {
      setNoError(strings.error.req_field);
      return;
    } else if (validateIsEmpty(expiry.trim())) {
      setExpError(strings.error.req_field);
      return;
    } else if (validateIsEmpty(cvv.trim())) {
      setCvvError(strings.error.req_field);
      return;
    } else {
      let params = {
        _id: id,
        cardType: cardType,
        cardNumber: cardNo,
        nameOnCard: name,
        expiryDate: expiry,
        cvv: cvv,
        device: Platform.OS,
      };
      dispatch(
        updateUserCard(navigation, params, (res) => {
          navigation.navigate(NAVIGATION.cardsDetails);
          dispatch(getAllCards());
        })
      );
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    let dt = moment(date).format("MM/YYYY");
    console.log(dt);
    setDatePickerVisible(false);
    setExpiry(dt);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Edit Card"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >
        <View
          style={{
            marginTop: hp(1),
            paddingHorizontal: wp(4),
            flex: 1,
            padding: wp(5),
            borderRadius: spacing.xs,
          }}
        >
          <Text style={{ marginTop: hp(2) }}>Card Type</Text>
          <View style={{ flexDirection: "row", marginTop: hp(1.2) }}>
            <TouchableOpacity onPress={() => checkGender("credit")}>
              <RadioButton
                selectedOption={cardType === "credit" ? true : false}
                value={cardType}
                label="Credit"
                onPress={() => checkCard("credit")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: wp(5) }}
              onPress={() => checkCard("debit")}
            >
              <RadioButton
                selectedOption={cardType === "debit" ? true : false}
                value={cardType}
                label="Debit"
                onPress={() => checkCard("debit")}
              />
            </TouchableOpacity>
          </View>
          <InputField
            setCode={(text) => setName(text)}
            value={name}
            placeholder="Name on Card"
            error={nameError}
          ></InputField>
          <InputField
            maxLength={20}
            error={noError}
            setCode={(text) => setCardNo(text)}
            value={cardNo}
            placeholder="Card Number"
            containerStyle={{
              marginTop: -hp(1.5),
            }}
          ></InputField>
          <TouchableOpacity
            onPress={() => {
              showDatePicker();
            }}
          >
            <InputField
              setCode={() => showDatePicker()}
              value={expiry}
              error={expError}
              placeholder="Expiry Date"
              containerStyle={{
                marginTop: -hp(1.5),
              }}
            ></InputField>
          </TouchableOpacity>

          <InputField
            setCode={(text) => setCvv(text)}
            value={cvv}
            containerStyle={{
              marginTop: -hp(1.5),
            }}
            error={fieldReq}
            placeholder="CVV"
          ></InputField>
          <Button
            title={"SAVE"}
            style={{ backgroundColor: "#0F96A0", marginTop: hp(1) }}
            handlePress={() => addCardDetails()}
          />
        </View>

        <DateTimePickerModal
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "spinner"}
          minimumDate={new Date()}
          pickerContainerStyleIOS={{ paddingHorizontal: 23 }}
          isVisible={isDatePickerVisible}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};
