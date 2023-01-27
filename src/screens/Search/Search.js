//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Platform ,
  StatusBar,
  Modal,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "@/screens/Search/Search.styles";
import { IMAGE_BASE_URL } from "../../constants/apiUrls";
import { NAVIGATION } from "@/constants";
import {
  SearchButton,
  GlobalSearch,
  Loader,JikapuStatusBar,
  ListView6,
  CustomFilterModal,
} from "@/components";
import { npBack, defaultImage, downArrow, shoes } from "@/assets";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { getSearchData } from "@/actions/home/HomeAction";
import { COLORS } from "@/constants";
import { spacing } from "@/theme";

export const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [totalData, setTotalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isLoading = useSelector((state) => state.common.isLoading);
 
  console.log("totla", totalData);
  const handleClick = async (screen, id, name, parentId) => {
    console.log("search parent idd", id);

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
         Alert.alert("Coming soon");
        }
        break;
      case "ProductCatalog":
        navigation.push(NAVIGATION.productCatalog, {
          subCatId: id,
          title: name,
          parentId: parentId,
        });
        break;
      case "ProductDetails":
        if (id) {
          navigation.push(NAVIGATION.productDetails, {
            productId: id,
            title: name,
          });
        } else {
          Alert.alert("Coming Soon");
        }
        break;
      default:
        console.log("value", value);
        break;
    }
  };

  const searchkeyword = (text) => {
    Keyboard.dismiss();
    let params = {
      search: searchText,
      page: 1,
      limit: 50,
      range: {unitName: "price", max: 10000000, min: 0}, 
    };
    if (searchText.length > 0) {
      dispatch(
        getSearchData(navigation,params, (res) => {
          setTotalData(res.data.docs);
        })
      );
    }
  };

  const lowToHigh = () => {
    let params = {
      search: searchText,
      sortByName:"4",
      order:1,
      page: 1,
      limit: 50,
      range:{
        unitName:"price",
        max:1000000,
        min:0
      }
    };
    setShowModal(false)
    dispatch(
      getSearchData(navigation,params, (res) => {
        setTotalData(res.data.docs);
      })
    );
  }
  const highToLow = () => {
    setShowModal(false)
    let params = {
      search: searchText,
      range: {unitName: "price", max: 10000000, min: 0}, 
      sortByName:"5",
      order:-1,
      page: 1,
      limit: 50,
    };
    dispatch(
      getSearchData(navigation,params, (res) => {
        setTotalData(res.data.docs);
      })
    );
  }

  const customerReview = () => {
    setShowModal(false)
    let params = {
      search: searchText,
      range: {unitName: "price", max: 10000000, min: 0}, 
    //  sort:"ratings",
     sortByName:"2",
      page: 1,
      limit: 50,
    };
    dispatch(
      getSearchData(navigation,params, (res) => {
        setTotalData(res.data.docs);
      })
    );
  }
  const newToOld = () => {
    setShowModal(false)
    let params = {
      search: searchText,
      range: {unitName: "price", max: 10000000, min: 0}, 
      sortByName:"1",
      order:-1,
      page: 1,
      limit: 50,
    };
    dispatch(
      getSearchData(navigation,params, (res) => {
        setTotalData(res.data.docs);
      })
    );
  }
  const oldToNew = () => {
    setShowModal(false)
    let params = {
      search: searchText,
      range: {unitName: "price", max: 10000000, min: 0}, 
      sortByName:"3",
      order:-1,
      page: 1,
      limit: 50,
    };
    dispatch(
      getSearchData(navigation,params, (res) => {
        setTotalData(res.data.docs);
      })
    );
  }

  const onChangeText = (text) => {
    setSearchText(text)
    let params = {
      search: searchText,
      page: 1,
      limit: 10,
    };
    if (searchText.length > 1) {
      dispatch(
        getSearchData(navigation,params, (res) => {
          setTotalData(res.data.docs);
        })
      );
    }
  }

  return (
    <View
      style={{
        // backgroundColor: showModal == true ? "red" : COLORS.WHITE,
        opacity: showModal == true ? 0.4 : 1,
        flex: 1,
      }}
    >
      {<Loader isLoading={isLoading} />}
      {Platform.OS == 'ios' ?   <View /> : <JikapuStatusBar/> }
    
      <View style={styles.headerBottom}>
        <View style={styles.imgView}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Image source={npBack} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchView}>
          <GlobalSearch
            editable={true}
            value={searchText}
            setCode={(text) => onChangeText(text)}
            handlePress={searchkeyword}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ backgroundColor: COLORS.APP }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoryView}>
          {totalData.length > 0 ? (
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                paddingHorizontal: wp(4),
                borderRadius: spacing.xs,
              }}
            >
              <View>
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: hp(2),
                  }}
                >
                  <Text style={{ fontSize: wp(3.7) }}>Filter</Text>
                  <Image
                    source={downArrow}
                    style={{ width: 8, height: 8, marginLeft: wp(2) }}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                contentContainerStyle={{
                  marginTop: wp(2),
                }}
                data={totalData}
                keyExtractor={(item, index) => index.toString()}
                vertical
                showsVerticalScrollIndicator={true}
                renderItem={({ item, index }) => (
                  <ListView6
                    key={index}
                    onClickProduct={() => {
                      handleClick("ProductDetails", item._id, item.name);
                    }}
                    imgSrc={ item.image !== null && item.image.length > 0
                      ? { uri: item.image[0] }
                      : defaultImage }
                    title={item?.name}
                    starCount={item?.ratings}
                    isAddTocart={false}
                    storeName={item?.storeId?.storeName}
                    price={item?.price}
                    //itemColor={item.generalSpecifications?.color}
                    productColors={[item?.keySpecifications[0]?.color]}
                  />
                )}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
      {showModal == true ? (
        <CustomFilterModal
          modalVisible={showModal}
          closeModal={() => setShowModal(false)}
          onPressLow={ () => lowToHigh()}
          onPressHigh={ () => highToLow()}
          onPressReview={() => customerReview()}
          newest={() => newToOld()}
          oldest={() => oldToNew()}
        />
      ) : null}
    </View>
  );
};
