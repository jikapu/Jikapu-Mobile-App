import { StyleSheet } from 'react-native';
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import { spacing, typography } from '@/theme';
import { COLORS } from '@/constants'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   listView:{
       backgroundColor:COLORS.WHITE,
       borderRadius:10,
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems: "center",
   },
   coinStyle: {
    width:wp(40),
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor:"#70707033",
    borderRadius: 10,
},
hrLine: {
    height: 1,
    backgroundColor: COLORS.BORDER,
},
btnStyle: {
    alignItems: "center", justifyContent: "center", height: hp(5), width: wp(25), backgroundColor: "#4C398E1A", borderRadius: 5
}
});
