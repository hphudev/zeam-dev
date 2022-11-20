import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"

import { selectUserId } from "../redux/slices/AuthenticationSlice"

const mediaConstraints = {
  audio: true,
  video: {
    frameRate: 60,
    facingMode: "user", // 'user'
  },
}

function JoinRoom() {
  const navigate = useNavigate()
  const localStreamRef = useRef()
  const { roomId } = useParams()
  const { roomRef } = useParams()
  const userId = useSelector(selectUserId)

  const handleJoiningMeet = () => {
    if (localStreamRef.current !== undefined) {
      localStreamRef.current = undefined
      console.log("Clean up local media stream in ready screen!")
    }

    navigate(`/${roomId}/in/${roomRef}`)
  }

  useEffect(() => {
    const gettingVideoStream = () => {
      try {
        navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
          localStreamRef.current.srcObject = stream
        })
      } catch (err) {
        console.log(err)
      }
    }
    gettingVideoStream()
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="p-4">
        <p className="text-white text-xl">
          <span>{roomId}</span>
        </p>
      </div>
      <div>
        <video ref={localStreamRef} autoPlay></video>
      </div>

      <div
        className="bg-[#BF3325] my-4 flex justify-center items-center px-4 py-1 rounded-md mx-8 hover:bg-red-700 hover:cursor-pointer"
        onClick={() => {
          handleJoiningMeet()
        }}
      >
        <p className="text-white ">Join now</p>
      </div>
    </div>
  )
}

export default JoinRoom
