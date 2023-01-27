import * as TYPES from "../../actionTypes";

const INITIAL_STATE = {
  treeCatData: [],
  allCatData: [],
  subCatData: [],
  productsListData: [],
  clearanceSaleData: [],
  popularItemData: [],
  topEData: [],
  topJikapuFreshData: [],
  topHouseHoldData:[],
  topBabyData: [],
  topFashionData: [],
  featureData: [],
  sponsoredData: [],
  productDetailsData: {},
  registryProducts: [],
  userRegistryData: [],
  compareItemsData: [],
  searchData: [],
  productSpecificationsData: [],
  storeData: []
};
export const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.ROOT_CAT_SUCCESS:
      return { ...state, treeCatData: action.payload };
    case TYPES.ROOT_CAT_FAIL:
      return { ...state };
    case TYPES.ALL_CAT_SUCCESS:
      return { ...state, allCatData: action.payload };
    case TYPES.ALL_CAT_FAIL:
      return { ...state };
    case TYPES.ALL_SUB_CAT_SUCCESS:
      return { ...state, subCatData: action.payload };
    case TYPES.ALL_SUB_CAT_FAIL:
      return { ...state };
    case TYPES.PRODUCT_LIST_SUCCESS:
      return { ...state, productsListData: action.payload };
    case TYPES.PRODUCT_LIST_FAIL:
      return { ...state };
    case TYPES.PRODUCT_LIST_SUCCESS:
      return { ...state, searchData: action.payload };
    case TYPES.PRODUCT_LIST_FAIL:
      return { ...state };
    case TYPES.PRODUCT_DETAILS_SPECIFICATION_SUCCESS:
      return { ...state, productSpecificationsData: action.payload };
    case TYPES.PRODUCT_DETAILS_SPECIFICATION_FAIL:
      return { ...state };
    case TYPES.PRODUCT_DETAILS_SUCCESS:
      return { ...state, productDetailsData: action.payload };
    case TYPES.PRODUCT_DETAILS_FAIL:
      return { ...state };
    case TYPES.CLEARANCE_LIST_SUCCESS:
      return { ...state, clearanceSaleData: action.payload };
    case TYPES.CLEARANCE_LIST_FAIL:
      return { ...state };
    case TYPES.POPULAR_LIST_SUCCESS:
      return { ...state, popularItemData: action.payload };
    case TYPES.POPULAR_LIST_FAIL:
      return { ...state };
    case TYPES.FEATURED_LIST_SUCCESS:
      return { ...state, featureData: action.payload };
    case TYPES.FEATURED_LIST_FAIL:
      return { ...state };
    case TYPES.SPONSORED_LIST_SUCCESS:
      return { ...state, sponsoredData: action.payload };
    case TYPES.SPONSORED_LIST_FAIL:
      return { ...state };
    case TYPES.TOP_ELECTRONICS_SUCCESS:
      return { ...state, topEData: action.payload };
    case TYPES.TOP_ELECTRONICS_FAIL:
      return { ...state };
    case TYPES.TOP_FASHION_SUCCESS:
      return { ...state, topFashionData: action.payload };
    case TYPES.TOP_FASHION_FAIL:
      return { ...state };
    case TYPES.TOP_JIKAPU_FRESH_SUCCESS:
      return { ...state, topJikapuFreshData: action.payload };
    case TYPES.TOP_JIKAPU_FRESH_FAIL:
      return { ...state };
    case TYPES.TOP_FASHION_SUCCESS:
      return { ...state, topFashionData: action.payload };
    case TYPES.TOP_FASHION_FAIL:
      return { ...state };
    case TYPES.GET_REGISTRY_SUCCESS:
      return { ...state, registryProducts: action.payload };
    case TYPES.GET_REGISTRY_FAIL:
      return { ...state,};
      case TYPES.TOP_HOUSEHOLD_SUCCESS:
        return { ...state, topHouseHoldData: action.payload };
      case TYPES.TOP_HOUSEHOLD_FAIL:
        return { ...state };
    case TYPES.TOP_BABY_SUCCESS:
      return { ...state, topBabyData: action.payload };
    case TYPES.TOP_BABY_FAIL:
      return { ...state };
    case TYPES.GET_USER_REGISTRY_SUCCESS:
      return { ...state, userRegistryData: action.payload };
    case TYPES.GET_USER_REGISTRY_FAIL:
      return { ...state };
    case TYPES.COMPARE_LIST_SUCCESS:
      return { ...state, compareItemsData: action.payload };
    case TYPES.COMPARE_LIST_FAIL:
      return { ...state };
    case TYPES.STORE_LIST_SUCCESS:
      return { ...state, storeData:action.payload };
    case TYPES.STORE_LIST_FAIL:
      return { ...state };
    default:
      return state;
  }
};
