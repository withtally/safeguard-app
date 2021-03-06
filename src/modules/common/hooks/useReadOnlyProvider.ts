import { useMemo } from 'react'
import { ethers, providers } from 'ethers'

interface Values {
  readOnlyProvider: providers.InfuraProvider
}

export const useReadOnlyProvider = (): Values => {
  // constants
  const readOnlyProvider = new ethers.providers.InfuraProvider(process.env.REACT_APP_ETHEREUM_NETWORK, process.env.REACT_APP_INFURA_ID);

  return { readOnlyProvider }
}
