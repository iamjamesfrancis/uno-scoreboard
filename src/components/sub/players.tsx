import { Users, UserRoundPlus, X, UserRound, Trash2, UserRoundPen, Check } from "lucide-react"
import { Button, } from "../ui/button"
import { motion } from "motion/react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../state/store"
import { addPlayer, deletePlayer, editPlayer } from "../../state/players/playersSlice"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Input } from "../ui/input"
import { useState, useRef } from "react"

const Players = () => {
    const players = useSelector((state: RootState) => state.players.players);
    const dispatch = useDispatch();
    const [addNewPlayer, setAddNewPlayer] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [currentPlayerName, setCurrentPlayerName] = useState("");
    const newPlayerInputRef = useRef<HTMLInputElement>(null);
    const editPlayerInputRef = useRef<HTMLInputElement>(null);

    const handleShowAddNewPlayer = () => {
        setAddNewPlayer(true);
        setTimeout(() => newPlayerInputRef.current?.focus(), 0);
    }
    const handleNewPlayerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPlayerName(e.target.value);
    }

    const handleNewPlayerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSaveNewPlayer();
    }

    const handleEditPlayerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleEditPlayer(players[editingIndex!].id, currentPlayerName.toUpperCase());
        setEditingIndex(null);
    }

    const handleSaveNewPlayer = () => {
        dispatch(addPlayer({ id: crypto.randomUUID(), name: currentPlayerName.toUpperCase() }))
        setAddNewPlayer(false)
    }

    const handleEditPlayer = (id: string, name: string) => {
        dispatch(editPlayer({ id, name }))
        setEditingIndex(null);
    }

    const handleEdit = (index: number | null, currentPlayerName: string) => {
        setCurrentPlayerName(currentPlayerName);
        setEditingIndex(index);
        setTimeout(() => editPlayerInputRef.current?.focus(), 0); // Focus input when it appears
    };

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
                                                <form onSubmit={handleNewPlayerSubmit}>
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
                                {players && players.map((player, index) => {
                                    return (
                                        <div key={player.id} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <UserRound />
                                                <div>
                                                    {editingIndex === index ?
                                                        <form onSubmit={handleEditPlayerSubmit}>
                                                            <Input defaultValue={player.name} ref={editPlayerInputRef} placeholder="Enter player name" className="border border-gray-800 uppercase" onChange={handleNewPlayerName} />
                                                        </form>
                                                        : player.name
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {editingIndex === index ?
                                                    <Button variant="default" size="icon" className="bg-green-500 hover:bg-green-900" onClick={() => handleEditPlayer(player.id, currentPlayerName.toUpperCase())}>
                                                        <Check />
                                                    </Button>
                                                    :
                                                    <Button variant="default" size="icon" className="bg-blue-500 hover:bg-blue-900" onClick={() => handleEdit(index, player.name)}>
                                                        <UserRoundPen />
                                                    </Button>
                                                }
                                                {editingIndex === index ?
                                                    <Button variant="default" size="icon" className="border border-gray-800 hover:hover:bg-gray-700" onClick={() => handleEdit(null, "")}>
                                                        <X />
                                                    </Button>
                                                    :
                                                    <Button variant="default" size="icon" className="bg-red-500 hover:bg-red-900" onClick={() => {
                                                        dispatch(deletePlayer(player.id))
                                                    }}>
                                                        <Trash2 />
                                                    </Button>
                                                }

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

