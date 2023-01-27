//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  RefreshControl,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NAVIGATION } from "@/constants";
import {
  CustomHeader,
  Loader,
  ListView2,
  ListView7,
} from "@/components";
import {
  defaultImage,
  upArrow,
} from "@/assets";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { COLORS } from "@/constants";
import { spacing, typography } from "@/theme";
import {
  getProductsList,
  addToCart,
} from "@/actions";
import { SafeAreaView } from "react-native-safe-area-context";

export const JikapuCategory = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { data, categoryId, parentId, title, subCatId } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const subCategory2Data = data?.children;
  console.log("subCategoryLevel2 data", subCategory2Data);
  const subCategory3Data = subCategory2Data?.children;
  console.log("subCategorylevel3 data", subCategory3Data);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [cat2Data, setCat2Data] = useState(subCategory2Data);
  const [cat3Data, setCat3Data] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
   getAllList()
  }, []);

  const getAllList = () => {
    getChildData()
    getFeatured()
    setRefreshing(false)
  }
  const getFeatured = () => {
    let params = {
      search: "",
      filter: {
        category: categoryId,
      },
      page: 1,
      limit: 10,
    };
    dispatch(
      getProductsList(navigation, params, (res) => {
        setFeaturedData(res.data.docs);
      })
    );
  };
  const getChildData = () => {
    let params = {
      search: "",
      filter: {
        category: parentId,
      },
      page: 1,
      limit: 10,
    };
    dispatch(
      getProductsList(navigation, params, (res) => {
        setFeaturedData(res.data.docs);
      })
    );
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getAllList();
  }, []);

  const selectItem = (item, index) => {
    if (item.children) {
      console.log("children data", item.children);
      const childData = item.children;
      setCat3Data(childData);
      console.log(cat3Data, "cat 3 data");

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
      // Alert.alert("coming soon");
      // navigation.navigate(NAVIGATION.subChildProducts, {
      //   data: item
      // })
    }
  };



  const addItemToCart = (productId) => {
    let params = {
      productId: productId,
      quantity: 1,
    };
    isLoggedIn
      ? dispatch(
        addToCart(navigation,params)
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
      <View
        style={{ backgroundColor: COLORS.APP, padding: wp(4),flex:1 }}
      
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
                      borderRadius: spacing.xs,
                    }}
                    onPress={() => selectItem(item, index)}
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
          {/* End Category level 2 data */}



          {featuredData.length > 0 ? (
            <ScrollView style={{ flex: 1,marginTop: wp(4),  }} showsVerticalScrollIndicator={false}>
              <FlatList
                columnWrapperStyle={{ justifyContent: "space-between" }}
                data={featuredData}
                extraData={featuredData}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                vertical
                numColumns={2}
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
                    title={item?.name}
                    onClickCart={() => {
                      addItemToCart(item._id);
                    }}
                    isAddToCart={true}
                    storeName={item?.storeId?.storeName}
                    price={item?.price}
                    btnStyles={{ width: wp(40.7) }}
                  />
                )}
              />
             
            </ScrollView>
          ) : null}
        </View>


      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgView: {
    flex: 0.3,
  },
  searchView: {
    flex: 0.7,
  },
  categoryView: {
    paddingHorizontal: wp(0)
  },
  categoryText: {
    fontSize: wp(3.9),
    // fontWeight:"bold",
    fontFamily: "ProductSans-Bold",
    color: COLORS.BLACK,
    marginTop: spacing.xs
  },
  listView: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  see: {
    flexDirection: "row",
    marginTop: spacing.m,
    alignItems: "center",
    justifyContent: "center",
  },
  featureView: {
    paddingHorizontal: wp(4)
  }


});