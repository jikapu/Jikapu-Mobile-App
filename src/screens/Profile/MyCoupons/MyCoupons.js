import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    FlatList,
    Platform,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import {
    CouponView,
    Loader,
    CustomHeader,
} from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/MyCoupons/MyCoupons.styles.js";
import { shadow, spacing, typography } from "@/theme";
import { COLORS, NAVIGATION } from "@/constants";
import { getAllCoupons, getActiveCoupons, getExpiredCoupons, getRedeemedCoupons } from "@/actions/auth/UserActions";
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import { showToast } from "@/actions/home/HomeAction";
const dataa = [
    {
        id: 1,
        name: "All",
        status: 1

    },
    {
        id: 2,
        name: "Available",
        status: 1
    },
    {
        id: 3,
        name: "Expiring",
        status: 1
    },
    {
        id: 4,
        name: "Redeemed",
        status: 1
    },
];


export const MyCoupons = ({ navigation }) => {

    const dispatch = useDispatch();
    const [data, setData] = useState(dataa)
    const isLoading = useSelector((state) => state.common.isLoading);
    const allCouponData = useSelector((state) => state.user.allCouponData);
    const activeCouponData = useSelector((state) => state.user.activeCouponData);
    const expiredCouponData = useSelector((state) => state.user.expiredCouponData);
    const redeemedCouponData = useSelector((state) => state.user.redeemedCouponData);
    const [isAll, setIsAll] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const [isRedeemed, setIsRedeemed] = useState(false);

    /* 
     useEffect(() => {
        getAllList()
    }, [])
    const getAllList = () => {
        dispatch(getAllCoupons(navigation))
        dispatch(getActiveCoupons(navigation))
        dispatch(getExpiredCoupons(navigation))
        dispatch(getRedeemedCoupons(navigation))
    }
    */

    const copyCouponCode = (item) => {
        Clipboard.setString(item);
        showToast(`${'Jikapu coupon code copied - ' + item}`)
      }

    const selectAll = () => {
        setIsAll(true)
        setIsActive(false)
        setIsExpired(false)
        setIsRedeemed(false)
    }

    const selectAvailable = () => {
        setIsAll(false)
        setIsActive(true)
        setIsExpired(false)
        setIsRedeemed(false)
    }
    const selectExpired = () => {
        setIsAll(false)
        setIsActive(false)
        setIsExpired(true)
        setIsRedeemed(false)
    }
    const selectRedeemed = () => {
        setIsAll(false)
        setIsActive(false)
        setIsExpired(false)
        setIsRedeemed(true)
    }
    const selectItem = (item, index) => {
        /*
        var a = data;
       for (var i = 0; i < data.length; i++) {
           data[i].status = 1;
       }

       let targetItem = data[index];
       if (targetItem.status == 1) {
           targetItem.status = 0;
       } else {
           targetItem.status = 0
       }
       data[index] = targetItem;
       //  setData(data => [...data]);
       //  console.log("adsads", data)
        */


        if (item.id == 1) {
            setIsAll(true)
            setIsActive(false)
            setIsExpired(false)
            setIsRedeemed(false)
        }
        if (item.id == 2) {
            setIsAll(false)
            setIsActive(true)
            setIsExpired(false)
            setIsRedeemed(false)
        }
        if (item.id == 3) {
            setIsAll(false)
            setIsActive(false)
            setIsExpired(true)
            setIsRedeemed(false)
        }
        if (item.id == 4) {
            setIsAll(false)
            setIsActive(false)
            setIsExpired(false)
            setIsRedeemed(true)
        }

    };
    return (
        <View style={styles.container}>
            <CustomHeader
                title={strings.profile.my_coupon}
                isBackBtn={true}
                handlePress={() => navigation.pop()}
            />
            {<Loader isLoading={isLoading} />}
            <View style={{ margin: wp(5), flex: 1 }}>
                <View style={styles.listView}>


                    <TouchableOpacity style={{ padding: wp(5), borderTopLeftRadius: 10, alignItems: "center", backgroundColor: isAll == true ? COLORS.GREEN_BTN : COLORS.WHiTE }}
                        onPress={() => selectAll()} >
                        <Text style={{ color: isAll == true ? COLORS.WHITE : COLORS.BLACK }}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: wp(5), borderTopLeftRadius: 10, alignItems: "center", backgroundColor: isActive == true ? COLORS.GREEN_BTN : COLORS.WHiTE }}
                        onPress={() => selectAvailable()} >
                        <Text style={{ color: isActive == true ? COLORS.WHITE : COLORS.BLACK }}>Available</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: wp(5), borderTopLeftRadius: 10, alignItems: "center", backgroundColor: isExpired == true ? COLORS.GREEN_BTN : COLORS.WHiTE }}
                        onPress={() => selectExpired()} >
                        <Text style={{ color: isExpired == true ? COLORS.WHITE : COLORS.BLACK }}>Expiring</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: wp(5), borderTopLeftRadius: 10, alignItems: "center", backgroundColor: isRedeemed == true ? COLORS.GREEN_BTN : COLORS.WHiTE }}
                        onPress={() => selectRedeemed()} >
                        <Text style={{ color: isRedeemed == true ? COLORS.WHITE : COLORS.BLACK }}>Redeemed</Text>
                    </TouchableOpacity>

                </View>

                {isAll == true && allCouponData.length > 0 ? (
                    <SafeAreaView style={{ flex: 1, }}>
                        <FlatList
                            contentContainerStyle={{
                                marginTop: hp(0.5),
                            }}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: "space-between", }}
                            data={allCouponData}
                            extraData={allCouponData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            vertical
                            renderItem={({ item, index }) => (
                                <CouponView
                                    name={item?.name}
                                    amount={item?.discountValue}
                                    minimumOrder={item?.minimumOrderValue}
                                    product={item?.productSku}
                                    expiry={moment(item?.expiredTime).format("MM/DD/YYYY")}
                                    status={item?.status == 1 ? "Active" : "InActive"}
                                    code={item?.couponCode}
                                    handleCopy={() => copyCouponCode(item?.couponCode)}
                                />
                            )}
                        />
                    </SafeAreaView>
                ) : null
                }

                {isActive == true && activeCouponData.length > 0 ? (
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            contentContainerStyle={{
                                marginTop: hp(0.5),
                            }}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={{ justifyContent: "space-between", }}
                            data={activeCouponData}
                            extraData={activeCouponData}
                            keyExtractor={(item, index) => index.toString()}
                            vertical
                            renderItem={({ item, index }) => (
                                <CouponView
                                    name={item?.name}
                                    amount={item?.discountValue}
                                    minimumOrder={item?.minimumOrderValue}
                                    product={item?.productSku}
                                    expiry={moment(item?.expiredTime).format("MM/DD/YYYY")}
                                    status={item?.status == 1 ? "Active" : "InActive"}
                                    code={item?.couponCode}
                                    handleCopy={() => copyCouponCode(item?.couponCode)}
                                />
                            )}
                        />
                    </SafeAreaView>
                ) : null
                }


                {isExpired == true && expiredCouponData.length > 0 ? (
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            contentContainerStyle={{
                                marginTop: hp(0.5),
                            }}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={{ justifyContent: "space-between", }}
                            data={expiredCouponData}
                            extraData={expiredCouponData}
                            keyExtractor={(item, index) => index.toString()}
                            vertical
                            renderItem={({ item, index }) => (
                                <CouponView
                                    name={item?.name}
                                    amount={item?.discountValue}
                                    minimumOrder={item?.minimumOrderValue}
                                    product={item?.productSku}
                                    expiry={moment(item?.expiredTime).format("MM/DD/YYYY")}
                                    status={item?.status == 1 ? "Active" : "InActive"}
                                    code={item?.couponCode}
                                    handleCopy={() => copyCouponCode(item?.couponCode)}
                                />
                            )}
                        />
                    </SafeAreaView>
                ) : null
                }

                {isRedeemed == true && redeemedCouponData.length > 0 ? (
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            contentContainerStyle={{
                                marginTop: hp(0.5),
                            }}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: "space-between", }}
                            showsVerticalScrollIndicator={false}
                            data={redeemedCouponData}
                            extraData={redeemedCouponData}
                            keyExtractor={(item, index) => index.toString()}
                            vertical
                            renderItem={({ item, index }) => (
                                <CouponView
                                    name={item?.name}
                                    amount={item?.discountValue}
                                    minimumOrder={item?.minimumOrderValue}
                                    product={item?.productSku}
                                    expiry={moment(item?.expiredTime).format("MM/DD/YYYY")}
                                    status={item?.status == 1 ? "Active" : "InActive"}
                                    code={item?.couponCode}
                                    handleCopy={() => copyCouponCode(item?.couponCode)}
                                />
                            )}
                        />
                    </SafeAreaView>
                ) : null
                }



            </View>

        </View>
    );
};
