//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { strings } from "@/localization";
import { styles } from "./Home.styles";
import { SliderBox } from "react-native-image-slider-box";
import { NAVIGATION } from "@/constants";
import {
  ListView2,
  Loader,
  JikapuStatusBar,
  Coupon,
  ListView,
} from "@/components";
import {
  jikapu,
  b1,
  b2,
  b3,
  banner1,
  banner2,
  appliance,
  poster,
  searchIcon1,
  upArrow,
  topFashion,
  babyToy,
  banner4,
  defaultImage,
} from "@/assets";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  getRootCatList,
  getTopEItems,
  getAllSubCatList,
  getClearanceList,
  getPopularItemList,
  getTopFashionItems,
  getTopJikapuFreshItems,
  getTopBabyItems,
  getTopHouseHoldItems,
  getAllAddress,
  getUserDetails,
  getJikapuCartItems,
  getCartItems,
} from "@/actions";
import { COLORS } from "@/constants";
import { spacing, typography } from "@/theme";

const images = [b1, b2, b3];
//const dimensions = Dimensions.get("window");
//const imageHeight = Math.round((dimensions.width * 9) / 16);
//const imageWidth = dimensions.width;

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [subCatData, setSubCatData] = useState([]);
  const { treeCatData = [] } = useSelector((state) => state.home);
  const [clearanceSaleData, setClearanceSaleData] = useState([]);
  const [popularItemData, setPopularItemData] = useState([]);
  const { topEData = [] } = useSelector((state) => state.home);
  const { topFashionData = [] } = useSelector((state) => state.home);
  const { topJikapuFreshData = [] } = useSelector((state) => state.home);
  const { topHouseHoldData = [] } = useSelector((state) => state.home);
  const { topBabyData = [] } = useSelector((state) => state.home);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasLoadMore, setLoadMore] = useState(true);
  const [popularCurrentPage, setPopularCurrentPage] = useState(1);
  const [hasPopularLoadMore, setPopularLoadMore] = useState(true);
  const [seeMorePopular, setSeeMorePopular] = useState(4);
  const [seeClearance, setClearance] = useState(4);
  const [clearanceId, setClearanceId] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(getUserDetails(navigation));
    getAllList();
    if (isLoggedIn == true) {
      dispatch(getAllAddress(navigation));
      dispatch(getJikapuCartItems(navigation));
      dispatch(getCartItems(navigation));
    }
  }, []);

  /*
  const popularParams = {
    search: "",
    sort: "popular",
    order: 1,
    page: popularCurrentPage,
    limit: 10,
  };
 */
  const popularParams = {
    filter: {},
    search: "",
    sort: "rate",
    order: -1,
    page: popularCurrentPage,
    limit: 10,
  };

  const eParams = {
    filter: {
      category: "61ee58cced011c26a8fa2ec6",
    },
    isLandingPage: 1,
    limit: 10,
    page: 1,
    range: {},
    search: "",
    type: "POPULAR_ELECTRONIC",
  };

  const fParams = {
    search: "",
    filter: {
      category: "61e7d58e2deabfe226e063b4",
    },
    page: 1,
    limit: 10,
    isLandingPage: 1,
    range: {},
    type: "POPULAR_FASHION",
  };

  const jFreshParams = {
    search: "",
    filter: {
      category: "61ee5b5ded011c26a8fa2eda",
    },
    isLandingPage: 1,
    page: 1,
    limit: 10,
    range: {},
    type: "POPULAR_FRESH_FRUIT_VEG",
  };

  const babyParams = {
    search: "",
    filter: {
      category: "62064f89ec6e4018e3ba0097",
    },
    isLandingPage: 1,
    limit: 10,
    page: 1,
    range: {},
    type: "POPULAR_BABY_PRODUCT",
  };
  const houseHoldParams = {
    search: "",
    filter: {
      category: "61ee5b2aed011c26a8fa2ed6",
    },
    isLandingPage: 1,
    limit: 10,
    page: 1,
    range: {},
    type: "POPULAR_HOUSEHOLD",
  };
  /* 
  let clearanceParams = {
    filter: {
      category: "61ee591ced011c26a8fa2eca"
    },
    sale: true,
    page: 1,
    limit: 10
  }
  */
  const clearanceParams = {
    filter: { },
    limit: 10,
    page: currentPage,
    serach: ""
  };

  const getAllList = () => {
    dispatch(getRootCatList());
    dispatch(
      getClearanceList(navigation,clearanceParams, (res) => {
        setClearanceSaleData(res.data.docs);
        if (res.data.hasNextPage == true) {
          setCurrentPage(res.data.nextPage);
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }
      })
    );
    dispatch(
      getPopularItemList(navigation, popularParams, (res) => {
        setPopularItemData(res.data.docs);
        if (res.data.hasNextPage == true) {
          setPopularCurrentPage(res.data.nextPage);
          setPopularLoadMore(true);
        } else {
          setPopularLoadMore(false);
        }
      })
    );
    dispatch(getTopEItems(eParams));
    dispatch(getTopFashionItems(fParams));
    dispatch(getTopJikapuFreshItems(jFreshParams));
    dispatch(getTopHouseHoldItems(houseHoldParams));
    dispatch(getTopBabyItems(babyParams));
    setRefreshing(false);
  };

  const loadClearance = () => {
    setClearance(seeClearance + 10);
    const clearPrms = {
      filter: { category: clearanceId ? clearanceId : "" },
      limit: 10,
      order: -1,
      page: currentPage,
      sort: "rate",
    };
    dispatch(
      getClearanceList(navigation,clearPrms, (res) => {
        console.log("clear", res);
        setClearanceSaleData([...clearanceSaleData, ...res.data.docs]);
        if (res.data.hasNextPage == true) {
          setLoadMore(true);
          setCurrentPage(res.data.nextPage);
        } else {
          setLoadMore(false);
        }
      })
    );
  };

  const loadMorePopular = () => {
    setSeeMorePopular(seeMorePopular + 10);
    dispatch(
      getPopularItemList(navigation,popularParams, (res) => {
        setPopularItemData([...popularItemData, ...res.data.docs]);
        if (res.data.hasNextPage == true) {
          setPopularLoadMore(true);
          setPopularCurrentPage(res.data.nextPage);
        } else {
          setPopularLoadMore(false);
        }
      })
    );
  };

  const handleClearanceCategories = (id, index) => {
    setClearanceId(id);
    setCurrentPage(1);
    const a = treeCatData;
    for (var i = 0; i < a.length; i++) {
      a[i].status = 1;
    }
    let targetItem = a[index];
    if (targetItem.status == 1) {
      targetItem.status = 0;
    } else {
      targetItem.status = 0;
    }
    a[index] = targetItem;
    let params = {
      filter: { category: id },
      limit: 10,
      order: -1,
      page: 1,
      sort: "rate",
    };

    dispatch(
      getClearanceList(navigation,params, (res) => {
        setClearanceSaleData(res.data.docs);
        if (res.data.hasNextPage == true) {
          setCurrentPage(res.data.nextPage);
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }
      })
    );
  };

  const getSubcat = (id, name) => {
    if (id != null && id !== "") {
      dispatch(
        getAllSubCatList(id, (res) => {
          setSubCatData(res.data);
        })
      );
    }
  };

  const seeMore = () => {
    navigation.navigate(NAVIGATION.settings);
  };

  const handleClick = async (screen, id, name, parentId) => {
    switch (screen) {
      case "SubCategory":
        if (id) {
          getSubcat(id, name);
          navigation.push(NAVIGATION.category, {
            parentId: id,
            title: name,
            subCatId: parentId,
          });
        } else {
          Alert.alert("Coming Soon");
        }
        break;
      case "ProductCatalog":
        navigation.push(NAVIGATION.productCatalog, {
          subCatId: id,
          title: name,
        });
        break;
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
    setRefreshing(true);
    getAllList();
  }, []);

  return (
    <View style={styles.container}>
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
        contentContainerStyle={{ backgroundColor: COLORS.APP }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
      >
        <SliderBox
          // autoplay={true}
          // circleLoop={true}
          paginationBoxVerticalPadding={10}
          resizeMode={"cover"}
          resizeMethod={"resize"}
          dotColor={"#EEB600"}
          inactiveDotColor={"#D8D8D8"}
          images={images}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          currentImageEmitter={(index) =>
            console.warn(`current pos is: ${index}`)
          }
          // ImageComponentStyle={{height: imageHeight, width: '100%'}}
        />

        {<Loader isLoading={isLoading} />}
        {treeCatData.length > 0 ? (
          <View style={{ paddingHorizontal: wp(4), marginTop: hp(2) }}>
            <Text style={typography.title}>{strings.home.CATEGORY}</Text>
            <FlatList
              numColumns={3}
              data={treeCatData.slice(0, 9)}
              extraData={treeCatData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.btnstyle}
                    onPress={() => {
                      item.children
                        ? navigation.push(NAVIGATION.category, {
                            data: item,
                            parentId: item._id,
                          })
                        : Alert.alert("Coming Soon");
                    }}
                    //  onPress={() => handleClick(NAVIGATION.category, item._id, item.name)}
                  >
                    <Image
                      source={
                        item?.mainImage !== null && item?.mainImage.length > 0
                          ? { uri: item.mainImage[0] }
                          : defaultImage
                      }
                      style={styles.img1}
                      PlaceholderContent={
                        <ActivityIndicator size="large" color="0000ff" />
                      }
                    />
                    <Text style={styles.textStyle} numberOfLines={2}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity style={styles.see} onPress={seeMore}>
              <Text
                style={[
                  styles.categoryText,
                  { fontSize: wp(3.9), marginTop: 0 },
                ]}
              >
                {strings.common.SEE_MORE}
              </Text>
              <Image source={upArrow} style={{ marginLeft: spacing.xs }} />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{ marginHorizontal: wp(4), marginTop: hp(2) }}>
          <Image source={poster} />
        </View>

        {popularItemData.length > 0 && (
          <View style={[styles.categoryView, { marginTop: hp(2.5) }]}>
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text style={[styles.categoryText, { flex: 0.9 }]}>
                Jikapu Clearance Sale
              </Text>
              {/* 
               <TouchableOpacity style={{ alignSelf: "flex-end", flex: 0.1 }}>
                <Image source={npRight} style={{ alignSelf: "flex-end" }} />
              </TouchableOpacity>
              */}
            </View>
            {treeCatData.length > 0 ? (
              <FlatList
                contentContainerStyle={{
                  marginTop: hp(1.5),
                }}
                data={treeCatData.slice(0, 9)}
                extraData={treeCatData}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => handleClearanceCategories(item._id, index)}
                      style={{
                        width: wp(28),
                        height: hp(5),
                        borderWidth: 1,
                        paddingHorizontal: wp(2),
                        backgroundColor:
                          item.status == 1 ? COLORS.WHITE : COLORS.GREEN_BTN,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor:
                          item.status == 1 ? "#7070707A" : COLORS.WHITE,
                        borderRadius: 8,
                        marginRight: wp(4),
                      }}
                    >
                      <Text
                        style={{
                          color: item.status == 0 ? COLORS.WHITE : COLORS.BLACK,
                        }}
                        numberOfLines={1}
                      >
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : null}
            {clearanceSaleData.length > 0 ? (
              <View style={{ flex: 1 }}>
                <FlatList
                  contentContainerStyle={{
                    marginTop: hp(1),
                  }}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  numColumns={2}
                  data={clearanceSaleData.slice(0, seeClearance)}
                  extraData={clearanceSaleData}
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
                        item?.image !== null && item?.image?.length > 0
                          ? { uri: item.image[0] }
                          : defaultImage
                      }
                      isDel={false}
                      isRating={true}
                      starCount={item?.ratings}
                      title={item?.name}
                      isAddToCart={false}
                      storeName={item?.storeId?.storeName}
                      price={item?.price}
                    />
                  )}
                />
                {clearanceSaleData.length > 4 && hasLoadMore ? (
                  <TouchableOpacity
                    style={styles.see}
                    onPress={hasLoadMore ? loadClearance : null}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        { fontSize: wp(3.9), marginTop: 0 },
                      ]}
                    >
                      See more
                    </Text>
                    <Image
                      source={upArrow}
                      style={{ marginLeft: spacing.xs }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        )}

        {popularItemData.length > 0 && (
          <View style={[styles.categoryView, { marginTop: hp(1) }]}>
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text style={[styles.categoryText, { flex: 0.9 }]}>
                Popular Items
              </Text>
              {/*
               <TouchableOpacity style={{ alignSelf: "flex-end", flex: 0.1 }}>
                <Image source={npRight} style={{ alignSelf: "flex-end" }} />
              </TouchableOpacity>
              */}
            </View>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={popularItemData.slice(0, seeMorePopular)}
              extraData={popularItemData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView2
                  key={index}
                  onClickProduct={() => {
                    handleClick("ProductDetails", item._id, item.name);
                  }}
                  imgSrc={
                    item?.image !== null && item?.image?.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  isDel={false}
                  isRating={true}
                  starCount={item?.ratings}
                  title={item?.name}
                  isAddToCart={false}
                  storeName={item?.storeId?.storeName}
                  price={item?.price}
                />
              )}
            />

            {popularItemData.length > 4 && hasPopularLoadMore ? (
              <TouchableOpacity
                style={styles.see}
                onPress={hasPopularLoadMore ? loadMorePopular : null}
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
        )}

        {topEData.length > 0 && (
          <View style={styles.eView}>
            <Text style={styles.categoryText}>Top Electronics Items</Text>
            <Image
              source={banner2}
              style={{
                marginTop: hp(1.5),

                borderRadius: spacing.xs,
                height: hp(23),
                width: "100%",
              }}
            />

            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
                paddingHorizontal: wp(2),
              }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={topEData.slice(0, 6)}
              extraData={topEData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView
                  key={index}
                  onClick={() => {
                    handleClick(
                      "ProductCatalog",
                      item?.categoryName?._id,
                      item?.name
                    );
                  }}
                  imgSrc={
                    item?.image !== null && item?.image?.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  isRating={false}
                  isDel={false}
                  catText={item?.name}
                  imgStyle={styles.img2}
                  buttonStyle={styles.btn}
                />
              )}
            />
          </View>
        )}
        {topFashionData.length > 0 && (
          <View style={styles.eView}>
            <Text style={styles.categoryText}>Top Fashion Items</Text>
            <Image
              source={topFashion}
              style={{
                marginTop: hp(1.5),
                borderRadius: spacing.xs,
                height: hp(23),
                width: "100%",
              }}
            />

            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              data={topFashionData.slice(0, 6)}
              extraData={topFashionData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView
                  key={index}
                  onClick={() => {
                    handleClick(
                      "ProductCatalog",
                      item?.categoryName?._id,
                      item.name
                    );
                  }}
                  imgSrc={
                    item?.image !== null && item?.image?.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  isRating={false}
                  isDel={false}
                  catText={item.name}
                  imgStyle={styles.img2}
                  buttonStyle={styles.btn}
                />
              )}
            />
          </View>
        )}
        {topJikapuFreshData && (
          <View style={styles.eView}>
            <Text style={styles.categoryText}>Top items in Jikapu Fresh</Text>
            <Image
              source={banner4}
              style={{
                marginTop: hp(1.5),
                borderRadius: spacing.xs,
                height: hp(23),
                width: "100%",
              }}
            />
            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={2}
              data={topJikapuFreshData.slice(0, 6)}
              extraData={topJikapuFreshData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView
                  key={index}
                  numLines={1}
                  onClick={() => {
                    handleClick(
                      "ProductCatalog",
                      item?.categoryName?._id,
                      item.name
                    );
                  }}
                  imgSrc={
                    item?.image !== null && item?.image?.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  isRating={false}
                  isDel={false}
                  catText={item?.name}
                  imgStyle={styles.img2}
                  buttonStyle={styles.btn}
                />
              )}
            />
          </View>
        )}
        {topHouseHoldData.length > 0 && (
          <View style={styles.eView}>
            <Text style={styles.categoryText}>
              Top items in Household & Appliances
            </Text>
            <Image
              source={appliance}
              style={{
                marginTop: hp(1.5),
                borderRadius: spacing.xs,
                height: hp(23),
                width: "100%",
              }}
            />

            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={topHouseHoldData.slice(0, 6)}
              extraData={topHouseHoldData}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView
                  key={index}
                  onClick={() => {
                    handleClick(
                      "ProductCatalog",
                      item?.categoryName?._id,
                      item.name
                    );
                  }}
                  imgSrc={
                    item?.image !== null && item?.image.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  isRating={false}
                  isDel={false}
                  catText={item.name}
                  imgStyle={styles.img2}
                  buttonStyle={styles.btn}
                />
              )}
            />
          </View>
        )}
        {topBabyData.length > 0 && (
          <View style={styles.eView}>
            <Text style={styles.categoryText}>Top Toys & Baby Products</Text>
            <Image
              source={babyToy}
              style={{
                marginTop: hp(1.5),
                borderRadius: spacing.xs,
                height: hp(23),
                width: "100%",
              }}
            />

            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={topBabyData.slice(0, 6)}
              extraData={topBabyData}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView
                  key={index}
                  onClick={() => {
                    handleClick(
                      "ProductCatalog",
                      item?.categoryName?._id,
                      item.name
                    );
                  }}
                  imgSrc={
                    item?.image !== null && item?.image.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  isRating={false}
                  isDel={false}
                  catText={item.name}
                  imgStyle={styles.img2}
                  buttonStyle={styles.btn}
                />
              )}
            />
          </View>
        )}
        <Coupon />
      </ScrollView>
    </View>
  );
};
