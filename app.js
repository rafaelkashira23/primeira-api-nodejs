//importação do módulo http e do módulo fs
import http from 'http';
import fs from 'fs';
import rotas from './routes.js';

//criação de arquivo de texto
fs.writeFile('mensagem.txt', 'Olá, TIC em trilhas do arquivo!', 'utf-8', (erro)=>{
    if(erro){
        console.log('Falha ao escrever o arquivo', erro);
        return;
    }
    console.log('Arquivo criado com sucesso!');
});

//leitura de arquivo de texto
fs.readFile('mensagem.txt', 'utf-8', (erro, conteudo)=>{
    if(erro){
        console.log('Falha ao ler o arquivo', erro);
        return;
    }
    console.log('Conteúdo do arquivo    :', conteudo);
    inicializaServidor(conteudo);});

//função para inicializar o servidor
function inicializaServidor(conteudo){
const servidor = http.createServer((req, res) => {
    rotas(req, res, { conteudo });
});
const porta = 3000;
const host = 'localhost';
servidor.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}/`);
});}