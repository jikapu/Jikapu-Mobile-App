//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React,{useState} from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../utils/Responsive';
import { COLORS } from '@/constants';
import { searchIcon } from '@/assets';
import { Input, Image } from 'react-native-elements';
import DropDownPicker from "react-native-dropdown-picker";

export const DropdownPicker = (props) => {
    let { onChangeValue} = props;
    const [openQ, setOpenQ] = useState(false);
    const [pQuantity, setPQuantity] = useState(1);
     const [pItems, setPItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ]);
    return (
        <>
            <DropDownPicker
                open={openQ}
                listMode="SCROLLVIEW"
                value={pQuantity}
                items={pItems}
                setOpen={setOpenQ}
                setValue={setPQuantity}
                setItems={setPItems}
                onChangeValue={onChangeValue}
                containerStyle={{
                    width: wp(18),
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    marginLeft: wp(3)
                }}
                style={{
                    borderColor: "#C1C1C1",
                    borderWidth: 1,
                }}
             
            />
        </>
    );
};

const styles = StyleSheet.create({
    btnstyle: {
        width: 103,
        flex: 1,
        borderRadius: 100,
        alignItems: "center",
        marginTop: hp(1.2),

    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: "#0F96A0"
    },
    textStyle: {
        fontSize: wp(3.9),
        fontFamily: "ProductSans-Regular",
        color: COLORS.BLACK,
        marginTop: spacing.xs
    }
});
