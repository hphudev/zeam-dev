import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Routes, Route, useNavigate } from "react-router-dom"

import { selectUserId } from "../redux/slices/AuthenticationSlice"
import { generateRoomId } from "../utils"

const mediaConstraints = {
  audio: true,
  video: {
    height: 320,
    frameRate: 60,
    facingMode: "user", // 'user'
  },
}

function CreatRoom() {
  const navigate = useNavigate()
  const localStreamRef = useRef()
  const [roomId, setRoomId] = useState("")
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCamOn, setIsCamOn] = useState(true)
  const userId = useSelector(selectUserId)

  const handleJoiningMeet = () => {
    if (localStreamRef.current != undefined) {
      // localStreamRef.current.getTracks().map((track) => {
      //   track.stop()
      // })
      localStreamRef.current = undefined
      console.log("Clean up local media stream in ready screen!")
    }
    navigate(`/${roomId}/create`)
  }

  console.log(userId)

  useEffect(() => {
    setRoomId(generateRoomId())
  }, [])

  useEffect(() => {
    const gettingVideoStream = () => {
      try {
        console.log("Get user media")
        navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
          localStreamRef.current.srcObject = stream
        })
      } catch (err) {
        // Handle Error
      }
    }

    if (isCamOn) {
      gettingVideoStream()
    }
  }, [isCamOn])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="p-4">
        <p className="text-white text-xl">
          Meeting code: <span>{roomId}</span>
        </p>
      </div>
      <div>
        {isCamOn ? (
          <video className="rounded-xl" ref={localStreamRef} autoPlay></video>
        ) : (
          <img
            className="h-80 rounded-xl"
            src={require("../img/image1.jpg")}
          ></img>
        )}
      </div>

      <div className="flex flex-row mt-4 items-center gap-1 text-white">
        <div className="flex items-center justify-center bg-[#242736] p-2 rounded-xl">
          <span
            className="material-icons hover:cursor-pointer"
            onClick={() => {
              setIsMicOn(!isMicOn)
            }}
          >
            {isMicOn ? "mic" : "mic_off"}
          </span>
        </div>

        <div className="flex items-center justify-center bg-[#242736] p-2 rounded-xl">
          <span
            className="material-icons hover:cursor-pointer h-full"
            onClick={() => {
              setIsCamOn(!isCamOn)
            }}
          >
            {isCamOn ? "videocam" : "videocam_off"}
          </span>
        </div>
      </div>

      <div
        className="bg-[#BF3325] my-4 flex justify-center items-center px-4 py-1 rounded-md mx-8 hover:bg-red-700 hover:cursor-pointer"
        onClick={() => {
          handleJoiningMeet()
        }}
      >
        <p className="text-white ">Start meeting now</p>
      </div>
    </div>
  )
}

export default CreatRoom
