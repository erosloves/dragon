import { createContext, useState } from "react";

const SwiperSwitcherContext = createContext();
const SwiperSwitcherContextProvider = ({ children }) => {
  const [switchers, setSwitchers] = useState([]);
  return (
    <SwiperSwitcherContext.Provider value={{ switchers, setSwitchers }}>
      {children}
    </SwiperSwitcherContext.Provider>
  );
};

export { SwiperSwitcherContext, SwiperSwitcherContextProvider };
