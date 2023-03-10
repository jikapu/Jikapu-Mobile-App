const isLive = true
export const BASE_URL =  isLive ? 'https://jikapu.com:3507/' : 'http://54.190.192.105:3507/';
export const IMAGE_BASE_URL = isLive? 'https://jikapu.com:3507/' : 'http://54.190.192.105:3507/';

//==========Local System====================

export const API = {
    REGISTER: "customer/register",
    LOGIN: "customer/login",
    GUEST_LOGIN:'customer/guestUserLogin',
    FORGOT_PASSWORD: "customer/forgetPassword",
    GET_USER:"customer/getCurrentUser",
    ROOT_CAT:'product/categoryTree',
    ROOT_CAT_ALIAS:'product/categoryTree?alias=',
    ALL_CAT:"product/category_list",
    PRODUCT_POPULAR_SEARCH:"product/popularSearch",
    PRODUCT:'product?id=',
    PRODUCT_SPECIFICATION:'product/specification?categoryId=',
    BUY_NOW:'product/buy-now-once',
    SEARCH_PRODUCT:'product/search',
    SEARCH_SIMILAR_PRODUCT:'product/similarSearch',
    ADD_WISHLIST:'product/wishlist',
    DELETE_WISHLIST:'product/deleteWishlist',
    GET_WISHLIST:'product/wishlist',
    ADD_CART:'product/cart',
    ADD_CART_BATCH:'product/add-cart-batch',
    DELETE_CART:'product/deleteCart',
    GET_CART:'product/cart',
    LOGOUT:'customer/logout',
    UPDATE_USER:'customer/update',
    UPLOAD_MEDIA:'media/uploadImage',
    ADD_CARD:'customer/paymentcard',
    UPDATE_CARD:'customer/updatecard',
    DELETE_CARD:'customer/deletecard',
    ADD_ADDRESS:'customer/address',
    GET_ORDER_DETAIL_BY_ID:'order/',
    DEFAULT_ADDRESS:'customer/defaultAddress',
    UPDATE_ADDRESS:'customer/updateaddress',
    DELETE_ADDRESS:"customer/deleteaddress",
    CHANGE_PASSWORD:"customer/changePassword",
    ORDER:"order",
    SEARCH_ORDER:'order/list',
    ORDER_PLACE:"order/complete",
    CANCEL_ORDER:'order/cancel',
    RETURN_ORDER:'order/return',
    TRACK_ORDER:'order/trackOrder',
    SHIPPING_CHARGES:'order/shippingCharges',
    COUPON:'coupon',
    COIN_REDEEM:'coupon/redeemCoins',
    COUPON_VERIFY:'coupon/verify',
    CAMPAIGN_VERIFY:'compaign/verify',
    REGISTRY:'registry',
    USER_REGISTRY:'registry/user',
    REGISTRY_DETAILS:'registry/registryById',
    DELETE_REGISTRY:'registry/delete',
    UPDATE_REGISTRY:'registry/Update',
    REGISTRY_PRODUCT:'registry/product',
    DELETE_REGISTRY:'registry/productDelete',
    UPDATE_REGISTRY:'registry/productUpdate',
    SUBSCRIPTION:'subscription',
   // SUBSCRIPTION_UPDATE:'subscription/update',
    PAYMENT_IPAY:'product/paymentAPI',
    PAYMENT_MPAISA:'product/paymentAPIMPaisa',
    MPESA_API1:'product/lipaNaMpesaOnline',
    MPESA_API2:'product/lipaNaMpesaOnlineCallback',
    STORE_LIST:'store/storeListFrontend',
    SUBSCRIPTION_ADD_OR_LIST:'productsubscriptions',
    //SUBSCRIPTION_UPDATE:'productsubscriptions/update',
    SUBSCRIPTION_UPDATE:'productsubscriptions/productUpdate',
    SUBSCRIPTION_DELETE:'productsubscriptions/delete/subscription',
    SUBSCRIPTION_EDIT:'productsubscriptions/productlist',
    // Add Product into List
    SUBSCRIPTION_ADD_PRODUCTS:'productsubscriptions/addproduct',
    SUBSCRIPTION__PRODUCTS_LIST:'productsubscriptions/productlist',
    SUBSCRIPTION_DELETE_PRODUCTS:'productsubscriptions/productDelete',
    SUBSCRIPTION_UPDATE_PRODUCTS:'productsubscriptions/productUpdate',

    //My Coupons PROFILE PAGE
    CAMPAIGN:"compaign",

  
};  

  