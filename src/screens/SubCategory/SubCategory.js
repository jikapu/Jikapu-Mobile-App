//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Config } from "react-native-config";
import { useSelector, useDispatch } from "react-redux";
import { strings } from "@/localization";
import { getUser } from "@/selectors/UserSelectors";
import { styles } from "@/screens/SubCategory/SubCategory.styles";
import { IMAGE_BASE_URL } from "../../constants/apiUrls";
import { NAVIGATION } from "@/constants";
import {
  Button,
  ErrorView,
  SearchButton,
  CustomHeader,
  Loader,
  InputField,
  ListView1,
} from "@/components";
import {
  jikapu,
  banner1,
  back,
  fashion,
  banner2,
  searchIcon,
  npNext,
  next,
} from "@/assets";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { getAllSubCatList } from "../../actions/home/HomeAction";
import { COLORS } from "@/constants";

const images = [banner1, banner2];

export const SubCategory = ({ route, navigation }) => {
  const { parentId, title } = route.params;
  const dispatch = useDispatch();
  const [subCatData, setSubCatData] = useState([]);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getSubcat();
  }, []);

  const getSubcat = () => {
    if (parentId != null && parentId !== "") {
      dispatch(
        getAllSubCatList(parentId, (res) => {
          setSubCatData(res.data);
        })
      );
    }
    setRefreshing(false);
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
      default:
        console.log("value", value);
        break;
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getSubcat();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={title}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
        isSearchBtn={true}
      />
      {<Loader isLoading={isLoading} />}
      <ScrollView
        contentContainerStyle={{ backgroundColor: COLORS.APP }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {subCatData.length > 0 ? (
          <View style={styles.categoryView}>
            <FlatList
              contentContainerStyle={{
                flexDirection: "column",
                marginTop: hp(2),
              }}
              data={subCatData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListView1
                  key={index}
                  onClick={() => {
                    handleClick(
                      "ProductCatalog",
                      item._id,
                      item.name,
                      item.parentId
                    );
                  }}
                  imgSrc={
                    item.mainImage !== null && item.mainImage.length > 0
                      ? { uri: item.mainImage[0] }
                      : defaultImage
                  }
                  catText={item.name}
                />
              )}
            />
          </View>
        ) : isLoading === false ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>No Data found</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};
