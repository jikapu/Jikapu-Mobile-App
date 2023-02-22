import React, { useEffect, useState } from "react";
import {
  Text,
  Alert,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { JikapuStatusBar, ListView2, Loader } from "@/components";
import { Rating, AirbnbRating } from "react-native-ratings";
import {
  jikapu,
  backArrow,
  searchIcon1,
  upArrow,
  defaultImage,
  npRight,
} from "@/assets";
import { strings } from "@/localization";
import { NAVIGATION, COLORS } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { styles } from "./SubChildProducts.styles";
import { spacing } from "@/theme";
import {
  getAllSubCatList,
  getProductsList,
  getPopularItemList,
  getFeaturedList,
} from "@/actions";

export const SubChildProducts = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { data } = route.params;
  const parentId = data?._id;
  const isLoading = useSelector((state) => state.common.isLoading);
  const [aliasId, setAliasId] = useState(parentId);
  const [productsData, setProductsData] = useState([]);
  const [seeMore, setSeeMore] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasLoadMore, setLoadMore] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  //feature data
  const [featuredData, setFeaturedData] = useState([]);
  const [seeFeatured, setSeeFeatured] = useState(6);
  const [featuredCurrentPage, setFeaturedCurrentPage] = useState(1);
  const [hasFeaturedLoadMore, setFeatureLoadMore] = useState(true);
  //popular data
  const [mPopularData, setMPopularData] = useState([]);
  const [seeMPopular, setSeeMPopular] = useState(4);
  const [popularCurrentPage, setPopularCurrentPage] = useState(1);
  const [hasPopularLoadMore, setPopularLoadMore] = useState(true);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = () => {
    getProducts(aliasId);
    getFeatured(aliasId);
    getMostPopular(aliasId);
    setRefreshing(false);
  };

  const getFeatured = (id) => {
    let params = {
      filter: {
        category: id ? id : aliasId,
      },
      order: -1,
      sort: "rate",
      page: featuredCurrentPage,
      limit: 10,
    };
    dispatch(
      getFeaturedList(navigation, params, (res) => {
        setFeaturedData(res.data.docs);
      })
    );
  };

  const getMostPopular = (id) => {
    let popularParams = {
      filter: {
        category: id ? id : aliasId,
      },
      page: popularCurrentPage,
      limit: 10,
      order: -1,
      sort: "rate",
    };
    dispatch(
      getPopularItemList(navigation, popularParams, (res) => {
        setMPopularData(res.data.docs);
        if (res.data.hasNextPage == true) {
          setPopularLoadMore(true);
          setPopularCurrentPage(res.data.nextPage);
        } else {
          setPopularLoadMore(false);
        }
      })
    );
  };

  const loadMPopular = () => {
    let popularParams = {
      filter: {
        category: aliasId,
      },
      page: popularCurrentPage,
      limit: 10,
      order: -1,
      sort: "rate",
    };
    dispatch(
      getPopularItemList(navigation, popularParams, (res) => {
        setMPopularData([...mPopularData, ...res.data.docs]);
        if (res.data.hasNextPage == true) {
          setPopularLoadMore(true);
          setPopularCurrentPage(res.data.nextPage);
        } else {
          setPopularLoadMore(false);
        }
      })
    );
    setSeeMPopular(seeMPopular + 10);
  };

  const getProducts = (id) => {
    let params = {
      search: "",
      filter: { category: id ? id : aliasId },
      range: { unitName: "price", max: 10000000, min: 0 },
      limit: 20,
      page: currentPage,
    };
    dispatch(
      getProductsList(navigation, params, (res) => {
        setProductsData(res.data.docs);
        if (res.data.hasNextPage == true) {
          setLoadMore(true);
          setCurrentPage(res.data.nextPage);
        } else {
          setLoadMore(false);
        }
      })
    );
  };

  const loadMore = () => {
    let params = {
      search: "",
      filter: { category: aliasId },
      range: { unitName: "price", max: 10000000, min: 0 },
      limit: 20,
      page: currentPage,
    };
    dispatch(
      getProductsList(navigation, params, (res) => {
        setProductsData([...productsData, res.data.docs]);
        if (res.data.hasNextPage == true) {
          setLoadMore(true);
          setCurrentPage(res.data.nextPage);
        } else {
          setLoadMore(false);
        }
      })
    );
    setSeeMore(seeMore + 20);
  };

  const handleClick = async (screen, id, name, parentId) => {
    switch (screen) {
      case "ProductCatalog":
        navigation.navigate(NAVIGATION.productCatalog, {
          subCatId: id,
          title: name,
          parentId: parentId,
        });
        break;
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
    getAllList();
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flexDirection: "row",
            height: hp(6),
            alignItems: "center",
            paddingHorizontal: hp(2),
            backgroundColor: COLORS.WHITE,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flexDirection: "row" }}
          >
            <Image source={backArrow} style={{ width: 16, height: 24 }} />
            <Text
              style={{
                fontSize: wp(4.9),
                marginLeft: wp(2),
                fontWeight: "bold",
              }}
            >
              {data.name}
            </Text>
          </TouchableOpacity>
        </View>
        {
          productsData?.length > 0 ? (
            <View style={{ marginHorizontal: wp(4) }}>
              <FlatList
                contentContainerStyle={{
                  marginTop: hp(0.5),
                }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                data={productsData.slice(0, seeMore)}
                extraData={productsData}
                keyExtractor={(item, index) => index.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <ListView2
                    key={index}
                    onClickProduct={() => {
                      handleClick("ProductDetails", item._id, item.name);
                    }}
                    imgSrc={
                      item?.image !== null && item?.image.length > 0
                        ? { uri: item.image[0] }
                        : defaultImage
                    }
                    title={item?.name}
                    isAddToCart={false}
                    starCount={item?.ratings}
                    isRating={true}
                    storeName={item?.storeId?.storeName}
                    price={item?.price}
                    btnStyles={{ width: wp(44.5) }}
                  />
                )}
              />
              {hasLoadMore ? (
                <TouchableOpacity
                  style={styles.see}
                  onPress={hasLoadMore ? loadMore : null}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { fontSize: wp(3.9), marginTop: 0 },
                    ]}
                  >
                    See more
                  </Text>
                  <Image source={upArrow} style={{ marginLeft: spacing.xs }} />
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null
          /*
           <View style={{ flex: 1, alignItems: "center", marginTop: hp(2) }}>
            <Text>Nothing Found</Text>
          </View> */
        }
        {featuredData.length > 0 ? (
          <View
            style={{
              marginHorizontal: wp(4),
              marginTop: hp(2),
              padding: wp(4),
              backgroundColor: COLORS.WHITE,
              borderRadius: spacing.xs,
            }}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.categoryText}>Featured deals</Text>
            </View>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              data={featuredData.slice(0, 6)}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              extraData={featuredData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView2
                  key={index}
                  onClickProduct={() => {
                    handleClick("ProductDetails", item._id, item.name);
                  }}
                  imgSrc={
                    item?.image !== null && item?.image.length > 0
                      ? { uri: item?.image[0] }
                      : defaultImage
                  }
                  title={item?.name}
                  isAddToCart={false}
                  starCount={item?.ratings}
                  isRating={true}
                  storeName={item?.storeId?.storeName}
                  price={item?.price}
                  btnStyles={{ width: wp(40.5) }}
                />
              )}
            />
          </View>
        ) : null}
        {mPopularData.length > 0 ? (
          <View
            style={{
              marginHorizontal: wp(4),
              marginTop: hp(2),
              padding: wp(4),
              backgroundColor: COLORS.YELLOW_LIGHT,
              borderRadius: spacing.xs,
            }}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.categoryText}>Most Popular</Text>
            </View>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={mPopularData.slice(0, seeMPopular)}
              extraData={mPopularData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView2
                  key={index}
                  onClickProduct={() => {
                    handleClick("ProductDetails", item._id, item.name);
                  }}
                  imgSrc={
                    item?.image !== null && item?.image.length > 0
                      ? { uri: item?.image[0] }
                      : defaultImage
                  }
                  title={item?.name}
                  isAddToCart={false}
                  isRating={true}
                  starCount={item?.ratings}
                  storeName={item?.storeId?.storeName}
                  price={item?.price}
                  btnStyles={{ width: wp(40.5) }}
                />
              )}
            />
            {hasPopularLoadMore ? (
              <TouchableOpacity
                style={styles.see}
                onPress={hasPopularLoadMore ? loadMPopular : null}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { fontSize: wp(3.9), marginTop: 0 },
                  ]}
                >
                  See more
                </Text>
                <Image source={upArrow} style={{ marginLeft: spacing.xs }} />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}

        {mPopularData.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              marginTop: hp(3.5),
              marginHorizontal: wp(4),
            }}
            data={mPopularData.slice(0, 6)}
            extraData={mPopularData}
            keyExtractor={(item, index) => index.toString()}
            vertical
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  handleClick("ProductDetails", item._id, item.name);
                }}
                style={{
                  flex: 1,
                  flexDirection: "column",
                  backgroundColor: COLORS.WHITE,
                  // width: wp(44.7),
                  padding: wp(3),
                  borderRadius: spacing.xs,
                  marginTop: hp(1),
                  shadowColor: "#00000014",
                  shadowOpacity: 1,
                  shadowOffset: {
                    width: 2,
                    height: 0,
                  },
                  shadowRadius: 10,
                }}
              >
                <Image
                  source={
                    item?.image !== null && item?.image?.length > 0
                      ? { uri: item?.image[0] }
                      : defaultImage
                  }
                  style={{
                    width: 110,
                    height: 125,
                    alignSelf: "center",
                  }}
                  resizeMode={"contain"}
                />
                <View style={{ marginTop: spacing.xs }}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item?.name}
                  </Text>
                  <Text style={styles.storeText} numberOfLines={1}>
                    {item?.storeId?.storeName}
                  </Text>
                </View>
                <View style={{ marginTop: -hp(4) }}>
                  <AirbnbRating
                    count={5}
                    reviews={""}
                    defaultRating={item?.ratings}
                    size={12}
                    starContainerStyle={{ alignSelf: "flex-start" }}
                    ratingContainerStyle={{ marginLeft: -wp(1) }}
                  />
                </View>
                <Text style={styles.priceText}>
                  KES {item?.price.toLocaleString()}
                </Text>
                <View style={{ flexDirection: "row", marginTop: hp(0.3) }}>
                  {item?.keySpecifications?.length > 0
                    ? item?.keySpecifications?.map((i) => {
                        return (
                          <View
                            style={{
                              width: 12,
                              height: 12,
                              marginRight: 5,
                              borderRadius: 100,
                              backgroundColor: i.color,
                              marginTop: hp(0.5),
                            }}
                          />
                        );
                      })
                    : null}
                </View>
              </TouchableOpacity>
            )}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};
