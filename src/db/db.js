import mysql from 'mysql2/promise';

//criação da pool de coxeções
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//Função de teste ao acesso do banco de dados
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Conexão estabelecida com sucesso');
        connection.release(); //Libera a conexação para o pool
    } catch(err) {
        console.log('Falha na conexão do banco de dados', err);
        
    }
})();


