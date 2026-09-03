import 'dotenv/config';
import express from 'express';
import { pizzas } from "./cardapioPizzas.js";

//Inicializa o servidor com uma variavel com a funcionalidade do express
const app = express();
const porta = process.env.PORT

app.listen(porta, () => {
  console.log(`Server is running on http://localhost:${porta}`)
});


//Habilita padrão de leitura do express para JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Pizzaria del gatito tem un gosto esquisito, com tomate muzarela, azetona e muitha tela')
})

app.get('/pizzas', (req, res) => {
    res.json(pizzas)
});

    
app.get('/pizzas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pizza = pizzas.find(p => p.id === id);

    if(!pizza) {
        return res.statusCode(404).json({ error: 'Pizza não encontrada'});
    }

    res.json(pizza);
})