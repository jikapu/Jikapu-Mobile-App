import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Keyboard,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button1,
  Button,
  CustomHeader,
  InputField,
  Loader,
  GuestScreen,
} from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/CheckOut/CheckOut.styles";
import { typography, spacing } from "@/theme";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  getAllAddress,
  addUserAddress,
  addDefaultAddress,
  deleteAddress,
} from "@/actions/auth/UserActions";

export const CheckOut = ({ route, navigation }) => {
  const { status, isFresh } = route.params;
  const isLoading = useSelector((state) => state.common.isLoading);
  const dispatch = useDispatch();
  const addressListData = useSelector((state) => state.user.addressListData);
  console.log(addressListData, "addressListData");
  const [click, setClick] = useState(addressListData.length - 1);
  
  const filterData = addressListData.map((e) => {
    return {
      id: e?._id,
      firstName: e?.firstName,
      lastName: e?.lastName,
      firstLine: e?.firstLine,
      city: e?.city,
      stateArea: e?.state,
      countryRegion: e?.countryRegion,
      zip: e?.zip,
    };
  });
  console.log("filter", filterData);
  const defaultaddress = addressListData[addressListData.length - 1];
  console.log("default address", defaultaddress);
  const [bAddress, setBAddress] = useState(defaultaddress);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    addressListData.map((item) => ({
      label: `${
        item.firstName +
        " " +
        item.addressType +
        " " +
        item.state +
        " " +
        item.city
      }`,
      value: item,
    }))
  );
   
  useEffect(() => {
   getAllAddress()
  }, []);

  /*
   const continueToPayment = () => {
    console.log("billing address", bAddress);
    if (
      Object.entries(bAddress).length === 0 &&
      bAddress.constructor === Object
    ) {
      Alert.alert("Please add or select a address");
    } else {
      navigation.navigate(NAVIGATION.paymentMethod, {
        billingAddress: bAddress,
        shippingAddress: bAddress,
        status,
        isFresh,
      });
    }
  };
  */

  const continueToPayment = () => {
    console.log("billing address", bAddress);
    navigation.push(NAVIGATION.paymentMethod, {
      billingAddress: bAddress,
      shippingAddress: bAddress,
      status,
      isFresh,
    });
  };
  /*
  const selectAddress = (value) => {
    console.log("onChangeValue", value);
    setBAddressError("");
    let params = {
      _id: value._id,
    };
    dispatch(addDefaultAddress(navigation, params));
  };
  */

  const handleClick = (item, index) => {
    setClick(index);
    console.log("item adress", item);
    setBAddress(item);
    let params = {
      _id: item._id,
    };
    dispatch(addDefaultAddress(navigation, params));
  };

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}
      <CustomHeader
        title={strings.cart.checkout}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      <View style={{ flex: 1, marginHorizontal: wp(4), paddingBottom: hp(3) }}>
        <ScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
          <Text
            style={{
              fontSize: wp(4.5),
              color: COLORS.BLACK,
              fontWeight: "bold",
              marginTop: hp(2),
            }}
          >
            Address
          </Text>
          {addressListData.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                flexDirection: "column",
              }}
              inverted
              data={addressListData}
              extraData={addressListData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleClick(item, index)}
                  style={{
                    backgroundColor: COLORS.WHITE,
                    flex: 1,
                    marginVertical: hp(1),
                    padding: wp(4),
                    borderRadius: 10,
                    borderWidth: index === click ? 1 : null,
                    borderColor: index === click ? COLORS.PRIMARY : null,
                  }}
                >
                  <Text style={typography.labelBold}>{item.addressType}</Text>
                  <Text style={[typography.label, { marginTop: hp(0.5) }]}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={typography.label}>
                    {item.firstLine} {item.city} {item.zip}
                  </Text>
                  <Text>{item.countryRegion}</Text>
                </TouchableOpacity>
              )}
            />
          ) : null}
          <Button
            handlePress={() =>
              navigation.navigate(NAVIGATION.addNewAddress, {
                status,
                isFresh,
              })
            }
            style={{
              backgroundColor: COLORS.WHITE,
              height: hp(6),
              borderWidth: 1,
              borderColor: COLORS.PRIMARY,
              marginTop: hp(2),
            }}
            title={"ADD NEW ADDRESS"}
            textStyle={{ color: COLORS.BLACK }}
          />

          <Button
            handlePress={() => continueToPayment()}
            style={{
              backgroundColor: COLORS.GREEN_BTN,
              height: hp(6),
              marginTop: hp(2),
            }}
            title={"CONTINUE"}
          />
        </ScrollView>
      </View>
    </View>
  );
};
