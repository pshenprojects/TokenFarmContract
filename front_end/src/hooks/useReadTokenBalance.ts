import { useContractCall, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"

export const useReadTokenBalance = (tokenAddress: string, userAddress: string) => {
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const TokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const [stakedBalance] = useContractCall({
        abi: tokenFarmInterface,
        address: TokenFarmAddress,
        method: 'getUserSingleTokenBalance',
        args: [userAddress, tokenAddress]
    }) ?? []
    return stakedBalance
}