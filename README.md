# TokenFarmContract
Following the final tutorial at https://www.youtube.com/watch?v=M576WGiDBdQ

Smart contracts written in [Solidity](https://github.com/ethereum/solidity) to be deployed on a compatible blockchain. This 'Token Farm' holds compatible tokens from users, and can pay out in its own token based on the price in USD of the users' holdings, determined through [Chainlink's](https://github.com/smartcontractkit/chainlink) price feeds.

The contract deployments are handled with [Brownie](https://github.com/eth-brownie/brownie) and written in Python, while the front-end interface is done with [React](https://github.com/facebook/react/) programming in Typescript. If downloading and running this code yourself, make sure to install the node module dependencies.

Although the video tutorial was used as reference, no code was actually copied from their provided repositories.

The brownie-config.yaml file is very barebones, as this work was only tested on a [Ganache](https://github.com/trufflesuite/ganache-ui) chain. Deploying to a blockchain that exists beyond your local machine, either to a test network such as [Kovan](https://kovan-testnet.github.io/website/) or [Rinkeby](https://www.rinkeby.io/), or a more real blockchain with real money (or money-equivalent) involved, will require some additional code to handle and reference existing token and price feed contracts.

The front end website works with the [MetaMask](https://docs.metamask.io/guide/) browser extension, which is required to interact with it.
