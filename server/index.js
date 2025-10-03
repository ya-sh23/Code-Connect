import { Server } from "socket.io";

const io = new Server(8000);

io.on("connection", (socket) => {
  console.log(`Server Connected`, socket.id);
});
