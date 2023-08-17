import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import {
  Home,
  Keyboards,
  Switches,
  Keycaps,
  Deskmats,
  Accessories,
  Cart,
  AboutUs,
  ContactUs,
  FAQ,
  RefundPolicy,
  TermsOfService,
  Checkout,
  MyAccount,
  OrderConfirmation,
  EmailVerification,
  OrderDetails,
  ForgotPassword,
  ResetPassword,
} from "./pages";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/keyboards", element: <Keyboards /> },
      { path: "/switches", element: <Switches /> },
      { path: "/keycaps", element: <Keycaps /> },
      { path: "/deskmats", element: <Deskmats /> },
      { path: "/accessories", element: <Accessories /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-confirmation", element: <OrderConfirmation /> },
      { path: "/myaccount", element: <MyAccount /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/FAQ", element: <FAQ /> },
      { path: "/refund-policy", element: <RefundPolicy /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/user/verify/:uniqueString", element: <EmailVerification /> },
      { path: "/order/:orderId", element: <OrderDetails /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:uniqueString/:email", element: <ResetPassword /> },
    ],
  },
]);

export default router;
