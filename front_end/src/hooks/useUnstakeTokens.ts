import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import { Contract } from "@usedapp/core/node_modules/@ethersproject/contracts"

export const useUnstakeTokens = (tokenAddress: string) => {
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const TokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(TokenFarmAddress, tokenFarmInterface)

    const { send: stakeSend, state: unstakeState } =
        useContractFunction(tokenFarmContract, "unstakeTokens", { transactionName: "Unstake Tokens" })

    const unstakeAll = () => {
        return stakeSend(tokenAddress)
    }

    return { unstakeAll, unstakeState }
}