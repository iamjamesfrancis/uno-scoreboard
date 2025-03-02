
import { X, InfoIcon } from "lucide-react"
import { Button } from "../ui/button"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"


const Info = () => {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default" size="icon" className="mr-2 bg-slate-700 hover:bg-slate-900">
                        <InfoIcon />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-950 text-white border-gray-800 max-w-screen-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold flex justify-between">
                            <div>Info</div>
                            <div>
                                <AlertDialogCancel className="border border-gray-800 hover:bg-gray-700 bg-transparent p-3 hover:text-white">
                                    <X />
                                </AlertDialogCancel>
                            </div>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="py-3">
                            <div>
                                <p className="text-lg">
                                    This is a simple scoreboard app for keeping track of scores for card games like UNO.
                                </p>
                                <p className="text-lg">
                                    The app is built using React and TailwindCSS.
                                </p>
                                <p className="text-lg">
                                    The app is open source and can be found on <a href="https://github.com/iamjamesfrancis/uno-scoreboard" className="text-blue-400" target="_blank">GitHub</a>.
                                </p>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Info