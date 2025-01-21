import { Sparkles, Trash2, UserRound, UserRoundPen, X } from "lucide-react"
import ScoreboardTable from "./sub/scoreboard_table"
import { Button } from "./ui/button"
import { AlertDialogHeader, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter } from "./ui/alert-dialog"
import { motion } from "motion/react"
import { useSelector, useDispatch } from "react-redux"
import { addScore, getGameNumber } from "../state/scoreboard/scoreboardSlice"
import { RootState } from "../state/store"
import { Input } from "./ui/input"
import { useState } from "react"
import { Score } from "../state/scoreboard/scoreboardSlice"

const Scoreboard = () => {
    const dispatch = useDispatch();
    const players = useSelector((state: RootState) => state.players.players);
    const gameNumber = useSelector((state: RootState) => state.scoreboard.gameNumber);
    dispatch(getGameNumber());

    const [scores, setScores] = useState<Score[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value);
        if (gameNumber) {
            setScores(prev => {
                prev.push({ player: e.target.name, score: parseInt(e.target.value), game: gameNumber, isUpdated: false })
                return prev
            })
        }
    }
    return (
        <div className="col-span-3 p-5">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default" size="icon" className="bg-green-800 hover:bg-green-900 w-auto p-2 text-white hover:text-white mb-3">
                        <Sparkles /> Enter score
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-950 text-white border-gray-800">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold flex justify-between">
                            <div>Scores</div>
                            <motion.div>
                                <AlertDialogCancel className="border border-gray-800 hover:bg-red-500 bg-transparent p-3 hover:text-white">
                                    <X />
                                </AlertDialogCancel>
                            </motion.div>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="flex flex-col gap-2 p-3">
                            <form>
                                <div className="flex flex-col gap-2">
                                    {players && players.map(player => {
                                        return (<div key={player.id} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <UserRound />
                                                <div className="text-white font-semibold">{player.name}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Input name={player.id} className="border-gray-800 w-16 text-center focus:border-gray-600" defaultValue={0} onBlur={(e) => handleChange(e)} />
                                            </div>

                                        </div>)
                                    })}
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="bg-green-800 hover:bg-green-900 w-auto text-white focus:bg-green-900 focus:border" onClick={() => {
                            scores.map(score => dispatch(addScore(score)));
                            setScores([]);
                            return
                        }}>Save</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/*  */}
            <ScoreboardTable />
        </div>
    )
}

export default Scoreboard