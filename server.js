const express = require('express');
const res = require('express/lib/response');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const { options } = require('./options/mariaDB');
const knex = require('knex')(options);



httpServer.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
})

app.use(express.static('public'))

app.set('views', './public/views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {productos})
})

let productos = [
    {
    title: "Libro",
    price: 15,
    thumbnail: "www.google.com"
},
{
    title: "Carpeta",
    price: 153,
    thumbnail: "www.google.com.ar"
}
]

let mensajes = [
    {
        email: "lala@lala.com",
        date: "22/12/22 11:33:44",
        mensaje: "lalala"
    }
]


io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('products', productos);
    socket.emit('mensajes', mensajes);
    
    socket.on('new-product',data => {
        productos.push(data);

        // insert productos to BD
        const insertProductos = knex('productos').insert(productos)
        .then(() => {
            console.log('productos inserted');
        })
        .catch(err => {
            console.log(err);
        })


        module.exports = {
            insertProductos
        };


        io.sockets.emit('productos', productos);
    });
    socket.on('new-mensaje',data => {
        console.log(data);
        let guardar = JSON.stringify(data);
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    });

});


