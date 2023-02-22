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
import { NAVIGATION, COLORS } from "@/constants";
import {
  defaultImage,
  orderDelivered,
  orderPick,
  orderRecieved,
  orderProcessed,
  orderTransit,
} from "@/assets";
import moment from "moment";
import { CustomHeader, ListView2, Loader, Button } from "@/components";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { styles } from "./TrackOrder.styles";
import Timeline from "react-native-timeline-flatlist";
import { spacing, typography } from "@/theme";
import { trackOrderStatus, trackOrder } from "@/actions";

export const TrackOrders = ({ route, navigation }) => {
  useEffect(() => {
    getOrderStatus();
  }, []);
  const getOrderStatus = () => {
    /*
     dispatch(
      trackOrderStatus(navigation, trackingId, (res) => {
        console.log("track order res", res);
        setTrackData(res.data)
      })
    );
    */
    let params = {
      _id: trackingId,
    };
    dispatch(
      trackOrder(navigation, params, (res) => {
        setTrackData(res.data);
      })
    );
  };
  const isLoading = useSelector((state) => state.common.isLoading);
  const dispatch = useDispatch();
  const { trackingId, orderDetail } = route.params;
  const [trackData, setTrackData] = useState({});
  const [timelineData, setTimelineData] = useState([
    {
      title: "Order Received",
      icon:orderRecieved,
     // icon: trackData.status == "Inprocess" ? orderRecieved : defaultImage,
    },
    {
      title: "Order Processed",
      icon: trackData.status == "Inprogress" ? orderProcessed : defaultImage,
    },
    {
      title: "Order Pick-up",
      icon: trackData.status == "Scheduled " ? orderPick : defaultImage,
    },
    {
      title: "In Transit",
      icon: trackData.status == "Dispatched " ? orderTransit : defaultImage,
    },
    {
      title: "Delivered",
      icon: trackData.status == "Delivered" ? orderDelivered : defaultImage,
    },
  ]);
  console.log("order details,tracking id", orderDetail, trackingId);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        title={"Order Tracking"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <ScrollView>
        <View style={{ flex: 1, padding: wp(5.5) }}>
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
                    ? { uri: orderDetail.productId.image[0] }
                    : defaultImage
                }
                style={{ width: 70, height: 45 }}
                PlaceholderContent={
                  <ActivityIndicator size="small" color="0000ff" />
                }
              />
            </View>
            <View style={{ flex: 0.65 }}>
              <Text style={styles.textStyle} numberOfLines={2}>
                {orderDetail?.productId?.name}
              </Text>
            </View>
          </View>

          <Timeline
            data={[...timelineData, timelineData]}
            innerCircle={"icon"}
            circleSize={26}
            lineColor="#009688"
            timeContainerStyle={{ marginTop: hp(4) }}
            descriptionStyle={{ color: "gray" }}
            options={{
              style: { paddingTop: hp(3), marginLeft: -wp(12.5) },
            }}
            titleStyle={[typography.text, { fontSize: wp(3.3), marginTop: -6 }]}
            isUsingFlatlist={true}
          />
          <Text style={[typography.textBold, { marginBottom: hp(1) }]}>
            TRACKING DETAILS:
          </Text>
          <View
            style={{
              flex: 1,
              padding: wp(3),
              borderRadius: 8,
              justifyContent: "space-between",
              backgroundColor: COLORS.WHITE,
            }}
          >
            <Text style={[typography.text, { fontSize: wp(3.3) }]}>
              Shipping Partner
            </Text>
            <Text style={typography.label}>NationWide Courier</Text>
            <Text
              style={[
                typography.text,
                { fontSize: wp(3.3), marginTop: hp(0.5) },
              ]}
            >
              Ordered On
            </Text>
            <Text style={typography.label}>
              {moment(trackData?.createdAt).format("DD-MMMM-YYYY")}
            </Text>
            {/*
             <Text
              style={[
                typography.text,
                { fontSize: wp(3.3), marginTop: hp(0.5) },
              ]}
            >
              Shipping Partner Tracking ID
            </Text>
            <Text style={typography.label}>FedEX</Text>
            */}

            <Text
              style={[
                typography.text,
                { fontSize: wp(3.3), marginTop: hp(0.5) },
              ]}
            >
              Order Number
            </Text>
            <Text style={typography.label}>{trackData?.order_no}</Text>
            <Text
              style={[
                typography.text,
                { fontSize: wp(3.3), marginTop: hp(0.5) },
              ]}
            >
              Expected Delivery
            </Text>
            <Text style={typography.label}>
              {" "}
              {moment(trackData.createdAt)
                .add(3, "days")
                .format("dddd, D MMMM, YYYY")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
