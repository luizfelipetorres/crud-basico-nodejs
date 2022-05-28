// importa o express
const express = require('express'); 

// cria uma variável chamada server que chama a função express
const server = express(); 

// faz com que o express use JSON
server.use(express.json()); 

function verificarNomeSobrenome(req, res, next) {
    if (!req.body.name || !req.body.lastname) {
    return res.status(400).json({ error: 'Insira nome e sobrenome!' });
    // middleware local que irá checar se as propriedades name e lastname 
    //foram informadas corretamente,
    // caso negativo, irá retornar um erro 400 – BAD REQUEST
    }
    return next(); // se o nome for informado corretamente, a função next() chama as próximas ações
    }

// Checa se o index já foi cadastrado
function verificarIndice(req, res, next) {
    const pessoa = pessoas[req.params.index];
    if (!pessoa) {
        return res.status(400).json({ error: 'Pessoa não cadastrada' });
    } 
    
    req.pessoa = pessoa;
    return next();
}

//Criando um array com uma pessoa inicialmente
const pessoas = [{
    "name": "Luiz",
    "lastname": "Felipe"
}]; // As informações ficarão armazenadas dentro deste array []

//Retorna todas as pessoas
server.get('/pessoas', (req, res) => {
    return res.json(pessoas);
})

//Retorna apenas a pessoa no index  
server.get('/pessoas/:index', verificarIndice, (req, res) => {
    const { index } = req.params;
    return res.json(pessoas[index]);
}) 

//Cadastrar uma nova pessoa
server.post('/pessoas', verificarNomeSobrenome, (req, res) => {
    pessoas.push(req.body);
    return res.json(pessoas); // retorna a informação da variável pessoas
}) 

//Atualizar uma pessoa existente
server.put('/pessoas/:index', verificarIndice, verificarNomeSobrenome, (req, res) => {

    //Armazenar indice em constante
    const { index } = req.params;   

    //Atualizar os dados
    pessoas[index] = req.body;

    //Retornar pessoas para visualização
    return res.json(pessoas)
})

server.delete('/pessoas/:index', (req, res) => {
    const { index } = req.params;
    const { pessoa } = pessoas[index];
    pessoas.splice(index, 1);

    return res.json(pessoas)
})

server.listen(3000); // faz com que o servidor seja executado na porta 3000 do seu localhost:3000