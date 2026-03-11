import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/store/user/slice";
import cartReducer from "@/store/cart/slice";
import ordersReducer from "@/store/orders/slice";
import { cartApi } from "@/store/cart/cartApi";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    orders: ordersReducer,
    [cartApi.reducerPath]: cartApi.reducer,
});

export default rootReducer;
