"use client";

import { createContext, useContext, useState } from "react";

export const ToggleMenuProvider = ({ children }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  const toggleMenuVisible = () => {
    setMenuVisible(!isMenuVisible);
    setBurgerOpen(!burgerOpen);
  };

  return (
    <ToggleMenuContext.Provider
      value={{
        isMenuVisible,
        setMenuVisible,
        burgerOpen,
        setBurgerOpen,
        toggleMenuVisible,
      }}
    >
      {children}
    </ToggleMenuContext.Provider>
  );
};

export const ToggleMenuContext = createContext();

export const useToggleMenuContext = () => {
  const context = useContext(ToggleMenuContext);
  return context;
};

//
