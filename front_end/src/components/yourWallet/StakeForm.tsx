import { useNotifications } from "@usedapp/core";
import { Token } from "../Main";
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import React, { useEffect, useState } from "react";
import { useStakeTokens } from "../../hooks/useStakeTokens";
import { useUnstakeTokens } from "../../hooks/useUnstakeTokens";
import { utils } from "ethers"

export interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress } = token

    const { notifications } = useNotifications()

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
    }

    const { approveAndStake, state } = useStakeTokens(tokenAddress)
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return approveAndStake(amountAsWei.toString())
    }

    const isMining = state.status === "Mining"

    const [tokenApproved, setTokenApproved] = useState(false)
    const [stakeApproved, setStakeApproved] = useState(false)

    const handleCloseSnack = () => {
        setTokenApproved(false)
        setStakeApproved(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Approve ERC20 Transfer").length > 0) {
            setTokenApproved(true)
            setStakeApproved(false)
        }
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Stake Tokens").length > 0) {
            setTokenApproved(false)
            setStakeApproved(true)
        }
    }, [notifications, tokenApproved, stakeApproved])

    return (
        <>
            <div>
                <Input onChange={handleInput} />
                <Button
                    onClick={handleStakeSubmit}
                    color="primary"
                    size="large"
                    disabled={isMining}>
                    {isMining ? <CircularProgress size={26} /> : "Stake"}
                </Button>
            </div>
            <Snackbar
                open={tokenApproved}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    ERC20 token transfer approved! Now approve the staking transaction.
                </Alert>
            </Snackbar>
            <Snackbar
                open={stakeApproved}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Staking transaction approved!
                </Alert>
            </Snackbar>
        </>
    )
}


export const UnstakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress } = token

    const { notifications } = useNotifications()

    const { unstakeAll, unstakeState } = useUnstakeTokens(tokenAddress)

    const isMining = unstakeState.status === "Mining"

    const [unstakeApproved, setUnstakeApproved] = useState(false)

    const handleCloseSnack = () => {
        setUnstakeApproved(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Unstake Tokens").length > 0) {
            setUnstakeApproved(true)
        }
    }, [notifications, unstakeApproved])

    return (
        <>
            <div>
                <Button
                    onClick={unstakeAll}
                    color="primary"
                    size="large"
                    disabled={isMining}>
                    {isMining ? <CircularProgress size={26} /> : "Unstake All"}
                </Button>
            </div>
            <Snackbar
                open={unstakeApproved}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Unstaking transaction approved!
                </Alert>
            </Snackbar>
        </>
    )
}