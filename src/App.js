import { useRef, useState, useEffect } from "react"
import { Provider } from "react-redux"
import { Routes, Route } from "react-router-dom"

import { store } from "./redux/store"
import CreatRoom from "./pages/CreateRoom"
import EnterCode from "./pages/EnterCode"
import JoinRoom from "./pages/JoinRoom"
import Meeting from "./pages/Meeting"

function App() {
  return (
    <div className="min-h-screen relative bg-[#1c1f2e]">
      <Routes>
        <Route path="/" element={<EnterCode />} />
        <Route path="/create" element={<CreatRoom />} />
        <Route path="/:roomId/join/:roomRef" element={<JoinRoom />} />
        <Route path="/:roomId/:action" element={<Meeting />} />
        <Route path="/:roomId/:action/:roomRef" element={<Meeting />} />
      </Routes>
    </div>
  )
}

export default App
