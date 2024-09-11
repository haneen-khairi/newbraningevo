import { useState, useEffect, useMemo } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConfigProvider } from "antd";
import routes from "./routes.jsx";
import RoutesContext from "./contexts/routesContext.js";
import { ResultContextProvider } from "./contexts/resultContext";
import PageInfoContextProvider from "./contexts/PageInfoContext.jsx";
import { lightTheme, darkTheme } from "./configs/theme.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import buildAbility from "@/utils/buildAbility.js";
import { useSelector, useDispatch } from "react-redux";
import { setAbility } from "./slices/AbilitySlice.js";
import { ThemeProvider } from "styled-components";
import ar_Eg from "antd/lib/locale/ar_EG";
import en_US from "antd/lib/locale/en_US";
import getUserHome from "./utils/getUserHome.js";
import Cookies from "js-cookie";
import hospitalityroutes from "./routes/hospitalityroutes.jsx";
import busroutes from "./routes/busroutes.jsx";
import viproutes from "./routes/viproutes.jsx";
import adminroutes from "./routes/adminroutes.jsx";

import AuthGuard from "./guards/authGuard.jsx";
import DashboardLayout from "./layouts/dashboard";
import commonRoutes from "./routes/commonroutes.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./pages/error.jsx";
import { Empty } from 'antd';
import EmptyImage from "@/assets/icons/empty.svg";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from './services/AuthConfig.js';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

function App() {

  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const userSpecificRoutes = routesFromUser(routes, user);
  const router = createHashRouter(userSpecificRoutes);

  function getDirectionFromLanguage() {
    return i18n.language === "ar" ? "rtl" : "ltr";
  }
  function getLocaleFromLanguage() {
    return i18n.language === "ar" ? ar_Eg : en_US;
  }

  useEffect(() => {
    if (user) {
      dispatch(setAbility(buildAbility(user)));
    }
  }, [user]);

  return (
<MsalProvider instance={msalInstance}>
        <QueryClientProvider client={client}>
          <RoutesContext.Provider value={{ routes: userSpecificRoutes }}>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
              <ConfigProvider
                  theme={theme === "light" ? lightTheme : darkTheme}
                  direction={getDirectionFromLanguage()}
                  locale={getLocaleFromLanguage()}
                  renderEmpty={
                    ()=>{
                      return (<div className={'flex flex-col gap-3'}>
                        <Empty image={EmptyImage} />
                      </div>)
                    }
                  }
              >
                <ResultContextProvider>
                  <PageInfoContextProvider>
                    <RouterProvider router={router} />
                  </PageInfoContextProvider>
                </ResultContextProvider>
              </ConfigProvider>
            </ThemeProvider>
          </RoutesContext.Provider>
        </QueryClientProvider>
        </MsalProvider>
  );
}
function routesFromUser(routes, user) {
  if (!user) {
    return [
      ...routes.filter((route) => !route.isPrivate),
      {
        path: "*",
        element: <Navigate to={"/auth/login"} />,
      },
    ];
  }
  const routesArray = [];
  const version = Cookies.get("version");
  if (version === "hospitality") {
    routesArray.push(...hospitalityroutes);
  }
  if (version === "bus") {
    routesArray.push(...busroutes);
  }
  if (version === "vip") {
    routesArray.push(...viproutes);
  }
  if (version === "admin") {
    routesArray.push(...adminroutes);
  }

  return [
    {
      path: "/",
      inNavbar: false,
      isPrivate: true,
      element: (
        <AuthGuard isPrivate>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        ...routesArray,
        ...commonRoutes,
        {
          index: true,
          path: "/*",
          element: <Navigate to={getUserHome(user)} />,
        },
      ],
    },
  ];
}
export default App;
