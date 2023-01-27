//import { useTheme } from '@react-navigation/native';
import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { spacing, typography } from "@/theme";
import { npMove, npRight } from "@/assets";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { COLORS } from "@/constants";

export const CustomFilterModal = (props) => {
  let { modalVisible, closeModal, openModal,onPressLow,onPressHigh,onPressReview,newest,oldest } = props;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: wp(5),
            }}
          >
            <Text style={{ alignSelf: "flex-start", fontSize: wp(3.7) }}>
              Filter
            </Text>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                alignSelf: "flex-end",
              }}
            >
              <Text style={{ fontSize: wp(3.7), color: COLORS.PRIMARY }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ height: 1, backgroundColor: COLORS.BORDER, width: "100%" }}
          />
          <View style={{ padding: wp(4) }}>
            {/*
            <Text style={{ fontSize: wp(3.7), fontWeight: "bold" }}>
              Men's Sport Outdoor Shoes
            </Text>
            <View style={{ marginTop: hp(1.3) }}>
              <TouchableOpacity
                style={{
                  width: wp(16),
                  hieght: hp(3),
                  borderRadius: spacing.xl,
                  padding: wp(2),
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.LIGHT_BG,
                }}
              >
                <Text>all</Text>
              </TouchableOpacity>
            </View>
            */}
            
            <View style={{ marginTop: hp(1) }}>
              <Text style={typography.label}>Sort By:</Text>
              <View
                style={{
                  justifyContent:"space-around",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems:"center",
                  marginTop:hp(0.5),
                  
                }}
              >
                <TouchableOpacity onPress={newest}
                  style={{
                    width: wp(27),
                    hieght: hp(3),
                    marginTop: hp(1),
                    borderRadius: spacing.xl,
                    padding: wp(2),
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: COLORS.GREEN_BTN,
                    backgroundColor: COLORS.BG_ULTRA_LIGHT,
                  }}
                >
                  <Text style={styles.text}>New to old</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={oldest}
                  style={{
                    width: wp(27),
                    hieght: hp(3),
                    marginTop: hp(1),
                    borderRadius: spacing.xl,
                    padding: wp(2),
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: COLORS.GREEN_BTN,
                    backgroundColor: COLORS.BG_ULTRA_LIGHT,
                  }}
                >
                  <Text style={styles.text}>Old to new</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressLow}
                  style={{
                    width: wp(27),
                    hieght: hp(3),
                    marginTop: hp(1),
                    borderRadius: spacing.xl,
                    padding: wp(2),
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: COLORS.GREEN_BTN,
                    backgroundColor: COLORS.BG_ULTRA_LIGHT,
                  }}
                >
                  <Text style={styles.text}>Low to high</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={onPressHigh}
                  style={{
                    width: wp(27),
                    hieght: hp(3),
                    marginTop: hp(1),
                    borderRadius: spacing.xl,
                    padding: wp(2),
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: COLORS.GREEN_BTN,
                    backgroundColor: COLORS.BG_ULTRA_LIGHT,
                  }}
                >
                  <Text style={styles.text}>High to low </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressReview}
                  style={{
                    width: wp(40),
                    hieght: hp(3),
                    marginTop: hp(1),
                    borderRadius: spacing.xl,
                    padding: wp(2),
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: COLORS.GREEN_BTN,
                    backgroundColor: COLORS.BG_ULTRA_LIGHT,
                  }}
                >
                 
                  <Text style={styles.text}>Top customer review</Text>

                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    marginTop: hp(50),
    height: hp(50),
    backgroundColor: COLORS.WHITE,
    borderRadius: spacing.m,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
