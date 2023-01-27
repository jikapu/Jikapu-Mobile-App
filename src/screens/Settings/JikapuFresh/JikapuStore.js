import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loader, CustomHeader, GuestScreen } from "@/components";
import { COLORS, NAVIGATION } from "@/constants";
import { spacing, typography } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { getStoresList, getFreshDataBystore } from "@/actions";
import { defaultImage } from "@/assets";

export const JikapuStore = ({ route, navigation }) => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const { parentId } = route.params;
  const storeData = useSelector((state) => state.home.storeData);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasLoadMore, setHasMoreLoad] = useState(true);
  console.log("jikapu store data", storeData);
  const dispatch = useDispatch();

  useEffect(() => {
    getStores();
  }, []);

  const getStores = () => {
    let params = {
      page: currentPage,
      limit: 24,
      filter: {},
    };
    dispatch(
      getStoresList(navigation, params, (res) => {
        if (res.data.hasNextPage === false || res.data.nextPage === null) {
          setHasMoreLoad(false);
        }
      })
    );
  };

  const onRefresh = React.useCallback(() => {
    getStores();
  }, []);

  const navigateToFresh = (item) => {
    let shopAlias = item?.alias;
    if (!shopAlias) shopAlias = item._id;
    dispatch(
      getFreshDataBystore(navigation, parentId, (res) => {
        navigation.push(NAVIGATION.jikapuFresh, {
          data: res.data,
          storeId: shopAlias,
          parentId: parentId,
          storeName: item?.storeName,
        });
      })
    );
  };
  /*
     const navigateToFresh = (item) => {
        dispatch(getFreshDataBystore(navigation,item.categoryIds[0], res => {        
                navigation.push(NAVIGATION.jikapuFresh, {
                    data: res.data,
                    storeId: item?.categoryIds[0]
                })
        }))
    }
    */

  const loadMoreData = () => {
    let nextPage = currentPage + 1;
    let params = {
      page: nextPage,
      limit: 24,
      filter: {},
    };
    dispatch(
      getStoresList(navigation, params, (res) => {
        //  setProductsData([...productsData, ...res.data.docs]);
        if (res.data.hasNextPage == false) {
          setHasMoreLoad(false);
        }
      })
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Jikapu Fresh Stores"}
        isBackBtn={true}
        isSearchBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}

      <View style={{ paddingHorizontal: wp(3.8) }}>
        {storeData.length > 0 && (
          <FlatList
            contentContainerStyle={{
              marginTop: hp(2),
            }}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            data={storeData}
            extraData={storeData}
            keyExtractor={(item, index) => index.toString()}
            vertical
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.btnstyle}
                  onPress={() => navigateToFresh(item)}
                >
                  <Image
                    source={
                      item?.profileImage !== null && item?.profileImage !== "" && item?.profileImage
                        ? { uri: item?.profileImage }
                        : defaultImage
                    }
                    resizeMode={"cover"}
                    style={styles.img1}
                    PlaceholderContent={
                      <ActivityIndicator size="large" color="0000ff" />
                    }
                  />
                  <Text
                    style={[
                      typography.label,
                      { marginTop: hp(0.8), alignSelf: "center" },
                    ]}
                    numberOfLines={2}
                  >
                    {item?.storeName}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            onEndReached={hasLoadMore ? loadMoreData : null}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnstyle: {
    width: wp(45),
    alignItems: "center",
    marginTop: hp(1.2),
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#0F96A0",
  },
  img1: {
    width: 135,
    height: 135,
    borderRadius: 100,
  },
});
