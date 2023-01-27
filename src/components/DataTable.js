import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { heightToDP as hp, widthToDP as wp } from "@/utils/Responsive";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { spacing, typography } from "@/theme";
import { COLORS } from "@/constants";

export const TableData = () => {
  const tableHead = [
    "Reasons for Returns",
    "Description",
    "Tags, Labels Attached",
    "Original Packaging",
    "Complete Accessories & Gifts",
    "New Condition",
    "Not Damaged",
  ];
  //const tableTitle = ["1.", "2.", "3.", "4.",];
  const widthArr = [wp(20),wp(61.6),wp(21),wp(22),wp(25),wp(20),wp(20)];
  const heightArr = [wp(20),wp(62),wp(21),wp(22),wp(25),wp(20),wp(20)];
  const tableData = [
    [
      "Changed mind Request",
      "Product Unused (this applies to products in Fashion Category only)",
      "yes",
      "yes",
      "yes",
      "yes",
      "yes",
    ],
    [
      "Wrong Items",
      "Products delivered differently from what was displayed on the website, the return will be authorized after validation and once the item is returned, item cost and shipping fee will be refunded.",
      "yes",
      "yes",
      "yes",
      "yes",
      "yes",
    ],
    [
      "Incomplete Order",
      "Product delivered is partial from what was displayed on the website. A return will be authorized after validation if the item cannot be completed. Once the item is returned, the item cost and shipping fee will be refunded.",
      "no",
      "yes",
      "yes",
      "yes",
      "yes",
    ],
    [
      "Defective Items",
      "Product delivered has manufacturers defects was delivered dead on arrival, return will be authorized after validation",
      "no",
      "yes",
      "yes",
      "yes",
      "yes",
    ],
    [
      "Damaged In transit",
      "Product has visible damage, return will be authorized after validation. Complaint must be laid within 24 hours.",
      "yes",
      "yes",
      "yes",
      "yes",
      "yes",
    ],
  ];
  for (let i = 0; i < 0; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }
  return (
    <View style={styles.container}>
      <Text style={typography.labelBold}>See the table below.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
		 marginTop: hp(1),
	  }}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
			 
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <View style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  
                  style={[
                    styles.row,
                    index % 2 ,
                  ]}
                  textStyle={styles.text1}
                />
              ))}
            </Table>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TableData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(2),
  },

  title: { flex: 1 },
  header: { height: hp(10), backgroundColor: "#f1f8ff" },
  row: { height: hp(16),  },
  text: {
    textAlign: "center",
    fontSize: wp(3.9),
    color: COLORS.BLACK,
    fontFamily: "ProductSans-Bold",
  },
  text1: {
    textAlign: "center",
    fontSize: wp(3.9),
    color: COLORS.BLACK,
    fontFamily: "ProductSans-Regular",
  },
  dataWrapper: { marginTop: -1 },
  
});
