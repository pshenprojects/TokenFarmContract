import { useEthers, useTokenBalance } from "@usedapp/core";
import { Token } from "../Main";
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../BalanceMsg";
import { useReadTokenBalance } from "../../hooks/useReadTokenBalance";
import { constants } from "ethers"

export interface WalletBalanceProps {
    token: Token
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    const formattedBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg
        label={`your un-staked ${name} balance`}
        tokenImageSrc={image}
        amount={formattedBalance} />
    )
}

export const StakedBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    // console.log(account)
    const tokenBalance = useReadTokenBalance(address, account ? account : constants.AddressZero)
    // console.log(tokenBalance ? tokenBalance.toString() : "Oh no")
    const formattedBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg
        label={`your staked ${name} balance`}
        tokenImageSrc={image}
        amount={formattedBalance} />
    )
}