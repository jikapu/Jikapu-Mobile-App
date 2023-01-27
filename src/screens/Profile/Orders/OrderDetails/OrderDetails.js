//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NAVIGATION } from "@/constants";
import { defaultImage } from "@/assets";
import { CustomHeader, ListView2, Loader, Button } from "@/components";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { styles } from "./OrderDetails.styles";
import { spacing, typography } from "@/theme";
import { COLORS } from "@/constants";
import moment from "moment";
import {
  getSearchData,
  getOrders,
  getShippingCharges,
  getProductsList,
  cancelOrder,
  returnOrder,
} from "@/actions/home/HomeAction";

export const OrderDetails = ({ route, navigation }) => {
  const { orderDetail, orderInfo, trackId } = route.params;
  console.log("orderdetails orderInfo", orderDetail, orderInfo, trackId);
  const status = orderInfo?.el?.status;
  const orderId = orderInfo?.el?._id;
  const id = orderDetail?.productId?._id;
  const name = orderDetail?.productId?.name;
  const city = orderInfo.el?.shippingAddressId?.city;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [pickData, setPickData] = useState([]);
  const [shipmentCharges, setShipmentCharges] = useState("");

  useEffect(() => {
    getPickData();
  }, []);

  const handleClick = async (screen, id, name) => {
    console.log("sub category id", id);

    switch (screen) {
      case "ProductDetails":
        navigation.navigate(NAVIGATION.productDetails, {
          productId: id,
          title: name,
        });
        break;
      default:
        console.log("value", value);
        break;
    }
  };
  const getPickData = () => {
    let params = {
      search: "",
      filter: {
        category: id,
      },
      page: 1,
      limit: 10,
    };
    dispatch(
      getProductsList(navigation, params, (res) => {
        setPickData(res.data.docs);
      })
    );
    let param = {
      city: city,
    };
    dispatch(
      getShippingCharges(navigation, param, (res) => {
        setShipmentCharges(res.charges);
      })
    );
  };

  const handleCancel = () => {
    let params = {
      orderId: orderId,
    };
    dispatch(
      cancelOrder(navigation, params, () => {
        dispatch(getOrders(navigation));
        navigation.navigate(NAVIGATION.orders);
      })
    );
  };
  const handleReturn = () => {
    let params = {
      orderId: orderId,
    };
    dispatch(
      returnOrder(navigation, params, () => {
        dispatch(getOrders(navigation));
        navigation.navigate(NAVIGATION.orders);
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        title={"Order Details"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <ScrollView>
        <View style={{ flex: 1, padding: wp(4) }}>
          <View style={styles.btnstyle}>
            <View
              style={{
                flex: 0.3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  orderDetail?.productId?.image > 0 ||
                  orderDetail?.productId?.image
                    ? { uri: orderDetail?.productId?.image[0] }
                    : defaultImage
                }
                style={{ width: 80, height: 80 }}
                resizeMode={"contain"}
                PlaceholderContent={
                  <ActivityIndicator size="small" color="0000ff" />
                }
              />
            </View>

            <View style={{ flex: 0.55 }}>
              <Text style={styles.textStyle} numberOfLines={2}>
                {orderDetail?.productId?.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* */}
                <Button
                  title={"Buy Again"}
                  handlePress={() => {
                    handleClick("ProductDetails", id, name);
                  }}
                  textStyle={[typography.text, { color: COLORS.WHITE }]}
                  style={{
                    width: wp(25),
                    height: hp(4),
                    marginTop: hp(1),
                    backgroundColor: COLORS.PRIMARY,
                  }}
                />
                {status === "delivered" ? (
                  <Button
                    title={"Return"}
                    handlePress={() => handleCancel()}
                    textStyle={typography.text}
                    style={{
                      width: wp(25),
                      height: hp(4),
                      paddingVertical: 0,
                      marginTop: hp(1),
                      borderWidth: 1,
                      borderColor: COLORS.GREEN_BTN,
                      backgroundColor: COLORS.WHITE,
                    }}
                  />
                ) : status === "cancelled" ? null : status ===
                  "returned" ? null : (
                  <Button
                    title={"Cancel"}
                    handlePress={() => handleReturn()}
                    textStyle={{ color: COLORS.BLACK, fontWeight: "normal" }}
                    style={{
                      width: wp(25),
                      height: hp(4),
                      paddingVertical: 0,
                      marginTop: hp(1),
                      borderWidth: 1,
                      borderColor: COLORS.GREEN_BTN,
                      backgroundColor: COLORS.WHITE,
                    }}
                  />
                )}
                {/*
                 {status == "delivered" ? (
                  <Button
                    title={"Return"}
                    handlePress={() => handleCancel()}
                    textStyle={{ color: COLORS.BLACK, fontWeight: "normal" }}
                    style={{
                      width: wp(25),
                      height: hp(4),
                      paddingVertical: 0,
                      marginTop: hp(1),
                      borderWidth: 1,
                      borderColor: COLORS.GREEN_BTN,
                      backgroundColor: COLORS.WHITE,
                    }}
                  />
                ) : (
                  <Button
                    title={"Cancel"}
                    handlePress={() => handleReturn()}
                    textStyle={{ color: COLORS.BLACK, fontWeight: "normal" }}
                    style={{
                      width: wp(25),
                      height: hp(4),
                      paddingVertical: 0,
                      marginTop: hp(1),
                      borderWidth: 1,
                      borderColor: COLORS.GREEN_BTN,
                      backgroundColor: COLORS.WHITE,
                    }}
                  />
                )}
                */}
              </View>
            </View>
          </View>
          <Text
            style={[
              typography.textBold,
              { marginTop: hp(2), marginBottom: hp(1) },
            ]}
          >
            View Your Orders
          </Text>
          <View style={styles.orderView}>
            <View style={{ flex: 0.5, justifyContent: "space-between" }}>
              <Text style={typography.label}>Order date</Text>
              <Text style={typography.label}>Order #</Text>
              <Text style={typography.label}>Order Total</Text>
            </View>
            <View style={{ flex: 0.5, justifyContent: "space-between" }}>
              <Text style={typography.labelBold}>
                {moment(orderInfo?.el?.createdAt).format("DD-MMMM-YYYY")}
              </Text>
              <Text style={typography.labelBold}>
                {orderInfo?.el?.orderNumber}
              </Text>
              <Text style={typography.labelBold}>
                KES {orderDetail?.total}{" "}
                <Text style={{ color: "#000000B3" }}>
                  ({orderDetail?.quantity} item)
                </Text>
              </Text>
            </View>
          </View>
          {/* shipment details */}
          <Text
            style={[
              typography.textBold,
              { marginTop: hp(2), marginBottom: hp(1) },
            ]}
          >
            {strings.reviewOrder.shipDetails}
          </Text>
          <View style={styles.shipmentDetails}>
            <Text style={styles.free}>{strings.reviewOrder.freeOrder}</Text>
            <View style={styles.hrLine} />
            <View style={{ padding: wp(3) }}>
              {status === "delivered" ? (
                <Text style={[typography.labelBold, { fontSize: wp(4.1) }]}>
                 {strings.reviewOrder.delivered}
                </Text>
              ) : (
                <Text style={[typography.labelBold, { fontSize: wp(4.1) }]}>
                   {strings.reviewOrder.delivery}
                </Text>
              )}

              <Text
                style={[
                  typography.label,
                  { fontSize: wp(3.7), marginVertical: hp(1) },
                ]}
              >
                {strings.reviewOrder.deliveryEstimate}
              </Text>
              <Text
                style={[
                  typography.labelBold,
                  { fontSize: wp(3.7), color: "#0B6F08" },
                ]}
              >
                {moment(orderInfo?.el?.createdAt)
                  .add(3, "days")
                  .format("dddd, D MMMM, YYYY")}
              </Text>
              <View style={styles.list}>
                <View style={{ flex: 0.3, alignItems: "center" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#1C1C1C",
                      width: wp(16),
                      height: hp(8),
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: orderDetail?.productId?.image[0] }}
                      style={{ width: 45, height: 46 }}
                    />
                  </View>
                </View>
                <View style={{ flex: 0.55 }}>
                  <Text style={[typography.labelBold, { fontSize: wp(4.1) }]}>
                    {orderDetail?.productId?.name.trim()}
                  </Text>
                  <Text>
                    QTY : <Text>{orderDetail?.quantity}</Text>
                  </Text>
                  <Text>
                    {strings.order.soldBy} : <Text>{orderDetail.productId?.storeDetail?.storeName}</Text>
                  </Text>
                </View>
                {/* 
                <View style={{ flex: 0.25 }}>
                  <Text
                    style={[
                      typography.labelBold,
                      { color: "red", textDecorationLine: "line-through" },
                    ]}
                  >
                    {orderDetail.productId.price.toLocaleString()}
                  </Text>
                  <Text style={typography.labelBold}>
                    {orderDetail.productId.salePrice}
                  </Text>
                </View>*/}

                <Text
                  style={{
                    fontSize: wp(3.9),
                    fontWeight: "800",
                    color: COLORS.PRIMARY,
                  }}
                >
                  {`${
                    ": KES" +
                    " " +
                    orderDetail?.productId?.salePrice.toLocaleString()
                  }`}
                </Text>

                {/* 
                  {orderDetail.productId.price ===
                orderDetail.productId.salePrice ? (
                  <Text
                    style={{
                      fontSize: wp(3.9),
                      fontWeight: "800",
                      color: COLORS.PRIMARY,
                    }}
                  >
                    {`${": KES" + " " + orderDetail.productId?.salePrice}`}
                  </Text>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: wp(3.9),
                        fontWeight: "800",
                        color: COLORS.PRIMARY,
                        textDecorationLine: orderDetail.productId?.salePrice
                          ? "line-through"
                          : "none",
                        opacity: orderDetail.productId?.salePrice ? 0.4 : 1,
                      }}
                    >
                      {`${": KES" + " " + orderDetail.productId?.price}`}
                    </Text>
                    <Text
                      style={{
                        fontSize: wp(3.9),
                        fontWeight: "800",
                        color: COLORS.PRIMARY,
                      }}
                    >
                      {`${"KES" + " " + orderDetail.productId?.salePrice}`}
                    </Text>
                  </View>
                )}
                */}
              </View>
            </View>
          </View>
          {/* Track Shipement */}

          {orderInfo?.el?.status == "confirm_by_admin" ? (
            <Button
              handlePress={() =>
                navigation.navigate(NAVIGATION.trackOrders, {
                  trackingId: trackId,
                  orderDetail,
                })
              }
              title={"Track Shipment"}
              style={{
                backgroundColor: COLORS.PRIMARY,
                borderColor: COLORS.BORDER,
                marginTop: hp(2),
                alignItems: "center",
              }}
              textStyle={{
                color: COLORS.WHITE,
                fontWeight: "500",
                fontSize: wp(4),
              }}
            />
          ) : null}

          {/* shipment address */}
          <Text
            style={[
              typography.textBold,
              { marginTop: hp(2), marginBottom: hp(1) },
            ]}
          >
           {strings.order.shipAdd}
          </Text>
          <View
            style={{ backgroundColor: COLORS.WHITE, flex: 1, padding: wp(3) }}
          >
            <Text style={typography.textBold}>
              {orderInfo.el?.shippingAddressId?.firstName +
                " " +
                orderInfo.el?.shippingAddressId?.lastName}{" "}
            </Text>
            <Text style={typography.text}>
              {orderInfo.el?.shippingAddressId?.addressType +
                " - " +
                orderInfo.el?.shippingAddressId?.zip}
            </Text>
            <Text style={typography.text}>
              {orderInfo.el?.shippingAddressId?.firstLine +
                " " +
                orderInfo.el?.shippingAddressId?.secondLine}
            </Text>
            <Text style={typography.text}>
              {orderInfo.el?.shippingAddressId?.city +
                " " +
                orderInfo.el?.shippingAddressId?.state}
            </Text>
            <Text style={typography.text}>
              {orderInfo.el.shippingAddressId.countryRegion}{" "}
            </Text>
          </View>
          {/* Order Summary */}
          <Text
            style={[
              typography.textBold,
              { marginTop: hp(2), marginBottom: hp(1) },
            ]}
          >
            {strings.order.orderSummary}
          </Text>
          <View
            style={{
              padding: wp(4),
              flexDirection: "row",
              backgroundColor: COLORS.WHITE,
              borderRadius: spacing.xs,
            }}
          >
            <View style={{ flex: 0.5, justifyContent: "space-between" }}>
              <Text style={[typography.text, { fontSize: wp(3.3) }]}>
                {strings.order.items}
              </Text>
              {/*
              <Text style={[typography.text, { fontSize: wp(3.3) }]}>
                Postage & Packing
              </Text>
              */}

              <Text style={[typography.text, { fontSize: wp(3.3) }]}>
              {strings.order.shipping}
              </Text>
              <Text style={[typography.text, { fontSize: wp(3.3) }]}>{strings.order.tax}</Text>
              {/* 
              <Text style={[typography.text, { fontSize: wp(3.3) }]}>
                Total
              </Text>
              */}

              <Text style={[typography.text, { fontSize: wp(3.3) }]}>
              {strings.order.promotionApplied}
              </Text>
              <Text style={[typography.text, { fontSize: wp(3.3) }]}>
                {strings.order.orderTotal}
              </Text>
            </View>
            <View style={{ flex: 0.5, justifyContent: "space-between" }}>
              <Text style={typography.labelBold}>
                {orderInfo?.el?.totalQuantity}
              </Text>
              {/* 
              <Text style={typography.labeBold}>KES 20.00</Text>
              */}

              <Text style={typography.labelBold}>KES {shipmentCharges}</Text>
              <Text style={typography.labelBold}>KES {orderInfo?.el?.tax}</Text>
              {/*
               <Text style={typography.labelBold}>KES150.10</Text>
              */}

              <Text style={typography.labelBold}>KES 0</Text>
              <Text style={typography.labelBold}>
                KES {orderInfo?.el?.subTotal.toLocaleString()}
              </Text>
            </View>
          </View>
          {/* products list*/}

          {pickData.length > 0 && pickData != null ? (
            <View>
              <Text style={[typography.textBold, { marginTop: hp(2) }]}>
                {strings.order.leftOff}
              </Text>
              <FlatList
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                extraData={wishlistData}
                data={wishlistData}
                keyExtractor={(item, index) => index.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <ListView2
                    key={index}
                    onClickProduct={() => {
                      handleClick(
                        "ProductDetails",
                        item?.productId?._id,
                        item?.name
                      );
                    }}
                    isRating={true}
                    starCount={item?.ratings}
                    imgSrc={
                      item?.productId?.image != null &&
                      item.productId?.image > 0
                        ? { uri: item.productId.image[0] }
                        : defaultImage
                    }
                    title={item?.productId?.name}
                    shortDes={item?.productId?.shortDescription}
                    price={item?.productId?.price}
                    //  btnStyles={{width:wp(40),}}
                  />
                )}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};
