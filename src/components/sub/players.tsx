import { Users, UserRoundPlus, X, UserRound, Trash2, UserRoundPen, Check } from "lucide-react"
import { Button, } from "../ui/button"
import { motion } from "motion/react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../state/store"
import { addPlayer, deletePlayer } from "../../state/players/playersSlice"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Input } from "../ui/input"
import { useState, useRef } from "react"

const Players = () => {
    const players = useSelector((state: RootState) => state.players.players);
    const dispatch = useDispatch();
    const [addNewPlayer, setAddNewPlayer] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");
    const newPlayerInputRef = useRef<HTMLInputElement>(null);

    const handleShowAddNewPlayer = () => {
        setAddNewPlayer(true);
        setTimeout(() => newPlayerInputRef.current?.focus(), 0);
    }
    const handleNewPlayerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlayerName(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSaveNewPlayer();
    }

    const handleSaveNewPlayer = () => {
        dispatch(addPlayer({ id: crypto.randomUUID(), name: newPlayerName.toUpperCase() }))
        setAddNewPlayer(false)
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default" size="icon" className="mr-2 bg-blue-500 hover:bg-blue-900">
                        <Users />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-950 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold flex justify-between">
                            <div>Players</div>
                            <motion.div >
                                <AlertDialogCancel className="border border-gray-800 hover:hover:bg-gray-700 bg-transparent p-3 hover:text-white">
                                    <X />
                                </AlertDialogCancel>
                            </motion.div>
                        </AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <motion.div className="flex flex-col gap-2 p-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div>
                                <Button variant="outline" size="icon" className="border-none bg-blue-500 hover:bg-blue-900 w-auto p-2 text-white hover:text-white" onClick={handleShowAddNewPlayer}>
                                    <UserRoundPlus /> Add Player
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                {addNewPlayer &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <UserRound />
                                            <div>
                                                <form onSubmit={handleSubmit}>
                                                    <Input ref={newPlayerInputRef} placeholder="Enter player name" className="border border-gray-800 uppercase" onChange={handleNewPlayerName} />
                                                </form>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="default" size="icon" className="bg-green-500 hover:bg-green-900" onClick={handleSaveNewPlayer}>
                                                    <Check />
                                                </Button>
                                                <Button variant="default" size="icon" className="border border-gray-800 hover:hover:bg-gray-700 bg-transparent" onClick={() => setAddNewPlayer(false)}>
                                                    <X />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                }
                                {players && players.map(player => {
                                    return (
                                        <div key={player.id} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <UserRound />
                                                <div>{player.name}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="default" size="icon" className="bg-blue-500 hover:bg-blue-900">
                                                    <UserRoundPen />
                                                </Button>
                                                <Button variant="default" size="icon" className="bg-red-500 hover:bg-red-900" onClick={() => {
                                                    dispatch(deletePlayer(player.id))
                                                }}>
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Players

