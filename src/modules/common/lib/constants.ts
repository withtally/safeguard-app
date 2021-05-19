import { Routes } from "modules/common/lib/types";

// TODO: figure out a better way to manage route access
export const ALLOWED_PATH_BY_ROLE: Routes = {
  admin: ["/administrator", "/administrator/fund"],
  manager: ["/manager"],
};

export const CONTRACT_ADDRESSES = {
  timelock: {
    rinkeby: '0xa893387a0e28fAa32433d2Cd0389229EfF10F46B',
    mainnet: ''
  },
  token: {
    rinkeby: '0x73fD569048ED2749ef2CA78fC4Da65C52F08916f',
    mainnet: ''
  },
  rolManager: {
    rinkeby: '0x457275b1C83a466F2DfA8b9eb89A1483d7F974eE',
    mainnet: ''
  },
};


export const ROLES_HASHES = {
  adminRole: '0x95c635045ba2ff79d717ac1815074771bdf7fddb40217415c477a5dc34189cb5',
  proposerRole: '0xb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1',
  executorRole: '0xd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63',
  cancelerRole: '0xebfdca8e46c0b8dacf9989ee613e35727eadd20a1d5e5ad01a53968c7e5fe07a',
}
