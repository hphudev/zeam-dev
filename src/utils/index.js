import io from "socket.io-client"
import { SERVER_URL } from "../constants"

const connection = io(SERVER_URL, { transports: ["websocket"] })

connection.on("connect", (socket) => {
  console.log("Connected to IO")
})

const generateRoomId = () => {
  var result = ""
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  var charactersLength = characters.length
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const convertCodeToDisplay = (code) => {
  let result = ""
  ;[...code].forEach((char, index) => {
    if (index == 2) {
      result += char + "-"
    } else {
      result += char
    }
  })

  return result
}

// const createNotifeeChannel = async () => {
//   try {
//     const channelId = await notifee.createChannel({
//       id: "screen_capture",
//       name: "Screen Capture",
//       lights: false,
//       vibration: true,
//       importance: AndroidImportance.DEFAULT,
//     })

//     await notifee.displayNotification({
//       title: "Screen Capture",
//       body: "This notification will be here until you stop capturing.",
//       android: {
//         channelId,
//         asForegroundService: true,
//       },
//     })
//   } catch (err) {
//     // Handle Error
//   }
// }

export {
  connection,
  generateRoomId,
  convertCodeToDisplay,
  //   createNotifeeChannel,
}
