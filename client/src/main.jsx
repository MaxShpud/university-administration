import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';
import { UserProvider } from './context/UserContext.jsx'
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <UserProvider>
      <App/>
    </UserProvider>
  </MantineProvider>,
)
