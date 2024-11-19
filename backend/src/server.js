const { WebSocketServer } = require('ws');
const dotenv = require('dotenv');

dotenv.config();

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on('connection', (ws) => {

    ws.on('error', console.error)

    //ws.send("Mensagem enviada pelo servidor");

    ws.on('message', (data) => {

        console.log(data.toString())
        //manda msg

        wss.clients.forEach((client) => client.send(data.toString()))
    })

    console.log('cliente conectado')
})

console.log('server on')