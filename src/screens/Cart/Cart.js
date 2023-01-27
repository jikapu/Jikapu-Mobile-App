//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NAVIGATION } from "@/constants";
import { styles } from "@/screens/Cart/Cart.styles";
import { IMAGE_BASE_URL } from "../../constants/apiUrls";
import {
  Button,
  CustomHeader,
  Loader,
  JikapuStatusBar,
  ListView3,
  InputField,
  GuestScreen,
} from "@/components";
import { typography, spacing } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  getCartItems,
  addToWish,
  delCartItem,
  delWish,
  addToCart,
} from "@/actions";
import { COLORS } from "@/constants";
import { strings } from "@/localization";
import { jikapu, redHeart, heart, defaultImage, searchIcon1 } from "@/assets";

export const Cart = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const { cartData = {} } = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    isLoggedIn ? getItems() : null;
  }, []);

  const getItems = () => {
    dispatch(getCartItems(navigation, (res) => {}));
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

  const deleteItem = (id) => {
    dispatch(
      delCartItem(navigation, id, (res) => {
        getItems();
      })
    );
  };
  const addToWishList = (id) => {
    dispatch(
      addToWish(navigation, id, (res) => {
        getItems();
      })
    );
  };
  const removeWish = (id) => {
    dispatch(
      delWish(navigation, id, (res) => {
        getItems();
      })
    );
  };

  const increaseQty = (id) => {
    let params = {
      productId: id,
      quantity: 1,
    };
    dispatch(addToCart(navigation, params));
  };
  const decreaseQty = (id) => {
    let params = {
      productId: id,
      quantity: -1,
    };
    dispatch(addToCart(navigation, params));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getItems();
  }, []);

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}
      {Platform.OS == "ios" ? (
        <View style={styles.headerTop} />
      ) : (
        <JikapuStatusBar />
      )}
      <View style={styles.headerBottom}>
        <View style={styles.imgView}>
          <Image source={jikapu} />
        </View>
        <View style={styles.searchView}>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.search)}
            style={{
              height: hp(5),
              borderWidth: 1,
              borderColor: COLORS.BORDER,
              borderRadius: spacing.xs,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ marginLeft: wp(3), color: "#C1C1C1" }}>Search</Text>
            <Image source={searchIcon1} style={styles.search} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          height: hp(6),
          alignItems: "center",

          paddingHorizontal: hp(2),
          backgroundColor: COLORS.WHITE,
        }}
      >
        <Text style={{ fontSize: wp(3.9), fontWeight: "bold" }}>Cart </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ backgroundColor: COLORS.APP }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
            enabled={true}
            colors={COLORS.primary}
          />
        }
      >
        {cartData !== null &&
        cartData?.items !== null &&
        cartData?.items?.length > 0 ? (
          <View style={styles.categoryView}>
            <FlatList
              contentContainerStyle={{
                marginTop: wp(4),
              }}
              extraData={cartData?.items}
              data={cartData?.items}
              keyExtractor={(item, index) => index.toString()}
              vertical
              inverted
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView3
                  key={index}
                  onClick={() => {
                    handleClick(
                      "ProductDetails",
                      item.productId._id,
                      item.name
                    );
                  }}
                  imgSrc={
                    item?.productId?.image != null &&
                    item?.productId?.image.length > 0
                      ? { uri: item?.productId?.image[0] }
                      : defaultImage
                  }
                  title={item?.productId?.name}
                  wishImg={item?.wishlisted == true ? redHeart : heart}
                  availablity={item?.productId?.stockQty}
                  price={item?.productId?.price}
                  salePrice={item?.productId?.salePrice}
                  //  pColor={item?.productId?.generalSpecifications?.color}
                  // pSize={item?.productId?.generalSpecifications?.size}
                  quantity={item.quantity}
                  onIncreaseValue={() => increaseQty(item?.productId?._id)}
                  onDecreaseValue={() => decreaseQty(item?.productId?._id)}
                  addWish={() =>
                    item.wishlisted == false
                      ? addToWishList(item?.productId?._id)
                      : removeWish(item?.productId?._id)
                  }
                  //  removeWish={() => removeWish(item.productId._id)}
                  delItem={() => deleteItem(item?.productId?._id)}
                />
              )}
            />
            {cartData !== null &&
            cartData?.items !== null &&
            cartData?.items?.length > 0 ? (
              <View style={styles.categoryView}>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: hp(2.5),
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: wp(3.7),
                      fontWeight: "normal",
                    }}
                  >
                    Subtotal ({cartData?.items.length} Items) :
                  </Text>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: wp(3.7),
                      fontWeight: "bold",
                      alignSelf: "flex-end",
                    }}
                  >
                    KES {cartData?.subTotal.toLocaleString()}
                  </Text>
                </View>
                <Button
                  style={{
                    backgroundColor: COLORS.GREEN_BTN,
                    marginTop: hp(1),
                    marginBottom: hp(3),
                  }}
                  title={"PROCEED TO BUY"}
                  handlePress={() =>
                    navigation.navigate(NAVIGATION.checkOut, {
                      status: 0,
                      isFresh: 0,
                    })
                  }
                />
              </View>
            ) : null}
          </View>
        ) : (
          <View style={{ marginTop: hp(15), alignItems: "center" }}>
            <Text style={{ fontSize: wp(5), marginVertical: hp(1) }}>
              It feels so light!
            </Text>
            <Text style={{ fontSize: wp(4) }}>
              No products added in the cart
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
