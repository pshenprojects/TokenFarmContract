import { useContractCall, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"

export const useGetOwner = () => {
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const TokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const [ownerAddress] = useContractCall({
        abi: tokenFarmInterface,
        address: TokenFarmAddress,
        method: 'owner',
        args: []
    }) ?? []
    return ownerAddress
}