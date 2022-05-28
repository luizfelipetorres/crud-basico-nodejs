// importa o express
const express = require('express'); 

// cria uma variável chamada server que chama a função express
const server = express(); 

// faz com que o express use JSON
server.use(express.json()); 

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
server.get('/pessoas/:index', (req, res) => {
    const { index } = req.params;
    return res.json(pessoas[index]);
}) 

//Cadastrar uma nova pessoa
server.post('/pessoas', (req, res) => {
    pessoas.push(req.body);
    return res.json(pessoas); // retorna a informação da variável pessoas
}) 

//Atualizar uma pessoa existente
server.put('/pessoas/:index', (req, res) => {

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