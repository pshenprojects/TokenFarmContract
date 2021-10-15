# TokenFarmContract
Following the final tutorial at https://www.youtube.com/watch?v=M576WGiDBdQ

Smart contracts written in Solidity to be deployed on a compatible blockchain. This 'Token Farm' holds compatible tokens from users, and can pay out in its own token based on the price in USD of the users' holdings, determined through Chainlink's price feeds.

The contract deployments are handled with [Brownie](https://github.com/eth-brownie/brownie) and written in Python, while the front-end interface is done with React programming in Typescript. If downloading and running this code yourself, make sure to install the node module dependencies.

Although the video tutorial was used as reference, no code was actually copied from their provided repositories.

The brownie-config.yaml file is very barebones, as this work was only tested on a Ganache chain. Deploying on a more permanent basis, either to a test net or a real blockchain with real money involved, will require some additional code to handle and reference existing token and price feed contracts.
