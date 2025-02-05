import { motion } from "framer-motion"
import { RootState } from "../state/store"
import ConicChart from "./sub/conic_chart"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Crown } from "lucide-react"
import { useSelector } from "react-redux"

const Stats = () => {
    const players = useSelector((state: RootState) => state.players.players)
    const scoreboard = useSelector((state: RootState) => state.scoreboard.scores)
    const settings = useSelector((state: RootState) => state.settings)

    // Group and calculate total score per player
    const groupedByPlayer = scoreboard.reduce((acc, item) => {
        const { player, score } = item;
        if (!acc[player]) acc[player] = { total: 0, games: {} }; // Initialize player with total and games
        acc[player].games[item.game] = score;
        acc[player].total += score; // Sum the scores for the player
        return acc;
    }, {} as Record<string, { total: number, games: Record<number, number> }>);

    // Sort players by total score in descending order
    const sortedPlayers = players
        .map(player => ({
            ...player,
            total: groupedByPlayer[player.id]?.total || 0
        }))
        .sort((a, b) => b.total - a.total); // Sort by total score

    return (
        <div className="col-span-2 p-5 grid grid-cols-2 gap-5">
            <Card className="bg-gray-900 border-red-600 col-span-2">
                <CardContent className={`text-white flex flex-col gap-2 mt-3 ${Object.keys(groupedByPlayer).length === 0 && "hidden"}`} >
                    <div>
                        <div className="flex justify-between">
                            <div>Player</div>
                            <div>Score</div>
                        </div>
                        <hr className="border-gray-700 border-1 my-2" />
                    </div>
                    {sortedPlayers.map((player, index) => {
                        return (
                            <motion.div
                                key={player.id}
                                transition={{ type: "spring" }}
                                animate={{ opacity: 1 }} // Fade in the player when the score updates
                                initial={{ opacity: 0 }}
                                className="flex justify-between"
                            >
                                <div className="flex gap-3 justify-between p-3 rounded-lg">
                                    <div className={`${index === 0 && "text-yellow-400 font-semibold"}`}>{player.name}</div>
                                    <div className={`${index === 0 && "text-yellow-400 font-semibold flex items-center"}`}>
                                        {index === 0 && <Crown size={16} />}
                                    </div>
                                </div>
                                {
                                    groupedByPlayer[player.id] &&
                                    <div className="flex gap-3 justify-between p-3 rounded-lg">
                                        <motion.div
                                            key={player.id + "_total"}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ type: "spring", damping: 25 }}
                                            className={`${index === 0 && "text-yellow-400 font-semibold "} ${settings.hideTotalScore && "blur-sm select-none"}`}
                                        >
                                            {
                                                settings.hideTotalScore ?
                                                    <>123</> :
                                                    <>{groupedByPlayer[player.id].total}</>
                                            }
                                        </motion.div>
                                    </div>
                                }
                            </motion.div>
                        );
                    })}
                </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-600">
                <CardHeader className="text-red-600">
                    <CardTitle>Limit</CardTitle>
                </CardHeader>
                <CardContent className="text-white h-fit-content">
                    <div className="relative">
                        <ConicChart />
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}

export default Stats;
