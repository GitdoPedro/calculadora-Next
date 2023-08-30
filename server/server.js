const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const CalcModel = require('./models/calcModel');
const calcRoutes = require('./config/routes'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: 'http://localhost:3000' } });

app.use(bodyParser.json());

const PORT = 3001

io.on('connection', socket =>{

    socket.on('set_math', ({ n1, n2, op })  =>{
        n1 = parseFloat(n1);
        n2 = parseFloat(n2);

        var result = 0
        switch(op){
            case 'somar':
                result = n1+n2;
                break;
            case 'subtrair':
                result = n1-n2;
                break;
            case 'dividir':
                result = n1/n2;
                break;
            case 'multiplicar':
                result = n1*n2;
                break
            default:
                console.log('erro')
                break;
        }
        
        io.emit('emitResultado',{
            primeiroNumero : n1,
            segundoNumero: n2,
            resultadoFinal: result,
            mathId: socket.id
        })
    })
})




const Calc = CalcModel(sequelize, sequelize.Sequelize.DataTypes);
sequelize.sync().then(() => {
   app.use('/api/calc', calcRoutes);
  server.listen(PORT, () => console.log('Server running....'));
}).catch((error) => {
  console.error('Error initializing the database:', error);
});