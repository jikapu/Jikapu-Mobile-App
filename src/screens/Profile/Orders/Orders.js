import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NAVIGATION } from "@/constants";
import { styles } from "./Orders.styles";
import { GlobalSearch, CustomHeader, Loader, ListView1 } from "@/components";
import moment from "moment";
import { heightToDP as hp, widthToDP as wp } from "@/utils";

import { COLORS } from "@/constants";
import { strings } from "@/localization";
import { defaultImage } from "@/assets";
import { delWish, getOrders, getOrderSearch } from "@/actions/home/HomeAction";
import { typography, spacing } from "@/theme";

export const Orders = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const orderListData = useSelector((state) => state.user.orderListData);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const data = orderListData?.map((e) => {
    return {
      orderData: "",
      items: e?.cartId?.items,
      trackId: e._id,
      el: e,
    };
  });

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    dispatch(getOrders(navigation));
    setRefreshing(false);
  };

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getItems();
  }, []);

  const toggleSearch = () => {
    setSearch(!search);
  };
  const searchkeyword = () => {
    Keyboard.dismiss();
    let params = {
      search: searchText,
      // filter: {
      ///   fromDate:1642492128,
      //   toDate:1644054020445
      // },
      page: 2,
      limit: 7,
      //  sort:createdAt,
      //  order:-1
    };
    if (searchText.length > 0) {
      /*
    
     dispatch(
      getOrderSearch(params, (res) => {
        setTotalData(res.data.docs);
      })
    );
    */
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={strings.profile.orders}
        isBackBtn={true}
        isSearchBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => toggleSearch()}
      />
      {<Loader isLoading={isLoading} />}
      {search == true ? (
        <View style={{ marginTop: hp(4), marginHorizontal: wp(6) }}>
          <GlobalSearch
            editable={true}
            value={searchText}
            setCode={(text) => setSearchText(text)}
            handlePress={searchkeyword}
            containerStyle={{ backgroundColor: COLORS.WHITE }}
            inputStyle={{ color: "black" }}
            rightIconStyle={{
              backgroundColor: COLORS.PRIMARY,
              width: wp(10),
              marginRight: -wp(4),
              borderTopRightRadius: spacing.xs,
              borderBottomRightRadius: spacing.xs,
              paddingLeft: wp(1.2),
            }}
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ backgroundColor: COLORS.APP }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={[styles.categoryView, { paddingBottom: hp(15) }]}>
            <Text style={{ marginBottom: hp(1) }}>
              {strings.reviewOrder.viewOrder}
            </Text>

            {data != [] && data != null ? (
              data?.map((e) =>
                e?.items?.map((t) => (
                  <ListView1
                    onClick={() => {
                      navigation.navigate(NAVIGATION.orderDetails, {
                        orderDetail: t,
                        orderInfo: e,
                        trackId: e.trackId,
                      });
                    }}
                    imgSrc={
                      t?.productId?.image !== null &&
                      t.productId?.image.length > 0
                        ? { uri: t?.productId?.image[0] }
                        : defaultImage
                    }
                    title={t?.productId?.name}
                    orderStatus={`${
                      e?.el?.status +
                      " " +
                      moment(t.createdAt).format("DD-MMMM-YYYY")
                    }`}
                  />
                ))
              )
            ) : (
              <Text>{strings.NO_DATA}</Text>
            )}
            {/* 
            <FlatList
                contentContainerStyle={{
                  marginTop: wp(2),
                }}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => index.toString()}
                vertical
                showsVerticalScrollIndicator={true}
                renderItem={({ item, index }) => (
                  <ListView1
                  onClick={() => {
                    navigation.navigate(NAVIGATION.orderDetails, {
                      orderDetail: item,
                    //  orderInfo:data,
                    //  trackId:e.trackId
                    });
                  }}
                //  imgSrc={
                //    t?.productId?.image !== null &&
                 //   t.productId?.image.length > 0
                 //     ? { uri: t?.productId?.image[0] }
                 //     : defaultImage
                 // }
                  title={item?.orderNumber}
                 // orderStatus={`${t?.status + " " + moment(t.createdAt).format("DD-MMMM-YYYY")}`  }
                />
                )}
              />
        */}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
