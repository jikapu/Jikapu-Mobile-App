import { StyleSheet } from 'react-native';
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import { spacing } from '@/theme';
import {COLORS} from '@/constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  profileView:{
    alignItems:'center',
    marginTop:hp(3.5),
    paddingBottom:hp(5)
  },
  contact:{
    fontSize: wp(4),
    fontWeight:"normal",
    color:COLORS.BLACK,
    marginTop:spacing.s
  },
  userName:{
    fontSize: wp(5.5),
    fontWeight:"bold",
    color:COLORS.BLACK,
    marginTop:spacing.xs
  },
  listView:{
    paddingHorizontal:wp(4)
  },
  submitButton: {
    marginTop: spacing.m,
    backgroundColor:COLORS.GREEN_BTN
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
  },
  closeTextStyle: {
    padding: 5,
    fontSize: wp(4.9),
    fontWeight: 'bold',
    color: COLORS.PRIMARY_BLUE,
  },
  modalView: {
    height: hp(15),
    padding: 10,
    backgroundColor: COLORS.WHITE,
    borderTopRightRadius: wp(8),
    borderTopLeftRadius: wp(8),
    shadowColor: '#0000001F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    paddingTop: 15,
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: '#fff',
  },
  countryModalStyle: {
    flex: 1,
    borderColor: '#CFCFCF',
    borderBottomWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalItemName: {
    flex: 0.8,
    fontSize: wp(4.1),
   
   
  },
  modalItemValue: {
    flex: 0.2,
    fontSize: wp(4.1),   
  },
  closeButton1Style: {
    padding: 12,
    alignItems: 'center',
  },
  closeText1Style: {
    padding: 5,
    fontSize: wp(4.9),
    fontWeight: 'bold',
   
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
