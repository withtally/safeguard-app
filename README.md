# Tally SafeGuard App

## Project Abstract

SafeGuard governance accountability tool built around the Gnosis Safe multisig. It's a multisig system that allows governance to retain veto power over Gnosis Safe contracts, and allows governance to reclaim funds entrusted to multsig holders without requiring multisig signatories approval.

Example use cases include giving final veto power on the execution of multisig transactions to token holders, and the ability to reclaim funds from a multisig where the signatories are unable or unwilling to sign a refund transaction.

## More information about SafeGuard

- Go to SafeGuard contracts repo to get more information about the implementation and flows
  - [SafeGuard contract repo](https://github.com/withtally/failsafe)

## Getting Started

Install dependencies and start a local dev server.

```
yarn install
cp .env.sample .env
yarn start
```

Then:

- If HTTPS is used (by default enabled)
  - Open your Safe app locally (by default via https://localhost:3000/) and accept the SSL error.
- Go to Safe Multisig web interface
  - [Mainnet](https://app.gnosis-safe.io)
  - [Rinkeby](https://rinkeby.gnosis-safe.io/app)
- Create your test safe
- Go to Apps -> Manage Apps -> Add Custom App
- Paste your localhost URL, default is https://localhost:3000/
- You should see Safe App Starter as a new app
- Review your changes from there

## Dependencies

- [`ethers`](https://github.com/ethers-io/ethers.js) (Library for interacting with Ethereum)
- [`onboardJS`](https://github.com/blocknative/onboard) (Library for enable wallet selection)
