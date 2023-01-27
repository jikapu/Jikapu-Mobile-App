import React from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { defaultImg, npRight } from "@/assets";
import {
  Button1,
  Loader,
  CustomHeader,
  InputField,
  GuestScreen,
} from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Account/Account.styles";
import { typography } from "@/theme";
import { Image } from "react-native-elements";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";



export const Account = ({ navigation }) => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const data = [
    {
      id: 1,
      name: strings.profile.general_info,
    },
    {
      id: 2,
      name: strings.profile.saved_cards,
    },
    {
      id: 3,
      name: strings.profile.address,
    },
    {
      id: 4,
      name: strings.profile.login_sec,
    },
  ];
  const handleItem = (index, item) => {
    switch (item.id) {
      case 1:
        navigation.push(NAVIGATION.generalInfo);
        break;
      case 2:
        navigation.push(NAVIGATION.cardsDetails);
        break;
      case 3:
        navigation.push(NAVIGATION.address);
        break;
      case 4:
        navigation.push(NAVIGATION.loginSec);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={strings.profile.account}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <View style={{ marginTop: hp(3), paddingHorizontal: wp(4) }}>
        <View style={styles.listView}>
          {data.length > 0 ? (
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
          ) : null}
        </View>
      </View>
    </View>
  );
};
