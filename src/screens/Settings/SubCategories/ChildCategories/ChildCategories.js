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
import { JikapuStatusBar, ListView2, ListView6, Loader } from "@/components";
import {
  getProductsList,
  getPopularItemList,
  getFeaturedList,
} from "@/actions/home/HomeAction";
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
import { styles } from "@/screens/Settings/SubCategories/SubCategories.styles.js";
import { spacing } from "@/theme";

export const ChildCategories = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { data } = route.params;
  const parentId = data?._id;
  const isLoading = useSelector((state) => state.common.isLoading);
  const childData = data?.children;
  const [aliasId, setAliasId] = useState(parentId);
  const [childrenData, setChildrenData] = useState(childData);
  const [seeMore, setSeeMore] = useState(6);
  const [refreshing, setRefreshing] = React.useState(false);
  const [featuredData, setFeaturedData] = useState([]);
  const [featuredCurrentPage, setFeaturedCurrentPage] = useState(1);
  const [seeFeatured, setSeeFeatured] = useState(6);
  const [mPopularData, setMPopularData] = useState([]);
  const [popularCurrentPage, setPopularCurrentPage] = useState(1);
  const [hasPopularLoadMore, setPopularLoadMore] = useState(true);
  const [seeMPopular, setSeeMPopular] = useState(4);

  const loadMore = () => {
    setSeeMore(seeMore + 10);
  };

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = () => {
    getFeatured(parentId);
    getMostPopular(parentId);
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
      search: "",
      filter: {
        category: id ? id : aliasId,
      },
      page: popularCurrentPage,
      // sort: "popular",
      order: -1,
      sort: "rate",
      limit: 10,
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
    let params = {
      search: "",
      filter: {
        category: aliasId,
      },
      page: popularCurrentPage,
      order: -1,
      sort: "rate",
      limit: 10,
    };
    dispatch(
      getPopularItemList(navigation, params, (res) => {
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

  const handleClick = async (screen, id, name, parentId) => {
    console.log("_id", id);
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
  const renderCats = (item) => {
    if (item.children) {
      setChildrenData(item.children);
    } else {
      navigation.push(NAVIGATION.subChildProducts, {
        data: item,
      });
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
              {data?.name}
            </Text>
          </TouchableOpacity>
        </View>

        {childrenData?.length > 0 && (
          <View style={{ marginHorizontal: wp(4) }}>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(1.5),
              }}
              data={childrenData?.slice(0, seeMore)}
              extraData={childrenData}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => renderCats(item)}
                  style={{
                    width: wp(29),
                    height: hp(20),
                    backgroundColor: COLORS.WHITE,
                    alignItems: "center",
                    marginVertical: hp(0.5),
                    borderRadius: spacing.xs,
                  }}
                >
                  <Text style={{ padding: wp(2) }}>{item.name}</Text>
                  <Image
                    source={
                      item.mainImage !== null && item.mainImage.length > 0
                        ? { uri: item.mainImage[0] }
                        : defaultImage
                    }
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
            {seeMore > 6 ? (
              <TouchableOpacity style={styles.see} onPress={loadMore}>
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
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={featuredData.slice(0, 6)}
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
                    item.image !== null && item.image.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  title={item.name}
                  isAddToCart={false}
                  isRating={true}
                  starCount={item.ratings}
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
            <Text style={styles.categoryText}>Most Popular</Text>

            <View>
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
                      item?.image !== null && item?.image?.length > 0
                        ? { uri: item.image[0] }
                        : defaultImage
                    }
                    title={item.name}
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
          </View>
        ) : null}

        {mPopularData.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              marginTop: hp(2),
              marginHorizontal: wp(8),
            }}
            data={mPopularData.slice(0, 6)}
            extraData={mPopularData}
            keyExtractor={(item, index) => index.toString()}
            vertical
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ListView6
                key={index}
                onClickProduct={() => {
                  handleClick("ProductDetails", item._id, item.name);
                }}
                imgSrc={
                  item?.image !== null && item?.image?.length > 0
                    ? { uri: item?.image[0] }
                    : defaultImage
                }
                title={item?.name}
                isAddToCart={false}
                isRating={true}
                starCount={item?.ratings}
                storeName={item?.storeId?.storeName}
                price={item?.price}
                productColors={[item?.keySpecifications[0]?.color]}
              />
            )}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};
