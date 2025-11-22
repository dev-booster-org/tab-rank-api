import { Server as HttpServer } from 'http'
import { Server as SocketIoServer } from 'socket.io'

interface InitSocketIo {
  server: HttpServer
}

let socketIo: SocketIoServer | null = null

export function initSocketIo({ server }: InitSocketIo): SocketIoServer {
  socketIo = new SocketIoServer(server, {
    cors: {
      origin: '*',
    },
  })

  console.log('🟢 - Socket.io initialized')

  socketIo.on('connection', (socket) => {
    console.log(`🔌 - Client connected: ${socket.id}`)

    socket.on('room:join', (roomId: string) => {
      socket.join(roomId)
      console.log(`📥 - Client ${socket.id} joined room: ${roomId}`)
    })

    socket.on('room:leave', (roomId: string) => {
      socket.leave(roomId)
      console.log(`📤 - Client ${socket.id} left room: ${roomId}`)
    })

    socket.on('disconnect', () => {
      console.log(`❌ - Client disconnected: ${socket.id}`)
    })
  })

  return socketIo
}

export function getSocketIo() {
  if (!socketIo) {
    throw new Error('Socket.io not initialized')
  }

  return socketIo
}
