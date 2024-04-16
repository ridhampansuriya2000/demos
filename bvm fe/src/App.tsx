import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";

import "./App.css";
import Router from "./Router";
import { theme } from "./MUI";
import { Provider } from "react-redux";
import store from "./Redux/index";

import { AuthContextProvider } from "./Context/AuthContext";
import { ChatContextProvider } from "./Context/ChatContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthContextProvider>
          <ChatContextProvider>
            <StyledEngineProvider injectFirst={true}>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </StyledEngineProvider>
          </ChatContextProvider>
        </AuthContextProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
