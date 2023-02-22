import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,Platform,
  Image,ToastAndroid,Alert,ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  validateIsEmpty,
  validateName,
} from '@/utils/Validations';
import {
  mpaisa,
  checkBox,
  checkBoxEmpty,
  airtel,
  equity, visacard
} from "@/assets";
import {
  RadioButton,
  Button,
  CustomHeader,
  InputField,
  Loader,
} from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/CheckOut/PaymentOption/PaymentOption.styles";
import { typography, spacing } from "@/theme";

import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import DropDownPicker from "react-native-dropdown-picker";
import { addUserCard, getAllCards } from "@/actions/auth/UserActions";

export const PaymentOption = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const { billingAddress,shippingAddress } = route.params;
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [showMpaisa, setShowMpaisa] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const cardsListData = useSelector((state) => state.user.cardsListData);

  const [addCard, setAddCard] = useState(false);
  const [name, setName] = useState("");
  const [cardNo, setCardNo] = useState();
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState();
  const [cardType, setCardType] = useState("")
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [fieldReq, setFieldReq] = useState('');
  const [nameError, setNameError] = useState('')
  const [noError, setNoError] = useState('')
  const [expError, setExpError] = useState('')
  const [cvvError, setCvvError] = useState('')



  const [card, setcard] = useState({})
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(cardsListData.map(item => ({ label: `${item.cardNumber.substr(item.cardNumber.length - 4) + '**** **** ****'}`, value: item })));


  useEffect(() => {
    dispatch(getAllCards());
  }, []);

  const data = [
    {
      id: 1,
      name: "Mpesa",
      img: mpaisa
    },
    {
      id: 2,
      name: "Airtel",
      img: airtel
    },
    {
      id: 3,
      name: "Equity",
      img: equity
    },
    {
      id: 4,
      name: "Visa / MasterCard",
      img: visacard
    },
  ];
  const handleItem = (index, item) => {
    switch (item.id) {
      case 1:
        setShowMpaisa(!showMpaisa);
        setShowCard(false);
        break;
      case 2:
        Alert.alert("Coming Soon");

        break;
      case 3:
        Alert.alert("Coming Soon");
        break;
      case 4:
        setShowCard(!showCard);
        setShowMpaisa(false);
        break;
      default:
        break;
    }
  };
  const checkCard = (which) => {
    setCardType(which);
  };

  const addCardDetails = () => {
    Keyboard.dismiss();
    if (validateIsEmpty(name.trim())) {
      setNameError(strings.error.req_field);
      return
    }
    else if (validateIsEmpty(cardNo.trim())) {
      setNoError(strings.error.req_field);
      return
    }
    else if (validateIsEmpty(expiry.trim())) {
      setExpError(strings.error.req_field);
      return
    }
    else if (validateIsEmpty(cvv.trim())) {
      setCvvError(strings.error.req_field);
      return
    }

    else {
      let params = {
        cardType: cardType,
        cardNumber: cardNo,
        nameOnCard: name,
        expiryDate: expiry,
        cvv: cvv,
        device: Platform.OS
      }
      dispatch(
        addUserCard(params, res => {
          setAddCard(false)
          dispatch(getAllCards());
        })
      );
    }
  }

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    let dt = moment(date).format("MM/YYYY");
    setDatePickerVisible(false);
    setExpiry(dt);
    hideDatePicker();
  };

  const addContinue = (id) => {
    if (saveCard === true) {
      addCardDetails();
    }
    navigation.navigate(NAVIGATION.reviewOrder,
      {
        id: id,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        cardDetails: card,
      })
  }

  const saveCardDetails = () => {
    setSaveCard(!saveCard)
  }

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}
      <CustomHeader
        title={strings.cart.paymentOption}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: wp(5),
          }}
        >
          {data.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
              data={data}
              extraData={data}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleItem(index, item)}
                  style={
                    showHighlight == true
                      ? [
                        styles.btn,
                        { borderWidth: 2, borderColor: COLORS.GREEN_BTN },
                      ]
                      : styles.btn
                  }
                >
                  <Image source={item.img} />
                  <Text style={{ fontSize: wp(2.9), marginTop: hp(1) }}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          ) : null}
        </View>
        {showMpaisa == true ? (
          <View style={{ paddingHorizontal: wp(5) }}>
            <Text>Mpesa Mobile Number</Text>
            <View style={{ flexDirection: "row" }}>
              <InputField

                setCode={(text) => setCountryCode(text)}
                value={countryCode}
                placeholder="254"
                inputStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  backgroundColor: COLORS.BG_SKYBLUE,
                }}
                containerStyle={{ width: wp(20) }}
              ></InputField>
              <InputField
                maxLength={13}
                setCode={(text) => setPhone(text)}
                value={phone}
                containerStyle={{ width: wp(70) }}
                inputStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              ></InputField>
            </View>
            <Text>Total amount</Text>
            <InputField
              setCode={(text) => setAmount(text)}
              value={amount}
            ></InputField>
            <Button
              title={"Pay Now"}
              style={{
                backgroundColor: COLORS.GREEN_BTN,
                height: hp(5),
                marginTop: hp(3),
              }}
            />
          </View>
        ) : null}
        {showCard == true ? (
          <View style={{ paddingHorizontal: wp(5) }}>
            <Text
              style={{
                fontSize: wp(4.5),
                color: COLORS.BLACK,
                fontWeight: "bold",
                marginBottom: hp(1.6),
              }}
            >
              Select from Saved Card
            </Text>
            <DropDownPicker
              open={open}
              value={card}
              items={items}
              setOpen={setOpen}
              setValue={setcard}
              setItems={setItems}
              onChangeValue={(value) => {
                console.log("onchangeValue", value);
              }}
              onSelectItem={(item) => {
                console.log("onSelectItem", item);
              }}
              placeholder="Select From Saved Card"
              containerStyle={{
                height: hp(5),
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}

              style={{
                backgroundColor: "#FFFF",
                borderColor: "#707070",
                borderWidth: 1,
                paddingHorizontal: wp(4),
              }}
              labelStyle={{
                fontSize: wp(3.7),
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: spacing.l,
              }}
            >
              <View style={styles.hrLine} />
              <Text style={styles.lineText}>OR</Text>
              <View style={styles.hrLine} />
            </View>
            <Text>Enter your card details to pay</Text>
            <View style={{ marginTop: hp(2) }}>

              <Text>Card Type</Text>
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
              <TouchableOpacity onPress={() => {
                showDatePicker();
              }}>
                <InputField
                  setCode={() => showDatePicker()}
                  value={expiry}
                  error={expError}
                  placeholder="Expiry Date"
                  containerStyle={{
                    marginTop: -hp(1.5),
                  }}
                ></InputField></TouchableOpacity>

              <InputField
                setCode={(text) => setCvv(text)}
                value={cvv}
                containerStyle={{
                  marginTop: -hp(1.5),
                }}
                error={fieldReq}
                placeholder="CVV"
              ></InputField>



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

         
              <TouchableOpacity style={{flexDirection: "row", marginTop: hp(1)}}
                onPress={() => saveCardDetails()}
              >
                <Image
                  source={saveCard == true ? checkBox : checkBoxEmpty}
                  style={{ width: 20, height: 20 }}
                />
                 <Text
                style={{
                  fontSize: wp(3.7),
                  color: COLORS.BLACK,
                  marginLeft: wp(2),
                }}
              >
                Save card for future checkouts
              </Text>
              </TouchableOpacity>
             
           
            <Button
              title={"CONTINUE"}
              style={{
                backgroundColor: COLORS.GREEN_BTN,
                height: hp(5),
                marginTop: hp(3),
              }}
              handlePress={() => addContinue()}
            />
          </View>
        ) : null}
       <View>
       </View>

      </ScrollView>
    </View>
  );
};
