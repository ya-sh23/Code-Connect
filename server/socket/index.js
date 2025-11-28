import { Server } from "socket.io";

export const initSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const emailToSocketIdMap = new Map();
  const socketIdToEmailMap = new Map();

  io.on("connection", (socket) => {
    console.log(`Server Connected`, socket.id);
    socket.on("room:join", (data) => {
      const { email, room } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketIdToEmailMap.set(socket.id, email);

      io.to(room).emit("user:joined", { email, id: socket.id }); // userjoined and its details
      socket.join(room); //another user join
      io.to(socket.id).emit("room:join", data);
    });

    socket.on("user:call", ({ to, offer }) => {
      io.to(to).emit("incoming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:negotiation:needed", ({ to, offer }) => {
      io.to(to).emit("peer:negotiation:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

    socket.on("disconnect", () => {
      const email = socketIdToEmailMap.get(socket.id);
      emailToSocketIdMap.delete(email);
      socketIdToEmailMap.delete(socket.id);

      console.log(`Socket Disconnected: ${socket.id}`);
    });
  });

  return io;
};
