import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import ReactGA from 'react-ga';
import router from './routes';
import { theme as appTheme } from './styles/theme';
import './styles/index.scss';

ReactGA.initialize('G-F6Z8VN2LTY');

ReactGA.send({
  hitType: 'pageview',
  page: window.location.pathname,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: appTheme.mainColor,
            colorText: appTheme.textColor,
            colorTextHeading: appTheme.mainColor,
            colorSuccess: appTheme.mainColor,
            colorSuccessActive: appTheme.mainColor,
            fontSize: 18,
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
