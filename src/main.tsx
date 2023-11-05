import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import router from './routes';
import { theme as appTheme } from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: appTheme.mainColor,
            colorText: appTheme.textColor,
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
