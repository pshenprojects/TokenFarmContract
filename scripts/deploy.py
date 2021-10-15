from scripts.utility_scripts import get_contract, get_account, deployMocks
from brownie import DappToken, TokenFarm
import yaml
import json
import os
import shutil

KEPT_BALANCE = 100 * 10**18


def deploy_token_and_farm(update=False, mocks=False):
    account = get_account()
    if mocks:
        deployMocks()
    dapp_token = DappToken.deploy({"from": account})
    token_farm = TokenFarm.deploy(dapp_token.address, {"from": account})
    tx = dapp_token.transfer(
        token_farm.address, dapp_token.totalSupply() - KEPT_BALANCE, {"from": account})
    tx.wait(1)
    weth_token = get_contract("weth_token")
    fau_token = get_contract("fau_token")
    dict_token_prices = {
        dapp_token: get_contract("dai_usd_price_feed"),
        fau_token: get_contract("dai_usd_price_feed"),
        weth_token: get_contract("eth_usd_price_feed"),
    }
    add_allowed_tokens(token_farm, dict_token_prices, account)
    if update:
        update_front_end()
    return token_farm, dapp_token


def add_allowed_tokens(token_farm, dict_allowed_tokens, account):
    for token in dict_allowed_tokens:
        add_tx = token_farm.addAllowedToken(token.address, {"from": account})
        add_tx.wait(1)
        set_tx = token_farm.setPriceFeedContract(
            token.address, dict_allowed_tokens[token], {"from": account})
        set_tx.wait(1)
    return token_farm


def update_front_end():
    copy_folders("./build", "./front_end/src/chain-info")
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front_end/src/brownie-config.json", "w") as config_json:
            json.dump(config_dict, config_json)


def copy_folders(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_token_and_farm(update=True, mocks=True)
