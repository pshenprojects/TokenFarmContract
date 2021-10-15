import { useEthers } from "@usedapp/core"
// import HelperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import dapp from "../dapp.png"
import dai from "../dai.png"
import weth from "../eth.png"
import { YourWallet } from "./yourWallet/YourWallet"
import { makeStyles } from "@material-ui/core"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {
    const { chainId } = useEthers()
    // const networkName = chainId ? HelperConfig[chainId] : "ganache-local"
    // console.log(chainId)
    // console.log(networkName)
    const classes = useStyles()
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    // const TokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? networkMapping[String(chainId)]["MockWETH"][0] : constants.AddressZero
    const fauTokenAddress = chainId ? networkMapping[String(chainId)]["MockDAI"][0] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        { image: dapp, address: dappTokenAddress, name: "DAPP" },
        { image: dai, address: wethTokenAddress, name: "DAI" },
        { image: weth, address: fauTokenAddress, name: "WETH" }
    ]
    return (<>
        <h2 className={classes.title}>Dapp Token App</h2>
        <YourWallet supportedTokens={supportedTokens} />
    </>
    )
}