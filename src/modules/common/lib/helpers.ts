// address
export const shortAddress = (address: string, initialLength = 6, endLength = -4): string =>
  `${address.slice(0, initialLength)}...${address.slice(endLength)}`;
