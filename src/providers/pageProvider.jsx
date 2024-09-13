import React, { createContext, useState, useContext, useEffect } from "react";
import Home from "../pages/home";
import AppIdGenerator from "../pages/features/app-id-generator";
import AppIdGeneratorResult from "../pages/features/app-id-generator/result";
import TestAccountGenerator from "../pages/features/test-account";
import TestAccountGeneratorResult from "../pages/features/test-account/result";
import Changelog from "../pages/changelog";
import Settings from "../pages/settings";
import CookieHelper from "../helpers/cookie";
import { COOKIE } from "../constants";
import { UseTheme } from "@deriv-com/quill-ui";
import QuillTokens from "../pages/features/quill-tokens";
import TokenDetails from "../pages/features/quill-tokens/details";

const pages = {
  home: <Home />,
  "app-id-generator": <AppIdGenerator />,
  "app-id-generator-result": <AppIdGeneratorResult />,
  "test-account-generator": <TestAccountGenerator />,
  "test-account-generator-result": <TestAccountGeneratorResult />,
  changelog: <Changelog />,
  settings: <Settings />,
  "quill-tokens": <QuillTokens />,
  "token-details": <TokenDetails />,
};

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const { getCookie, setCookie } = CookieHelper;
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState({});
  const [settings, setSettings] = useState({
    is_dark_mode: false,
  });

  const { toggleTheme } = UseTheme();

  const setPageData = (newData) => {
    const mergedData = { ...data, ...newData };

    setData(mergedData);
  };

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  const navigateTo = (pageName) => {
    if (pages[pageName]) {
      setCurrentPage(pageName);
    } else {
      console.error(`Page "${pageName}" does not exist.`);
    }
  };

  useEffect(() => {
    const isDarkMode = settings.is_dark_mode;

    toggleTheme(isDarkMode ? "dark" : "light");

    setCookie(COOKIE.IS_DARK_MODE, isDarkMode, 999);
  }, [settings]);

  useEffect(() => {
    updateSettings({
      is_dark_mode: !!getCookie(COOKIE.IS_DARK_MODE),
    });
  }, []);

  return (
    <PageContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        pageComponent: pages[currentPage],
        navigateTo,
        pages,
        pageData: data,
        setPageData,
        settings,
        setSettings: updateSettings,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};
