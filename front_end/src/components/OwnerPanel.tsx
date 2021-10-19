import { useNotifications } from "@usedapp/core";
import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"
import { constants } from "ethers"
import { Button, Snackbar, Box, CircularProgress, makeStyles } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { useGetOwner } from "../hooks/useGetOwner"
import { useIssueTokens } from "../hooks/useIssueTokens"

const useStyles = makeStyles((theme) => ({
    container: {
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        gap: theme.spacing(1),
        alignItems: "center"
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px"
    },
    header: {
        color: "white"
    }
}))

export const OwnerPanel = () => {
    const { account } = useEthers()
    const { notifications } = useNotifications()

    const [isOwner, setIsOwner] = useState(false)
    const classes = useStyles()

    const getOwner = useGetOwner()

    useEffect(() => {
        const currentOwner = getOwner ? getOwner.toString() : constants.AddressZero
        if (account === currentOwner) {
            setIsOwner(true)
        } else {
            setIsOwner(false)
        }
    }, [account])

    const { issueAll, issueState } = useIssueTokens()
    const isMining = issueState.status === "Mining"

    const [issueApproved, setIssueApproved] = useState(false)

    const handleCloseSnack = () => {
        setIssueApproved(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Issue Tokens").length > 0) {
            setIssueApproved(true)
        }
    }, [notifications, issueApproved])

    return (
        <>
            {isOwner && <Box>
                <h1 className={classes.header}>Secret App Owner Panel</h1>
                <Box className={classes.box}>
                    <div className={classes.container}>
                        <Button
                            onClick={issueAll}
                            color="primary"
                            size="large"
                            disabled={isMining}>
                            {isMining ? <CircularProgress size={26} /> : "Pay Out Rewards"}
                        </Button>
                    </div>
                    <Snackbar
                        open={issueApproved}
                        autoHideDuration={5000}
                        onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity="success">
                            Tokens distributed!
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
            }
        </>
    )
}