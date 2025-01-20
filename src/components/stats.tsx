import { RootState } from "../state/store"
import ConicChart from "./sub/conic_chart"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Crown, Trophy } from "lucide-react"
import { useSelector } from "react-redux"

const Stats = () => {
    const players = useSelector((state: RootState) => state.players.players)

    return (
        <div className="col-span-2 p-5 grid grid-cols-2 gap-5">
            <Card className="bg-gray-900 border-red-600 col-span-2">
                <CardHeader className="text-red-600">
                    <CardTitle>Stats</CardTitle>
                </CardHeader>
                <CardContent className="text-white flex flex-col gap-2">
                    {players && players.map(player => {
                        return (
                            <div key={player.id} className="flex justify-between">
                                <div className="flex gap-3 justify-between  p-3 rounded-lg">
                                    <div>{player.name}</div>
                                    <Crown className="text-red-600" />
                                </div>
                                <div className="flex gap-3">129<Trophy className="text-red-600" /></div>
                            </div>)
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
    )
}

export default Stats