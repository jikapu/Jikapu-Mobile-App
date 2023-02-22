import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import { useDispatch, useSelector } from "react-redux";
import { npDown } from '@/assets'
import {
    RadioButton,
    Button,
    CustomHeader,
} from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Coins/Coins.styles.js";
import { shadow, spacing, typography } from "@/theme";
import { COLORS, NAVIGATION } from "@/constants";

export const Coins = ({ navigation }) => {
    const userData = useSelector((state) => state.user.userData);
    const coinCount = userData?.coinCount;
    const balanceKes = coinCount/10
    return (
        <View style={styles.container}>
            <CustomHeader
                title={strings.profile.coins_rewards}
                isBackBtn={true}
                handlePress={() => navigation.pop()}
            />
            <View style={{ marginHorizontal: wp(8), marginTop: hp(2) }}>
                {/* Jikapu coins */}
                <View style={styles.coinStyle}>
                    <View style={{flex:1, flexDirection: "row", justifyContent: "space-between", padding: wp(4) }}>
                        <Text style={typography.label}>Jikapu Coins</Text>
                        <Image source={npDown} style={{ width: 12, height: 10 }} />
                    </View>
                    <View style={styles.hrLine} />
                    <View style={{ padding: wp(4),justifyContent:"space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <Text  style={typography.pText}>Balance</Text>
                            <Text  style={typography.textBold}>{coinCount}</Text>
                        </View>
                        <View style={{ flexDirection: "row",marginTop:hp(2), justifyContent: "space-between", }}>
                            <Text  style={typography.pText}>Equivalent to KES</Text>
                            <Text style={typography.textBold}>KES {balanceKes}</Text>
                        </View>
                    </View>
                </View>

                {/* jikau rewards */}
                <View style={[styles.coinStyle,{height:hp(14.5),marginTop: hp(2)}]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: wp(4) }}>
                        <Text style={typography.label}>Jikapu Rewards</Text>
                        <Image source={npDown} style={{ width: 12, height: 10 }} />
                    </View>
                    <View style={styles.hrLine} />
                  
                        <View style={{flex:1,padding:wp(4), flexDirection: "row", justifyContent: "space-between", }}>
                            <Text  style={typography.pText}>Available Balance</Text>
                            <Text  style={typography.textBold}>KES {coinCount}</Text>
                        </View>
                        
                   
                </View>

                {/* Jikapu Case Balance */}
                <View style={[styles.coinStyle,{height:hp(25),marginTop:hp(2)}]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: wp(4) }}>
                        <Text style={typography.label}>JIKAPU Cash Balance</Text>
                        <Image source={npDown} style={{ width: 12, height: 10 }} />
                    </View>
                    <View style={styles.hrLine} />
                    <View style={{ padding: wp(4),justifyContent:"space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <Text  style={typography.pText}>Available Balance</Text>
                            <Text  style={typography.textBold}>KES 0</Text>
                        </View>
                        <View style={{marginTop:hp(2),  }}>
                            <Text  style={typography.pText}>Recharge Balance</Text>
                            <View style={{flex:1,flexDirection:"row",marginTop:hp(1.2)}}>
                                <TouchableOpacity style={styles.btnStyle} onPress={() => alert("Coming Soon")}>
                                    <Text  style={typography.pText}>Mpesa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnStyle,{marginLeft:wp(4)}]} onPress={() => alert("Coming Soon")}>
                                    <Text style={typography.pText}>ipay</Text>
                                </TouchableOpacity>
                            </View>
                         
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
