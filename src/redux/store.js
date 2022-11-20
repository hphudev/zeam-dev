import { configureStore } from "@reduxjs/toolkit"

import connectionReducer from "./slices/ConnectionSlice"
import authenticationReducer from "./slices/AuthenticationSlice"

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    authentication: authenticationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
