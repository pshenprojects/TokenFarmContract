import { Token } from "../Main"
import React, { useState } from "react"
import { Box, makeStyles } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { Tab } from "@material-ui/core"
import { StakedBalance, WalletBalance } from "./WalletBalance"
import { StakeForm, UnstakeForm } from "./StakeForm"

interface YourWalletProps {
    supportedTokens: Array<Token>
}

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px"
    },
    header: {
        color: "white"
    }
}))

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedToken, setSelectedToken] = useState<number>(0)
    const classes = useStyles()

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedToken(parseInt(newValue))
    }


    const [selectedStakedToken, setSelectedStakedToken] = useState<number>(0)

    const handleStakedChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedStakedToken(parseInt(newValue))
    }


    return (
        <Box>
            <h1 className={classes.header}>Your Wallet</h1>
            <Box className={classes.box}>
                <TabContext value={selectedToken.toString()}>
                    <TabList onChange={handleChange} aria-label="stake form tabs">
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name}
                                    value={index.toString()}
                                    key={index} />
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div className={classes.tabContent}>
                                    <WalletBalance token={supportedTokens[selectedToken]} />
                                    <StakeForm token={supportedTokens[selectedToken]} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>

            <h1 className={classes.header}>Your Staked Tokens</h1>
            <Box className={classes.box}>
                <TabContext value={selectedStakedToken.toString()}>
                    <TabList onChange={handleStakedChange} aria-label="unstake form tabs">
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name}
                                    value={index.toString()}
                                    key={index} />
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div className={classes.tabContent}>
                                    <StakedBalance token={supportedTokens[selectedStakedToken]} />
                                    <UnstakeForm token={supportedTokens[selectedStakedToken]} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>
        </Box>
    )
}