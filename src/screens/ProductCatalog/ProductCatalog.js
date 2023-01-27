//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NAVIGATION } from "@/constants";
import { styles } from "./ProductCatalog.styles";
import { CustomHeader, Loader, ListView2 } from "@/components";
import { defaultImage } from "@/assets";
import { getProductsList, addToCart } from "@/actions/home/HomeAction";

export const ProductCatalog = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { subCatId, title, storeId } = route.params;
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [hasLoadMore, setLoadMore] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getProducts();
   
  }, []);

  const getProducts = () => {
    let params = {
      filter: { category: subCatId },
      limit: 50,
      page: currentPage,
      range: { unitName: "price", max: 10000000, min: 0 },
      search: "",
      storeId: storeId,
    };
    dispatch(
      getProductsList(navigation, params, (res) => {
        setProductsData([...productsData, ...res.data.docs]);
      })
    );
    setRefreshing(false)
  };

  const loadMoreData = () => {
    let nextPage = currentPage + 1;
    let params = {
      filter: { category: subCatId },
      limit: 50,
      page: nextPage,
      range: { unitName: "price", max: 10000000, min: 0 },
      search: "",
    };
    dispatch(
      getProductsList(navigation, params, (res) => {
        setProductsData([...productsData, ...res.data.docs]);
        if (res.data.hasNextPage == false) {
          setLoadMore(false);
        }
      })
    );
  };

  const addItemToCart = (productId) => {
    let params = {
      productId: productId,
      quantity: 1,
    };
    isLoggedIn
      ? dispatch(
          addToCart(navigation, params)
        )
      : Alert.alert("", "Please Login to continue", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.navigate(NAVIGATION.login) },
        ]);
  };

  const handleClick = async (screen, id, name, parentId) => {
    switch (screen) {
      case "ProductDetails":
        navigation.push(NAVIGATION.productDetails, {
          productId: id,
          title: name,
        });
        break;
      default:
        Alert.alert("Coming Soon");
        break;
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={title}
        isBackBtn={true}
        isSearchBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}

      {productsData.length > 0 ? (
        <SafeAreaView style={styles.categoryView}>
          <FlatList
            data={productsData}
            extraData={productsData}
            keyExtractor={(item, index) => index.toString()}
            vertical
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  onRefresh();
                }}
              />
            }
            renderItem={({ item, index }) => (
              <ListView2
                key={index}
                onClickProduct={() => {
                  handleClick("ProductDetails", item?._id, item?.name);
                }}
                imgSrc={
                  item?.image !== null && item?.image?.length > 0
                    ? { uri: item?.image[0] }
                    : defaultImage
                }
                title={item?.name}
                onClickCart={() => {
                  addItemToCart(item?._id);
                }}
                isRating={true}
                starCount={item?.ratings}
                isAddToCart={false}
                storeName={item?.storeId?.storeName}
                price={item?.price}
              />
            )}
            onEndReached={hasLoadMore ? loadMoreData : null}
            onEndReachedThreshold={0.5}
          />
        </SafeAreaView>
      ) : isLoading === false ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>No Data found</Text>
        </View>
      ) : null}
    </View>
  );
};
