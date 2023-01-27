//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
  Alert,
  useWindowDimensions,
  Pressable,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import RenderHtml from "react-native-render-html";
import Modal from "react-native-modal";
import { Rating, AirbnbRating } from "react-native-ratings";
import DropDownPicker from "react-native-dropdown-picker";
import { SliderBox } from "react-native-image-slider-box";
import { useSelector, useDispatch } from "react-redux";
import { NAVIGATION } from "@/constants";
import { styles } from "./ProductDetails.styles";
import FastImage from "react-native-fast-image";
import {
  Button,
  ErrorView,
  SearchButton,
  TableData,
  Loader,
  CustomHeader,
  InputField,
  ListView2,
} from "@/components";
import {
  minus,
  plus,
  npRight,
  defaultImage,
  npWishList,
  closeIcon,
  checkBox,
  checkCircle,
  uncheckCircle,
  pathDown,
  pathUp,
  addWish,
} from "@/assets";
import { heightToDP as hp, widthToDP as wp } from "@/utils/Responsive";
import {
  getProductById,
  addToWish,
  addToCart,
  getSponsoredList,
  getProductsList,
  buyNow,
  getCompareProductsList,
  getProductSpecificationById,
} from "@/actions/home/HomeAction";
import { getAllAddress } from "@/actions/auth/UserActions";
import { spacing, typography } from "@/theme";
import { COLORS } from "@/constants";
import { strings } from "@/localization";
import { storeItem, getItem, removeItem } from "@/utils/AsyncUtils";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const ProductDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllList();
  }, []);
  const isLoading = useSelector((state) => state.common.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { productId } = route.params;
  const [productItemId, setProductItemId] = useState(productId);
  const [productVariantId, setProductVariantId] = useState("");
  const addressListData = useSelector((state) => state.user.addressListData);
  const { productDetailsData = {} } = useSelector((state) => state.home);

  const productSpecificationsData = useSelector(
    (state) => state.home.productSpecificationsData
  );
  const [defaultAddress, setDefaultAddress] = useState(addressListData);
  const firstName = defaultAddress[0]?.firstName
    ? defaultAddress[0].firstName
    : "";
  const city = defaultAddress[0]?.city ? defaultAddress[0].city : "";
  const countryRegion = defaultAddress[0]?.countryRegion
    ? defaultAddress[0].countryRegion
    : "";
  const zip = defaultAddress[0]?.zip ? defaultAddress[0].zip : "";
  const [sponsoredData, setSponseredData] = useState([]);

  const [images, setImages] = useState([defaultImage]);
  const [showDes, setShowDes] = useState(true);
  const [showColorOption, setShowColorOption] = useState(true);
  const [styleOption, setStyleOption] = useState(true);
  const [shipping, setShowShipping] = useState(false);
  const [showWarranty, setShowWarranty] = useState(false);
  const [showFrequent, setShowFrequent] = useState(true);
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ]);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [oneTp, setOneTp] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [subscription, setSubscriptions] = useState(1);
  const [items1, setItems1] = useState([
    { label: "Daily (Most common)", value: 1 },
    { label: "Monthly", value: 2 },
  ]);
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const compareItems = useSelector((state) => state.home.compareItemsData);
  const [compareData, setCompareData] = useState([]);
  const [isBuy, setIsBuy] = useState("isBuy");

  const [colorName, setColorName] = useState("");
  const [price, setPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectSize, setSelectSize] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollViewRef = useRef();

  const getAllList = () => {
    getProductsDetails();
    if (isLoggedIn == true) {
      dispatch(getAllAddress(navigation));
    }
  };

  const getProductsDetails = (id) => {
    dispatch(
      getProductById(navigation, id ? id : productItemId, (res) => {
        setColorName(
          res?.keySpecifications.length > 0
            ? res?.keySpecifications[0]?.color
            : ""
        );
        setPrice(res?.price);
        setSalePrice(res?.salePrice);
        setSizes(
          res?.variants && res?.variants[0]?.otherVarients
            ? res.variants[0].otherVarients
            : []
        );
        setProductVariantId(res?.variants[0]?._id)
        console.log("sizes", sizes);
        const params = {
          filter: {
            category: res.category[0],
          },
          limit: 10,
          order: -1,
          page: 1,
          sort: "rate",
        };
        dispatch(
          getCompareProductsList(navigation, params, (res) => {
            setCompareData(res.data.docs);
          })
        );
        let sParam = {
          search: "",
          filter: {
            category: res.category[0],
            //  sponsored: true,
          },
          page: 1,
          limit: 10,
          order: -1,
          sort: "rate",
        };
        dispatch(
          getSponsoredList(navigation, sParam, (res) => {
            setSponseredData(res.data.docs);
          })
        );
        dispatch(getProductSpecificationById(navigation, res.category[0]));
      })
    );
  };

  const addToWishList = () => {
    if (isLoggedIn == true) {
      dispatch(addToWish(navigation, productItemId));
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

  const getProduct = (id) => {
    setProductItemId(id);
    scollToTop();
    getProductsDetails(id);
    // dispatch(getProductById(navigation, id));
  };

  const addItemToCart = () => {
    let params = {
      additionalDiscount:0,
      productId: productItemId,
      quantity: quantity,
     // size: selectSize,
    //  color: colorName.trim(),
      productVariantId: productVariantId,
    };
    isLoggedIn
      ? dispatch(addToCart(navigation, params))
      : Alert.alert("", "Please Login to continue", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.navigate(NAVIGATION.login) },
        ]);
  };

  const addToCompareCart = (itemId) => {
    let params = {
      productId: itemId,
      quantity: quantity,
    };
    if (isLoggedIn == true) {
      dispatch(addToCart(navigation, params));
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

  const checkOut = () => {
    if (isLoggedIn == true) {
      let params = {
        productId: productItemId,
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

  const addBatchProducts = (id) => {
    console.log("item batach ids", id);

    let params = {
      productId: id,
      quantity: 1,
    };
    const data = [];
    //  dispatch( addToCart(navigation,data)
    // );
  };

  const showVariantImages = (item) => {
    console.log("imgsddsf", item);
    setProductVariantId(item?._id)
    setPrice(
      item.price !== null || item.price !== undefined ? item.price : null
    );
    setSalePrice(
      item.salePrice !== null || item.salePrice !== undefined
        ? item.salePrice
        : ""
    );
    setColorName(item?.specifications[0]?.color);
    setSizes(item?.otherVarients);
    productDetailsData.image.splice(
      0,
      productDetailsData.image.length,
      ...item.image
    );
  };
  const showVariantSizes = (item, index) => {
    console.log("sizess", item);
    setProductVariantId(item?._id)
    let sizeValue = item?.specifications[0]?.size;
    setSelectSize(sizeValue);
    console.log("size value", selectSize);
    const a = sizes;
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
  };
  const onIncreaseValue = () => {
    if (productDetailsData?.stockQty <= quantity) {
      return quantity;
    } else {
      setQuantity(quantity + 1);
    }
  };

  const onDecreaseValue = () => {
    if (quantity <= 1) {
      return quantity;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const scollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllList();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Product Details"}
        isSearchBtn={true}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.push(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.APP,
          padding: spacing.s,
        }}
        ref={scrollViewRef}
        vertical
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            backgroundColor: COLORS.WHITE,
            flex: 1,
            borderRadius: spacing.xs,
            padding: wp(4),
          }}
        >
          {productDetailsData?.name != "" && (
            <Text style={typography.label} numberOfLines={3}>
              {productDetailsData?.name}
            </Text>
          )}
          {productDetailsData?.name != "" && (
            <View style={{ flexDirection: "row" }}>
              <AirbnbRating
                count={5}
                reviews={""}
                defaultRating={productDetailsData?.ratings}
                isDisabled={true}
                size={12}
                starContainerStyle={{ alignSelf: "flex-start" }}
                ratingContainerStyle={{
                  marginLeft: -wp(1.2),
                  marginTop: Platform.OS === "ios" ? -hp(4) : -hp(6.8),
                }}
              />
              {productDetailsData?.brand ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: hp(0.9),
                    marginLeft: wp(4),
                  }}
                >
                  <Text style={{ fontSize: wp(3.3), color: "#0F96A0" }}>
                    Brand
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp(1),
                      fontSize: wp(3.3),
                      color: "#0F96A0",
                    }}
                  >
                    N/A
                  </Text>
                </View>
              ) : null}
            </View>
          )}
          <View
            style={{
              marginTop: hp(1.5),
              flexDirection: "row",
              height: hp(42),
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: wp(60),
                height: hp(42),
                paddingLeft: wp(20),
              }}
            >
              <SliderBox
                //  autoplay={true}
                //  circleLoop={true}
                resizeMethod={"resize"}
                ImageComponentStyle={{
                  width: wp(60),
                  height: hp(40),
                }}
                resizeMode="contain"
                dotColor={"#EEB600"}
                dotStyle={{
                  marginBottom: hp(0),
                  width: 9,
                  height: 9,
                  borderRadius: 50,
                }}
                inactiveDotColor={"#D8D8D8"}
                images={
                  productDetailsData?.image ? productDetailsData?.image : images
                }
                onCurrentImagePressed={(index) =>
                  console.warn(`image ${index} pressed`)
                }
                currentImageEmitter={(index) =>
                  console.warn(`current pos is: ${index}`)
                }
              />
            </View>
            <View style={{ marginLeft: wp(20) }}>
              <Image source={npWishList} style={{ width: 18, height: 24 }} />
            </View>
          </View>
        </View>

        {productDetailsData?.productType === "variable" &&
        productDetailsData?.variants.length > 0 ? (
          <View
            style={{
              marginTop: hp(1),
              backgroundColor: COLORS.WHITE,
              flex: 1,
              padding: wp(5),
              borderRadius: spacing.xs,
            }}
          >
            {showColorOption ? (
              <View style={{ flex: 1 }}>
                <View
                  // onPress={() => setShowColorOption(!showColorOption)}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={typography.label}>Color:</Text>
                  <Text style={[typography.labelBold, { marginLeft: wp(1) }]}>
                    {/* 
                    productDetailsData?.keySpecifications?.length > 0
                      ? productDetailsData?.keySpecifications[0]?.color
                      : ""
                    */}
                    {colorName}
                  </Text>
                  {/*
                 <TouchableOpacity
                onPress={() => setShowColorOption(!showColorOption)}
              >
                <Image
                  source={showColorOption == true ? pathUp : pathDown}
                  //  style={{ width: 12, height: 12 }}
                />
              </TouchableOpacity>
              */}
                </View>
                <FlatList
                  data={productDetailsData?.variants}
                  extraData={productDetailsData?.variants}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => showVariantImages(item)}
                        style={{
                          padding: wp(2),
                          marginHorizontal: wp(1),
                          marginTop: hp(1),
                          width: wp(25),
                          borderColor: "#D8D8D8",
                          alignItems: "center",
                          borderRadius: 5,
                          borderWidth: 1,
                        }}
                      >
                        <Image
                          style={{ width: 70, height: 88 }}
                          resizeMode={"contain"}
                          source={
                            item?.image != null || item?.image.length > 0
                              ? { uri: item?.image[0] }
                              : defaultImage
                          }
                        />
                        {item?.specifications?.map((e) => {
                          return (
                            <Text style={typography.pText}>{e?.color}</Text>
                          );
                        })}
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            ) : null}
            <View>
              <FlatList
                data={sizes}
                extraData={sizes}
                contentContainerStyle={{
                  marginTop: hp(1.5),
                }}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <>
                    {item?.specifications.map((e) => (
                      <>
                        {e.size ? (
                          <TouchableOpacity
                            onPress={() => showVariantSizes(item, index)}
                            style={{
                              backgroundColor:
                                item.status == 1
                                  ? COLORS.WHITE
                                  : COLORS.MAG_RED,
                              width: 50,
                              height: 50,
                              marginHorizontal: wp(2),
                              borderColor:
                                item.status == 0
                                  ? COLORS.WHITE
                                  : COLORS.BORDER_COLOR,
                              borderRadius: 50,
                              borderWidth: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={[
                                typography.labelLarge,
                                {
                                  color:
                                    item.status == 1
                                      ? COLORS.BLACK
                                      : COLORS.WHITE,
                                },
                              ]}
                            >
                              {e.size}
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </>
                    ))}
                  </>
                )}
              />
            </View>
          </View>
        ) : null}

        <View
          style={{
            marginTop: hp(1),
            backgroundColor: COLORS.TEAL_LIGHT,
            flex: 1,
            padding: wp(5),
            borderRadius: spacing.xs,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: wp(27) }}>
              <Text style={{ fontSize: wp(3.9), fontWeight: "800" }}>
                PRICE
              </Text>
            </View>

            {price === salePrice ? (
              <Text
                style={{
                  fontSize: wp(3.9),
                  fontWeight: "800",
                  color: COLORS.PRIMARY,
                }}
              >
                {`${": KES" + " " + salePrice?.toLocaleString()}`}
              </Text>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: wp(3.9),
                    fontWeight: "800",
                    color: COLORS.PRIMARY,
                  }}
                >
                  {salePrice !== null
                    ? `${": KES" + " " + salePrice?.toLocaleString()}`
                    : ""}
                </Text>
                <Text
                  style={{
                    fontSize: wp(3.9),
                    fontWeight: "800",
                    color: COLORS.PRIMARY,
                    textDecorationLine: salePrice ? "line-through" : "none",
                    opacity: salePrice ? 0.4 : 1,
                  }}
                >
                  {price !== null
                    ? `${" KES" + " " + price?.toLocaleString()}`
                    : ""}
                </Text>
              </View>
            )}
          </View>
          {addressListData.length > 0 ? (
            <View style={{ flexDirection: "row", marginTop: hp(1) }}>
              <View style={{ width: wp(27) }}>
                <Text style={{ fontSize: wp(3.9), fontWeight: "800" }}>
                  Deliver To
                </Text>
              </View>
              <View style={{ width: wp(57) }}>
                <Text
                  style={{
                    fontSize: wp(3.9),
                    fontWeight: "800",
                    color: COLORS.PRIMARY,
                  }}
                  numberOfLines={1}
                >
                  : {firstName + " - " + city + " " + zip}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        <View
          style={[
            {
              marginTop: hp(1),
              backgroundColor: COLORS.WHITE,
              flex: 1,
              padding: wp(5),
              borderRadius: spacing.xs,
            },
            Platform.OS === "ios" ? { zIndex: open ? 1 : 0 } : {},
          ]}
        >
          {productDetailsData?.generalSpecifications &&
          productDetailsData.generalSpecifications.length > 0
            ? productDetailsData.generalSpecifications.map((e) => (
                <View>
                  {Object.keys(e).map((key) => (
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                        marginTop: hp(0.5),
                      }}
                    >
                      <View style={{ flex: 0.65 }}>
                        <Text style={typography.labelBold}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Text>
                      </View>
                      {Object.entries(e).map(([key, val]) => (
                        <View style={{ flex: 0.35 }}>
                          <Text style={typography.label} key={key}>
                            {val}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              ))
            : null}

          {productDetailsData?.keySpecifications &&
          productDetailsData?.keySpecifications.length > 0
            ? productDetailsData.keySpecifications.map((e) => (
                <View>
                  {Object.keys(e).map((key) => (
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                        marginTop: hp(0.5),
                      }}
                    >
                      <View style={{ flex: 0.65 }}>
                        <Text style={typography.labelBold}>
                          {key.charAt(0).toUpperCase() + key.slice(1).trim()}
                        </Text>
                      </View>
                      {Object.entries(e).map(([key, val]) => (
                        <View style={{ flex: 0.35 }}>
                          <Text style={typography.label} key={key}>
                            {val.trim()}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              ))
            : null}

          {/* Start Key Specification 
          {
            productDetailsData?.keySpecifications && productDetailsData?.keySpecifications.length > 0 ? (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    marginTop: hp(1),
                  }}
                >
                  <View style={{ flex: 0.65 }}>
                    <Text style={typography.labelBold}>{productDetailsData?.keySpecifications[0].color}</Text>
                  </View>
                  <View style={{ flex: 0.35 }}>
                    <Text style={typography.label}>Redmi 9 </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    marginTop: hp(0.5),
                  }}
                >
                  <View style={{ flex: 0.65 }}>
                    <Text style={typography.labelBold}>Wireless Carrier</Text>
                  </View>
                  <View style={{ flex: 0.35 }}>
                    <Text style={typography.label}>Unlocked</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    marginTop: hp(0.5),
                  }}
                >
                  <View style={{ flex: 0.65 }}>
                    <Text style={typography.labelBold}>Brand</Text>
                  </View>
                  <View style={{ flex: 0.35 }}>
                    <Text style={typography.label}>Redmi</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    marginTop: hp(0.5),
                  }}
                >
                  <View style={{ flex: 0.65 }}>
                    <Text style={typography.labelBold}>Form factor</Text>
                  </View>
                  <View style={{ flex: 0.35 }}>
                    <Text style={typography.label}>Smartphone</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    marginTop: hp(0.5),
                  }}
                >
                  <View style={{ flex: 0.65 }}>
                    <Text style={typography.labelBold}>Memory Storage Capacity</Text>
                  </View>
                  <View style={{ flex: 0.35 }}>
                    <Text style={typography.label}> 64 GB</Text>
                  </View>
                </View>
              </View>
            ) : null
          }

 <Text style={{ color: COLORS.PRIMARY, marginTop: hp(1) }}>
            {productDetailsData?.stockQty}
          </Text>
          End Key Specification */}

          {productDetailsData?.stockQty > 0 ? (
            <Text
              style={{
                color: "#A70000",
                marginVertical: hp(1),
                fontSize: wp(3.7),
                fontWeight: "bold",
              }}
            >
              {`${productDetailsData?.stockQty}`} left in stock{" "}
            </Text>
          ) : (
            <Text
              style={{
                color: "#A70000",
                marginVertical: hp(1),
                fontSize: wp(3.7),
                fontWeight: "bold",
              }}
            >
              Out of stock
            </Text>
          )}
          {productDetailsData?.storeDetail ? (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: wp(3.7), color: COLORS.ARROW }}>
                Sold by
              </Text>
              <Text style={{ fontSize: wp(3.7), color: COLORS.GREEN_BTN }}>
                {""} {productDetailsData?.storeDetail?.storeName}
              </Text>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(2),
              zIndex: Platform.OS === "ios" ? 100 : null,
            }}
          >
            <Text style={{ fontSize: wp(3.7), color: COLORS.ARROW }}>
              Quantity
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: wp(5),

                justifyContent: "space-between",
                marginTop: hp(0.5),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onDecreaseValue();
                }}
                style={{
                  width: 25,
                  height: 25,
                  alignItems: "center",
                  paddingTop: 5.5,
                  //   justifyContent: "center",
                  backgroundColor: COLORS.BG_LIGHT,
                }}
              >
                <Image source={minus} style={{ width: 12, height: 9 }} />
              </TouchableOpacity>
              <Text style={{ paddingHorizontal: wp(2) }}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  onIncreaseValue();
                }}
                style={{
                  width: 25,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.BG_LIGHT,
                }}
              >
                <Image source={plus} style={{ width: 12, height: 12 }} />
              </TouchableOpacity>
            </View>
            {/* 
            <DropDownPicker
              open={open}
              listMode="SCROLLVIEW"
              value={quantity}
              items={items}
              setOpen={setOpen}
              setValue={setQuantity}
              setItems={setItems}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              containerStyle={{
                width: wp(20),
                height: hp(5),
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row",
                marginLeft: wp(4),
              }}
              style={{
                backgroundColor: "#F8FFFF",
                borderColor: "#C1C1C1",
                borderWidth: 1,
              }}
              zIndexInverse={7000}
              zIndex={1000}
            />
            */}
          </View>
          {productDetailsData?.stockQty > 0 ? (
            <View>
              <Button
                title={"ADD TO CART"}
                handlePress={addItemToCart}
                style={{ marginVertical: hp(2.5) }}
              />
              <Button
                title={"Buy Now"}
                handlePress={checkOut}
                style={{ backgroundColor: COLORS.GREEN_BTN }}
              />
            </View>
          ) : (
            <View>
              <Button
                title={"ADD TO CART"}
                disable={true}
                handlePress={addItemToCart}
                style={{ marginVertical: hp(2.5), opacity: 0.3 }}
              />
              <Button
                title={"Buy Now"}
                disable={true}
                handlePress={checkOut}
                style={{ backgroundColor: COLORS.GREEN_BTN, opacity: 0.3 }}
              />
            </View>
          )}

          <View style={{ marginTop: hp(5) }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={addToWishList}
            >
              <Image source={addWish} style={{ width: 22, height: 22 }} />
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  paddingLeft: spacing.xs,
                }}
              >
                ADD TO WISHLIST
              </Text>
            </TouchableOpacity>
          </View>
          {/* 
          
           <View style={{ marginTop: hp(2) }}>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Image source={addCart} style={{ width: 22, height: 22 }} />
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  paddingLeft: spacing.xs,
                }}
              >
                ADD TO REGISTRY
              </Text>
            </TouchableOpacity>
          </View>*/}

          {/*
           <View style={{ flexDirection: "row", marginTop: hp(3) }}>
            <Image source={truck} style={{ width: 30, height: 20 }} />
            <Text style={[typography.label, { marginLeft: wp(1) }]} >Delivery</Text>
          </View>
          <Text style={[typography.labelBold, { color: COLORS.GREEN_BTN }]}>Sunday, Oct 3 (3 days)</Text>

          <View style={{ marginTop: hp(2) }}>
            <Text style={typography.label}>Order within </Text>
            <Text style={[typography.labelBold, { color: "#A70000" }]}>2 hrs and 43 mins</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: hp(2) }}>

            <TouchableOpacity onPress={() => setFastDelivery(!fastDelivery)} >
              <Image source={fastDelivery == true ? checkBox : checkBoxEmpty} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>


            <View style={{ flexDirection: "column", marginLeft: wp(4), }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={fastTruck} style={{ width: 40, height: 20 }} />
                <Text style={[typography.label, { marginLeft: wp(1) }]}  >Fast Delivery </Text>
              </View>
              <Text style={[typography.labelBold, { color: COLORS.GREEN_BTN }]}>Same Day Delivery</Text>
            </View>
          </View>
          */}

          <TouchableOpacity
            onPress={() => setOneTp(!oneTp)}
            style={{ flexDirection: "row", marginTop: hp(1.5) }}
          >
            <Image
              source={oneTp == true ? checkCircle : uncheckCircle}
              style={{ width: 20, height: 20 }}
            />
            <Text style={[typography.labelBold, { marginLeft: wp(3.5) }]}>
              One-time purchase
            </Text>
          </TouchableOpacity>
          {/*
          <Text
            style={[
              typography.labelBold,
              { marginVertical: hp(1.5), fontSize: wp(4.5) },
            ]}
          >
            $512 USD
          </Text>
          */}

          {productDetailsData?.isSubscription >= 1 ? (
            <View
              style={{
                color: "#F4F4F4",
                borderColor: "#D8D8D8",
                borderWidth: 1,
                flex: 1,
                borderRadius: spacing.xs,
                padding: spacing.s,
                marginTop: hp(1.5),
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={checkCircle} style={{ width: 20, height: 20 }} />
                <Text style={[typography.label, { marginLeft: wp(3) }]}>
                  Subscription
                </Text>
              </View>
              <Text style={[typography.label, { marginTop: hp(1.5) }]}>
                Deliver every:
              </Text>
              <DropDownPicker
                open={open1}
                listMode="SCROLLVIEW"
                value={subscription}
                items={items1}
                setOpen={setOpen1}
                setValue={setSubscriptions}
                setItems={setItems1}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                containerStyle={{
                  width: wp(60),
                  height: hp(5),
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  marginTop: hp(1.5),
                }}
                style={{
                  backgroundColor: "#F8FFFF",
                  borderColor: "#C1C1C1",
                  borderWidth: 1,
                }}
                dropDownDirection="TOP"
              />
              {/*
              <Text
                style={[
                  typography.labelBold,
                  { marginTop: hp(2), fontSize: wp(4.5) },
                ]}
              >
                KES 312 USD
              </Text>
              */}
            </View>
          ) : null}

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={[
                typography.label,
                { marginTop: hp(3.5), textDecorationLine: "underline" },
              ]}
            >
              Return Policy
            </Text>
          </TouchableOpacity>
        </View>
        {modalVisible == true ? (
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              backdropOpacity={0.5}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <ScrollView
                  style={styles.modalView}
                  showsVerticalScrollIndicator={true}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={typography.labelBold}>
                      About Return Policy
                    </Text>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <Image
                        source={closeIcon}
                        style={{ width: 30, height: 30 }}
                      />
                    </Pressable>
                  </View>
                  <Text style={[typography.text, { marginTop: hp(2) }]}>
                    {strings.RETURN_POLICY1}
                  </Text>
                  <TableData />
                </ScrollView>
              </View>
            </Modal>
          </View>
        ) : null}

        {productDetailsData?.description != null ? (
          <View
            style={{
              marginTop: hp(1),
              backgroundColor: COLORS.WHITE,
              flex: 1,
              padding: wp(5),

              borderRadius: spacing.xs,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowDes(!showDes)}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.aboutText}>About this item</Text>
              <TouchableOpacity onPress={() => setShowDes(!showDes)}>
                <Image source={showDes == true ? pathUp : pathDown} />
              </TouchableOpacity>
            </TouchableOpacity>
            {showDes == true ? (
              <View style={{ marginTop: hp(1) }}>
                <RenderHtml
                  contentWidth={width}
                  source={{ html: `${productDetailsData?.description}` }}
                />
              </View>
            ) : null}
          </View>
        ) : null}
        {/*
        {productDetailsData?.description != null ? (
          <View
            style={{
              marginTop: hp(1),
              backgroundColor: COLORS.WHITE,
              flex: 1,
              padding: wp(5),
              borderRadius: spacing.xs,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowShipping(!shipping)}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.aboutText}>Shipping & Delivery</Text>
              <TouchableOpacity onPress={() => setShowShipping(!shipping)}>
                <Image source={shipping == true ? pathUp : pathDown} />
              </TouchableOpacity>
            </TouchableOpacity>
            {shipping == true ? (
              <Text style={styles.inlineText}>
                {productDetailsData?.shippingPolicy.replace(/(<([^>]+)>)/g, "")}
              </Text>
            ) : null}
          </View>
        ) : null}
        */}

        {/* 
         {productDetailsData?.description != null ? (
          <View
            style={{
              marginTop: hp(1),
              backgroundColor: COLORS.WHITE,
              flex: 1,
              padding: wp(5),
              borderRadius: spacing.xs,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowWarranty(!showWarranty)}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.aboutText}>Warranty</Text>
              <TouchableOpacity onPress={() => setShowWarranty(!showWarranty)}>
                <Image source={showWarranty == true ? pathUp : pathDown} />
              </TouchableOpacity>
            </TouchableOpacity>
            {showWarranty == true ? (
              <Text
                style={{
                  fontSize: wp(3.7),
                  marginTop: hp(1),
                  fontWeight: "normal",
                }}
              >
                {productDetailsData?.warranty}
              </Text>
            ) : null}
          </View>
        ) : null}
         */}

        {/* 
        
         {productDetailsData?.addTogether &&
        productDetailsData?.addTogether.length > 0 ? (
          <View
            style={{
              marginTop: hp(1),
              backgroundColor: COLORS.WHITE,
              flex: 1,
              padding: wp(5),
              borderRadius: spacing.xs,
            }}
          >
            <Text
              style={{
                fontSize: wp(4.3),
                color: COLORS.BLACK,
                fontWeight: "bold",
              }}
            >
              Frequently bought together
            </Text>
           
            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: hp(1.3),
                }}
                onPress={() => selectItem()}
              >
                <View style={{ flex: 0.15 }}>
                  <Image source={checkBox} style={{ width: 24, height: 24 }} />
                </View>
                <View style={{ flex: 0.3 }}>
                  <Image
                    style={{ width: 73, height: 100 }}
                    source={productDetailsData?.image}
                  />
                </View>
                <View style={{ flex: 0.5 }}>
                  {productDetailsData?.name != "" && (
                    <Text style={{ fontSize: wp(3.9) }} numberOfLines={3}>
                      {productDetailsData?.name}
                    </Text>
                  )}
                  <Text
                    style={[
                      typography.labelLargeBold,
                      { color: COLORS.GREEN_BTN, marginTop: hp(0.5) },
                    ]}
                  >
                    {" "}
                    {productDetailsData?.salePrice
                      ? `KES${productDetailsData?.salePrice}`
                      : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                data={productDetailsData.addTogether}
                extraData={productDetailsData.addTogether}
                keyExtractor={(item, index) => index.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: hp(1.3),
                      }}
                      onPress={() => selectItem()}
                    >
                      <View style={{ flex: 0.15 }}>
                        <Image
                          source={checkBox}
                          style={{ width: 24, height: 24 }}
                        />
                      </View>
                      <View style={{ flex: 0.3 }}>
                        <Image
                          style={{ width: 73, height: 100 }}
                          source={item?.skuProductId?.image}
                        />
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={typography.label} numberOfLines={3}>
                          {item?.skuProductId?.name}
                        </Text>
                        <Text
                          style={[
                            typography.labelLargeBold,
                            { color: COLORS.GREEN_BTN, marginTop: hp(0.5) },
                          ]}
                        >
                          {`KES${item?.skuProductId?.price}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <View style={styles.hrLine} />
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginTop: hp(1),
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 0.21 }}>
                  <Text style={typography.p}>Total price</Text>
                </View>

                <View style={{ flex: 0.35 }}>
                  <Text
                    style={[typography.textBold, { color: COLORS.GREEN_BTN }]}
                  >
                    : KES {productDetailsData?.addTogether?.subTotal}
                  </Text>
                </View>

                <View style={{ flex: 0.44 }}>
                  <Button
                    title={"ADD TO CART"}
                    handlePress={() =>
                      addBatchProducts(productDetailsData?._id)
                    }
                  />
                </View>
              </View>
            </SafeAreaView>
          </View>
        ) : null}

        */}

        {/*
               <TouchableOpacity
               onPress={() => setShowFrequent(!showFrequent)}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
               <TouchableOpacity >
                <Image
                  source={showFrequent == true ? pathUp : pathDown}
                  style={{ width: 12, height: 12 }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
              */}

        {sponsoredData.length > 0 && (
          <View style={styles.categoryView}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.categoryText}>Sponsored Products</Text>
              <TouchableOpacity
                style={{ alignSelf: "flex-end", flex: 0.1 }}
                onPress={() =>
                  navigation.push(NAVIGATION.productCatalog, {
                    subCatId: sponsoredData._id,
                    title: "Explore More",
                  })
                }
              >
                <Image source={npRight} style={{ alignSelf: "flex-end" }} />
              </TouchableOpacity>
            </View>

            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={sponsoredData.slice(0, 2)}
              extraData={sponsoredData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView2
                  btnStyles={{ width: wp(40) }}
                  key={index}
                  onClickProduct={() => {
                    getProduct(item._id);
                    //  dispatch(getProductById(item._id));
                  }}
                  imgSrc={
                    item.image !== null && item.image.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  title={item?.name}
                  isRating={true}
                  starCount={item?.ratings}
                  isAddToCart={false}
                  storeName={item?.storeId?.storeName}
                  price={item?.price}
                />
              )}
            />
          </View>
        )}
        {/* start compare item */}
        {compareData.length > 0 && (
          <View
            style={[styles.categoryView, { backgroundColor: COLORS.WHITE }]}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.categoryText}>
                Compare with similar items
              </Text>
              {/*
               <TouchableOpacity style={{ alignSelf: "flex-end", flex: 0.1 }}>
                <Image source={npRight} style={{ alignSelf: "flex-end" }} />
              </TouchableOpacity>
              */}
            </View>
            <View style={{ flex: 1, paddingTop: hp(2.5) }}>
              <FlatList
                columnWrapperStyle={{ justifyContent: "space-between" }}
                numColumns={3}
                data={compareData.slice(0, 3)}
                extraData={compareData}
                keyExtractor={(item, index) => index.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => getProduct(item._id)}
                    style={{
                      //flex: 1,
                      flexDirection: "column",
                      backgroundColor: COLORS.WHITE,
                      width: wp(26.5),
                      borderRadius: spacing.xs,
                      shadowColor: "#00000014",
                      shadowOpacity: 0.5,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      shadowRadius: 5,
                    }}
                  >
                    {/* 
                     <Image
                      source={
                        item?.image !== null && item?.image?.length > 0
                          ? { uri: item?.image[0] }
                          : defaultImage
                      }
                      resizeMode={"contain"}
                      style={{ width: "100%", height: hp(14) }}
                      PlaceholderContent={
                        <ActivityIndicator size="small" color="0000ff" />
                      }
                    />
                    */}

                    <FastImage
                      style={{ width: "100%", height: hp(14) }}
                      source={
                        item?.image !== null && item?.image?.length > 0
                          ? { uri: item?.image[0] }
                          : defaultImage
                      }
                      resizeMode={FastImage.resizeMode.contain}
                      PlaceholderContent={
                        <ActivityIndicator size="small" color="0000ff" />
                      }
                    />

                    <View
                      style={{
                        backgroundColor: "#EEB60014",
                        marginBottom: hp(1),
                        flexDirection: "row",
                        padding: wp(2),
                      }}
                    >
                      <View style={{ flex: 0.9 }}>
                        <Text style={styles.title} numberOfLines={2}>
                          {item?.name}
                        </Text>

                        <Text style={styles.priceText} numberOfLines={2}>
                          {`${"KES" + " " + item?.price.toLocaleString()}`}
                        </Text>
                        <View
                          style={{
                            marginTop:
                              Platform.OS == "android" ? -hp(7) : -hp(4),
                          }}
                        >
                          <AirbnbRating
                            count={5}
                            reviews={""}
                            defaultRating={item?.ratings}
                            size={8}
                            starContainerStyle={{ alignSelf: "flex-start" }}
                            ratingContainerStyle={{
                              marginLeft: -wp(1),
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            addToCompareCart(item._id);
                          }}
                          style={{
                            width: wp(24),
                            height: hp(4),
                            borderRadius: 5,
                            marginTop: hp(1),
                            backgroundColor: COLORS.YELLOW,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={styles.cartText}>ADD TO CART</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>

            {productSpecificationsData.length > 0 && (
              <View style={{ flex: 1 }}>
                <FlatList
                  data={productSpecificationsData}
                  extraData={productSpecificationsData}
                  keyExtractor={(item, index) => index.toString()}
                  vertical
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View style={{ flex: 1, marginTop: hp(2) }}>
                      <Text style={{ fontSize: wp(3), fontWeight: "bold" }}>
                        {item?.specificationName.charAt(0).toUpperCase() +
                          item?.specificationName.slice(1)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          borderRadius: spacing.xs,
                          backgroundColor: COLORS.WHITE,
                          shadowColor: "#00000014",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.6,
                          shadowRadius: 6,
                          elevation: 15,
                          marginTop:
                            Platform.OS === "android" ? hp(0.5) : hp(1.5),
                        }}
                      >
                        <FlatList
                          data={item.values}
                          horizontal
                          keyExtractor={(item, index) => index.toString()}
                          showsHorizontalScrollIndicator={false}
                          renderItem={({ item, index }) => (
                            <View
                              style={{
                                width: wp(27.1),
                                padding: spacing.xs,
                                borderRightWidth: 1,
                                borderColor: "#D0D0D0",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text>{item}</Text>
                            </View>
                          )}
                        />
                      </View>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        )}
        {/* End compare item */}

        {/* start products  Specidationns data */}

        {/* End specification data */}

        {sponsoredData.length > 0 && (
          <View style={styles.categoryView}>
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Text style={styles.categoryText}>Related Products</Text>
              <TouchableOpacity
                style={{ alignSelf: "flex-end", flex: 0.1 }}
                onPress={() =>
                  navigation.push(NAVIGATION.productCatalog, {
                    subCatId: sponsoredData._id,
                    title: "Related Products",
                  })
                }
              >
                <Image source={npRight} style={{ alignSelf: "flex-end" }} />
              </TouchableOpacity>
            </View>

            <FlatList
              contentContainerStyle={{
                marginTop: hp(0.5),
              }}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={sponsoredData.slice(0, 2)}
              extraData={sponsoredData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView2
                  btnStyles={{ width: wp(40) }}
                  key={index}
                  onClickProduct={() => {
                    getProduct(item._id);
                    //  dispatch(getProductById(item._id));
                  }}
                  imgSrc={
                    item.image !== null && item.image.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage
                  }
                  title={item?.name}
                  isRating={true}
                  starCount={item?.ratings}
                  isAddToCart={false}
                  storeName={item?.storeId?.storeName}
                  price={item?.price}
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
