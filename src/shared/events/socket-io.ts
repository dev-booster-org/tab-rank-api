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
    console.log('\n 🟢 - Client connected:', socket.id)
  })

  return socketIo
}

export function getSocketIo() {
  if (!socketIo) {
    throw new Error('Socket.io not initialized')
  }

  return socketIo
}
