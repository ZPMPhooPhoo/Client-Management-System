import React, { createContext, useState } from "react";

interface AppContextType {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({
  sidebarOpen: true,
  setSidebarOpen: () => {},
});

type AppProviderProps = {
    children: React.ReactNode;
}

const AppProvider: React.FC <AppProviderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      { children }
    </AppContext.Provider>
  );
};

export default AppProvider;