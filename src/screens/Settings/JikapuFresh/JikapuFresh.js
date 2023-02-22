import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { defaultImage, taste, npRight } from "@/assets";
import FastImage from 'react-native-fast-image'

import {
  Button1,
  Loader,
  CustomHeader,
  ListView2,
  InputField,
  GuestScreen,
} from "@/components";
import { strings } from "@/localization";
import { COLORS, NAVIGATION } from "@/constants";
import { spacing, typography } from "@/theme";
import {
  banner3,
  banner4,
  pathRight,
  pathLeft,
  upArrow,
  fatRightArrow,
} from "@/assets";
import { SliderBox } from "react-native-image-slider-box";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  getAllSubCatList,
  getProductsList,
  getFreshDataBystore,
  addToCart,
} from "@/actions";

const images = [banner3, banner4];

export const JikapuFresh = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { data, storeId, parentId } = route.params;
  const [jikapuChildData, setJikapuChildData] = useState(data);
  const [seasonData, setSeasonData] = useState([]);
  const [seeFeatureMore, setFeatureMore] = useState(4);
  const [seeSeasonalMore, setSeasonalMore] = useState(4);
  const [catListProducts, setCatListProducts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getAllList()
  }, []);

  const getAllList = () => {
    getProductsByCat();
    getProductsFeatured();
    setRefreshing(false)
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getAllList();
  }, []);

  const getProductsByCat = () => {
    let modify_data = [];
    for (let i in jikapuChildData) {
      let params = {
        filter: { category: jikapuChildData[i]._id },
        limit: 20,
        page: 1,
        storeId: storeId,
      };
      dispatch(
        getProductsList(navigation, params, (res) => {
          let new_data = Object.assign({}, jikapuChildData[i], {
            productDetails: res.data.docs,
          });
          modify_data.push(new_data);
          setCatListProducts(modify_data);
        })
      );
    }
  };

  const getProductsFeatured = () => {
    let seasonParam = {
      filter: { category: parentId },
      limit: 20,
      page: 1,
    };
    dispatch(
      getProductsList(navigation, seasonParam, (res) => {
        setSeasonData(res.data.docs);
      })
    );
    getProductsByCat();
  };

  const loadFeatureMore = () => {
    setFeatureMore(seeFeatureMore + 10);
  };
  const loadSeasonalMore = () => {
    setSeasonalMore(seeSeasonalMore + 10);
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

  const addItemToCart = (id) => {
    let params = {
      productId: id,
      quantity: 1,
    };
    if (isLoggedIn == true) {
      dispatch(
        addToCart(navigation,params)
      );
    } else {
      Alert.alert("", "Please Login to continue", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate(NAVIGATION.login) },
      ]);
    }
  };

  const navigateToChild = (item) => {
    let categoryId = item?._id;
    navigation.push(NAVIGATION.productCatalog, {
      storeId: storeId,
      subCatId: categoryId,
      title: item?.name,
      // data: item,
      // parentId: item._id
    });
    /* 
    const a = jikapuChildData;
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
    */
    /*
     dispatch(
      getFreshDataBystore(navigation, item._id, (res) => {
        console.log("res jikapu fresh data", res);
        if (res.messageID == 204 && res.message === "No category found!") {
          Alert.alert("Coming soon");
        } else {
          setSubCat2(res.data);
        }
      })
    );
    navigation.push(NAVIGATION.jikapuCategory, {
      data: item,
      parentId: item._id
    })
    */
  };
 

  function renderData(item, index) {
    return (
      <>
        {item?.productDetails?.length > 0 ? (
          <View
            style={{
              flex: 1,
              
              marginTop: hp(2),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 0.67 }}>
                <Text style={typography.title}>{item?.name}</Text>
              </View>
              <TouchableOpacity
                style={{ flex: 0.3, flexDirection: "row" }}
                onPress={() => {
                  navigateToChild(item, index);
                }}
              >
                <Text style={typography.labelLarge}>See all results</Text>
                <Image source={fatRightArrow} style={{ marginLeft: wp(2) }} />
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
              extraData={item?.productDetails.slice(0, 4)}
              data={item?.productDetails.slice(0, 4)}
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
                  isAddToCart={true}
                  isRating={true}
                  starCount={item?.ratings}
                  storeName={item?.storeId?.storeName}
                  price={item?.price}
                  btnStyles={{
                    width: wp(44.5),
                  }}
                  onClickCart={() => addItemToCart(item._id)}
                />
              )}
            />
          </View>
        ) : null}
      </>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Jikapu Fresh"}
        isBackBtn={true}
        isSearchBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <View style={{ backgroundColor: COLORS.APP, flex: 1, paddingBottom: 10 }}>
        <ScrollView refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
          <SliderBox
              autoplay={true}
             circleLoop={true}
            sliderBoxHeight={hp(25)}
            resizeMode="cover"
            dotColor={"#EEB600"}
            inactiveDotColor={"#D8D8D8"}
            images={images}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            currentImageEmitter={(index) =>
              console.warn(`current pos is: ${index}`)
            }
          />
          <View style={{ paddingHorizontal: wp(4) }}>
            {jikapuChildData.length > 0 && (
              <FlatList
                contentContainerStyle={{
                  marginTop: hp(3),
                }}
                data={jikapuChildData}
                extraData={jikapuChildData}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      width: wp(44,5),
                      height: hp(5),
                      borderRadius: spacing.xs,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: COLORS.WHITE,
                      marginRight: wp(2),
                    }}
                    onPress={() => {
                      navigateToChild(item, index);
                      /*
                    item.children
                      ? navigation.push(NAVIGATION.jikapuCategory, {
                        data: item,
                        parentId: item._id
                      })
                      :Alert.alert("ComingSoon");
                    */
                    }}
                  >
                    <Text style={typography.label}>{item?.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            {catListProducts?.length > 0 ? (
              <FlatList
                extraData={catListProducts}
                data={catListProducts}
                keyExtractor={(item, index) => index.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderData(item, index)}
              />
            ) : null}

            {seasonData.length > 0 ? (
              <View
                style={{
                  marginTop: hp(3),
                  padding: wp(2.5),
                  borderRadius: spacing.xs,
                  shadowColor: "#00000014",
                  shadowOpacity: 1,
                  shadowOffset: {
                    width: 2,
                    height: 0,
                  },
                  shadowRadius: 10,
                  backgroundColor: COLORS.WHITE,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 0.8 }}>
                    <Text style={typography.title}>Taste what’s in season</Text>
                  </View>
                  {/*
                   <View style={{ flex: 0.2, flexDirection: "row" }}>
                    <TouchableOpacity>
                      <Image source={pathLeft} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image source={pathRight} style={{ marginLeft: wp(8) }} />
                    </TouchableOpacity>
                  </View> */}
                </View>
                <Image source={taste} style={{ marginTop: hp(1.5) }} />
                <FlatList
                  contentContainerStyle={{
                    marginTop: hp(0.5),
                  }}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  data={seasonData.slice(0, seeSeasonalMore)}
                  extraData={seasonData}
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
                      isAddToCart={true}
                      onClickCart={() => addItemToCart(item._id)}
                      isRating={true}
                      starCount={item?.ratings}
                      storeName={item?.storeId?.storeName}
                      price={item?.price}
                      btnStyles={{ width: wp(42.5), marginVertical: hp(0.5) }}
                    />
                  )}
                />
                {seasonData.length > 4 ? (
                  <TouchableOpacity
                    style={styles.see}
                    onPress={loadSeasonalMore}
                  >
                    <Text style={typography.labelBold}>See more</Text>
                    <Image
                      source={upArrow}
                      style={{ marginLeft: spacing.xs }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}

            {seasonData.length > 0 ? (
              <View
                style={{
                  marginTop: hp(3),
                  padding: wp(2.5),
                  borderRadius: spacing.xs,
                  shadowColor: "#00000014",
                  shadowOpacity: 1,
                  shadowOffset: {
                    width: 2,
                    height: 0,
                  },
                  shadowRadius: 10,
                  backgroundColor: COLORS.WHITE,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 0.8 }}>
                    <Text style={typography.title}>Featured Produce</Text>
                  </View>
                  {/* 
                  <View style={{ flex: 0.2, flexDirection: "row" }}>
                    <TouchableOpacity>
                      <Image source={pathLeft} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image source={pathRight} style={{ marginLeft: wp(8) }} />
                    </TouchableOpacity>
                  </View>
                  */}
                </View>

                <FlatList
                  contentContainerStyle={{
                    marginTop: hp(0.5),
                  }}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  data={seasonData.slice(0, seeFeatureMore)}
                  extraData={seasonData}
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
                      isAddToCart={true}
                      onClickCart={() => addItemToCart(item._id)}
                      isRating={true}
                      starCount={item?.ratings}
                      storeName={item?.storeId?.storeName}
                      price={item?.price}
                      btnStyles={{ width: wp(42.5), marginVertical: hp(0.5) }}
                    />
                  )}
                />
                {seasonData.length > 4 ? (
                  <TouchableOpacity
                    style={styles.see}
                    onPress={loadFeatureMore}
                  >
                    <Text style={typography.labelBold}>See more</Text>
                    <Image
                      source={upArrow}
                      style={{ marginLeft: spacing.xs }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hrBtn: {
    width: wp(45),
    height: hp(5),
    borderRadius: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.WHITE,
    marginRight: wp(2),
  },
  see: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp(2.2),
  },
});
