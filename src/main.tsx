import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { route } from './App.tsx';
import CartProvider from './contexts/CartContext.tsx';
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={route} />
    </CartProvider>
  </StrictMode>
)
