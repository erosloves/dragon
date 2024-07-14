import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext();
export const NotificationContextProvider = ({ children }) => {
  const [isNotifyVisible, setNotifyVisible] = useState(false);
  const [notifyData, setNotifyData] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setNotifyVisible(false);
    }, 2000);
  }, [isNotifyVisible]);
  return (
    <NotificationContext.Provider
      value={{ isNotifyVisible, setNotifyVisible, notifyData, setNotifyData }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
