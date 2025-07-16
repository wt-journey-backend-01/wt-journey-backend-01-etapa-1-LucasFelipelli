const express = require('express');
const path    = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let lanches = {"oficiais": {}, "sugestoes": {}};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.status(200);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
    res.status(200);
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    lanches['sugestoes'][`${Object.keys(lanches.sugestoes).length + 1}`] = {"nome": nome, "ingredientes": ingredientes};

    res.send(`
        <h1>Obrigado pela sugestão!</h1>
        <br>
        <h2>Dados do lanche:</h2>
        <ul>
            <li>Nome do lanche: ${nome}</li>
            <li>Ingredientes: ${ingredientes}</li>
        </ul>
    `);

    res.status(200);
});

app.post('/contato', (req, res) => {
    res.send('<h1>contato recebido, obrigado!</h1>');
    
    res.status(200);
});

app.get('/api/lanches', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
    
    res.status(200);
});

app.use((req, res, next) => {
  res.status(404).send('<h1>Página não encontrada<h1>');
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});

