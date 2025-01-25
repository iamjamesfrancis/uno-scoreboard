import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const ConicChart = () => {
    const scoreboard = useSelector((state: RootState) => state.scoreboard.scores)
    const settings = useSelector((state: RootState) => state.settings)
    const totalScore = scoreboard.reduce((acc, item) => acc + item.score, 0)
    return (
        <div className="absolute">
            <div className="w-32 h-32 rounded-full border-red-600 border-8 flex justify-center items-center flex-col">
                <span className="text-xl font-bold text-red-600">{settings.limit}</span>
                <span className="text-base text-red-500">{totalScore}</span>
            </div>
        </div>
    )
}

export default ConicChart