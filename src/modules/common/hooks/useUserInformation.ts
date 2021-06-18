import { useEffect, useState } from 'react';

// common
import { axivios } from 'modules/common/lib/axivios';
import { ENDPOINTS } from 'modules/common/lib/endpoints';

type Address = {
  address: string;
};

type Information = {
  tallyId: number | null;
  displayName: string;
  description: string | null;
  avatarUrl: string | null;
  twitterUsername: string | null;
  source: string | null;
  attestationUrl: string | null;
  addresses: Address[];
};

export type UsersInformation = {
  [key: string]: Information;
};

type Values = {
  usersInformation: UsersInformation;
  isLoading: boolean;
};

type Props = {
  addresses?: string[];
};

const DEFAULT_USER_INFORMATION = {
  tallyId: null,
  displayName: null,
  description: null,
  avatarUrl: null,
  twitterUsername: null,
  source: null,
  attestationUrl: null,
  addresses: [],
};

export const useUserInformation = ({ addresses }: Props): Values => {
  // react hooks
  const [usersInformation, setUsersInformation] = useState<UsersInformation>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // constants
  const hasAddresses = addresses ? addresses.length > 0 : false;

  // methods
  const getUsersInformation = async () => {
    if (addresses) {
      setIsLoading(true);

      const usersInformationResponse = await axivios()
        .url(ENDPOINTS.users.profiles.all(addresses))
        .get()
        .json();

      const usersInformation: UsersInformation = usersInformationResponse.data.usersByAddress;

      const usersInformationWithDefaults = Object.fromEntries(
        addresses.map((address) => {
          const selectedUser = usersInformation[address];

          const doesAddressExistInUsersInformation = usersInformation.hasOwnProperty(address);

          const informationWithDefaults = doesAddressExistInUsersInformation
            ? selectedUser
            : {
                ...DEFAULT_USER_INFORMATION,
                displayName: address,
              };

          return [address, informationWithDefaults];
        }),
      );

      setUsersInformation(usersInformationWithDefaults);
      setIsLoading(false);
    }
  };

  // effects
  useEffect(() => {
    if (!hasAddresses) return;

    getUsersInformation();
  }, [addresses]);

  return { usersInformation, isLoading };
};
