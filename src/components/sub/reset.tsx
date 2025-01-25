import { RotateCcw, X } from "lucide-react"
import { Button } from '../ui/button'
import { useDispatch, useSelector } from "react-redux"
import { deleteAllPlayers } from "../../state/players/playersSlice"
import { deleteAllScores } from "../../state/scoreboard/scoreboardSlice"
import { RootState } from "../../state/store"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { motion } from "motion/react"
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog"

const Reset = () => {
    const dispatch = useDispatch()
    const settings = useSelector((state: RootState) => state.settings)
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default" size="icon" className="mr-2 bg-red-500 hover:bg-red-900" disabled={!settings.enablePlayersReset && !settings.enableScoreReset}>
                    <RotateCcw />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-950 text-white border-gray-800">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold flex justify-between">
                        <div>Are you absolutely sure?</div>
                        <motion.div>
                            <AlertDialogCancel className="border border-gray-800 hover:bg-gray-700 bg-transparent p-3 hover:text-white">
                                <X />
                            </AlertDialogCancel>
                        </motion.div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        {`${settings.enablePlayersReset ? " players and scores" : ""}${!settings.enablePlayersReset && settings.enableScoreReset ? " scores" : ""}`}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-green-600 hover:bg-green-900 hover:text-white border-none">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="border border-gray-800 hover:bg-red-500 bg-transparent p-3 hover:text-white" onClick={() => {
                        if (settings.enablePlayersReset) {
                            dispatch(deleteAllPlayers())
                            dispatch(deleteAllScores())
                        }
                        if (settings.enableScoreReset) {
                            dispatch(deleteAllScores())
                        }
                        return
                    }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Reset