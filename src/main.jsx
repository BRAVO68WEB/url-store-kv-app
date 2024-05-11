import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Auth0Provider } from "@auth0/auth0-react";

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home.jsx'
import Updatekey from './components/UpdateKey.jsx';
import ViewKey from './components/ViewKeys.jsx';
import CreateKey from './components/CreateKey.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/view",
    element: <ViewKey />,
  },
  {
    path: "/update/:key",
    element: <Updatekey />,
    loader: async ({ params }) => {
      const key = params.key
      return {
        key
      }
    }
  },
  {
    path: "/create",
    element: <CreateKey />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        max_age: 3600,
        scope: 'openid profile email',
      }}
      cacheLocation='localstorage'
      useRefreshTokens={true}
    >
      <RouterProvider router={router} />
      <ToastContainer />
    </Auth0Provider>
  </React.StrictMode>,
)
