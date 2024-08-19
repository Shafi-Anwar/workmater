// context.js
import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [state, setState] = useState(null);
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
