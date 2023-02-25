import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Modal,
  FlatList,
  TextInput,
  ScrollView,
  Linking,
  Button as ButtonR,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { truck, closeIcon, npDown, pathUp, pathDown } from "@/assets";
import { Button, CustomHeader, InputField } from "@/components";
import moment from "moment";
import { validateIsEmpty } from "@/utils/Validations";
import { strings } from "@/localization";
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./ReviewOrder.styles";
import { typography, spacing } from "@/theme";

import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  addOrderComplete,
  addIPayPayment,
  addMPaisaPayment,
  redeemCoins,
  verifyCouponCode,
  verifyCoupon,
  addPayment,
  addOrder,
  completeMPaisaPayment,
  getOrderDetailsById,
  getOrderSummary,
} from "@/actions/home/HomeAction";

export const ReviewOrder = ({ route, navigation }) => {
  const { shippingAddress, paymentMode, status, isFresh } = route.params;
  console.log("shipping addresssssss",shippingAddress)
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const addOrderData = useSelector((state) => state.user.addOrderData);
  const orderId = addOrderData && addOrderData._id ? addOrderData._id :null
  const userId = userData?._id;
  const coins = addOrderData?.customerId?.coinCount;
  const firstName = shippingAddress && shippingAddress.firstName ? shippingAddress.firstName :''
  const lastName = shippingAddress && shippingAddress.lastName ? shippingAddress.lastName :''
  const secondLine = shippingAddress && shippingAddress.secondLine ? shippingAddress.secondLine :''
  const firstLine = shippingAddress && shippingAddress.firstLine ? shippingAddress.firstLine :''
  const city = shippingAddress && shippingAddress.city ? shippingAddress.city : ' '
  const countryRegion = shippingAddress && shippingAddress.countryRegion ?  shippingAddress.countryRegion :''
  const zip = shippingAddress && shippingAddress.zip ? shippingAddress.zip :''
  const phone = shippingAddress && shippingAddress.phone ? shippingAddress.phone  :''
/*
 
{shippingAddress.secondLine +
                  "  " +
                  shippingAddress.firstLine +
                  "  " +
                  shippingAddress.city +
                  " " +
                  shippingAddress.countryRegion +
                  " " +
                  shippingAddress.zip}
              </Text>
              <Text style={[typography.label, { marginTop: hp(0.5) }]}>
                Phone: {shippingAddress.phone}
*/

  


  // Calculate Order summary data
  const tax = addOrderData && addOrderData.tax ? addOrderData.tax : 0;
  const [promoCode, setPromoCode] = useState("");
  const [coinNumber, setCoinNumber] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const subTotal = addOrderData?.subTotal;
  const numOfItems = addOrderData?.cartId?.items?.length;
  const [coinsRedeemed, setCoinsRedeemed] = useState(0);
  const [coinsRedeemedValue, setCoinsRedeemedValue] = useState(0);
  const [couponRedeemedValue, setCouponRedeemedValue] = useState(0);

  const totalPrice =
    subTotal + shippingPrice + tax - coinsRedeemedValue - couponRedeemedValue;
  const [promoCodeError, setPromoCodeError] = useState("");
  const [coinNumberError, setCoinNumberError] = useState("");
  const [showDes, setShowDes] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("254");
  const [modalVisible, setModalVisible] = useState(false);
  const [mPesaModal, setMpesaModal] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoError, setMobileNoError] = useState("");

  const [show, setShow] = useState("none");
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [mode, setMode] = useState("time");

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("18:00");

  const onFromTimeChange = (event, selectedFromTime) => {
    const currentFrom = selectedFromTime || fromTime;
    setShow("showFromPicker");
    setFromTime(currentFrom);
  };
  const onToTimeChange = (event, selectedToTime) => {
    const currentToTime = selectedToTime || toTime;
    setShow("none");
    setToTime(currentToTime);
  };
  const showMode = (currentMode, pickerType) => {
    setShow(pickerType);
    setMode(currentMode);
  };

  useEffect(() => {
    getSummary();
    calculatedelivery();
  }, []);

  const getSummary = () => {
    dispatch(
      getOrderSummary(navigation, status, isFresh, (res) => {
        setPromoCode(res.data.items[0].additionalDiscount);
      })
    );
  };

  const calculatedelivery = () => {
    if (city === "Nairobi") {
      if (addOrderData?.subTotal >= 3500) {
        setShippingPrice(0);
      }
    } else {
      setShippingPrice(addOrderData?.shippingPrice);
    }
  };

  const verifyCode = () => {
    Keyboard.dismiss();
    if (validateIsEmpty(promoCode.trim())) {
      setPromoCodeError(strings.error.req_field);
      return;
    } else {
      const data = {
        code: promoCode,
        orderId: orderId,
        userId: userId,
      };
      dispatch(
        verifyCoupon(navigation, data, (res) => {
          let param = {
            status: status,
            isFresh: isFresh,
            shippingPrice: shippingPrice,
          };
          dispatch(
            addOrder(navigation, param, (res) => {
              if (res.data.compaignId.type === 1) {
                setCouponRedeemedValue(
                  (subTotal * res.data?.compaignId?.discountValue) / 100
                );
              } else {
                setCouponRedeemedValue(res.data?.compaignId?.discountValue);
              }
            })
          );
        })
      );
    }
  };

  const verifyCoins = () => {
    Keyboard.dismiss();
    if (validateIsEmpty(coinNumber.trim())) {
      setCoinNumberError(strings.error.req_field);
      return;
    } else {
      const data = {
        userId: userData?._id,
        coins: coinNumber,
        orderId: orderId,
      };
      dispatch(
        redeemCoins(navigation, data, (res) => {
          let param = {
            status: status,
            isFresh: isFresh,
            shippingPrice: shippingPrice,
          };
          dispatch(
            addOrder(navigation, param, (res) => {
              setCoinsRedeemed(res.data.redeemCoinsId.redeemcoins);
              setCoinsRedeemedValue(res.data.redeemCoinsId.KenyaValue);
            })
          );
        })
      );
    }
  };

  const placeOrder = () => {
    if (paymentMode === "iPay") {
      let params = {
        currency: "KES",
        orderId: orderId,
        user_ttl: subTotal,
        user_eml: userData.email,
        //  user_cbk: supportedURL,
      };
      dispatch(
        addIPayPayment(navigation, params, (res) => {
          navigation.push(NAVIGATION.paymentView, {
            resUrl: res?.return_url,
            statusNo: status,
            isFreshNo: isFresh,
            paymentMode: paymentMode,
            deliveryDate: deliveryDate,
            deliveryStartTime: moment(fromTime).format("HH:mm"),
            deliveryEndTime: moment(toTime).format("HH:mm"),
          });
        })
      );
    } else if (paymentMode === "mPesa") {
      setMpesaModal(true);
    }
  };

  const payMpesa = () => {
    setMpesaModal(false);
    const contactWithCode = countryCode+mobileNo
    let param = {
      phoneNumber: `${contactWithCode.replace(/-|\s/g, "")}`,
      orderId: orderId,
      amount: subTotal,
    };

  
    dispatch(
      addMPaisaPayment(navigation, param, (res) => {
          try {
            var intervalID = setInterval(async () => {
              dispatch(
                getOrderDetailsById(navigation, orderId, async (res) => {
                    if (
                      res.messageID === 200 &&
                      res.data.paymentStatus === "completed"
                    ) {
                      navigation.navigate(NAVIGATION.thankYou, {
                        status: status,
                        isFresh: isFresh,
                        deliveryDate: deliveryDate,
                        deliveryStartTime: fromTime,
                        deliveryEndTime: toTime,
                      });
                    } else if (
                      res.messageID === 200 &&
                      res.data.paymentStatus === "cancelled"
                    ) {
                      Alert.alert("mpeasa cancelled");
                      
                    }
                  }
                )
              );
            }, 10000);
          } catch (e) {
            console.log("error", e);
          }
        
        
        /*
        let params = {
          Body: {
            stkCallback: {
              CheckoutRequestID: res.data.CheckoutRequestID,
              ResultCode: res.data.ResponseCode,
            },
          },
        };
         dispatch(
          completeMPaisaPayment(navigation, params, (res) => {
            navigation.navigate(NAVIGATION.thankYou, {
              status: status,
              isFresh: isFresh,
              deliveryDate: deliveryDate,
              deliveryStartTime: fromTime,
              deliveryEndTime: toTime,
            });
          })
        );
        */   
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
    let dt = moment(date).format("DD-MM-YYYY");
    setDatePickerVisible(false);
    setDeliveryDate(dt);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleStartConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    let dt = moment(date).format("HH:mm");
    setStartTimePickerVisible(false);
    setStartTime(dt);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleEndConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    let dt = moment(date).format("HH:mm");
    setEndTimePickerVisible(false);
    setEndTime(dt);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Review Your Order"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.BG_SKYBLUE,
            margin: wp(4),
            borderRadius: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowDes(!showDes)}
            style={{
              flex: 1,
              padding: wp(4),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: wp(4.5),
                color: COLORS.BLACK,
                fontWeight: "bold",
              }}
            >
              Order Details
            </Text>
            <TouchableOpacity onPress={() => setShowDes(!showDes)}>
              <Image
                source={showDes == true ? pathUp : pathDown}
                style={{ width: 14, height: 8 }}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {showDes == true ? (
            <View style={{ margin: wp(2.5) }}>
              <View
                style={{ height: 0.7, backgroundColor: "black", width: "100%" }}
              />
              <Text style={[typography.labelBold, { marginTop: hp(2) }]}>
                {strings.profile.shippingAdd}
              </Text>
              <Text style={[typography.label, { marginTop: hp(0.5) }]}>
                {firstName + " " + lastName}
              </Text>
              <Text style={typography.label}>
                {secondLine +
                  "  " +
                  firstLine +
                  "  " +
                  city +
                  " " +
                  countryRegion +
                  " " +
                  zip}
              </Text>
              <Text style={[typography.label, { marginTop: hp(0.5) }]}>
                Phone: {phone}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text
                  style={[
                    typography.labelBold,
                    { marginTop: hp(0.5), color: COLORS.GREEN_BTN },
                  ]}
                >
                  {strings.reviewOrder.addDeliveryIns}
                </Text>
              </TouchableOpacity>

              {modalVisible == true ? (
                <View style={styles.centeredView}>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    backdropOpacity={0.5}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: hp(2.2),
                          }}
                        >
                          <Text
                            style={{
                              color: "black",
                              fontFamily: "ProductSans-Bold",
                              fontSize: wp(5.1),
                            }}
                          >
                            {strings.reviewOrder.deliveryIns}
                          </Text>
                          <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Image
                              source={closeIcon}
                              style={{ width: 30, height: 30 }}
                            />
                          </Pressable>
                        </View>
                        <Text style={typography.labelBold}>
                          1.Decide on Your Delivery Method:{" "}
                          <Text
                            style={[
                              typography.label,
                              { marginVertical: hp(1) },
                            ]}
                          >
                            {strings.DELIVERY_INSTRUCTIONS1}
                          </Text>
                        </Text>
                        <Text
                          style={[
                            typography.labelBold,
                            { marginVertical: hp(1) },
                          ]}
                        >
                          2.Decide on Your Delivery Method:{" "}
                          <Text
                            style={[
                              typography.label,
                              { marginVertical: hp(1) },
                            ]}
                          >
                            {strings.DELIVERY_INSTRUCTIONS2}
                          </Text>
                        </Text>
                        <Text style={typography.labelBold}>
                          3.Decide on Your Delivery Method:{" "}
                          <Text
                            style={[
                              typography.label,
                              { marginVertical: hp(1) },
                            ]}
                          >
                            {strings.DELIVERY_INSTRUCTIONS3}
                          </Text>
                        </Text>

                        <Text style={[typography.text, { marginTop: hp(2) }]}>
                          {strings.DELIVERY_INSTRUCTIONS}
                        </Text>
                      </View>
                    </View>
                  </Modal>
                </View>
              ) : null}

              {mPesaModal == true ? (
                <View style={styles.centeredView}>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    backdropOpacity={0.5}
                    visible={mPesaModal}
                    onRequestClose={() => {
                      setMpesaModal(!mPesaModal);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Pressable
                          onPress={() => setMpesaModal(!mPesaModal)}
                          style={{ alignSelf: "flex-end" }}
                        >
                          <Image
                            source={closeIcon}
                            style={{ width: 30, height: 30 }}
                          />
                        </Pressable>

                        <Text
                          style={{
                            color: "black",
                            fontFamily: "ProductSans-Bold",
                            fontSize: wp(4.1),
                            marginTop: hp(1),
                          }}
                        >
                          Entry Mobile No.
                        </Text>
                        <Text style={[typography.text, { marginTop: hp(1.5) }]}>
                          Total Amount: KES {subTotal}
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            width: wp(76),
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ width: wp(14) }}>
                            <View
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
                              <Text>+254</Text>
                            </View>
                          </View>

                          <View style={{ width: wp(60) }}>
                            <InputField
                              placeholder={"Enter Your Mobile No."}
                              value={mobileNo}
                              error={setMobileNoError}
                              setCode={(text) => setMobileNo(text)}
                            ></InputField>
                          </View>
                        </View>

                        <Button
                          style={{
                            backgroundColor: "#EEB600",
                            paddingHorizontal: wp(10),
                          }}
                          title={"Continue"}
                          handlePress={() => payMpesa()}
                        />
                      </View>
                    </View>
                  </Modal>
                </View>
              ) : null}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: hp(2.5),
                }}
              >
                <Text style={[typography.labelBold]}>Payment Mode </Text>
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <Text style={[typography.label, { color: COLORS.GREEN_BTN }]}>
                    (change)
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={[typography.label, { marginTop: hp(0.5) }]}>
                {paymentMode !== undefined || null ? paymentMode : ""}
              </Text>
              {/*
               <Text style={[typography.label, { marginTop: hp(0.5) }]}>
                VISA {cardDetails?.cardNumber?.substr(cardDetails.cardNumber.length - 4) + ' ****'} (CARD)
              </Text>
              */}

              <Text style={[typography.labelBold, { marginTop: hp(2) }]}>
                Jikapu Coins{" "}
              </Text>
              <Text style={[typography.label, { marginTop: hp(0.5) }]}>
                {coins}
              </Text>

              <Text style={[typography.labelBold, { marginTop: hp(2) }]}>
                Apply Promo Code
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 0.6 }}>
                  <InputField
                    placeholder={"Enter Code"}
                    value={promoCode}
                    error={promoCodeError}
                    setCode={(text) => setPromoCode(text)}
                  ></InputField>
                </View>
                <View style={{ flex: 0.35 }}>
                  <Button
                    style={{
                      backgroundColor: "#EEB600",
                      marginTop: Platform.OS === "android" ? -10 : 0,
                    }}
                    title={"APPLY"}
                    handlePress={() => {
                      verifyCode();
                    }}
                  />
                </View>
              </View>
              <Text style={[typography.labelBold, { marginTop: hp(1) }]}>
                Redeem Coins
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 0.6 }}>
                  <InputField
                    placeholder={"Enter Coin Number"}
                    value={coinNumber}
                    error={coinNumberError}
                    setCode={(text) => setCoinNumber(text)}
                  ></InputField>
                </View>
                <View style={{ flex: 0.35 }}>
                  <Button
                    style={{
                      backgroundColor: "#EEB600",
                      marginTop: Platform.OS === "android" ? -10 : 0,
                    }}
                    title={"APPLY"}
                    handlePress={verifyCoins}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.WHITE,
            marginVertical: wp(2),
            marginHorizontal: wp(4),
            borderRadius: 8,
            padding: wp(4),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image source={truck} style={{ width: 30, height: 20 }} />
            <Text style={[typography.label, { marginLeft: wp(1) }]}>
              Delivery
            </Text>
          </View>
          <Text
            style={[
              typography.labelBold,
              { color: COLORS.GREEN_BTN, marginTop: hp(0.5) },
            ]}
          >
            {moment(new Date()).add(3, "days").format("dddd, MMM D ")}(3 days)
          </Text>
          {/* 
           <View style={{ marginTop: hp(2) }}>
            <Text style={typography.label}>Order within </Text>
            <Text style={[typography.labelBold, { color: "#A70000" }]}>
              {" "}
              2 hrs and 43 mins
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: hp(1) }}>
            <View>
              <Image source={checkBox} style={{ width: 20, height: 20 }} />
            </View>
            <View style={{ flexDirection: "column", marginLeft: wp(4) }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={fastTruck} style={{ width: 40, height: 20 }} />
                <Text style={[typography.label, { marginLeft: wp(1) }]}>
                  Fast Delivery{" "}
                </Text>
              </View>
              <Text style={[typography.labelBold, { color: COLORS.GREEN_BTN }]}>
                Same Day Delivery
              </Text>
            </View>
          </View>
          */}

          <Text style={[typography.labelBold, { marginTop: hp(2) }]}>
            Choose Delivery Schedule
          </Text>

          <InputField
            btnPress={() => showDatePicker()}
            value={deliveryDate}
            placeholder="Monday, 27 October, 2021"
            isDropdown={true}
            type="editCalendar"
          ></InputField>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={showStartTimePicker}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.43,
                borderWidth: 1,
                borderRadius: spacing.xs,
                backgroundColor: COLORS.WHITE,
                borderColor: COLORS.BORDER,
                height: hp(6),
              }}
            >
              <Text style={[typography.label, { flex: 1, paddingLeft: 20 }]}>{startTime}</Text>
              <View style={{ flex: 0.25 }}>
                <Image source={pathDown} />
              </View>
            </TouchableOpacity>

            <View style={{ flex: 0.14, alignItems: "center" }}>
              <Text style={typography.label}>TO</Text>
            </View>

            <TouchableOpacity onPress={showEndTimePicker}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.43,
                borderWidth: 1,
                borderRadius: spacing.xs,
                backgroundColor: COLORS.WHITE,
                borderColor: COLORS.BORDER,
                height: hp(6),
              }}
            >
              <Text style={[typography.label, { flex: 1, paddingLeft: 20 }]}>{endTime}</Text>
              <View style={{ flex: 0.25 }}>
                <Image source={pathDown} />
              </View>
            </TouchableOpacity>

            {/*
             <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.43,
                borderWidth: 1,
                borderRadius: spacing.xs,
                backgroundColor: COLORS.WHITE,
                borderColor: COLORS.BORDER,
                height: hp(6),
              }}
            >
              <TextInput
                style={[typography.label, { flex: 1, paddingLeft: 20 }]}
                onTouchStart={() => showMode("time", "showToPicker")}
                value={moment(toTime).format("HH : mm")}
                onChangeText={onToTimeChange}
              />
              {show === "showToPicker" && (
                <DateTimePickerModal
                  testID="TimePicker"
                  value={toTime}
                  mode={mode}
                  is24Hour={false}
                  display="default"
                  onChange={onToTimeChange}
                />
              )}
              <View style={{ flex: 0.25 }}>
                <Image source={pathDown} />
              </View>
            </View>
            */}
           

          </View>

          <View style={{ marginTop: hp(2) }}>
            <Text style={typography.labelBold}>Order Summary</Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                marginTop: hp(1),
              }}
            >
              <View style={{ flex: 0.65 }}>
                <Text style={typography.label}>Items</Text>
              </View>
              <View style={{ flex: 0.35 }}>
                <Text style={typography.label}>: {numOfItems}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                marginTop: hp(0.5),
              }}
            >
              <View style={{ flex: 0.65 }}>
                <Text style={typography.label}>Delivery</Text>
              </View>
              <View style={{ flex: 0.35 }}>
                <Text style={typography.label}>
                  : KES {shippingPrice.toLocaleString()}
                </Text>
              </View>
            </View>
            {tax > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  marginTop: hp(0.5),
                }}
              >
                <View style={{ flex: 0.65 }}>
                  <Text style={typography.label}>Tax</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                  <Text style={typography.label}>
                    : KES {tax.toLocaleString()}
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                marginTop: hp(0.5),
              }}
            >
              <View style={{ flex: 0.65 }}>
                <Text style={typography.label}>Sub Total</Text>
              </View>
              <View style={{ flex: 0.35 }}>
                <Text style={typography.label}>
                  : KES {subTotal.toLocaleString()}
                </Text>
              </View>
            </View>
            {coinsRedeemed > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  marginTop: hp(0.5),
                }}
              >
                <View style={{ flex: 0.65 }}>
                  <Text style={typography.label}>Coins Redeemed</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                  <Text style={typography.label}>
                    : {coinsRedeemed.toLocaleString()}{" "}
                  </Text>
                </View>
              </View>
            ) : null}

            {coinsRedeemedValue > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  marginTop: hp(0.5),
                }}
              >
                <View style={{ flex: 0.65 }}>
                  <Text style={typography.label}>Coins Red. Values</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                  <Text style={typography.label}>
                    : KES {Math.round(coinsRedeemedValue.toLocaleString())}{" "}
                  </Text>
                </View>
              </View>
            ) : null}

            {couponRedeemedValue > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  marginTop: hp(0.5),
                }}
              >
                <View style={{ flex: 0.65 }}>
                  <Text style={typography.label}>Promotion Applied</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                  <Text style={typography.label}>
                    : KES {couponRedeemedValue.toLocaleString()}{" "}
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                marginTop: hp(0.5),
              }}
            >
              <View style={{ flex: 0.65 }}>
                <Text style={[typography.labelBold, { color: COLORS.PRIMARY }]}>
                  Total
                </Text>
              </View>
              <View style={{ flex: 0.35 }}>
                <Text style={[typography.labelBold, { color: COLORS.PRIMARY }]}>
                  : KES {totalPrice.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
          <Button
            style={{ backgroundColor: "#EEB600", marginTop: hp(2) }}
            title={"PLACE YOUR ORDER"}
            handlePress={placeOrder}
          />
        </View>
        {isDatePickerVisible && (
          <DateTimePickerModal
            mode="date"
            value={deliveryDate}
            display={Platform.OS === "ios" ? "inline" : "spinner"}
            minimumDate={new Date()}
            pickerContainerStyleIOS={{ paddingHorizontal: 23 }}
            isVisible={isDatePickerVisible}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        )}
        {isStartTimePickerVisible && (
                <DateTimePickerModal
                  value={startTime}
                  mode={"time"}
                  is24Hour={false}
                  display="default"
                  isVisible={isStartTimePickerVisible}
                  onConfirm={handleStartConfirm}
                  onCancel={hideStartTimePicker}
                />
              )}
              {isEndTimePickerVisible && (
                <DateTimePickerModal
                 // testID="dateTimePicker"
                  value={endTime}
                  mode={"time"}
                  is24Hour={false}
                  display="default"
                  isVisible={isEndTimePickerVisible}
                  onConfirm={handleEndConfirm}
                  onCancel={hideEndTimePicker}
                />
              )}
      </ScrollView>
    </View>
  );
};
