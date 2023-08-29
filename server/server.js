const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:3000'}})


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



server.listen(PORT, () => console.log('Server runing....'))