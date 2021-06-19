import * as React from 'react'
import socketio from 'socket.io-client'
import { EXPRESS_API_URL } from 'lib/config'

const socket = socketio(EXPRESS_API_URL, { withCredentials: true })
export const IOContext = React.createContext<typeof socket>(socket)

export const IOProvider: React.FC = ({ children }) => {
  return <IOContext.Provider value={socket}>{children}</IOContext.Provider>
}

export function useSocketio() {
  return React.useContext(IOContext)
}
