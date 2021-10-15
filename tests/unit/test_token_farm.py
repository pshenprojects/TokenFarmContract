from brownie import network, exceptions
from scripts.utility_scripts import LOCAL_BLOCKCHAIN, get_account, get_contract, INITIAL_VALUE, DECIMALS
from scripts.deploy import deploy_token_and_farm
import pytest


def test_set_price_feed():
    if network.show_active() not in LOCAL_BLOCKCHAIN:
        pytest.skip("only local testing")
    account = get_account()
    non_owner = get_account(index=1)
    token_farm, dapp_token = deploy_token_and_farm()
    price_feed = get_contract("eth_usd_price_feed")
    token_farm.setPriceFeedContract(
        dapp_token.address, price_feed, {"from": account})
    assert token_farm.tokenPriceFeed(
        dapp_token.address) == price_feed
    with pytest.raises(exceptions.VirtualMachineError):
        token_farm.setPriceFeedContract(
            dapp_token.address, price_feed, {"from": non_owner})


def test_stake_tokens(amount_staked):
    if network.show_active() not in LOCAL_BLOCKCHAIN:
        pytest.skip("only local testing")
    account = get_account()
    token_farm, dapp_token = deploy_token_and_farm()
    dapp_token.approve(token_farm.address, amount_staked, {"from": account})
    token_farm.stakeTokens(
        amount_staked, dapp_token.address, {"from": account})
    assert(token_farm.stakingBalance(
        dapp_token.address, account.address) == amount_staked)
    assert token_farm.uniqueTokensStaked(account.address) == 1
    assert token_farm.stakers(0) == account.address
    return token_farm, dapp_token


def test_issue_tokens(amount_staked):
    if network.show_active() not in LOCAL_BLOCKCHAIN:
        pytest.skip("only local testing")
    account = get_account()
    token_farm, dapp_token = test_stake_tokens(amount_staked)
    starting_balance = dapp_token.balanceOf(account.address)

    token_farm.issueTokens({"from": account})

    assert(dapp_token.balanceOf(account.address)
           == starting_balance + INITIAL_VALUE * 10**(18 - DECIMALS))
