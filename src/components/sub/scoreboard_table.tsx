import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const ScoreboardTable = () => {
    return (
        <div className="overflow-hidden rounded-lg border border-x-white">
            <Table className="text-center text-base">
                <TableHeader className="text-white text-center">
                    <TableRow>
                        <TableHead className="text-white text-center">James</TableHead>
                        <TableHead className="text-white text-center">Aljin</TableHead>
                        <TableHead className="text-white text-center">Joyal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow key={1}>
                        <TableCell>{1}</TableCell>
                        <TableCell>{2}</TableCell>
                        <TableCell>{3}</TableCell>
                    </TableRow>
                    <TableRow key={1}>
                        <TableCell>{1}</TableCell>
                        <TableCell>{2}</TableCell>
                        <TableCell>{3}</TableCell>
                    </TableRow>
                    <TableRow key={1}>
                        <TableCell>{1}</TableCell>
                        <TableCell>{2}</TableCell>
                        <TableCell>{3}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default ScoreboardTable