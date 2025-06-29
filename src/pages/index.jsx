// src/pages/MainRouters.jsx
import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Suspense } from "@/utils"; // yoki oddiy React.Suspense ishlatyapsiz bo‘lsa, o‘zgartiring

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Shop = lazy(() => import("./shop/Shop"));
const ProductDetail = lazy(() => import("./detail/detailpage"));
const Cart = lazy(() => import("./cart/cart"));
const Checkout = lazy(() => import("./layout/checkout/Checkoutpage"));
const Contact = lazy(() => import("./Contact/Contact"));
const MyOrders = lazy(() => import("./layout/Orders/Orders"));
const LikedPage = lazy(() => import("./layout/Like/Liked"));
const Blog = lazy(() => import("../../src/components/pages/blog/Blog"));
const SinglePost = lazy(() => import("../../src/components/pages/blog/SinglePost"));

const MainRouters = () =>
  useRoutes([
    {
      path: "/",
      element: (
        <Suspense>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/shop",
          element: (
            <Suspense>
              <Shop />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "/checkout",
          element: (
            <Suspense>
              <Checkout />
            </Suspense>
          ),
        },
        {
          path: "/contact",
          element: (
            <Suspense>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: "/product/:id",
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          ),
        },
        {
          path: "/my-orders",
          element: (
            <Suspense>
              <MyOrders />
            </Suspense>
          ),
        },
        {
          path: "/liked",
          element: (
            <Suspense>
              <LikedPage />
            </Suspense>
          ),
        },
        {
          path: "/blog",
          element: (
            <Suspense>
              <Blog />
            </Suspense>
          ),
        },
        {
          path: "/blog/:slug",
          element: (
            <Suspense>
              <SinglePost/>
            </Suspense>
          ),
        },
      ],
    },
  ]);

export default MainRouters;
