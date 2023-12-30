import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Login from "./routes/Login";
import Billetera from "./routes/Billetera";
import Historial from "./routes/Historial";
import Reglas from "./routes/Reglas";
import Variable from "./routes/Variable";
import Currencies from "./routes/Currencies";
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "Billetera",
    element: <Billetera />,
  },
  {
    path: "Historial",
    element: <Historial />,
  },
  {
    path: "Reglas",
    element: <Reglas />,
  },
  {
    path: "Variable",
    element: <Variable />,
  },
  {
    path: "Currencies",
    element: <Currencies />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
