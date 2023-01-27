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
  jikapu,
  backArrow,
  searchIcon1,
  upArrow,
  npMove,
  defaultImage,
} from "@/assets";
import { getProductsList,getPopularItemList,getFeaturedList, } from '@/actions/home/HomeAction';
import { NAVIGATION } from "@/constants";
import { COLORS } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { styles } from "@/screens/Settings/SubCategories/SubCategories.styles.js";
import { spacing } from "@/theme";

export const SubCategories = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { data,parentId } = route.params;
  const [aliasId, setAliasId] = useState(parentId);
  const childData = data.children;
  const [childrenData, setChildrenData] = useState(childData);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [seeMore, setSeeMore] = useState(6);
  const [refreshing, setRefreshing] = React.useState(false);
  //Featured
  const [featuredData, setFeaturedData] = useState([]);
  const [seeFeatured, setSeeFeatured] = useState(6);
  const [featuredCurrentPage, setFeaturedCurrentPage] = useState(1);
  const [hasFeaturedLoadMore, setFeatureLoadMore] = useState(true);
  //popular
  const [mPopularData, setMPopularData] = useState([]);
  const [seeMPopular, setSeeMPopular] = useState(4);
  const [popularCurrentPage, setPopularCurrentPage] = useState(1);
  const [hasPopularLoadMore, setPopularLoadMore] = useState(true);
 

  useEffect(() => {
    getAllList()
   }, []);

   const getAllList = () => {
    getFeatured(aliasId)
    getMostPopular(aliasId)
    setRefreshing(false)
  };

  const loadMore = () => {
    setSeeMore(seeMore + 10);
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

  const selectItem = (item, index) => {
    console.log("clothing category Id",item._id)
    getMostPopular(item._id)
    getFeatured(item._id)
    if (item.children) {
      var a = childrenData;
      for (var i = 0; i < childrenData.length; i++) {
        childrenData[i].status = 1;
      }
      let targetItem = childrenData[index];
      if (targetItem.status == 1) {
        targetItem.status = 0;
      } else {
        targetItem.status = 0;
      }
      childrenData[index] = targetItem;
      setChildrenData((childrenData) => [...childrenData]);
      console.log("children", childrenData);
    }
    else {
      navigation.navigate(NAVIGATION.subChildProducts, {
        data: item
      })
    }
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
    setSeeFeatured(seeFeatured + 10);
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
      search: "",
      filter: {
        category:id ? id : aliasId,
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
  }

  const loadMPopular = () => {
    let params = {
      search: "",
      filter: {
        category:aliasId,
      },
      page: popularCurrentPage,
      order: -1,
      sort: "rate",
      limit: 10,
    };
    dispatch(
      getPopularItemList(navigation,params, (res) => {
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getAllList();
  }, [])


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
        }>
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
          <View>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(1.5),
                marginLeft: wp(2),
              }}
              data={childrenData?.slice(0, seeMore)}
              extraData={childrenData}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => selectItem(item, index)}
                  style={{
                    borderRadius: spacing.xs,
                    paddingHorizontal: wp(8),
                    height: hp(5),
                    marginHorizontal: wp(2),
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: item.status == 1 ? COLORS.WHITE : COLORS.GREEN_BTN,
                  }}
                >
                  <Text style={{ color: item.status == 0 ? COLORS.WHITE : COLORS.BLACK }}>{item?.name}</Text>
                </TouchableOpacity>
              )}
            />
          
          </View>
        )}

        {childData?.length > 0 &&
          childData?.map(
            (e) =>
              e.status == 0 &&
              e.children && (
                <View
                  style={{
                    marginHorizontal: wp(4),
                  }}
                >
                  <FlatList
                    contentContainerStyle={{
                      marginTop: hp(1.5),    
                    }}
                    columnWrapperStyle={{justifyContent:"space-between"}}
                    numColumns={3}
                    data={e.children?.slice(0, seeMore)}
                    extraData={e.children}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => item.children ?
                          navigation.push(NAVIGATION.childCategories, {
                            data: item,
                          }) : navigation.push(NAVIGATION.subChildProducts, {
                            data: item,
                          })
                        }
                        style={{
                          width: wp(29),
                          height: hp(20),
                          backgroundColor: COLORS.WHITE,
                          alignItems: "center",
                          marginVertical: hp(0.5),
                          borderRadius: spacing.xs,
                        }}
                      >
                        <Text style={{ padding: wp(2) }} numberOfLines={2}>{item.name}</Text>
                        <Image
                          source={
                            item?.mainImage !== null && item?.mainImage.length > 0
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
                  {e?.children.length > 6 ? (
                    <TouchableOpacity style={styles.see} onPress={loadMore}>
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
              )
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
            <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
              <Text style={styles.categoryText}>Featured deals</Text>
            </View>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              numColumns={2}
              columnWrapperStyle={{justifyContent:"space-between"}}
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
          </View>
        ) : null}

        {/* Most popular category data */}

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
            <FlatList
              contentContainerStyle={{  
                marginTop: hp(0.5),
              }}
              numColumns={2}
              columnWrapperStyle={{justifyContent:"space-between"}}
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
              <TouchableOpacity style={styles.see} onPress={hasPopularLoadMore ? loadMPopular : null}>
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
              marginTop: hp(2),
              marginHorizontal: wp(8)
            }}
            data={mPopularData}
            extraData={mPopularData}
            keyExtractor={(item, index) => index.toString()}
            vertical
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ListView6
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

        {/**  same aas above  */}
        {childData?.length > 0 &&
          childData?.map(
            (e) =>
              e.status == 0 &&
              e.children && (
                <View
                  style={{
                    marginHorizontal: wp(4),
                  }}
                >
                  <FlatList
                    contentContainerStyle={{
                      marginTop: hp(1.5),
                      //  marginHorizontal: wp(2),
                    }}
                    data={e.children?.slice(0, seeMore)}
                    extraData={e.children}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (

                      <TouchableOpacity
                        onPress={() => item.children ?
                          navigation.push(NAVIGATION.childCategories, {
                            data: item,
                          }) : navigation.push(NAVIGATION.subChildProducts, {
                            data: item,
                          })
                        }
                        style={{
                          flexDirection: "row",
                          flex: 1,

                          borderRadius: spacing.xs,
                          height: hp(5),
                          marginVertical: hp(0.5),
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingHorizontal: wp(4),
                          backgroundColor: item.status == 1 ? COLORS.WHITE : COLORS.GREEN_BTN,
                        }}
                      >
                        <Text style={{ color: item.status == 0 ? COLORS.WHITE : COLORS.BLACK }}>{item?.name}</Text>
                        <Image source={npMove} />
                      </TouchableOpacity>
                    )}
                  />
                  {e?.children.length > 6 ? (
                    <TouchableOpacity style={styles.see} onPress={loadMore}>
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
              )
          )}
      </ScrollView>
    </View>
  );
};
