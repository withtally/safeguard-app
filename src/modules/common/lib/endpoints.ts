export const ENDPOINTS = {
  users: {
    profiles: {
      all: (addresses: string[]): string => {
        const addressesQuery = addresses.reduce((acc, address, index) => {
          return `${acc}${index === 0 ? '' : '&'}addresses[]=${address}`;
        }, '');

        return `/user/profiles/by/address?${addressesQuery}`;
      },
    },
  },
};
