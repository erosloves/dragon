"use client";
import useNonInitialEffect from "@/hooks/useNonInitialEffect";
import useNonInitialRender from "@/hooks/useNonInitialRender";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
interface ToggleMenuProviderType {
  isMenuVisible: boolean;
  burgerOpen: boolean;
  toggleMenuVisible: () => void;
}

export const ToggleMenuContext = createContext<ToggleMenuProviderType>({
  isMenuVisible: false,
  burgerOpen: false,
  toggleMenuVisible: () => {},
});

export const ToggleMenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const toggleMenuVisible = () => {
    setMenuVisible(!isMenuVisible);
    setBurgerOpen(!burgerOpen);
  };

  return (
    <ToggleMenuContext.Provider
      value={{ isMenuVisible, burgerOpen, toggleMenuVisible }}
    >
      {children}
    </ToggleMenuContext.Provider>
  );
};

export const useToggleMenuContext = () => {
  const context = useContext(ToggleMenuContext);
  return context;
};

//
