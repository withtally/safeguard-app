import { useMemo, useState, useEffect } from 'react';
import { ethers, providers } from 'ethers';
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider';
import constate from 'constate';
import Onboard from 'bnc-onboard';
import { API, Wallet } from 'bnc-onboard/dist/src/interfaces';
import { useToast } from '@chakra-ui/react';

type Values = {
  web3?: ethers.providers.Web3Provider;
  signer?: JsonRpcSigner;
  signerAddress: string;
  openSelectWallet: () => Promise<void>;
  isWeb3Ready: boolean;
  selectedWallet?: Wallet;
};

const useWeb3Constate = (): Values => {
  // chakra hooks
  const toast = useToast();

  // react hooks
  const [web3Provider, setWeb3Provider] = useState<providers.Web3Provider | undefined>(undefined);
  const [chainId, setChainId] = useState<number>(4);
  const [signerAddress, setSignerAddress] = useState<string>('');
  const [isWeb3Ready, setIsWeb3Ready] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>(undefined);
  const [onboard, setOnboard] = useState<API | undefined>(undefined);

  const getPreviousWallet = async () => {
    try {
      await onboard?.walletSelect();
    } catch (error) {
      console.log('🚀 ~ file: useWeb3.ts ~ line 61 ~ getPreviousWal ~ error', error);
    }
  };

  const signer = useMemo(() => {
    if (web3Provider) return web3Provider.getSigner();
  }, [web3Provider]);

  // handler
  const openSelectWallet = async (): Promise<void> => {
    try {
      await onboard?.walletSelect();
      await onboard?.walletCheck();
    } catch (error) {
      toast({
        status: 'warning',
        isClosable: true,
        description: 'To use this feature you must give us permission to access your address',
      });

      console.error('Error conecting to Wallet =>', error.message);
    }
  };

  // effects
  useEffect(() => {
    const onboard = Onboard({
      dappId: process.env.GATSBY_BLOCKNATIVE_ID,
      networkId: chainId,
      subscriptions: {
        address: (address) => {
          setSignerAddress(address);
          setIsWeb3Ready(true);
        },
        wallet: (wallet) => {
          if (wallet.provider) {
            const web3 = new ethers.providers.Web3Provider(wallet.provider);
            setWeb3Provider(web3);
            setSelectedWallet(wallet);
          }
        },
        network: setChainId,
      },
      walletSelect: {
        wallets: [
          { walletName: 'metamask', preferred: true },
          { walletName: 'gnosis', preferred: true },
        ],
      },
      walletCheck: [
        { checkName: 'derivationPath' },
        { checkName: 'connect' },
        { checkName: 'accounts' },
        { checkName: 'network' },
      ],
    });
    setOnboard(onboard);
    getPreviousWallet();
  }, [chainId]);

  return {
    web3: web3Provider,
    signer,
    signerAddress,
    openSelectWallet,
    isWeb3Ready,
    selectedWallet,
  };
};

const [Web3Provider, useWeb3] = constate(useWeb3Constate);

export { Web3Provider, useWeb3 };
