import ConicChart from "./sub/conic_chart"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Crown, Trophy } from "lucide-react"
const Stats = () => {
    return (
        <div className="col-span-2 p-5 grid grid-cols-2 gap-5">
            <Card className="bg-gray-900 border-red-600 col-span-2">
                <CardHeader className="text-red-600">
                    <CardTitle>Stats</CardTitle>
                </CardHeader>
                <CardContent className="text-white flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="flex gap-3">James<Crown className="text-red-600" /></div>
                        <div className="flex gap-3">129<Trophy className="text-red-600" /></div>
                    </div>

                </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-600">
                <CardHeader className="text-red-600">
                    <CardTitle>Limit</CardTitle>
                </CardHeader>
                <CardContent className="text-white flex flex-col gap-2 items-center">
                    <ConicChart />
                </CardContent>
            </Card>

        </div>
    )
}

export default Stats