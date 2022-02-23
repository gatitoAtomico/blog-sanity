// src/context/state.js
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [allBlogs, setAllBlogs] = useState();
  const [initialBlogs, setInitialBlogs] = useState();
  const [searchQuery, setSearchQuery] = useState();

  const populateBlogList = (blogList) => {
    setAllBlogs([...blogList].slice(0, 3));
  };

  const paginate = (blogsList, previous, next) => {
    setAllBlogs([...blogsList].slice(previous, next));
  };

  const searchBlogs = (blogsList, searchQuery, pageSlice) => {
    setAllBlogs(
      [...blogsList]
        .filter((a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, pageSlice)
    );
  };

  let sharedState = {
    allBlogs,
    populateBlogList,
    setAllBlogs,
    paginate,
    searchBlogs,
    initialBlogs,
    setInitialBlogs,
    searchQuery,
    setSearchQuery,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
