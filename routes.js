import fs from 'fs';

export default function rotas(req, res, dado) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (req.method === 'GET' && req.url === '/') {
        const { conteudo } = dado;
        res.statusCode = 200;
        const resposta = {
            mensagem: conteudo
        };
        res.end(JSON.stringify(resposta));
        return;
    }
    if (req.method === 'POST' && req.url === '/arquivos') {
        const corpo = [];
        req.on('data', (parte) => {
            corpo.push(parte);
        });
        req.on('end', () => {
            const dados = Buffer.concat(corpo).toString();
            const arquivo = JSON.parse(dados);
            if (!arquivo?.nome) {
                const resposta = {
                    erro: {
                        mensagem: 'Arquivo não foi encontrado, porém é obrigatório'
                    }
                };
                res.statusCode = 400;
                res.end(JSON.stringify(resposta));
                return;
            }
            fs.writeFile(`${arquivo.nome}.txt`, arquivo?.conteudo ?? '', 'utf-8', (erro) => {
                if (erro) {
                    console.log('Falha ao escrever o arquivo', erro);
                    res.statusCode = 500;
                    const resposta = {
                        erro: {
                            mensagem: 'Erro ao criar o arquivo'
                        }
                    };
                    res.end(JSON.stringify(resposta));
                    return;
                }
                res.statusCode = 200;
                const resposta = {
                    mensagem: 'Arquivo criado com sucesso'
                };
                res.end(JSON.stringify(resposta));
                return;
            });
            req.on('error', erro -> {
                console.log('Falha ao processar a requisição', erro);
                res.statusCode = 400;
                const resposta = {
                    erro: {
                        mensagem: 'Falha ao processar a requisição'
                    }
                };
                res.end(JSON.stringify(resposta));
                return;
            });
            return;
        });
    }
    res.statusCode = 404; // Define explicitamente o status de recurso não encontrado
    const resposta = {
        mensagem: 'Recurso não encontrado',
        url: req.url
    };
    res.end(JSON.stringify(resposta)); // Envia a resposta ao cliente no formato JSON
    return;
}