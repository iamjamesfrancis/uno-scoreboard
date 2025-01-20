import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const ScoreboardTable = () => {
    const players = useSelector((state: RootState) => state.players.players)

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
                {/* <TableBody>
                    <TableRow key="">
                        <TableCell>1</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>3</TableCell>
                    </TableRow>
                </TableBody> */}
            </Table>
        </div>
    )
}

export default ScoreboardTable