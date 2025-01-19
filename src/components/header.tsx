import { Users, RotateCcw, Settings } from "lucide-react"
import { Button } from './ui/button'
import UnoImage from "../assets/uno_icon.png"

const Header = () => {
    return (
        <div className=" flex items-center justify-between py-3 px-2">
            <div className="flex items-center justify-center gap-3">
                <div className='h-12 w-12 m-auto'>
                    <img src={UnoImage} alt="Uno Icon" className='w-full h-full m-auto' />
                </div>
                <div className='text-3xl text-yellow-200 font-bold'>SCOREBOARD</div>
            </div>
            <div>
                <Button variant="default" size="icon" className="mr-2 bg-blue-500 hover:bg-blue-900" onClick={() => alert('Players')}>
                    <Users />
                </Button>
                <Button variant="default" size="icon" className="mr-2 bg-red-500 hover:bg-red-900" onClick={() => alert('Reset')}>
                    <RotateCcw />
                </Button>
                <Button variant="default" size="icon" className="mr-2 bg-slate-700 hover:bg-slate-900" onClick={() => alert('Settings')}>
                    <Settings />
                </Button>
            </div>
        </div>
    )
}

export default Header