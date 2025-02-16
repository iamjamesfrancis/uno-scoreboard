import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { Button } from './ui/button'
import { RotateCcw, X } from 'lucide-react'
import { deleteAllPlayers } from "../state/players/playersSlice"
import { deleteAllScores } from "../state/scoreboard/scoreboardSlice"

const Winner = () => {
    const scoreboard = useSelector((state: RootState) => state.scoreboard.scores)
    const settings = useSelector((state: RootState) => state.settings)
    const players = useSelector((state: RootState) => state.players.players)
    const totalScore = scoreboard.reduce((acc, item) => acc + item.score, 0)
    const dispatch = useDispatch()
    const [close, setClose] = React.useState(false)
    if (totalScore < settings.limit) {
        return null
    }
    const topScorer = scoreboard.reduce((prev, current) => (prev.score > current.score) ? prev : current)
    const winner = players.find(player => player.id === topScorer.player)
    const reset = () => {
        if (settings.enablePlayersReset) {
            dispatch(deleteAllPlayers())
            dispatch(deleteAllScores())
        }
        if (settings.enableScoreReset) {
            dispatch(deleteAllScores())
        }
    }
    const closeWinner = () => {
        setClose(true)
    }

    if (!close) {
        return <div className='absolute bg-gray-800 w-full h-full flex justify-center items-center '>
            <div className='flex bg-gray-900 h-96 w-96 justify-center items-center shadow-lg rounded-lg flex-col py-5'>
                <div className=' flex-1 flex justify-center items-center w-full rounded-lg'>
                    <h1 className='text-2xl font-bold'>Winner is {winner?.name}</h1>
                </div>
                <div className='flex gap-3'>
                    <Button variant="default" size="icon" className="bg-red-800 hover:bg-red-900 w-auto p-2 text-white hover:text-white mb-3" onClick={closeWinner}>
                        <X /> Close
                    </Button>
                    <Button variant="default" size="icon" className="bg-red-800 hover:bg-red-900 w-auto p-2 text-white hover:text-white mb-3" onClick={reset}>
                        <RotateCcw /> Reset & Play again
                    </Button>
                </div>
            </div>

        </div>
    }
    else {
        return
    }

}

export default Winner