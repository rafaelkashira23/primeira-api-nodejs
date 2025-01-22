//importação do módulo http e do módulo fs
import http from 'http';
import fs, { writeFile } from 'fs';

//criação de arquivo de texto
fs.writeFile('mensagem.txt', 'Olá, TIC em trilhas do arquivo!', 'utf-8', (erro)=>{
    if(erro){
        console.log('Falha ao escrever o arquivo', erro);
    }
    console.log('Arquivo criado com sucesso!');
}

//criação do servidor
const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Olá, TIC em trilhas.\n');
});
const porta = 3000;
const host = 'localhost';
servidor.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}/`);
});