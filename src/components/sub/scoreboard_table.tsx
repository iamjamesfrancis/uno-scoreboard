import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../state/store"
import { updateScore } from "../../state/scoreboard/scoreboardSlice"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Input } from "../ui/input"
import { useRef, useState } from "react"

const ScoreboardTable = () => {
    const players = useSelector((state: RootState) => state.players.players)
    const scoreboard = useSelector((state: RootState) => state.scoreboard.scores)
    const [activeColumnIndex, setActiveColumnIndex] = useState<number | null>(null);
    const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
    const scoreInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const groupedByGame = scoreboard.reduce((acc, score) => {
        if (!acc[score.game]) {
            acc[score.game] = []
        }
        acc[score.game].push(score)
        return acc
    }
        , {} as { [key: number]: { player: string, score: number, game: number, isUpdated: boolean }[] });

    const handleUpdateScore = (game: number, player: string, score: number) => {
        dispatch(updateScore({ game, player, score, isUpdated: true }))
    }

    const handleEditScoreIndex = (rowIndex: number | null, colIndex: number | null) => {
        setActiveRowIndex(rowIndex);
        setActiveColumnIndex(colIndex);
        setTimeout(() => {
            scoreInputRef.current?.focus();
            scoreInputRef.current?.select();
        }, 0); // Focus input when it appears
    }

    const handleEditScore = (game: number, player: string, oldScore: number) => {
        if (scoreInputRef.current?.value === oldScore.toString()) {
            handleEditScoreIndex(null, null);
            return;
        }

        dispatch(updateScore({ game, player, isUpdated: true, score: scoreInputRef.current?.value ? parseInt(scoreInputRef.current?.value) : 0 }));
        handleEditScoreIndex(null, null);
    }

    return (
        <div className="overflow-hidden rounded-lg border border-x-white">
            <Table className="text-center text-base">
                <TableHeader className="text-white text-center">
                    <TableRow className="hover:bg-transparent">
                        {players && players.map(player => {
                            return (
                                <TableHead key={player.id} className="text-white text-center">
                                    <span className="hover:bg-slate-700 px-3 py-1 rounded-sm cursor-pointer"
                                        onClick={() => handleUpdateScore(1, player.id, 0)}>
                                        {player.name}
                                    </span>
                                </TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.keys(groupedByGame).map((game, rowIndex) => {
                        return (
                            <TableRow key={game} className="">
                                {players.map((player, colIndex) => {
                                    const score = groupedByGame[parseInt(game)].find(score => score.player === player.id)?.score;
                                    const gameNumber = groupedByGame[parseInt(game)].find(score => score.player === player.id)?.game || 0;
                                    return (
                                        <TableCell key={player.id} className="text-white">
                                            {activeColumnIndex === colIndex && activeRowIndex === rowIndex ?
                                                <span
                                                    className="flex justify-center items-center rounded-sm cursor-pointer">
                                                    <form onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleEditScore(gameNumber, player.id, score ? score : 0);
                                                    }}>
                                                        <Input ref={scoreInputRef} defaultValue={score ? score : 0}
                                                            className="border border-gray-800 uppercase w-12 text-center font-bold text-2xl"
                                                            onBlur={() => handleEditScore(gameNumber, player.id, score ? score : 0)} />
                                                    </form>
                                                </span>
                                                :
                                                <span className="hover:bg-slate-700 px-3 py-1 rounded-sm cursor-pointer"
                                                    onClick={() => handleEditScoreIndex(rowIndex, colIndex)}>
                                                    {score ? score : 0}
                                                </span>
                                            }
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div >
    )
}

export default ScoreboardTable