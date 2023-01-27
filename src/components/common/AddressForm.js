import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { spacing, typography } from "@/theme";
import { strings } from "@/localization";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { COLORS } from "@/constants";
import { Button,InputField } from "@/components";
import { jikapu, ic1, ic, bag, searchIcon1 } from "@/assets";


export const AddressForm = (props) => {
  let { title, style, handleLogin, handleSignUp, textStyle } = props;
  return (
    <>
       <InputField
                
                  setCode={(text) => setFirstName(text)}
                  value={value}
                  error={firstNameError}
                  placeholder="First Name*"
                  containerStyle={{ backgroundColor: "white" }}
                ></InputField>
                <InputField
                
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  error={lastNameError}
                  placeholder="Last Name*"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                 
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Company Name (optional)"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  isDropdown={true}
                  type={"dropdown"}
                  placeholder="Country/Region*"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Street Address *"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="House Number and street name"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Apartment, Suit, unit, etc (optional)"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Town/City*"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  isDropdown={true}
                  type={"dropdown"}
                  placeholder="State*"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Zip Code*"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Phone*"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Email address*"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
                <InputField
                  maxLength={20}
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  isDropdown={true}
                  type={"dropdown"}
                  placeholder="Type of Address"
                  containerStyle={{
                    backgroundColor: "white",
                    marginTop: -hp(1.5),
                  }}
                ></InputField>
    </>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: spacing.m,
    backgroundColor: COLORS.PRIMARY,
  },
  container: {
    flex: 1,
  },
  headerTop: {
    height: hp(6.5),
    width: "100%",
    backgroundColor: COLORS.PRIMARY,
  },
  headerBottom: {
    flexDirection: "row",
    height: hp(6.5),
    alignItems: "center",
    paddingVertical: hp(4),
    paddingHorizontal: hp(2),
    backgroundColor: COLORS.WHITE,
  },

  imgView: {
    flex: 0.3,
  },
});
