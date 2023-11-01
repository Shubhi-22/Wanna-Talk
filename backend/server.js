const express = require("express");
const { chats } = require("./data/data.js");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes.js');
const { notFound, errorHandler } = require("./middlewares/errormiddleware.js");
const chatRoutes = require('./routes/chatRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const path = require('path');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

// app.get('/', (req,res)=>{
//     res.send("API is Running");
// })

// app.get('/api/chats', (req,res)=>{
//     res.send(chats); 
// })

// app.get('/api/chats/:id',(req,res)=>{
//     // console.log(req.params.id);
//     const singleChat = chats.find((c)=> c._id === req.params.id);
//     res.send(singleChat);
// })

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);



// --------Deployment-------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API1 is running..");
  });
}

// --------Deployment-------



app.use(notFound)
app.use(errorHandler)

const PORT = 5000;

const server = app.listen(5000,console.log(`Server Started on PORT ${PORT}`))
const io=require('socket.io')(server,{
    pingTimeout: 600000,
    cors:{
        origin: "http://localhost:3000",
    },
});

io.on("connection",(socket)=>{
    console.log("connected to socket.io");


    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit('connected');
    })

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log('User Joined'+room);
    })

    socket.on('typing',(room)=>socket.in(room).emit("typing"));
    socket.on('stop typing',(room)=>socket.in(room).emit("stop typing"));

    socket.on('new message',(newMessageReceived)=>{
        var chat = newMessageReceived.chat;
        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach(user=>{
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        })
    })


});