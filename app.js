const http = require('http');
const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain', charset='utf-8');
    res.end('Olá, TIC em trilhas.\n');
});
const porta = 3000;
const host = 'localhost';
servidor.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}/`);
});