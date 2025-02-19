import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const ScoreboardTable = () => {
    const players = useSelector((state: RootState) => state.players.players)
    const scoreboard = useSelector((state: RootState) => state.scoreboard.scores)
    const groupedByGame = scoreboard.reduce((acc, score) => {
        if (!acc[score.game]) {
            acc[score.game] = []
        }
        acc[score.game].push(score)
        return acc
    }
        , {} as { [key: number]: { player: string, score: number, game: number, isUpdated: boolean }[] })

    return (
        <div className="overflow-hidden rounded-lg border border-x-white">
            <Table className="text-center text-base">
                <TableHeader className="text-white text-center">
                    <TableRow>
                        {players && players.map(player => {
                            return (
                                <TableHead key={player.id} className="text-white text-center">{player.name}</TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.keys(groupedByGame).map(game => {
                        return (
                            <TableRow key={game}>
                                {players.map(player => {
                                    const score = groupedByGame[parseInt(game)].find(score => score.player === player.id)?.score
                                    return (
                                        <TableCell key={player.id} className="text-white">{score ? score : 0}</TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default ScoreboardTable