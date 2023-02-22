import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
} from "react-native";
import { showToast } from "@/actions/home/HomeAction";
import { ShareDialog } from "react-native-fbsdk-next";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { spacing, typography } from "@/theme";
import Clipboard from "@react-native-clipboard/clipboard";
import {
  CheckBox,
  Loader,
  RadioButton,
  CustomHeader,
  InputField,
  ListView6,
  ListView2,
  SearchRegistry,
  Button,
  DropdownPicker,
  RegProductsList,
} from "@/components";
import moment from "moment";
import { SliderBox } from "react-native-image-slider-box";
import { strings } from "@/localization";
import { styles } from "./Registry.styles";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";

import {
  registry,
  downArrow,
  publicImg,
  npUp,
  settingsReg,
  shareLinkReg,
  shareReg,
  lockReg,
  defaultImage,
  closeIcon,
} from "@/assets";
import DropDownPicker from "react-native-dropdown-picker";
import {
  createRegistryProduct,
  getSearchData,
  createRegistry,
  getRegistryProducts,
  getRegistryUser,
  addToCart,
} from "@/actions/home/HomeAction";
import { getAllAddress } from "@/actions/auth/UserActions";

const data = [
  {
    id: 1,
    name: "Birthday",
  },
  {
    id: 2,
    name: "Events",
  },
  {
    id: 3,
    name: "Wedding",
  },
  {
    id: 4,
    name: "Baby Shower",
  },
];

