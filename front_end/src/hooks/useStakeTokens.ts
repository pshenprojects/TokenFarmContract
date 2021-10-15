import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20Token from "../chain-info/contracts/MockWETH.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import { Contract } from "@usedapp/core/node_modules/@ethersproject/contracts"
import { useEffect, useState } from "react"

export const useStakeTokens = (tokenAddress: string) => {
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const TokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(TokenFarmAddress, tokenFarmInterface)

    const { abi: erc20ABI } = ERC20Token
    const erc20Interface = new utils.Interface(erc20ABI)
    const ERC20Contract = new Contract(tokenAddress, erc20Interface)

    const { send: approveERC20Send, state: approveERC20State } =
        useContractFunction(ERC20Contract, "approve", { transactionName: "Approve ERC20 Transfer" })

    const approveAndStake = (amount: string) => {
        setStakeAmount(amount)
        return approveERC20Send(TokenFarmAddress, amount)
    }
    const [state, setState] = useState(approveERC20State)

    const { send: stakeSend, state: stakeState } =
        useContractFunction(tokenFarmContract, "stakeTokens", { transactionName: "Stake Tokens" })

    const [stakeAmount, setStakeAmount] = useState("0")

    useEffect(() => {
        if (approveERC20State.status === "Success") {
            stakeSend(stakeAmount, tokenAddress)
        }

    }, [approveERC20State, stakeAmount, tokenAddress])

    useEffect(() => {
        if (approveERC20State.status === "Success") {
            setState(stakeState)
        } else {
            setState(approveERC20State)
        }
    }, [approveERC20State, stakeState])

    return { approveAndStake, state }
}