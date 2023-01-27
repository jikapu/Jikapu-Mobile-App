import React, { useEffect, useState } from "react";
import {
  Text,
  Alert,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  SectionList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { JikapuStatusBar, ListView4, Loader } from "@/components";
import { Image as Image1 } from "react-native-elements";
import { jikapu, defaultImage, searchIcon1, npRight } from "@/assets";
import { strings } from "@/localization";
import { styles } from "@/screens/Settings/Settings.styles";
import { NAVIGATION } from "@/constants";
import { COLORS } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import {
  getAllCatList,
  getWishItems,
  getStoresList,
  getRootCatList,
} from "../../actions/home/HomeAction";
import { spacing } from "@/theme";
const data = [
  {
    id: 1,
    name: strings.settings.changePwd,
  },
  {
    id: 2,
    name: strings.LOGOUT,
  },
];

export const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { treeCatData = [] } = useSelector((state) => state.home);
  const [data, setData] = useState([]);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [showDiv, setShowDiv] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = () => {
    dispatch(
      getRootCatList((res) => {
        setData(res.data);
      })
    );
    setRefreshing(false);
    //  dispatch(getStoresList(navigation));
  };

  const handleClick = (item, index) => {
    console.log("hashsah", index, item);
    if (item.children) {
      if (item._id === "61ee5b5ded011c26a8fa2eda") {
        navigation.navigate(NAVIGATION.jikapuStore, {
          data: item,
          parentId: item._id,
        });
      } else {
        //  let treeCatDataNew = treeCatData.map((el) => ({ ...el, row: 0 }));
        for (var i = 0; i < treeCatData.length; i++) {
          treeCatData[i].status = 1;
          if (
            index == 0 ||
            index == 3 ||
            index == 6 ||
            index == 9 ||
            index == 12 ||
            index == 15 ||
            index == 18 ||
            index == 21 ||
            index == 24
          ) {
            console.log("index", index);
            // left
            // left index =0, 3,6,9,12 .
            // position will either be zero or number will be divisible by 3
            treeCatData[i].direction = "left";
          } else if (
            index == 1 ||
            index == 4 ||
            index == 7 ||
            index == 10 ||
            index == 13 ||
            index == 16 ||
            index == 19 ||
            index == 22 ||
            index == 25
          ) {
            treeCatData[i].direction = "center";
            // center : 1,4,7,10

            // add logic for any one of above
            // treeCatData[i].direction = 'center';
          } else {
            //right: 2,5,8,11
            treeCatData[i].direction = "right";
            //right or center
            // add remaining direction here
          }
          console.log("treeCatData[i].direction", treeCatData[i].direction);
        }

        let targetItem = treeCatData[index];
        if (targetItem.status == 1) {
          targetItem.status = 0;
        } else {
          targetItem.status = 1;
        }
        treeCatData[index] = targetItem;
        setData([...treeCatData]);
      }
    } else {
      Alert.alert("coming soon");
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllList();
  }, []);

  /*
  // Invalid Hook call
   const renderSubListView = (item, index) => { 
    return (
      
    );
  };
  */

  return (
    <View style={styles.container}>
      {Platform.OS == "ios" ? (
        <View style={styles.headerTop} />
      ) : (
        <JikapuStatusBar />
      )}
      {<Loader isLoading={isLoading} />}
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

      <View
        style={{
          flexDirection: "row",
          height: hp(6),
          alignItems: "center",
          paddingHorizontal: hp(2),
          backgroundColor: COLORS.WHITE,
        }}
      >
        <Text style={{ fontSize: wp(3.9), fontWeight: "bold" }}>Category</Text>
      </View>
      {treeCatData.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.listView}
          data={treeCatData}
          extraData={treeCatData}
          keyExtractor={(item, index) => index.toString()}
          vertical
          numColumns={3}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                style={styles.btnstyle}
                onPress={() => handleClick(item, index)}
              >
                <Image1
                  source={
                    item.mainImage !== null && item.mainImage.length > 0
                      ? { uri: item.mainImage[0] }
                      : defaultImage
                  }
                  style={item.status == 0 ? styles.img : styles.img1}
                  PlaceholderContent={
                    <ActivityIndicator size="large" color="0000ff" />
                  }
                />
                <Text style={styles.textStyle} numberOfLines={2}>
                  {item.name}
                </Text>

                <View>
                  {item.status == 0 ? (
                    <View
                      style={[
                        styles.subCategoryView,
                        // use direction value checks here
                        // give margin to left item from left to move view in center
                        // right item => marginRight to move it in center
                        // center item: doesn't need
                        item.direction == "left"
                          ? styles.subCategoryViewLeftItemMargin
                          : item.direction == "center"
                          ? styles.subCategoryViewCentreItemMargin
                          : styles.subCategoryViewRightItemMargin,
                      ]}
                    >
                      <FlatList
                        data={item.children}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <ListView4
                            key={index}
                            onClick={() => {
                              item.children
                                ? navigation.push(NAVIGATION.subCategories, {
                                    data: item,
                                    parentId:item._id
                                  })
                                : navigation.push(NAVIGATION.subChildProducts, {
                                    data: item,
                                    parentId:item._id
                                  });
                            }}
                            imgSrc={
                              item.mainImage !== null &&
                              item.mainImage.length > 0
                                ? { uri: item.mainImage[0] }
                                : defaultImage
                            }
                            catText={item.name}
                          />
                        )}
                      />
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : null}
    </View>
  );
};
