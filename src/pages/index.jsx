import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Suspense } from '@/utils'; // Ehtimol bu custom Suspense wrapper

// Sahifalar (lazy load qilingan)
const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Shop = lazy(() => import("./shop/Shop"));
const ProductDetail = lazy(() => import("../pages/detail/detailpage"));
const Cart = lazy(() => import("../pages/cart/cart"));
const Checkout = lazy(() => import("../pages/layout/checkout/Checkoutpage"));
const ContactPage = lazy(() => import("./Contact/Contact"));
const MyOrders = lazy(() => import("./layout/Orders/Orders"));

const MainRouters = () => {
  return useRoutes([
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
          path: "/product/:id",
          element: (
            <Suspense>
              <ProductDetail />
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
              <ContactPage />
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
      ],
    },
  ]);
};

export default MainRouters;
