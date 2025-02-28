import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
     <div>
      <p>
        Check out this super sweet P tag, I mean it probably looks like a paragraph on a blank page but its pretty sweet in my opinion. Here is probably where we should put our routes, idk why but that seems like a good idea to me tbh. Anyway, im gonna go eat some mints and drink and ice cold water.......just to FEEEEL something.......happy coding
      </p>
     </div>
     </Routes>
    </>
  )
}

export default App
