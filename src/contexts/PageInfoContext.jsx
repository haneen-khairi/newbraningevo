import { createContext, useState, useContext } from "react";
export const PageInfoContext = createContext();

export const usePageInfo = () => {
  const context = useContext(PageInfoContext);
  if (context === undefined) {
    throw new Error(
      "usePageInfo must be used within a PageInfoContextProvider"
    );
  }
  return context;
};
export default function PageInfoContextProvider({ children }) {
  const [pageInfo, setPageInfo] = useState({
    title: "home",
    hasSideBar: false,
    hasNavbar: true,
  });

  return (
    <PageInfoContext.Provider
      value={{
        pageInfo,
        setPageInfo,
      }}
    >
      {children}
    </PageInfoContext.Provider>
  );
}
