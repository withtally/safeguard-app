/// <reference types="react-scripts" />
type EthereumNetwork = "mainnet" | "rinkeby";
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    REACT_APP_ETHEREUM_NETWORK: EthereumNetwork;
    REACT_APP_TALLY_REST_API: string;
    REACT_APP_BLOCKNATIVE_ID: string;
    REACT_APP_INFURA_ID: string;
  }
}

interface Window {
  ethereum: any;
}

window.ethereum = window.ethereum || {};