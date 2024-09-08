import React, { createContext, useState, useContext } from "react";
import Home from "../pages/home";
import AppIdGenerator from "../pages/features/app-id-generator";
import AppIdGeneratorResult from "../pages/features/app-id-generator/result";
import TestAccountGenerator from "../pages/features/test-account";
import TestAccountGeneratorResult from "../pages/features/test-account/result";
import Changelog from "../pages/changelog";

const pages = {
  home: <Home />,
  "app-id-generator": <AppIdGenerator />,
  "app-id-generator-result": <AppIdGeneratorResult />,
  "test-account-generator": <TestAccountGenerator />,
  "test-account-generator-result": <TestAccountGeneratorResult />,
  changelog: <Changelog />,
};

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState({});

  const setPageData = (newData) => {
    const mergedData = { ...data, ...newData };

    setData(mergedData);
  };

  const navigateTo = (pageName) => {
    if (pages[pageName]) {
      setCurrentPage(pageName);
    } else {
      console.error(`Page "${pageName}" does not exist.`);
    }
  };

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
