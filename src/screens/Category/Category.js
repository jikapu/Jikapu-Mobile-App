//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  RefreshControl,
  Image,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./Category.styles";
import { NAVIGATION } from "@/constants";
import {
  Button,
  CustomHeader,
  Loader,
  InputField,
  ListView2,
  ListView7,
} from "@/components";
import {
  jikapu,
  banner1,
  defaultImage,
  back,
  npRight,
  fashion,
  upArrow,
  sponser,
  banner2,
} from "@/assets";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { COLORS } from "@/constants";
import { spacing, typography } from "@/theme";
import FastImage from "react-native-fast-image";
import {
  addToWish,
  addToCart,
  getProductsList,
  getCategoryAlias,
  getSponsoredList,
  getFeaturedList,
  getPopularItemList,
} from "@/actions";

export const Category = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { data, parentId } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const subCategory2Data = data?.children;
  // const subCategory3Data = subCategory2Data?.children;
  // console.log("subCategorylevel3 data", subCategory3Data);
  // const sponsoredId = data?.children[0]?._id
  const [aliasId, setAliasId] = useState(parentId);
  const [cat2Data, setCat2Data] = useState(subCategory2Data);
  const [cat3Data, setCat3Data] = useState([]);
  const [cat4Data, setCat4Data] = useState([]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [productsData, setProductsData] = useState([]);
  const [seeMore, setSeeMore] = useState(4);
  const [seeSponsered, setSeeSponsered] = useState(4);
  const [seeFeatured, setSeeFeatured] = useState(4);
  const [seeMPopular, setSeeMPopular] = useState(2);
  const [seeCat4, setSeeCat4] = useState(6);

  const [sponseredData, setSponseredData] = useState([]);
  const [sponseredCurrentPage, setSponseredCurrentPage] = useState(1);
  const [hasSponseredLoadMore, setSponseredLoadMore] = useState(true);
  const [featuredData, setFeaturedData] = useState([]);
  const [featuredCurrentPage, setFeaturedCurrentPage] = useState(1);
  const [hasFeaturedLoadMore, setFeatureLoadMore] = useState(true);
  const [mPopularData, setMPopularData] = useState([]);
  const [popularCurrentPage, setPopularCurrentPage] = useState(1);
  const [hasPopularLoadMore, setPopularLoadMore] = useState(true);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = () => {
    getSponsereds(aliasId);
    getFeatured(aliasId);
    getMostPopular(aliasId);
    setRefreshing(false);
  };

  const loadMore = () => {
    setSeeMore(seeMore + 10);
  };
  /*
  const loadSponsered = () => {
    getSponsereds();
    setSeeSponsered(seeSponsered + 10);
  };
  */

  const loadCategory4 = () => {
    setSeeCat4(seeCat4 + 10);
  };

  const getSponsereds = (id) => {
    let params = {
      filter: {
        category: id ? id : aliasId,
        // sponsored: true,
      },
      page: sponseredCurrentPage,
      limit: 4,
      order: -1,
      sort: "rate",
    };
    console.log("sponsered category data", params);
    dispatch(
      getSponsoredList(navigation, params, (res) => {
        setSponseredData(res.data.docs);
      })
    );
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
        if (res.data.hasNextPage == true) {
          setFeatureLoadMore(true);
          setFeaturedCurrentPage(res.data.nextPage);
        } else {
          setFeatureLoadMore(false);
        }
      })
    );
  };

  const loadFeatured = () => {
    let params = {
      filter: {
        category: aliasId,
      },
      order: -1,
      sort: "rate",
      page: featuredCurrentPage,
      limit: 10,
    };
    dispatch(
      getFeaturedList(navigation, params, (res) => {
        setFeaturedData([...featuredData, ...res.data.docs]);
        if (res.data.hasNextPage == true) {
          setFeatureLoadMore(true);
          setFeaturedCurrentPage(res.data.nextPage);
        } else {
          setFeatureLoadMore(false);
        }
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
    setSeeFeatured(seeFeatured + 10);
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

  const handleClick = async (screen, id, name, parentId) => {
    console.log("_id", id);

    switch (screen) {
      case "ProductCatalog":
        navigation.push(NAVIGATION.productCatalog, {
          subCatId: id,
          title: name,
          parentId: parentId,
        });
        break;
      case "ProductDetails":
        navigation.push(NAVIGATION.productDetails, {
          productId: id,
          title: name,
        });
        break;
      default:
        console.log("value", value);
        break;
    }
  };


  const selectItem = (item, index) => {
    if (item.children) {
      setCat3Data(item.children);
      const a = cat2Data;
      for (var i = 0; i < a.length; i++) {
        a[i].status = 1;
      }
      let targetItem = a[index];
      console.log("target item", targetItem);
      if (targetItem.status == 1) {
        targetItem.status = 0;
      } else {
        targetItem.status = 0;
      }
      a[index] = targetItem;
      setCat3Data((a) => [...a]);
    } else {
      navigation.navigate(NAVIGATION.productCatalog, {
        subCatId: item._id,
        title: item.name,
        parentId: parentId,
      });
      // alert("coming soon");
      // navigation.navigate(NAVIGATION.subChildProducts, {
      //   data: item
      // })
    }
  };

  const selectSubCatItem = (item, index) => {
    if (item.children) {
      const childData = item.children;
      setCat4Data(childData);
      const a = cat3Data;
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
      setCat4Data((a) => [...a]);
    } else {
      navigation.push(NAVIGATION.productCatalog, {
        subCatId: item._id,
      });
    }
  };

  const addItemToCart = (productId) => {
    let quantity = 1;
    let param = {
      productId: productId,
      quantity: quantity,
    };
    isLoggedIn
      ? dispatch(
          addToCart(navigation,param)
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

  const renderCats = (item) => {
    if (item.children) {
      setCat4Data(item.children);
    } else {
      navigation.navigate(NAVIGATION.productCatalog, {
        subCatId: item._id,
        title: item.name,
        parentId: parentId,
      });
    }
  };

  const selectCat2 = (item, index) => {
    console.log("selection cat 2", item);
    const a = cat2Data;
    for (var i = 0; i < a.length; i++) {
      a[i].status = 1;
    }
    let targetItem = a[index];
    console.log("target item", targetItem);
    if (targetItem.status == 1) {
      targetItem.status = 0;
    } else {
      targetItem.status = 0;
    }
    a[index] = targetItem;

    dispatch(
      getCategoryAlias(navigation, item?.alias, (res) => {
        console.log("res select cat 2", res);
        const id = res.dataSelf._id;
        console.log("item id", id);
        setCat4Data(res.data);
        setAliasId(id);
        getSponsereds(id);
        getFeatured(id);
        getMostPopular(id);
        setCat3Data(res.data);
        setCat4Data([]);
      })
    );
  };

  const selectCat3 = (item) => {
    console.log("selection cat 3", item);
    dispatch(
      getCategoryAlias(navigation, item?.alias, (res) => {
        console.log("res select cat 3", res);
        if (res.data.length <= 0) {
          navigation.navigate(NAVIGATION.productCatalog, {
            subCatId: item._id,
            title: item.name,
            parentId: parentId,
          });
        } else {
          const idCat = res.dataSelf._id;
          setCat4Data(res.data);
          setAliasId(idCat);
          getSponsereds(idCat);
          getFeatured(idCat);
          getMostPopular(idCat);
        }
      })
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllList();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Shop by Category"}
        isBackBtn={true}
        isSearchBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <ScrollView
        contentContainerStyle={{ backgroundColor: COLORS.APP, padding: wp(4) }}
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
        <View
          style={{
            backgroundColor: COLORS.YELLOW_LIGHT,
            flex: 1,
            borderRadius: 8,
            padding: wp(4),
          }}
        >
          {/* Start Category level 2 data */}
          {cat2Data.length > 0 ? (
            <View style={styles.categoryView}>
              <Text style={typography.labelBold}>Jikapu {data?.name}</Text>
              <FlatList
                contentContainerStyle={{
                  marginTop: hp(2),
                  justifyContent: "space-between",
                }}
                data={cat2Data}
                extraData={cat2Data}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        item.status == 1 ? COLORS.WHITE : COLORS.GREEN_BTN,
                      alignItems: "center",
                      justifyContent: "center",
                      width: wp(26),
                      height: hp(5),
                      marginRight: wp(2.5),
                      padding: wp(2),
                      borderRadius: spacing.xs,
                    }}
                    onPress={() => {
                      selectCat2(item, index);
                    }}
                    // onPress={() => selectItem(item, index)}
                    //  onPress={() => {
                    //    handleClick('ProductCatalog', item._id, item.name, item.parentId);
                    //  }}
                  >
                    <Text
                      style={{
                        color: item.status == 0 ? COLORS.WHITE : COLORS.BLACK,
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>No Data Found</Text>
            </View>
          )}
          {/* Sponsored Section */}
          {sponseredData.length > 0 ? (
            <View style={styles.categoryView}>
              <View style={{ marginTop: hp(3), borderRadius: 5 }}>
                <ImageBackground
                  source={sponser}
                  resizeMode="cover"
                  style={{
                    flex: 1,
                    height: hp(20),
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontWeight: "bold",
                      fontSize: wp(4.5),
                      position: "absolute",
                      top: spacing.xs,
                      left: spacing.xs,
                    }}
                  >
                    Sponsored
                  </Text>
                </ImageBackground>
              </View>
              <FlatList
                contentContainerStyle={{
                  marginTop: wp(4),
                }}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                data={sponseredData.slice(0, seeSponsered)}
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
                        ? { uri: item?.image[0] }
                        : defaultImage
                    }
                    title={item?.name}
                    isAddToCart={false}
                    storeName={item?.storeId?.storeName}
                    price={item?.price}
                    btnStyles={{ width: wp(40.7) }}
                  />
                )}
              />
            </View>
          ) : null}
        </View>

        {cat3Data?.length > 0 ? (
          <View>
            <FlatList
              contentContainerStyle={{
                flexDirection: "row",
                marginTop: hp(2.5),
              }}
              data={cat3Data}
              extraData={cat3Data}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      item.status == 1 ? COLORS.WHITE : COLORS.GREEN_BTN,
                    alignItems: "center",
                    justifyContent: "center",
                    width: wp(42),
                    height: hp(5),
                    borderRadius: spacing.xs,
                    marginRight: wp(2.5),
                    padding: wp(2),
                  }}
                  onPress={() => {
                    selectCat3(item, index);
                    //  selectSubCatItem(item, index);
                  }}
                >
                  <Text
                    style={{
                      color: item.status == 0 ? COLORS.WHITE : COLORS.BLACK,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}

        {cat4Data.length > 0 ? (
          <View>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(2),
                justifyContent: "space-between",
              }}
              data={cat4Data.slice(0, seeCat4)}
              extraData={cat4Data}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.WHITE,
                    alignItems: "center",
                    justifyContent: "center",
                    width: wp(29),
                    height: hp(20),
                    marginRight: wp(2.5),
                    marginBottom: hp(1.2),
                    borderRadius: spacing.xs,
                  }}
                  onPress={() => renderCats(item)}
                >
                  <Text
                    style={{
                      color: COLORS.BLACK,
                    }}
                    numberOfLines={2}
                  >
                    {item?.name}
                  </Text>
                  <Image
                    source={
                      item?.mainImage !== null && item?.mainImage?.length > 0
                        ? { uri: item?.mainImage[0] }
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
            {cat4Data > 6 ? (
              <TouchableOpacity style={styles.see} onPress={loadCategory4}>
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

        {productsData.length > 0 ? (
          <View style={styles.categoryView}>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(1),
              }}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={productsData.slice(0, 6)}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: COLORS.WHITE,
                    width: wp(28.7),
                    borderWidth: 1,
                    borderColor: "#70707033",
                    borderRadius: spacing.xs,
                    marginTop: hp(1.5),
                  }}
                >
                  <Text
                    style={{ marginHorizontal: wp(2), marginTop: hp(1.5) }}
                    numberOfLines={1}
                  >
                    {item?.name}
                  </Text>
                  <View
                    style={{
                      marginTop: hp(1.5),
                      borderRadius: 100,
                      backgroundColor: "red",
                    }}
                  >
                    {/* 
                  <Image
                      source={
                        item.image !== null && item.image.length > 0
                          ? { uri: item.image[0] }
                          : defaultImage
                      }
                      resizeMode={"cover"}
                      style={{ width: 103, height: 104 }}
                    />
                  */}

                    <FastImage
                      style={{ width: 103, height: 104 }}
                      source={
                        item?.image !== null && item?.image.length > 0
                          ? { uri: item?.image[0] }
                          : defaultImage
                      }
                      resizeMode={FastImage.resizeMode.cover}
                      PlaceholderContent={
                        <ActivityIndicator size="small" color="0000ff" />
                      }
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
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
          </View>
        ) : null}
        {featuredData.length > 0 && (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.WHITE,
              borderRadius: spacing.xs,
              marginTop: hp(4),
              paddingBottom: hp(2),
            }}
          >
            <View style={styles.featureView}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginTop: hp(1),
                  alignItems: "center",
                }}
              >
                <Text style={[typography.title, { flex: 0.9 }]}>
                  Featured deals
                </Text>
                {/* 
                <TouchableOpacity style={{ alignSelf: 'flex-end', flex: 0.1 }}>
                  <Image source={npRight} style={{ alignSelf: 'flex-end', width: 9, height: 15 }} />
                </TouchableOpacity>
                */}
              </View>
              <FlatList
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                data={featuredData.slice(0, seeFeatured)}
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
                      item?.image !== null && item?.image?.length > 0
                        ? { uri: item?.image[0] }
                        : defaultImage
                    }
                    title={item?.name}
                    onClickCart={() => {
                      addItemToCart(item._id);
                    }}
                    isAddToCart={false}
                    isRating={true}
                    starCount={item?.ratings}
                    storeName={item?.storeId?.storeName}
                    price={item?.price}
                    btnStyles={{ width: wp(40) }}
                  />
                )}
              />

              {hasFeaturedLoadMore ? (
                <TouchableOpacity
                  style={styles.see}
                  onPress={hasFeaturedLoadMore ? loadFeatured : null}
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
        )}
        {mPopularData.length > 0 ? (
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              marginTop: hp(2),
              borderRadius: spacing.xs,
              paddingHorizontal: wp(4),
              paddingBottom: hp(2),
            }}
          >
            <Text style={[typography.title, { marginTop: hp(1) }]}>
              Most Popular
            </Text>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={mPopularData.slice(0, seeMPopular)}
              extraData={mPopularData}
              keyExtractor={(item, index) => index.toString()}
              vertica
              l
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView2
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
                  onClickCart={() => {
                    addItemToCart(item._id);
                  }}
                  btnStyles={{ width: wp(40) }}
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
      </ScrollView>
    </View>
  );
};
