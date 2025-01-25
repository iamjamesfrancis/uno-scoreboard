import { Settings, X } from "lucide-react"
import { Button } from "../ui/button"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import SettingsForm from "./settingsForm"


const SettingsConfig = () => {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default" size="icon" className="mr-2 bg-slate-700 hover:bg-slate-900">
                        <Settings />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-950 text-white border-gray-800 w-1/4">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold flex justify-between">
                            <div>Settings</div>
                            <div>
                                <AlertDialogCancel className="border border-gray-800 hover:bg-gray-700 bg-transparent p-3 hover:text-white">
                                    <X />
                                </AlertDialogCancel>
                            </div>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="py-3">
                            <div>
                                <SettingsForm />
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default SettingsConfig