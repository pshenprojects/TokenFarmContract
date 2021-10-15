from brownie import (
    accounts,
    network,
    config,
    MockV3Aggregator,
    MockWETH,
    MockDAI,
    Contract,
    interface,
)

FORKED_LOCAL = ["mainnet-fork-alchemy"]
LOCAL_BLOCKCHAIN = ["development", "ganache-local"]


def get_account(index=None):
    if index:
        return accounts[index]
    if (
        network.show_active() in LOCAL_BLOCKCHAIN
        or network.show_active() in FORKED_LOCAL
    ):
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])


contract_mocks = {
    "eth_usd_price_feed": MockV3Aggregator,
    "dai_usd_price_feed": MockV3Aggregator,
    "weth_token": MockWETH,
    "fau_token": MockDAI,
}


def get_contract(contract_name):
    contract_type = contract_mocks[contract_name]
    if network.show_active() in LOCAL_BLOCKCHAIN:
        if len(contract_type) <= 0:
            deployMocks()
        contract = contract_type[-1]
    else:
        contract_address = config["networks"][network.show_active(
        )][contract_name]
        contract = Contract.from_abi(
            contract_type._name, contract_address, contract_type.abi
        )
    return contract


DECIMALS = 8
INITIAL_VALUE = 3000 * 10 ** DECIMALS


def deployMocks(dec=DECIMALS, initial=INITIAL_VALUE):
    account = get_account()
    MockV3Aggregator.deploy(dec, initial, {"from": account})
    mock_WETH = MockWETH.deploy({"from": account})
    mock_DAI = MockDAI.deploy({"from": account})
