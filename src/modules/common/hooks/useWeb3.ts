import { useMemo } from "react";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { SafeAppProvider } from "@gnosis.pm/safe-apps-provider";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers/lib/json-rpc-provider";
import constate from "constate";

type Values = {
  web3: ethers.providers.Web3Provider;
  signer: JsonRpcSigner | undefined;
  signerAddress: string;
};

const useWeb3Constate = (): Values => {
  // gnosis hooks
  const { sdk, safe } = useSafeAppsSDK();

  // variables
  const web3Provider = useMemo(
    () => new ethers.providers.Web3Provider(new SafeAppProvider(safe, sdk)),
    [sdk, safe]
  );

  const signer = useMemo(() => {
    if (web3Provider) return web3Provider.getSigner();
  }, [web3Provider]);

  const signerAddress = useMemo(() => {
    return safe.safeAddress;
  }, [safe]);

  return {
    web3: web3Provider,
    signer,
    signerAddress,
  };
};

const [Web3Provider, useWeb3] = constate(useWeb3Constate);

export { Web3Provider, useWeb3 };
