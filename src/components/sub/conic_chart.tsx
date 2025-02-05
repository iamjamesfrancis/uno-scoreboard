import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const ConicChart = () => {
    const scoreboard = useSelector((state: RootState) => state.scoreboard.scores)
    const settings = useSelector((state: RootState) => state.settings)
    const totalScore = scoreboard.reduce((acc, item) => acc + item.score, 0)
    return (
        <div className="donut-chart relative rounded-full" style={{ "background": `conic-gradient(#dc2626 calc(${totalScore} / ${settings.limit} * 100%), #030bfb 0%)` }}>
            <div className="donut-text">
                <span className="score">{totalScore}</span>
                <span>of {settings.limit}</span>
            </div>
        </div>
    )
}


export default ConicChart