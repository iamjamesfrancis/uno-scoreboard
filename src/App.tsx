import Header from "./components/header"
import Scoreboard from "./components/scoreboard"
import Stats from "./components/stats"

function App() {
  
  return (
    <div className="bg-gray-900 text-white h-dvh flex flex-col">
      <Header />
      <div className="grid grid-cols-5 grid-flow-col grow">
        <Scoreboard />
        <Stats />
      </div>
    </div>
  )
}

export default App
