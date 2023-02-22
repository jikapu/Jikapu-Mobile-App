import React, { useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { defaultImg, userImg, npRight, jikapu, searchIcon1 } from "@/assets";
import {
  Button1,
  Loader,
  JikapuStatusBar,
  InputField,
  GuestScreen,
} from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Profile.styles";
import { typography, spacing } from "@/theme";
import {
  updateUserData,
  getUserDetails,
  uploadPic,
  getAllCoupons,
  getActiveCoupons,
  getExpiredCoupons,
  getRedeemedCoupons,
} from "@/actions/auth/UserActions";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { logOut } from "@/actions/auth/UserActions";

const data = [
  {
    id: 1,
    name: strings.profile.my_acct,
  },
  {
    id: 2,
    name: strings.profile.yOrder,
  },
  {
    id: 3,
    name: strings.profile.wishlist,
  },
  {
    id: 4,
    name: strings.profile.subscriptions,
  },
  {
    id: 5,
    name: strings.profile.registry,
  },
  {
    id: 6,
    name: strings.profile.coins_rewards,
  },
  {
    id: 7,
    name: strings.profile.my_coupon,
  },
  /*
  {
    id: 8,
    name: strings.profile.track_order,
  },
  */

  {
    id: 8,
    name: strings.profile.support,
  },
  {
    id: 9,
    name: strings.profile.sign_out,
  },
];

export const Profile = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.common.isLoading);
  const userData = useSelector((state) => state.user.userData);
  const fullName =
    userData?.firstName === "na" || userData?.lastName === "na"
      ? " "
      : userData?.firstName + " " + userData?.lastName;
  const phone = userData?.phone;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails(navigation));
    dispatch(getAllCoupons(navigation));
    dispatch(getActiveCoupons(navigation));
    dispatch(getExpiredCoupons(navigation));
    dispatch(getRedeemedCoupons(navigation));
  }, []);

  const handleItem = (index, item) => {
    switch (item.id) {
      case 1:
        navigation.push(NAVIGATION.account);
        break;
      case 2:
        navigation.push(NAVIGATION.orders);
        break;
      case 3:
        navigation.push(NAVIGATION.wishList);
        break;
      case 4:
        navigation.push(NAVIGATION.subscriptions);
        break;
      case 5:
        navigation.push(NAVIGATION.registry);
        break;
      case 6:
        navigation.push(NAVIGATION.coins);
        break;
      case 7:
        navigation.push(NAVIGATION.myCoupons);
        break;
      /* 
         case 8:
        navigation.push(NAVIGATION.trackOrders,{
          trackingId:"",
          orderDetail:""
        });
        break;
        */
      case 8:
        Alert.alert("Coming Soon");
        ///navigation.push(NAVIGATION.support);
        break;
      case 9:
        signOut();
        break;
      default:
        break;
    }
  };
  const signOut = () => {
    Alert.alert(
      strings.APP_NAME,
      strings.CONFIRM_TO_LOGOUT,
      [
        {
          text: "Ok",
          onPress: () => {
            dispatch(logOut(navigation));
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

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

      <ScrollView style={{ paddingHorizontal: wp(4) }}>
        <View style={styles.profileView}>
          <Image
            source={
              userData?.profileImage != null && userData?.profileImage != ""
                ? { uri: userData?.profileImage }
                : userImg
            }
            style={{ width: 100, height: 100, borderRadius: 50 }}
            size="large"
            color="0000ff"
          />
          <Text style={styles.userName}>{fullName}</Text>
          <Text style={styles.contact}>{phone?.toString().substring(3)}</Text>
        </View>
        <View style={styles.listView}>
          {data.length > 0 ? (
            <ScrollView vertical showsVerticalScrollIndicator={false}>
              <FlatList
                contentContainerStyle={{
                  flexDirection: "column",
                }}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => index.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <Button1
                    title={item.name}
                    handlePress={() => handleItem(index, item)}
                  />
                )}
              />
            </ScrollView>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};
