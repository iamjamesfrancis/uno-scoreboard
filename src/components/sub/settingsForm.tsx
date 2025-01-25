import { Switch } from "@/components/ui/switch"
import { Label } from "../ui/label"
import { toggleEnablePlayersReset, toggleEnableScoreEdit, toggleHideTotalScore, toggleEnableScoreLimit, toggleEnableScoreReset, setLimit } from "../../state/settings/settingsSlice"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../state/store"
import { Input } from "../ui/input"

const SettingsForm = () => {
    const settings = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="hideTotalScore">Limit</Label>
                <Input className="border-gray-800 text-white w-14 text-center focus:border-gray-600" defaultValue={settings.limit} onChange={(e) => {
                    dispatch(setLimit(parseInt(e.target.value)))
                }} />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="hideTotalScore">Hide total score</Label>
                <Switch className="bg-red-500 text-red-600 bg-gradient-to-r" id="hideTotalScore" checked={settings.hideTotalScore} onCheckedChange={() => {
                    dispatch(toggleHideTotalScore())
                }} />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="disableScoreEdit">Enable score edit</Label>
                <Switch className="bg-red-500 text-red-600 bg-gradient-to-r" id="disableScoreEdit" checked={settings.enableScoreEdit} onCheckedChange={() => {
                    dispatch(toggleEnableScoreEdit())
                }} />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="disableScoreLimit">Enable score limit</Label>
                <Switch className="bg-red-500 text-red-600 bg-gradient-to-r" id="disableScoreLimit" checked={settings.enableScoreLimit} onCheckedChange={() => {
                    dispatch(toggleEnableScoreLimit())
                }} />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="disableScoreReset">Enable score reset</Label>
                <Switch className="bg-red-500 text-red-600 bg-gradient-to-r" id="disableScoreReset" checked={settings.enableScoreReset} onCheckedChange={() => {
                    dispatch(toggleEnableScoreReset())
                }} />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between">
                <Label htmlFor="disablePlayersReset">Enable players reset</Label>
                <Switch className="bg-red-500 text-red-600 bg-gradient-to-r" id="disablePlayersReset" checked={settings.enablePlayersReset} onCheckedChange={() => {
                    dispatch(toggleEnablePlayersReset())
                }} />
            </div>
        </div>
    )
}

export default SettingsForm