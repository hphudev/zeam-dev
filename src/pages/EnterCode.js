import { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Routes, Route, useNavigate } from "react-router-dom"
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"

import { db } from "../firebase"
import { generateRoomId } from "../utils"
import { selectUserId, setUserId } from "../redux/slices/AuthenticationSlice"

const ERROR_TEXT = {
  BLANK_CODE: "Blank room code",
  WRONG_CODE: "Make sure you have entered correct code",
}

function EnterCode() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState("")
  const [errorText, setErrorText] = useState("")

  const checkRoomCodeExist = () => {
    if (roomCode !== "") {
      getDocs(collection(db, "rooms")).then((querySnapshot) => {
        let exist = false
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.data()?.roomId === roomCode) {
            exist = true
            navigate(`/${roomCode}/join/${documentSnapshot.id}`)
            return
          }
        })
        if (!exist) {
          setErrorText(ERROR_TEXT.WRONG_CODE)
        }
      })
    } else {
      setErrorText(ERROR_TEXT.BLANK_CODE)
    }
  }

  useEffect(() => {
    dispatch(
      setUserId({
        userId: generateRoomId(),
      })
    )
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-3xl text-white mb-6">ZEAMS</div>

      <div>
        <input
          value={roomCode}
          onChange={(e) => {
            setErrorText("")
            setRoomCode(e.target.value)
          }}
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter code to join room"
          required
        />
      </div>

      <div className="mt-3">
        <p className="text-[#BF3325] italic font-semibold">{errorText}</p>
      </div>

      <div
        className="bg-[#BF3325] my-4 flex justify-center items-center px-4 py-1 rounded-md mx-8 hover:bg-red-700 hover:cursor-pointer"
        onClick={() => {
          checkRoomCodeExist()
        }}
      >
        <p className="text-white ">Join now</p>
      </div>

      <p className="text-white">
        Or{" "}
        <span
          className="hover:underline hover:cursor-pointer"
          onClick={() => {
            navigate(`/create`)
          }}
        >
          create new room
        </span>
      </p>
    </div>
  )
}

export default EnterCode
