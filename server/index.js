import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const SocketIdToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Server Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    SocketIdToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id }); // userjoined and its details
    socket.join(room); //another user join
    io.to(socket.id).emit("room:join", data);
  });
});
