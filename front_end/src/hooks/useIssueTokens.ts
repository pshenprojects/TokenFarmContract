import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import { Contract } from "@usedapp/core/node_modules/@ethersproject/contracts"

export const useIssueTokens = () => {
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const TokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(TokenFarmAddress, tokenFarmInterface)

    const { send: issueSend, state: issueState } =
        useContractFunction(tokenFarmContract, "issueTokens", { transactionName: "Issue Tokens" })

    const issueAll = () => {
        return issueSend()
    }

    return { issueAll, issueState }
}