export const Registry = ({ navigation, route }) => {
  const addressListData = useSelector((state) => state.user.addressListData);
  const userData = useSelector((state) => state.user.userData);
  const userId = userData._id;
  const [bAddress, setBAddress] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [itemsAdd, setItemsAdd] = useState(
    addressListData && addressListData.map
      ? addressListData.map((item) => ({
          label: item.firstName + " " + item.addressType,
          value: item._id,
        }))
      : []
  );
  const [quantity, setQuantity] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [person, setPerson] = useState("");
  const [dob, setDob] = useState("");
  const [addressId, setAddressId] = useState("");

  const [open, setOpen] = useState(false);
  const [regType, setRegType] = useState("");
  const [items, setItems] = useState([
    { label: "Birthday", value: "Birthday" },
    { label: "Events", value: "Events" },
    { label: "Wedding", value: "Wedding" },
    { label: "Baby Shower", value: "Baby Shower" },
  ]);
  const [bAddressError, setBAddressError] = useState("");
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState([]);
  const [item, setItem] = useState([
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
  ]);

  const [self, setSelf] = useState(null);
  const [friendName, setFriendName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [showFDetail, setShowFDetail] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [totalData, setTotalData] = useState([]);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [regId, setRegId] = useState("");

  const [regData, setRegData] = useState([]);
  const [regQuantity, setRegQuantity] = useState(1);

  const url = "https://jikapu.com/registry-details/";

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    dispatch(getAllAddress(navigation));
    getRegLists();
  };

  const getRegLists = () => {
    let modify_data = [];
    dispatch(
      getRegistryUser(navigation, userId, (res) => {
        let data = res.data.docs;
        for (let i in data) {
          dispatch(
            getRegistryProducts(navigation, data[i]._id, (res) => {
              console.log("response registry products", res);
              let new_data = Object.assign({}, data[i], {
                productDetails: res,
              });
              modify_data.push(new_data);
              /* */
              //    modify_data = Object.assign([], data, {
              //      [i]: new_data,
              //    });
              //  console.log("modifydata", modify_data);
              setRegData(modify_data);
            })
          );
        }
        setTimeout(() => {
          console.log("modfifdis", modify_data);
        }, 1000);
      })
    );
  };

  const addItemCart = (productId) => {
    let params = {
      productId: productId,
      quantity: quantity,
    };
    dispatch(
      addToCart(navigation, params, () => {
        navigation.navigate(NAVIGATION.cart);
      })
    );
  };

  const handleClick = async (screen, id, name) => {
    switch (screen) {
      case "ProductDetails":
        setModalVisible(false);
        navigation.navigate(NAVIGATION.productDetails, {
          productId: id,
          title: name,
        });
        break;
      default:
        console.log("value", value);
        break;
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    let dt = moment(date).format("MM/DD/YYYY");
    setDatePickerVisible(false);
    setDob(dt);
    hideDatePicker();
  };

  const checkPerson = (who) => {
    setPerson(who);
    if (who === "A Friend") {
      setShowFDetail(true);
      setSelf(0);
    } else if (who === "My Self") {
      setShowFDetail(false);
      setSelf(1);
    } else {
    }
  };
  /* 1st dropdown */
  const onOpen = useCallback(() => {
    setOpen1(false);
    setOpenAdd(false);
  }, []);
  /* 2nd dropdown */
  const onOpen1 = useCallback(() => {
    setOpen(false);
    setOpenAdd(false);
  }, []);
  /* 3rd dropdown */
  const onOpenAdd = useCallback(() => {
    setOpen(false);
    setOpen1(false);
  }, []);
  /* 
   const checkActive = (value) => {
     setActive(value);
     console.log("valuee", value);
     if (value === "Active") {
       setActiveAddress(1)
     } else if (value === "Inactive") {
       setActiveAddress(0)
     } else {
     }
   };
 */

  // Share the link using the share dialog.
  const shareLinkWithShareDialog = (id) => {
    // Build up a shareable link.
    const shareLinkContent = {
      contentType: "link",
      contentUrl: url + `${id}`,
      // contentDescription: 'Wow, check out this great site!',
    };

    ShareDialog.canShow(shareLinkContent)
      .then(function (canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      })
      .then(
        function (result) {
          if (result.isCancelled) {
            console.log("Share cancelled");
          } else {
            console.log("Share success with postId: " + result.postId);
          }
        },
        function (error) {
          console.log("Share fail with error: " + error);
        }
      );
  };

  const copyLinkReg = (id) => {
    Clipboard.setString(url + `${id}`);
    showToast(`${" Registry link copied - " + url + id}`);
  };

  const searchkeyword = () => {
    Keyboard.dismiss();
    let params = {
      search: searchText,
      page: 1,
      limit: 10,
    };
    if (searchText.length > 0) {
      dispatch(
        getSearchData(navigation, params, (res) => {
          setTotalData(res.data.docs);
        })
      );
    }
  };
  const onChangeText = (text) => {
    setSearchText(text);
    let params = {
      search: searchText,
      page: 1,
      limit: 10,
    };
    if (searchText.length > 1) {
      dispatch(
        getSearchData(navigation, params, (res) => {
          setTotalData(res.data.docs);
        })
      );
    }
  };

  const showRegModal = (regId) => {
    setRegId(regId);
    setModalVisible(true);
    let params = {
      search: "",
      page: 1,
      limit: 100,
    };
    dispatch(
      getSearchData(navigation, params, (res) => {
        setTotalData(res.data.docs);
      })
    );
  };

  const addRegistryProduct = (productId, price, quantity) => {
    console.log("quantitysaasas", quantity);
    let params = {
      registryId: regId,
      productId: productId,
      quantity: quantity,
      price: price,
    };

    dispatch(
      createRegistryProduct(navigation, params, (res) => {
        //  setModalVisible(false)
        getRegLists();
      })
    );
  };

  const createReg = () => {
    let params = {
      registryDate: dob,
      registryType: regType,
      isSelf: self,
      friendName: friendName,
      friendEmail: friendEmail,
      privacy: value1,
      friendPhone: friendPhone,
      addresId: "",
    };
    dispatch(
      createRegistry(navigation, params, (res) => {
        dispatch(getRegistryUser(navigation, userId));
        getRegLists();
        setShowCreate(false);
      })
    );
  };

  const onIncreaseValue = (stockQty) => {
    if (stockQty <= regQuantity) {
      return regQuantity;
    } else {
      setRegQuantity(regQuantity + 1);
    }
  };

  const onDecreaseValue = (stockQty) => {
    if (regQuantity <= 1) {
      return regQuantity;
    } else {
      setRegQuantity(regQuantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={"Registry"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {<Loader isLoading={isLoading} />}
      <ScrollView showsScrollIndicator={false}>
        <SliderBox
          //  autoplay={true}
          //  circleLoop={true}
          //  resizeMode="contain"
          dotColor={"#EEB600"}
          inactiveDotColor={"#D8D8D8"}
          images={[registry, registry]}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          currentImageEmitter={(index) =>
            console.warn(`current pos is: ${index}`)
          }
        />

        <View style={{ paddingHorizontal: wp(4) }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: wp(5.2),
                fontWeight: "bold",
                marginVertical: hp(0.5),
              }}
            >
              Welcome to our gift registy
            </Text>
            <Text style={{ fontSize: wp(3.9) }}>
              Get started creating your perfect wish list today
            </Text>
          </View>

          <View style={{ marginVertical: hp(2) }}>
            {data.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FlatList
                  contentContainerStyle={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  data={data}
                  extraData={data}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        backgroundColor: COLORS.WHITE,
                        paddingVertical: wp(3),
                        width: wp(41),
                        marginRight: wp(1.5),
                        alignItems: "center",
                        borderRadius: 8,
                      }}
                    >
                      <Text>{item.name}</Text>
                    </View>
                  )}
                />
              </ScrollView>
            ) : null}
          </View>
          <View
            style={[
              {
                flex: 1,
                backgroundColor: COLORS.BG_SKYBLUE,
                padding: wp(3),
                borderRadius: 8,
                zIndex: 100,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setShowCreate(!showCreate)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: wp(4.3),
                  color: COLORS.BLACK,
                  fontWeight: "bold",
                }}
              >
                Create Registry
              </Text>
              <TouchableOpacity onPress={() => setShowCreate(!showCreate)}>
                <Image source={showCreate == true ? npUp : downArrow} />
              </TouchableOpacity>
            </TouchableOpacity>
            {showCreate == true ? (
              <View style={{ marginTop: hp(2) }}>
                <DropDownPicker
                  open={open}
                  onOpen={onOpen}
                  value={regType}
                  items={items}
                  setOpen={setOpen}
                  setValue={setRegType}
                  setItems={setItems}
                  zIndex={3000}
                  zIndexInverse={1000}
                  dropDownContainerStyle={{
                    backgroundColor: "white",
                    elevation: 1000,
                  }}
                  style={{
                    height: hp(6),
                    backgroundColor: "#FFF",
                    borderColor: "#707070",
                    borderWidth: 1,
                    borderRadius: 8,
                  }}
                  placeholder="Registry Type"
                />
                <InputField
                  setCode={(text) => setDob(text)}
                  value={dob}
                  btnPress={() => showDatePicker()}
                  isDropdown={true}
                  type={"calender"}
                  placeholder="DD/ MM/ YYYY"
                  iconStyle={{
                    width: 32,
                    height: 36,
                  }}
                   containerStyle={{ marginTop: hp(2) }}
                ></InputField>
                <DropDownPicker
                  open={open1}
                  onOpen={onOpen1}
                  value={value1}
                  items={item}
                  setOpen={setOpen1}
                  setValue={setValue1}
                  zIndex={2000}
                  zIndexInverse={2000}
                  dropDownContainerStyle={{
                    backgroundColor: "white",
                    elevation: 1000,
                  }}
                  setItems={setItem}
                  placeholder="Select Registry Privacy"
                  style={{
                    height: hp(6),
                    borderRadius: 8,
                    backgroundColor: "#FFF",
                    borderColor: "#707070",
                    borderWidth: 1,
                    marginTop: -hp(0.8),
                  }}
                />
                <Text
                  style={{
                    fontSize: wp(4),
                    color: COLORS.BLACK,
                    fontWeight: "bold",
                    marginTop: hp(3),
                  }}
                >
                  Who is the Registry meant for
                </Text>
                <View
                  style={{ flex: 1, flexDirection: "row", marginTop: hp(1.2) }}
                >
                  <View style={{ flex: 0.4 }}>
                    <RadioButton
                      label={"My Self"}
                      value={person}
                      selectedOption={person == "My Self" ? true : false}
                      onPress={() => checkPerson("My Self")}
                    />
                  </View>

                  <View style={{ flex: 0.4 }}>
                    <RadioButton
                      label={"A Friend"}
                      value={person}
                      selectedOption={person == "A Friend" ? true : false}
                      onPress={() => checkPerson("A Friend")}
                    />
                  </View>
                </View>
                {showFDetail == true ? (
                  <View style={{ marginTop: hp(1) }}>
                    <InputField
                      setCode={(text) => setFriendName(text)}
                      value={friendName}
                      placeholder="Name of Friend"
                    ></InputField>
                    <InputField
                      setCode={(text) => setFriendEmail(text)}
                      value={friendEmail}
                      placeholder="Email Id of Friend"
                      containerStyle={{
                        marginTop: -hp(1.5),
                      }}
                    ></InputField>
                    <InputField
                      setCode={(text) => setFriendPhone(text)}
                      value={friendPhone}
                      placeholder="Phone"
                      containerStyle={{
                        marginTop: -hp(1.5),
                      }}
                    ></InputField>
                  </View>
                ) : null}
                <Text
                  style={{
                    fontSize: wp(4.3),
                    color: COLORS.BLACK,
                    fontWeight: "bold",
                    marginTop: hp(1),
                  }}
                >
                  Select Delivery Address
                </Text>
                {/*
                  <Text
                  style={{
                    fontSize: wp(3.7),
                    color: COLORS.BLACK,
                    fontWeight: "bold",
                    marginTop: hp(1),
                  }}
                >
                  Use Current
                </Text>
                 */}

                <DropDownPicker
                  open={openAdd}
                  onOpen={onOpenAdd}
                  value={bAddress}
                  items={itemsAdd}
                  setOpen={setOpenAdd}
                  setValue={setBAddress}
                  setItems={setItemsAdd}
                  zIndex={1000}
                  zIndexInverse={3000}
                  onChangeValue={(value) => {
                    console.log("onChangeValue", value);
                    setAddressId(value);
                  }}
                  onSelectItem={(item) => {
                    console.log("onSelectItem", item);
                  }}
                  placeholder="Select From Saved Address"
                  style={{
                    marginTop: hp(1.5),
                    height: hp(6),
                    borderRadius: 8,
                    backgroundColor: "#FFFF",
                    borderColor: "#707070",
                    borderWidth: 1,
                    paddingHorizontal: wp(4),
                  }}
                  labelStyle={{
                    fontSize: wp(3.7),
                  }}
                />
                <Text style={{ color: "red", marginTop: hp(0.5) }}>
                  {bAddressError}
                </Text>
                {/* 
                 <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: hp(1),
                    paddingLeft: wp(5),
                  }}
                >
                  <View style={{ flex: 0.4 }}>
                    <CheckBox
                      label={"Active"}
                      value={active}
                      selected={active == "Active" ? true : false}
                      handlePress={() => checkActive("Active")}
                    />
                  </View>

                  <View style={{ flex: 0.4 }}>
                    <CheckBox
                      label={"InActive"}
                      value={active}
                      selected={active == "Inactive" ? true : false}
                      handlePress={() => checkActive("Inactive")}
                    />
                  </View>
                </View>
                */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.hrLine} />
                  <Text style={styles.lineText}>OR</Text>
                  <View style={styles.hrLine} />
                </View>
                <Button
                  style={{
                    backgroundColor: COLORS.GREEN_BTN,
                    height: hp(5),
                    marginTop: hp(2),
                  }}
                  title={"ADD NEW ADDRESS"}
                  handlePress={
                    () => navigation.push(NAVIGATION.addRegistryAddress)
                    //  setShowAddressView(true)
                  }
                />
                <Button
                  style={{
                    backgroundColor: COLORS.GREEN_BTN,
                    height: hp(5),
                    marginTop: hp(3),
                  }}
                  title={"CREATE REGISTRY"}
                  handlePress={createReg}
                />
              </View>
            ) : null}
          </View>
          {/* FIND REGSITRY
           <View
            style={{
              flex: 1,
              backgroundColor: COLORS.BG_SKYBLUE,
              padding: wp(3),
              borderRadius: 8,
              marginTop: hp(1),
            }}
          >
            <TouchableOpacity
              onPress={() => setShowFind(!showFind)}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: wp(4.3),
                  color: COLORS.BLACK,
                  fontWeight: "bold",
                }}
              >
                Find Registry
              </Text>
              <TouchableOpacity onPress={() => setShowFind(!showFind)}>
                <Image
                  source={showFind == true ? npUp : downArrow}
                  style={{ width: 12, height: 12 }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            {showFind == true ? (
              <View style={{ marginTop: hp(1) }}>
                <InputField
                
                  setCode={(text) => setFirstName(text)}
                  value={firstName}
                  placeholder="First Name"
                ></InputField>
                <InputField
                  setCode={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Last Name"
                ></InputField>
                <DropDownPicker
                  open={open2}
                  value={value2}
                  items={itemLocation}
                  setOpen={setOpen2}
                  setValue={setValue2}
                  setItems={setItemLocation}
                  placeholder="State"
                  containerStyle={{}}
                  style={{
                    backgroundColor: "#FFF",
                    borderColor: "#707070",
                    borderWidth: 1,
                    marginTop: hp(1),
                    height: hp(6),
                    borderRadius: 8,
                  }}
                />

                <Button
                  style={{
                    backgroundColor: COLORS.GREEN_BTN,
                    height: hp(5),
                    marginTop: hp(3),
                  }}
                  title={"FIND REGISTRY"}
                />
              </View>
            ) : null}
          </View> 
          <View style={{ marginTop: hp(3) }}>
            <SearchRegistry
              editable={true}
              value={searchText}
              setCode={(text) => setSearchText(text)}
              handlePress={searchkeyword}
            />
          </View>
          */}

          {regData?.length > 0 ? (
            <FlatList
              extraData={regData}
              data={regData}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      backgroundColor: COLORS.GREEN_BTN,
                      alignItems: "center",
                      borderTopEndRadius: spacing.xs,
                      borderTopStartRadius: spacing.xs,
                      padding: wp(2),
                      marginTop: hp(2),
                    }}
                  >
                    <View style={{ flex: 0.92 }}>
                      <Text style={typography.btnText}>{item?.eventName}</Text>
                      <Text
                        style={[
                          typography.btnText,
                          { fontWeight: "normal", marginTop: hp(1) },
                        ]}
                      >
                        {moment(item?.createdAt).format("MMMM DD, YYYY")}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: hp(3),
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={[
                              typography.btnText,
                              { fontWeight: "normal", fontSize: wp(6) },
                            ]}
                          >
                            {item?.purchased}
                          </Text>
                          <Text
                            style={[
                              typography.btnText,
                              { fontWeight: "normal" },
                            ]}
                          >
                            Purchased
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginLeft: wp(5),
                          }}
                        >
                          <Text
                            style={[
                              typography.btnText,
                              { fontWeight: "normal", fontSize: wp(6) },
                            ]}
                          >
                            {item?.needed}
                          </Text>
                          <Text
                            style={[
                              typography.btnText,
                              { fontWeight: "normal" },
                            ]}
                          >
                            Needed
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 0.08,
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Image
                        source={
                          item.privacy === "private" ? lockReg : publicImg
                        }
                        style={{ width: 25, height: 25 }}
                      />
                      <TouchableOpacity
                        style={{ marginTop: hp(1) }}
                        onPress={() => copyLinkReg(item._id)}
                      >
                        <Image
                          source={shareLinkReg}
                          style={{ width: 20, height: 22 }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ marginTop: hp(1) }}
                        onPress={() => shareLinkWithShareDialog(item._id)}
                      >
                        <Image
                          source={shareReg}
                          style={{ width: 23, height: 16 }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ marginTop: hp(1) }}
                        onPress={() => showRegModal(item._id)}
                      >
                        <Image
                          source={settingsReg}
                          style={{ width: 24, height: 24 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: COLORS.WHITE,
                      paddingHorizontal: wp(2.4),
                    }}
                  >
                    {item?.productDetails?.length > 0 ? (
                      <FlatList
                        style={{
                          flexWrap: "wrap",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        extraData={item?.productDetails}
                        data={item?.productDetails}
                        keyExtractor={(item, index) => index.toString()}
                        vertical
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                          <ListView2
                            btnStyles={{ width: wp(42) }}
                            key={index}
                            onClickProduct={() => {
                              handleClick(
                                "ProductDetails",
                                item?.productId?._id,
                                item?.name
                              );
                            }}
                            starCount={item?.productId?.ratings}
                            imgSrc={
                              item?.productId?.image != null ||
                              item?.productId?.image > 0
                                ? { uri: item?.productId?.image[0] }
                                : defaultImage
                            }
                            title={item?.productId?.name}
                            isAddToCart={true}
                            isRating={true}
                            startCount={item?.productId?.ratings}
                            storeName={item?.storeId?.storeName}
                            onClickCart={() => {
                              addItemCart(item?.productId);
                            }}
                            price={item?.productId?.price}
                          />
                        )}
                      />
                    ) : null}
                  </View>
                </View>
              )}
            />
          ) : null}

          {modalVisible == true ? (
            <View>
              <Modal
                animationType="fade"
                transparent={true}
                backdropOpacity={0.5}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <Image
                        source={closeIcon}
                        style={{ width: 30, height: 30, alignSelf: "flex-end" }}
                      />
                    </Pressable>
                    <Text
                      style={[
                        typography.title,
                        { alignSelf: "center", marginTop: hp(0.5) },
                      ]}
                    >
                      Search Products
                    </Text>
                    <View style={{ marginTop: hp(1) }}>
                      <SearchRegistry
                        editable={true}
                        value={searchText}
                        setCode={(text) => onChangeText(text)}
                        handlePress={() => searchkeyword()}
                      />
                    </View>
                    <ScrollView
                      contentContainerStyle={{
                        flexGrow: 1,
                      }}
                    >
                      {totalData.length > 0 ? (
                        <FlatList
                          contentContainerStyle={{
                            marginTop: wp(2),
                          }}
                          data={totalData}
                          extraData={totalData}
                          keyExtractor={(item, index) => index.toString()}
                          vertical
                          showsVerticalScrollIndicator={true}
                          renderItem={({ item, index }) => (
                            <RegProductsList
                              key={index}
                              onClickProduct={() => {
                                handleClick(
                                  "ProductDetails",
                                  item._id,
                                  item.name
                                );
                              }}
                              imgSrc={
                                item.image !== null && item.image.length > 0
                                  ? { uri: item.image[0] }
                                  : defaultImage
                              }
                              title={item?.name}
                              starCount={item?.ratings}
                              storeName={item?.storeId?.storeName}
                              price={item?.price}
                              onChangeValue={(value) => {
                                console.log("onChangeValue", value);
                                setRegQuantity(value);
                              }}
                              addRegProduct={() => {
                                addRegistryProduct(
                                  item._id,
                                  item.price,
                                  regQuantity
                                );
                              }}
                            />
                          )}
                        />
                      ) : null}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          ) : null}
        </View>
        {
          <DateTimePickerModal
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "spinner"}
            minimumDate={new Date()}
            pickerContainerStyleIOS={{ paddingHorizontal: 23 }}
            isVisible={isDatePickerVisible}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        }
      </ScrollView>
    </View>
  );
};
