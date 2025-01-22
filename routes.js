export default function rotas (req, res, dado){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if(req.method === 'GET' req.url === '/'){
        const { conteudo } = dado;
        res.statusCode = 200;
        const resposta = {
            mensagem: conteudo
        };
        res.end(resposta);
    return;
    }

}