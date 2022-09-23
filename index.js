const express = require("express");
const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const db = require("./db.js");


const handlebars=require('express-handlebars')

const app=express()
const httpServer=new HTTPServer(app)
const io=new SocketServer(httpServer)

//* request/ response
const DB = new db("data");      //falta enlazar esto

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// array productos
const Productos = [
    { title: "Lapicera", price: 150, thumbnail:'img1'},
    { title: "Libreta", price: 300, thumbnail:'img2'},
    { title: "Cuaderno", price: 350,thumbnail:'img3' },
  ];

// array mensajes  
const Mensajes = [
    { author: "fede@fede.com", date: new Date, msg:'Hola Mundo soy Fede!'}
]

// configuracion handlebar
app.use(express.static(__dirname + '/public'))

app.engine('hbs', handlebars.engine({
    extname:'hbs',
    layoutDir:__dirname + './public/layouts',
    defaultLayout:'index'
}))

app.set('views','./public')
app.set('view engine', 'hbs')


// conexión socket.io
io.on("connection", (socket) => {
    console.log(`conectado: ${socket.id}`);
    socket.emit("listProds", Productos);    //cada vez que alguien se conecta le enviamos una copia de los productos cargados al momento
    socket.emit("listMsg", Mensajes);    //cada vez que alguien se conecta le enviamos una copia de los mensajes cargados al momento
    
    // * Escuchar los productos nuevos
    socket.on("newProd", (data) => {
      console.log(data);
      Productos.push(data);
      io.sockets.emit("listProds", Productos);
    });
    // * Escuchar los mensajes nuevos
    socket.on("newMsg", (data) => {
      console.log(data);
      Mensajes.push(data);
      io.sockets.emit("listMsg", Mensajes);
    });
  });


app.get('/',(req,res)=>{      
    res.render('main', {layout:'index', productos:Productos})
})


httpServer.listen(8080,()=>{
    try{
        console.log('iniciado!')
    }
    catch(e){
        console.log('error de inicio')
    }
})