import { url } from "inspector";

export default function rotas (req, res, dado){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if(req.method === 'GET' && req.url === '/'){
        const { conteudo } = dado;
        res.statusCode = 200;
        const resposta = {
            mensagem: conteudo
        };
        res.end(JSON.stringify(resposta));
        return;
    }
    }
    if(req.method === 'POST' && req.url === '/arquivos'){
        const corpo = [];
        req.on('data', (parte) => {
            corpo.push(parte);
        });
        req.on('end', () => {
            const arquivo = JSON.parse(corpo);
            if(!arquivo?.nome) {
                const resposta = {
                    erro: {
                        mensagem: 'Arquivo não foi encontrado'
                    }
                }
            }
        })
    }

    res.statusCode = 404;
    const resposta = {
        mensagem: 'Recurso não encontrado',
        url: req.url
    };
    res.end(JSON.stringify(resposta));
    return;