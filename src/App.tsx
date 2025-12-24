import { createBrowserRouter } from "react-router";

import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { DetalhesProduto } from "./pages/detail"
import { ErrorPage } from "./pages/error"

export const route = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/detail/:id",
        element: <DetalhesProduto/>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />
  }
])