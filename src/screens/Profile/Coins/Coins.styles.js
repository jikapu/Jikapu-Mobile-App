import { StyleSheet } from 'react-native';
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import { spacing, typography } from '@/theme';
import { COLORS } from '@/constants'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    coinStyle: {
        height: hp(20),
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor: COLORS.BORDER,
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
