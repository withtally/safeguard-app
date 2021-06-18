import React from 'react';
import ReactDOM from 'react-dom';
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import { ChakraProvider, Text, CircularProgress } from '@chakra-ui/react';

// common
import 'modules/common/lib/styles.css';
import theme from 'modules/common/theme';
import { Web3Provider } from 'modules/common/hooks/useWeb3';

// fonts
import 'typeface-open-sans';
import 'typeface-inter';
import 'typeface-montserrat';
import 'typeface-source-code-pro';
import 'typeface-dm-sans';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <App />
      </Web3Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
