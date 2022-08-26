import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import S_DATA from '../DASH-DATA.json';
// Initial State



const initialState = {
  users: S_DATA
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
const [state] = useReducer(AppReducer, initialState);

return (
    <GlobalContext.Provider value={{users: state.users}}>
      {children}
    </GlobalContext.Provider>
  )
}