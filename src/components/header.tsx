import UnoImage from "../assets/uno_icon.png"
import Players from "./sub/players"
import SettingsConfig from "./sub/settingsConfig"
import Reset from "./sub/reset"

const Header = () => {

    return (
        <div className=" flex items-center justify-between py-3 px-2">
            <div className="flex items-center justify-center gap-3">
                <div className='h-12 w-12 m-auto'>
                    <img src={UnoImage} alt="Uno Icon" className='w-full h-full m-auto' />
                </div>
                <div className='text-3xl text-yellow-200 font-bold'>SCOREBOARD</div>
            </div>
            <div className="flex items-center justify-center gap-3">
                <Players />
                <Reset />
                <SettingsConfig />
            </div>
        </div>
    )
}

export default Header