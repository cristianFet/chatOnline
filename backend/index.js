//Iniciar a configurar el servidor
const express = require("express")
const app = express() //llamamos directamente al constructor
const http = require("http") //Creamos el objeto http
const cors = require("cors")//habilitar las peticiones desde servidores diferentes, el front hace peticiones al backend
const {Server} = require("socket.io")
const socketIo = require('socket.io') //Agregada recientemente

app.use(cors())
const server = http.createServer(app) //Crear el servidor
const io = new Server(server, {
  cors: {
    /*origin: [
      "http://localhost:5173","https://v9lrtr9c-5173.use2.devtunnels.ms/"], */ //para las solicitudes
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection",(socket)=>{
  console.log(`Usuario actual : ${socket.id}`);

  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`Usuario con id : ${socket.id} se unió a la sala: ${data}`);
  })
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message",data);
  })

  socket.on("disconnect",()=>{
    console.log("Usuario desconectado",socket.id)
  })
})
/*const host = "192.168.56.1";*/
/*const host = "0.0.0.0";*/
server.listen(3001, /*host,*/ ()=>{
  console.log("SERVER RUNNING")
})