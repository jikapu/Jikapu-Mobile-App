import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  Keyboard,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { edit, visa, downArrow, npUp, deleteImg } from "@/assets";
import {
  RadioButton,
  CustomHeader,
  InputField,
  Loader,
  Button,
} from "@/components";
import moment from "moment";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Account/Account.styles";
import { typography, spacing } from "@/theme";
import { Image } from "react-native-elements";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateIsEmpty, validateName } from "@/utils/Validations";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  addUserCard,
  getAllCards,
  deleteCard,
  updateUserCard,
} from "@/actions/auth/UserActions";

export const Cards = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.common.isLoading);
  const cardsListData = useSelector((state) => state.user.cardsListData);

  const [addCard, setAddCard] = useState(true);
  const [name, setName] = useState("");
  const [cardNo, setCardNo] = useState();
  const [expiry, setExpiry] = useState(new Date());
  const [cvv, setCvv] = useState();
  const [cardType, setCardType] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [fieldReq, setFieldReq] = useState("");
  const [nameError, setNameError] = useState("");
  const [noError, setNoError] = useState("");
  const [expError, setExpError] = useState("");
  const [cvvError, setCvvError] = useState("");

  // const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || expiry;

      showPicker(false);
      setExpiry(selectedDate);
    },
    [expiry, showPicker]
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCards(navigation));
  }, []);

  const checkCard = (which) => {
    setCardType(which);
  };

  const addCardDetails = () => {
    Keyboard.dismiss();
    if (
      validateIsEmpty(name.trim()) ||
      validateIsEmpty(cardNo) ||
      validateIsEmpty(expiry.trim()) ||
      validateIsEmpty(cvv)
    ) {
      if (validateIsEmpty(name.trim())) {
        setNameError(strings.error.req_field);
      }
      if (validateIsEmpty(cardNo)) {
        setNoError(strings.error.req_field);
      }
      if (validateIsEmpty(expiry.trim())) {
        setExpError(strings.error.req_field);
      }
      if (validateIsEmpty(cvv)) {
        setCvvError(strings.error.req_field);
      }
    } else {
      let params = {
        cardType: cardType,
        cardNumber: cardNo,
        nameOnCard: name,
        expiryDate: expiry,
        cvv: cvv,
        device: Platform.OS,
      };
      dispatch(
        addUserCard(navigation, params, (res) => {
          setAddCard(false);
          dispatch(getAllCards(navigation));
        })
      );
    }
  };

  const editCard = (item) => {
    navigation.push(NAVIGATION.editCard, {
      details: item,
    });
  };

  const delCard = (id) => {
    dispatch(
      deleteCard(navigation, id, (res) => {
        dispatch(getAllCards(navigation));
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
    let dt = moment(date).format("MM/YYYY");
    console.log(dt);
    setDatePickerVisible(false);
    setExpiry(dt);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}
      <CustomHeader
        title={strings.profile.saved_cards}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />

      <View style={{ marginTop: hp(3), paddingHorizontal: wp(4) }}>
        <View style={styles.listView}>
          {cardsListData && cardsListData.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                flexDirection: "column",
              }}
              inverted
              data={cardsListData}
              extraData={cardsListData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    backgroundColor: COLORS.WHITE,
                    flex: 1,
                    marginVertical: hp(1),
                    paddingVertical: hp(2),
                    paddingHorizontal: wp(4),
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={visa}
                      style={{
                        alignSelf: "flex-start",
                        width: 34,
                        height: 22,
                        borderRadius: 10,
                      }}
                    />
                    <View
                      style={{ flexDirection: "row", alignSelf: "flex-end" }}
                    >
                      <TouchableOpacity onPress={() => editCard(item)}>
                        <Image
                          source={edit}
                          style={{
                            width: 13,
                            height: 13,
                            marginHorizontal: wp(2),
                          }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => delCard(item)}>
                        <Image
                          source={deleteImg}
                          style={{ width: 15, height: 15 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={{ marginVertical: hp(1) }}>
                    {item?.nameOnCard}
                  </Text>
                  <Text>
                    **** **** ****{" "}
                    {item?.cardNumber?.substr(item.cardNumber.length - 4)}
                  </Text>
                </View>
              )}
            />
          ) : null}
        </View>
        <KeyboardAwareScrollView>
          <View
            style={{
              marginTop: hp(1),
              flex: 1,
              padding: wp(5),
              borderRadius: spacing.xs,
            }}
          >
            <TouchableOpacity
              //  onPress={() => setAddCard(!addCard)}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: wp(4.3),
                  color: COLORS.BLACK,
                  fontWeight: "bold",
                }}
              >
                Add Card
              </Text>
              {/* 
               <TouchableOpacity onPress={() => setAddCard(!addCard)}>
                <Image
                  source={addCard == true ? npUp : downArrow}
                  style={{ width: 12, height: 12 }}
                />
              </TouchableOpacity>
              */}
            </TouchableOpacity>
            {addCard == true ? (
              <View>
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
                  maxLength={16}
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
                    setCode={() => showDatePicker(true)}
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
                  maxLength={3}
                  containerStyle={{
                    marginTop: -hp(1.5),
                  }}
                  error={cvvError}
                  placeholder="CVV"
                ></InputField>
                <Button
                  title={"SAVE"}
                  style={{ backgroundColor: "#0F96A0", marginTop: hp(1) }}
                  handlePress={() => addCardDetails()}
                />
              </View>
            ) : null}
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
        {/*

           {show && (
        <MonthPicker
          onChange={onValueChange}
          value={expiry}
          minimumDate={new Date()}
         
         // locale="eng"
          
        />
      )}
        
          */}
      </View>
    </View>
  );
};
