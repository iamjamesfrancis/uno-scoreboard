import { Switch } from "@/components/ui/switch"
import { Label } from "../ui/label"

const SettingsForm = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="hideTotalScore">Hide total score</Label>
                <Switch className="bg-red-500 text-red-600 bg-gradient-to-r" id="hideTotalScore" />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="disableScoreEdit">Disable score edit</Label>
                <Switch className="bg-red-500 text-red-600 bg-gradient-to-r" id="disableScoreEdit" />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="disableScoreLimit">Disable score limit</Label>
                <Switch className="bg-red-500 text-red-600 bg-gradient-to-r" id="disableScoreLimit" />
            </div>
        </div>
    )
}

export default SettingsForm