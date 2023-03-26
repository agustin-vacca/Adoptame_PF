import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";

const {VITE_DOMAIN,VITE_CLIENT_ID,VITE_AUDIENCE}=import.meta.env;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain={VITE_DOMAIN}
    clientId={VITE_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    audience='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'//{VITE_AUDIENCE}
    scope='openid profile email'
  >
    <App />
  </Auth0Provider>,
  </React.StrictMode>,
)
