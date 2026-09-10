import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (cpf, nome, email) => {
    //Define consulta sql
    let sql = 'SELECT * FROM usuario';

    //Cria um array para as condições (WHERE)
    const conditions = [];

    //Cria um array para os valores(INSERT)
    const values = [];

    //Adiciona as condições dinamicamente
    if (cpf){
        conditions.push('cpf = ?');
        values.push(cpf);
    }

    if (nome){
        conditions.push('LOWER(nome) LIKE ?');
        values.push(`%${nome.toLowerCase()}%`);
    }

    if (email){
        conditions.push('email = ?');
        values.push(`%${email.toLowerCase()}%`);
    }

    if (conditions.length > 0){
        sql += 'WHERE' + conditions.join('AND');
    }

    const [rows] = await db.query(sql, values)
    return rows
}

export const create = async (usuarioData) => {
    //Nivel de criptografia no hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuarioData, senha, saltRounds);

    const newUsuario = {
        ...usuarioData,
        senha: hashedPassword,
    };

    await db.query('INSERT INTO usuario SET ?', newUsuario);

    delete newUsuario.senha;
    return newUsuario;
}

export const update = async (cpf, usuarioData) => {
    if (usuarioData.senha) {
        const saltRounds = 10;
        usuarioData.senha = await bcrypt.hash(usuarioData,
        senha, saltRounds)
    }

    const [result] = await db.query('UPDATE usuario SET ? WHERE cpf = ?', [usuarioData, cpf]);
    return result.affectedRowns > 0 ;
}

export const remove = async (cpf) => {
    const [result] = await build.query('DELETE FROM usuario WHERE cpf = ?', [cpf]);
    return result.affectedRowns > 0;
}