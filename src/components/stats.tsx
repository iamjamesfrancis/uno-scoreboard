import { motion } from "framer-motion"
import { RootState } from "../state/store"
import ConicChart from "./sub/conic_chart"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Crown, Trophy } from "lucide-react"
import { useSelector } from "react-redux"

const Stats = () => {
    const players = useSelector((state: RootState) => state.players.players)
    const scoreboard = useSelector((state: RootState) => state.scoreboard.scores)

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
                <CardHeader className="text-red-600">
                    <CardTitle>Stats</CardTitle>
                </CardHeader>
                <CardContent className="text-white flex flex-col gap-2">
                    {sortedPlayers.map(player => {
                        return (
                            <motion.div
                                key={player.id}
                                transition={{ type: "spring" }}
                                animate={{ opacity: 1 }} // Fade in the player when the score updates
                                initial={{ opacity: 0 }}
                                className="flex justify-between"
                            >
                                <div className="flex gap-3 justify-between p-3 rounded-lg">
                                    <div>{player.name}</div>
                                    <Crown className="text-red-600" />
                                </div>
                                {
                                    groupedByPlayer[player.id] &&
                                    <div className="flex gap-3 justify-between p-3 rounded-lg">
                                        <motion.div
                                            key={player.id + "_total"}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ type: "spring", damping: 25 }}
                                        >
                                            {groupedByPlayer[player.id].total}
                                        </motion.div>
                                        <Trophy className="text-red-600" />
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
                <CardContent className="text-white flex flex-col gap-2 items-center relative">
                    <ConicChart />
                </CardContent>
            </Card>
        </div>
    );
}

export default Stats;
