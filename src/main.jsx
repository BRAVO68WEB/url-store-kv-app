import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { LogtoProvider } from '@logto/react';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home.jsx'
import Updatekey from './pages/UpdateKey.jsx';
import ViewKey from './pages/ViewKeys.jsx';
import CreateKey from './pages/CreateKey.jsx';
import Callback from './pages/Callback.jsx';

const config = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
};

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
  },
  {
    path: "/callback",
    element: <Callback />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LogtoProvider config={config}>
      <RouterProvider router={router} />
      <ToastContainer />
    </LogtoProvider>
  </React.StrictMode>,
)
