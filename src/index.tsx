import React from "react";
import ReactDOM from "react-dom";
import SafeProvider from "@gnosis.pm/safe-apps-react-sdk";
import { ChakraProvider, Text, CircularProgress } from "@chakra-ui/react";

// common
import "modules/common/lib/styles.css";
import theme from "modules/common/theme";
import { Web3Provider } from "modules/common/hooks/useWeb3";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SafeProvider
        loader={
          <>
            <Text size="md">Waiting for Safe...</Text>
            <CircularProgress isIndeterminate color="green.300" />
          </>
        }
      >
        <Web3Provider>
          <App />
        </Web3Provider>
      </SafeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
