import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/store/user/slice";
import cartReducer from "@/store/cart/slice";
import { cartApi } from "@/store/cart/cartApi";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    [cartApi.reducerPath]: cartApi.reducer,
});

export default rootReducer;
