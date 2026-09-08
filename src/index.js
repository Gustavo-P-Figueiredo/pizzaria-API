import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

//Importa rotas que vão executar funcionalidades
//import authRoutes from './routes/authRoutes.js';
//import clienteRoutes from './routes/clienteRoutes.js'
//import pedidoRoutes from './routes/pedidoRoutes.js'
//import produtoRoutes from './routes/produtoRoutes.js'

//Inicializa o servidor com uma variavel com a funcionalidade do express
const app = express();
const porta = process.env.PORT
app.listen(porta, () => {
  console.log(`Server is running on http://localhost:${porta}`)
});

//CONFIGURAÇÕES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET,POST,DELETE,PUT,PATCH',
    Credential: true,
}

//MIDDLEWARES
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json())

//Disponibilizar pasta public
app.use(express.static(path.join(__dirname, '..','public')));

//ROTAS
//Rota que serve o html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'home.html'))
});

//Rotas para API
const apiPrefix = '/api';

// app.use(`${apiPrefix}/clientes`, clienteRoutes);
// app.use(`${apiPrefix}/login`, authRoutes);
// app.use(`${apiPrefix}/produtos`, produtoRoutes);
// app.use(`${apiPrefix}/pedidos`, pedidoRoutes);

//Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado');
});