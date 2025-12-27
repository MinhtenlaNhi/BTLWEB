
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router";
import About from "./pages/About/about";
import Home from "@/pages/Home/Home";
import Product from "@/pages/product";
import PaymentMethod from "@/pages/payment";
import Cart from "@/pages/cart";
import DetailProduct from "@/pages/product/DetailProduct";
import SearchProduct from "@/pages/product/SearchProduct";
import Auth from "./pages/auth/Auth";
import ForgotPassword from "@/pages/forgotPassword";
import ForgotPasswordOTP from "@/pages/forgotPasswordOTP";
import ResetPassword from "@/pages/resetPassword/ResetPassword";
import Checkout from "@/pages/checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import Account from "@/pages/account/Account";
import ProductOfCategory from "./pages/product/ProductOfCategory";
import OrderUser from "./pages/account/OrderUser";
import BackgroundUser from "./pages/account/BackgroundUser";
import AddressUser from "./pages/account/AddressUser";
import SettingUser from "./pages/account/SettingUser";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} path="/"/>
          <Route element={<About />} path="about" />
          <Route element={<Product />} path="products" />
          <Route element={<ProductOfCategory />} path="/:slugCategory" />
          <Route element={<DetailProduct />} path="detail-product/:slug" />
          <Route element={<SearchProduct />} path="products/search" />
          <Route element={<PaymentMethod />} path="method-payment" />
          <Route element={<Cart />} path="cart" />
          <Route element={<Auth />} path="auth" />
          <Route element={<ForgotPassword />} path="forgot-password"/>
          <Route element={<ForgotPasswordOTP />} path="forgot-password/otp"/>
          <Route element={<ResetPassword />} path="forgot-password/reset"/>
          <Route element={<Checkout />} path="/checkout"/>
          <Route element={<CheckoutSuccess />} path="/checkout/success"/>
          <Route element={<Account />} path="/account">
            <Route element={<BackgroundUser />} path="user"/>
            <Route element={<OrderUser />} path="order"/>
            <Route element={<AddressUser />} path="address"/>
            <Route element={<SettingUser />} path="setting"/>

          </Route>

  
        </Route>
      </Routes>
    </>
  );
}

export default App;
