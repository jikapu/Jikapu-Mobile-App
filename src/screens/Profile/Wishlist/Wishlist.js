//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NAVIGATION } from "@/constants";
import { styles } from "./Wishlist.styles";
import { Button, CustomHeader, Loader, ListView2 } from "@/components";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { getWishItems } from "@/actions";
import { COLORS } from "@/constants";
import { strings } from "@/localization";
import { defaultImage } from "@/assets";
import { addToCart, delWish, buyNow } from "../../../actions/home/HomeAction";
import { storeItem, getItem, removeItem } from "@/utils/AsyncUtils";

export const Wishlist = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const wishlistData = useSelector((state) => state.user.wishlistData);
  const [quantity, setQuantity] = useState(1);
  const [isBuy, setIsBuy] = useState("isBuy");
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    dispatch(getWishItems(navigation));
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

  const addItemCart = (productId) => {
    let params = {
      productId: productId,
      quantity: quantity,
    };
    dispatch(
      addToCart(navigation,params, () => {
        navigation.navigate(NAVIGATION.cart);
      })
    );
  };
  const buyItem = (productId) => {
    let params = {
      productId: productId,
      quantity: quantity,
    };
    dispatch(
      buyNow(navigation, params, (res) => {
        storeItem("buyNow", isBuy);

        navigation.navigate(NAVIGATION.checkOut, {
          status: res.data.status,
          isFresh: res.data.isFresh,
        });
      })
    );
  };
  const deleteItem = (id) => {
    dispatch(
      delWish(navigation, id, () => {
        getItems();
      })
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={strings.profile.wishlist}
        isBackBtn={true}
        isSearchBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <ScrollView
        contentContainerStyle={{ backgroundColor: COLORS.APP }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        { wishlistData && wishlistData.length && wishlistData !== null > 0 ? (
          <FlatList
            contentContainerStyle={{
              flex: 1,
              marginTop: hp(1),
              margin: wp(4),
            }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={2}
            extraData={wishlistData}
            data={wishlistData}
            keyExtractor={(item, index) => index.toString()}
            vertical
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ListView2
                key={index}
                onClickProduct={() => {
                  handleClick("ProductDetails", item.productId._id, item.name);
                }}
                starCount={item.ratings}
                imgSrc={
                  item?.productId?.image != null || item?.productId?.image > 0
                    ? { uri: item?.productId.image[0] }
                    : defaultImage
                }
                title={item?.productId?.name}
                isAddToCart={false}
                isBuy={false}
                isDel={true}
                isRating={true}
                shortDes={item?.productId?.shortDescription}
                onClickCart={() => {
                  addItemCart(item?.productId);
                }}
                onClickBuy={() => {
                  buyItem(item?.productId);
                }}
                price={item?.productId?.price}
                delItem={() => deleteItem(item?.productId?._id)}
                storeName={item?.productId?.storeId?.storeName}
              />
            )}
          />
        ) : isLoading === false ? (
          <View style={{flex:1,alignItems:"center"}}>
            <Text >Your wishlist is empty</Text>
          </View>
          
        ) : null}
      </ScrollView>
    </View>
  );
};
