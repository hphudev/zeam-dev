import { useEffect, useRef } from "react"

const Video = ({remoteStream}) => {
  const vRef = useRef()
  
  useEffect(() => {
    vRef.current.srcObject = remoteStream
  }, [remoteStream])

  return (
    <video ref={vRef} autoPlay/>
  )
}

export default Video