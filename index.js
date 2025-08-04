const express = require('express');
const aplicacaoREST = express();
const port = 3000;

aplicacaoREST.use(express.json());

//Simulação de um banco de dados para fins de teste.
let tabelaUsuarios = [
  { id: 102, nome: 'Mario' },
  { id: 235, nome: 'Luigi' },
  { id: 190, nome: 'Yoshi' },
  { id: 25, nome: 'Peach' },
  { id: 34, nome: 'Toad' },
  { id: 398, nome: 'Bowser' },
];

aplicacaoREST.get('/tabelaUsuarios', (requisition, response) => {
  response.json(tabelaUsuarios);
});

aplicacaoREST.get('/tabelaUsuarios/:id', (requisition, response) => {
  const id = parseInt(requisition.params.id);
  const usuario = tabelaUsuarios.find(u => u.id === id);
  if (usuario) {
    response.json(usuario);
  } else {
    response.status(404).json({ mensagem: 'Esse usuário não tá registrado banco' });
  }
});

aplicacaoREST.put('/tabelaUsuarios/:id', (requisition, response) => {
  const id = parseInt(requisition.params.id);
  const { nome } = requisition.body;
  const usuario = tabelaUsuarios.find(u => u.id === id);

  if (usuario) {
    usuario.nome = nome;
    response.json(usuario);
  } else {
    response.status(404).json({ mensagem: 'Esse usuário não tá registrado banco, então não dá pra atualizar' });
  }
});

aplicacaoREST.delete('/tabelaUsuarios/:id', (requisition, response) => {
  const id = parseInt(requisition.params.id);
  tabelaUsuarios = tabelaUsuarios.filter(u => u.id !== id);
  response.status(204).send();
});

aplicacaoREST.post('/tabelaUsuarios', (requisition, response) => {
  const { nome } = requisition.body;
  const novoUsuario = {
    id: tabelaUsuarios.length + 1,
    nome,
  };
  tabelaUsuarios.push(novoUsuario);
  response.status(201).json(novoUsuario);
});


aplicacaoREST.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
